'use client';

import { useState } from 'react';

import ClientIconSelector from '@/features/client/components/client-icon-selector/client-icon-selector';
import ServiceItemSelector from '@/features/client/components/service-items-selector';
import Input from '@/ui/input';
import Label from '@/ui/label';

export default function ClientPage() {
  const [selectedClientIcon, setSelectedClientIcon] = useState('');
  const [selectedServiceItems, setSelectedServiceItems] = useState<string[]>(
    []
  );

  const handleSelectedServiceItems = (item: string) => {
    setSelectedServiceItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      return [...prev, item];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-1/2 m-auto">
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="col-span-2">
          <ClientIconSelector
            onSelectIcon={(icon) => {
              setSelectedClientIcon(icon);
            }}
            selectedIcon={selectedClientIcon}
          />
        </div>

        <div className="grid items-center gap-1.5 w-full">
          <Label htmlFor="name">姓名</Label>
          <Input type="name" id="name" placeholder="姓名" />
        </div>

        <div className="grid items-center gap-1.5">
          <Label htmlFor="birthday">生日</Label>
          <Input type="birthday" id="birthday" placeholder="生日" />
        </div>

        <div className="grid items-center gap-1.5 w-full col-span-2">
          <Label htmlFor="address">住址</Label>
          <Input type="address" id="address" placeholder="住址" />
        </div>

        <div className="col-span-2 w-full">
          <ServiceItemSelector
            selectedServiceItems={selectedServiceItems}
            onHandleSelectedServiceItems={handleSelectedServiceItems}
          />
        </div>

        <div>
          <Label htmlFor="emergencyContact">緊急聯絡人</Label>
          <Input
            type="emergencyContact"
            id="emergencyContact"
            placeholder="姓名"
          />
        </div>

        <div>
          <Label htmlFor="emergencyContactPhone">緊急聯絡人電話</Label>
          <Input
            type="emergencyContactPhone"
            id="emergencyContactPhone"
            placeholder="電話"
          />
        </div>

        <div>
          <Label htmlFor="supervisorName">督導姓名</Label>
          <Input type="supervisorName" id="supervisorName" placeholder="姓名" />
        </div>

        <div>
          <Label htmlFor="supervisorPhone">督導電話</Label>
          <Input
            type="supervisorPhone"
            id="supervisorPhone"
            placeholder="電話"
          />
        </div>

        <div>
          <Label htmlFor="officePhone">辦公室電話</Label>
          <Input type="officePhone" id="officePhone" placeholder="電話" />
        </div>
      </div>
    </div>
  );
}
