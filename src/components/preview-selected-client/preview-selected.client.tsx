const thisMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function PreviewSelectedClient() {
  return (
    <div>
      <div className="bg-card p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center font-bold gap-2">
          <span className="icon-[material-symbols--nest-clock-farsight-analog-outline-rounded] text-primary text-lg" />
          <span>預覽：總時數5小時</span>
        </div>

        <div className="overflow-auto flex flex-col gap-2">
          <div className="flex gap-8 items-center">
            <div className="min-w-[50px]">案主</div>
            <div className="flex gap-5 flex-1">
              {thisMonthDays.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center min-w-[20px]"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="min-w-[50px]">時數</div>
          </div>

          <div className="min-w-full h-[1px] bg-border sticky left-0" />

          <div className="flex gap-8 items-center">
            <div className="min-w-[50px]">王小明</div>
            <div className="flex gap-5 flex-1">
              {thisMonthDays.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center min-w-[20px]"
                >
                  8
                </div>
              ))}
            </div>
            <div className="min-w-[50px]">40</div>
          </div>
        </div>
      </div>
    </div>
  );
}
