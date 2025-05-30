import PreviewSelectedClient from '@/components/preview-selected-client';
import SelectExportClient from '@/components/select-export-client';
import ScheduleTimeSelect from '@/features/schedule/components/schedule-time-select';
import Button from '@/ui/button';

export default function ExportSection({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  const month = searchParams?.month || new Date().getMonth() + 1;
  const year = searchParams?.year || new Date().getFullYear();

  return (
    <div className="flex flex-col gap-5">
      <ScheduleTimeSelect />

      <div className="flex items-center gap-2 text-primary text-lg font-bold">
        <span className="icon-[material-symbols--calendar-month-outline]" />
        <span>
          {year}年{month}月
        </span>
      </div>

      <SelectExportClient />

      <PreviewSelectedClient />

      <div className="flex justify-around">
        <Button className="text-sm" variant="accent">
          下載PDF
        </Button>
        <Button className="text-sm">至iBon列印</Button>
      </div>
    </div>
  );
}
