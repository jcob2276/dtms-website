'use client';
import { useEffect } from 'react';

export default function HtmlLang({ lang }) {
  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
  }, [lang]);
  return null;
}
