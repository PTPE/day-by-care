export default function ClientInformation() {
  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-5">
        <div className="w-20 aspect-square rounded-full flex items-center justify-center p-2 shadow-[0_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className="icon-[noto-v1--old-man-light-skin-tone] w-full h-full" />
        </div>

        <div className="text-xl font-extrabold tracking-widest">秋津田</div>
      </div>

      <div className="grid grid-cols-[1fr_4fr] gap-2 md:grid-cols-[1fr_3fr_1fr_3fr]">
        <div className="text-sm md:text-base">住址</div>
        <div className="text-sm md:text-base font-bold">
          台北市中正區羅斯福路一段100號
        </div>

        <div className="text-sm md:text-base">電話</div>
        <div className="text-sm md:text-base font-bold">090-1234-5678</div>

        <div className="text-sm md:text-base">督導</div>
        <div className="text-sm md:text-base font-bold">王秋月</div>

        <div className="text-sm md:text-base">服務項目</div>
        <div className="text-sm md:text-base font-bold">
          居家服務、日間照顧、短期照顧
        </div>
      </div>
    </div>
  );
}
