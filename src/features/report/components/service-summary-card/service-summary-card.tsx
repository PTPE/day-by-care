export default function ServiceSummaryCard() {
  return (
    <div>
      <div className="bg-card rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="icon-[material-symbols--nest-clock-farsight-analog-outline-rounded]  text-primary" />
          <div className="font-bold">
            總服務小時：<span className="text-accent">100小時</span>
          </div>
        </div>
        <div className="text-sm">2025/4 3位案主總服務時數</div>
      </div>
    </div>
  );
}
