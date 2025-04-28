import ClientServiceCard from '@/features/report/components/client-service-card';
import ServiceSummaryCard from '@/features/report/components/service-summary-card';

export default function Reports() {
  return (
    <div className="flex flex-col gap-5">
      <ServiceSummaryCard />

      <ClientServiceCard />
    </div>
  );
}
