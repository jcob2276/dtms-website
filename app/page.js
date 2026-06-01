'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Middleware is unsupported with output:'export', so language detection happens client-side.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = (navigator.language || 'pl').toLowerCase();
    if (lang.startsWith('uk') || lang.startsWith('ru')) {
      router.replace('/ua');
    } else if (lang.startsWith('en')) {
      router.replace('/en');
    } else {
      router.replace('/pl');
    }
  }, [router]);

  return null;
}
