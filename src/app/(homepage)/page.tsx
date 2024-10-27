import { PersonWithDog } from '@/icons/person_with_dog';

import Button from '@/ui/button/button';
import Header from '@/ui/header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header
        endChildren={
          <>
            <Link href="signIn">
              <Button>登入</Button>
            </Link>

            <Link href="signUp">
              <Button>註冊</Button>
            </Link>
          </>
        }
      />
      <div className="flex flex-col items-center mt-52">
        <div className="flex justify-center">
          <div className="grow self-start space-y-20">
            <h1 className="font-[900] text-5xl">
              距離
              <span className="relative z-0 before:absolute before:-z-[1] before:bg-accent/90 before:h-1/3 before:w-full before:inline-block before:bottom-0">
                養狗狗
              </span>
              又進了一步！
            </h1>
            <p className="text-xl w-96 leading-8">
              輕鬆打造班表，讓照護工作更加輕鬆。專為您打造，讓您有效管理工作，同時為未來養狗的生活預留美好時光。
            </p>

            <Button>以訪客身份繼續</Button>
          </div>

          <PersonWithDog className="w-96 h-96" />
        </div>
      </div>
    </>
  );
}
