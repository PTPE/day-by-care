import Logo from '@/ui/logo';

export default function AppIntro() {
  return (
    <div className="p-5 md:p-0 h-full">
      <div className="p-10 bg-secondary flex items-center justify-center gap-10 flex-col h-full">
        <Logo size="lg" />
        <div className="space-y-5">
          <h2 className="font-[900] text-2xl">
            班表安排有節奏，
            <span className="relative z-0 inline-block before:absolute before:-z-[1] before:bg-accent/90 before:h-1/3 before:w-full before:bottom-0">
              照護生活可以更溫柔
            </span>
          </h2>
          <p className="max-w-96 leading-8 break-words">
            透過日日安，您能輕鬆掌握照護時程，提升管理效率，讓時間回到自己手中，照顧自己，也照顧更多人。
          </p>
        </div>

        <div className="max-w-96 space-y-8">
          <div className="flex items-center gap-2">
            <span className="icon-[material-symbols--edit-calendar-outline]" />
            排班更有節奏，日子過得更安心
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-[streamline--health-care-2-solid]" />
            所有照護紀錄，一站整合不費心
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-[mdi--export]" />
            匯出簡單，報告溝通都更輕鬆
          </div>
        </div>
      </div>
    </div>
  );
}
