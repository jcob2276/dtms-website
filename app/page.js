import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/pl');
}

export const metadata = {
  title: 'DTMS - Szkolenia UDT Krosno',
  robots: { index: false, follow: false },
};
