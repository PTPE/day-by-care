import { useState } from 'react';

import Label from '@/ui/label';
import Input from '@/ui/input';
import DatePicker from '@/ui/date-picker';
import Button from '@/ui/button';
import ClientIconSelectDialog from '@/features/client/components/client-icon-select-dialog';
import ClientServiceSelect from '@/features/client/components/client-service-select';

export default function ClientForm() {
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <div className="flex flex-col gap-5 rounded-lg">
      <div className="bg-card p-5 rounded-lg space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-accent rounded-full " />
          <div className="text-xl font-extrabold tracking-widest">基本資料</div>
        </div>

        <div className="flex justify-center">
          <ClientIconSelectDialog
            selectedIcon={selectedIcon}
            onSelectIcon={(icon) => setSelectedIcon(icon)}
          />
        </div>

        <div>
          <Label>案主姓名</Label>
          <Input className="bg-secondary" />
        </div>
        <div>
          <Label>生日</Label>
          <br />
          <DatePicker className="bg-secondary border-border w-full" />
        </div>
        <div>
          <Label>地址</Label>
          <Input className="bg-secondary" />
        </div>
        <div>
          <Label>緊急聯絡人</Label>
          <Input className="bg-secondary" />
        </div>
        <div>
          <Label>緊急聯絡人電話</Label>
          <Input className="bg-secondary" />
        </div>
      </div>

      <div className="bg-card p-5 rounded-lg space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-accent rounded-full " />
          <div className="text-xl font-extrabold tracking-widest">服務項目</div>
        </div>
        <div>
          <Label>服務項目</Label>
          <ClientServiceSelect />
        </div>
      </div>

      <div className="bg-card p-5 rounded-lg space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-accent rounded-full " />
          <div className="text-xl font-extrabold tracking-widest">督導資料</div>
        </div>

        <div>
          <Label>督導姓名</Label>
          <Input className="bg-secondary" />
        </div>

        <div>
          <Label>督導電話</Label>
          <Input className="bg-secondary" />
        </div>

        <div>
          <Label>辦公室電話</Label>
          <Input className="bg-secondary" />
        </div>
      </div>

      <div className="flex gap-5 mb-5">
        <Button variant="ghost" className="w-full border border-border">
          取消
        </Button>
        <Button variant="accent" className="w-full text-primary-foreground">
          確定
        </Button>
      </div>
    </div>
  );
}
