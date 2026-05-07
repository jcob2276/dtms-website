'use client';
import { useEffect } from 'react';
import { trackCityPageView } from '@/lib/analytics';

export default function CityTracking({ cityId }) {
  useEffect(() => {
    trackCityPageView(cityId);
  }, [cityId]);

  return null;
}
