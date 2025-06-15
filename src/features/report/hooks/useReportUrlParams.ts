import { useSearchParams } from 'next/navigation';

export default function useReportUrlParams() {
  const searchParams = useSearchParams();

  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  return { year, month };
}
