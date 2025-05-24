'use client';

import { useEffect, useState } from 'react';

import Input from '@/ui/input';
import Label from '@/ui/label';
import Button from '@/ui/button';
import {
  useGetUser,
  useUpdateUser,
} from '@/features/auth/hooks/useAuthQueries.client';
import LoadingSpinner from '@/ui/loading-spinner';

function useEditField(initialValue: string, onSave: (value: string) => void) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleToggleEdit = () => {
    if (isEditing) {
      if (value === initialValue) {
        setIsEditing(false);
        return;
      }
      if (value !== '') {
        onSave(value);
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => setValue(initialValue), [initialValue]);

  return {
    isEditing,
    value,
    setValue,
    handleToggleEdit,
  };
}

function EditableField({
  label,
  value,
  isEditing,
  onValueChange,
  onToggleEdit,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onValueChange: (value: string) => void;
  onToggleEdit: () => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center justify-between font-bold gap-2">
        {isEditing ? (
          <Input
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        ) : (
          <div>{value}</div>
        )}
        <Button
          className="flex items-center gap-2 text-muted-foreground"
          variant="ghost"
          onClick={onToggleEdit}
        >
          {isEditing ? (
            <span>儲存</span>
          ) : (
            <>
              <span>編輯</span>
              <span className="icon-[material-symbols--edit-square-outline]" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function Name() {
  const { data: user, isLoading: isGettingUser } = useGetUser();
  const { mutate: updateUser } = useUpdateUser();

  const lastNameField = useEditField(user?.lastName || '', (value) => {
    updateUser({ lastName: value });
  });

  const firstNameField = useEditField(user?.firstName || '', (value) => {
    updateUser({ firstName: value });
  });

  return (
    <div className="flex flex-col gap-2">
      {isGettingUser && <LoadingSpinner />}
      <EditableField
        label="姓"
        value={lastNameField.value}
        isEditing={lastNameField.isEditing}
        onValueChange={lastNameField.setValue}
        onToggleEdit={lastNameField.handleToggleEdit}
      />

      <EditableField
        label="名"
        value={firstNameField.value}
        isEditing={firstNameField.isEditing}
        onValueChange={firstNameField.setValue}
        onToggleEdit={firstNameField.handleToggleEdit}
      />
    </div>
  );
}
