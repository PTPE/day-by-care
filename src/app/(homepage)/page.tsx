import { PersonWithDog } from '@/icons/person_with_dog';

import Header from './_header';

export default function Home() {
  return (
    <div className="flex flex-col pt-2 m-auto max-w-[1190px]">
      <Header />
      <div className="flex flex-col items-center mt-56">
        <div className="flex justify-center">
          <div className="grow self-start space-y-20">
            <h1 className="font-[900] text-5xl">
              距離
              <span className="relative z-0 before:absolute before:-z-[1] before:bg-accent/90 before:h-1/3 before:w-full before:inline-block before:bottom-0">
                養狗狗
              </span>
              又進了一步！
            </h1>
            <p className="text-xl w-96">
              輕鬆打造班表，讓照護工作更加輕鬆。專為您打造，讓您有效管理工作，同時為未來養狗的生活預留美好時光。
            </p>
            <button
              type="button"
              className="bg-button-primary text-button-primary hover:bg-button-primary-hover px-4 py-2 rounded-lg"
            >
              以訪客身份繼續
            </button>
          </div>

          <PersonWithDog className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
}
