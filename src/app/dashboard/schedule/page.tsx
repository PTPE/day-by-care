import SectionTabs from '@/components/section-tabs';
import EditSection from '@/features/schedule/components/edit-section';
import ExportSection from '@/features/schedule/components/export-section';

const tabs = [
  {
    id: 'edit',
    label: '編輯班表',
  },
  {
    id: 'export',
    label: '匯出班表',
  },
];

export default function SchedulePage({
  searchParams,
}: {
  searchParams: { tab?: string; month?: string; year?: string };
}) {
  const selectedSectionId = searchParams.tab || tabs[0].id;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <SectionTabs tabs={tabs} />
      </div>

      {selectedSectionId === 'edit' && <EditSection />}
      {selectedSectionId === 'export' && <ExportSection />}
    </div>
  );
}
