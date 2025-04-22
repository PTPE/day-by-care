import Button from '@/ui/button';
import Input from '@/ui/input';
import Label from '@/ui/label';

export default function SignIn() {
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <Label>帳號</Label>
        <Input className="py-5" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Label>密碼</Label>
        <Input className="py-5" />
      </div>
      <Button className="w-full py-5">登入</Button>

      <div className="w-full flex items-center justify-center gap-2">
        <div className="bg-line w-full h-[1px]" />
        <span>或</span>
        <div className="bg-line w-full h-[1px]" />
      </div>

      <Button className="w-full py-5" variant="secondary">
        Google 登入
      </Button>

      <Button variant="link" className="text-sm">
        忘記密碼
      </Button>
    </>
  );
}
