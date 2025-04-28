import Label from '@/ui/label';
import Input from '@/ui/input';
import Button from '@/ui/button';

export default function EditTimeSlot() {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="text-base font-bold text-primary">編輯時間段</div>

      <div className="grid grid-cols-2 gap-2">
        <Label>簽到</Label>
        <Label>簽退</Label>
        <Input type="time" className="bg-secondary" />
        <Input type="time" className="bg-secondary" />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" className="bg-secondary border border-line">
          取消
        </Button>
        <Button variant="accent" className="text-primary-foreground">
          確認
        </Button>
      </div>
    </div>
  );
}
