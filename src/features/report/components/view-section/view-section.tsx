import ClientServiceSummaryList from '@/features/report/components/client-service-summary-list';
import ServiceSummaryCard from '@/features/report/components/service-summary-card';

export default function ViewSection() {
  return (
    <>
      <ServiceSummaryCard />
      <ClientServiceSummaryList />
    </>
  );
}
