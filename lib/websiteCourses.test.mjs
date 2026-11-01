import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchWebsiteCourses, getWebsiteCourseText } from './websiteCourses.mjs';

const config = { url: 'https://example.supabase.co', apiKey: 'public-anon-key' };
const entry = { id: '1', name_pl: 'Podesty', name_en: 'Platforms', name_ua: null, date_text_pl: '2 razy w miesiącu', date_text_en: 'twice a month', date_text_ua: null };

test('loads current data without browser cache and requests only public fields', async () => {
  let request;
  const rows = await fetchWebsiteCourses(config, { fetcher: async (...args) => { request = args; return { ok: true, json: async () => [entry] }; } });
  assert.equal(rows[0].id, '1');
  assert.equal(request[1].cache, 'no-store');
  assert.equal(request[1].headers.apikey, config.apiKey);
  assert.match(request[0], /is_visible=eq.true/);
  assert.match(request[0], /order=sort_order.asc,id.asc/);
});

test('empty publication stays empty instead of restoring static dates', async () => {
  assert.deepEqual(await fetchWebsiteCourses(config, { fetcher: async () => ({ ok: true, json: async () => [] }) }), []);
});

test('HTTP and malformed responses reject instead of displaying stale data', async () => {
  await assert.rejects(fetchWebsiteCourses(config, { fetcher: async () => ({ ok: false }) }));
  await assert.rejects(fetchWebsiteCourses(config, { fetcher: async () => ({ ok: true, json: async () => ({ error: 'denied' }) }) }));
  await assert.rejects(fetchWebsiteCourses(config, { fetcher: async () => ({ ok: true, json: async () => [{ id: '1' }] }) }));
});

test('uses translated names/descriptions and Polish fallbacks', () => {
  assert.deepEqual(getWebsiteCourseText(entry, 'en'), { name: 'Platforms', date: 'twice a month' });
  assert.deepEqual(getWebsiteCourseText(entry, 'ua'), { name: 'Podesty', date: '2 razy w miesiącu' });
});

test('preserves literal HTML as text rather than producing markup', () => {
  assert.equal(getWebsiteCourseText({ ...entry, name_pl: '<img onerror=alert(1)>' }, 'pl').name, '<img onerror=alert(1)>');
});

test('a second load sees newly published values', async () => {
  let current = [entry];
  const fetcher = async () => ({ ok: true, json: async () => current });
  assert.equal((await fetchWebsiteCourses(config, { fetcher }))[0].date_text_pl, '2 razy w miesiącu');
  current = [{ ...entry, date_text_pl: '02.12.2026' }];
  assert.equal((await fetchWebsiteCourses(config, { fetcher }))[0].date_text_pl, '02.12.2026');
});
