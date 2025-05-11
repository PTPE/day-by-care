import Logo from '@/ui/logo';

export default function AppIntro() {
  return (
    <div className="p-5 md:p-0 h-full">
      <div className="p-10 bg-secondary flex items-center justify-center gap-10 flex-col h-full">
        <Logo size="lg" />
        <div className="space-y-5">
          <h2 className="font-[900] text-2xl">
            距離
            <span className="relative z-0 before:absolute before:-z-[1] before:bg-accent/90 before:h-1/3 before:w-full before:inline-block before:bottom-0">
              養狗狗
            </span>
            又進了一步！
          </h2>
          <p className="max-w-96 leading-8 break-words">
            輕鬆打造班表，讓照護工作更加輕鬆。專為您打造，讓您有效管理工作，同時為未來養狗的生活預留美好時光。
          </p>
        </div>

        <div className="max-w-96 space-y-8">
          <div className="flex items-center gap-2">
            <span className="icon-[material-symbols--edit-calendar-outline]" />
            輕鬆排班，一目了然
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-[streamline--health-care-2-solid]" />
            專為照護設計，完美管理客戶
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-[mdi--export]" />
            一鍵匯出，輕鬆分享
          </div>
        </div>
      </div>
    </div>
  );
}
