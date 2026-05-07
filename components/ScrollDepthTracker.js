'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * Śledzi głębokość scrollowania — wysyła zdarzenia przy 25/50/75/100%
 * Resetuje się przy zmianie strony
 */
export default function ScrollDepthTracker() {
  const pathname = usePathname();
  const sentRef = useRef(new Set());

  useEffect(() => {
    // Reset przy zmianie strony
    sentRef.current = new Set();

    const milestones = [25, 50, 75, 100];

    function getScrollPercent() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) return 0;
      return Math.round((scrollTop / scrollHeight) * 100);
    }

    function handleScroll() {
      const percent = getScrollPercent();
      for (const milestone of milestones) {
        if (percent >= milestone && !sentRef.current.has(milestone)) {
          sentRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return null;
}
