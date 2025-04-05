import { FormField, FormItem } from '@/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

type Props = {
  clientIndex: number;
  index: number;
  dayIndex: number;
};

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export default function ShiftTimeItem({ clientIndex, index, dayIndex }: Props) {
  return (
    <div className="flex items-center gap-2 w-full">
      <FormField
        name={`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime.${index}.start.hour`}
        render={({ field: f }) => (
          <FormItem>
            <Select
              onValueChange={(e) => f.onChange(+e)}
              defaultValue={`${f.value}`}
            >
              <SelectTrigger>
                <SelectValue placeholder="時" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={`${hour}`}>
                    {hour.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <span>：</span>

      <FormField
        name={`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime.${index}.start.minute`}
        render={({ field: f }) => (
          <Select
            onValueChange={(e) => f.onChange(+e)}
            defaultValue={`${f.value}`}
          >
            <SelectTrigger>
              <SelectValue placeholder="分" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={`${minute}`}>
                  {minute.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <span>－</span>

      <FormField
        name={`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime.${index}.end.hour`}
        render={({ field: f }) => (
          <Select
            onValueChange={(e) => f.onChange(+e)}
            defaultValue={`${f.value}`}
          >
            <SelectTrigger>
              <SelectValue placeholder="時" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={`${hour}`}>
                  {hour.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <span>：</span>

      <FormField
        name={`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime.${index}.end.minute`}
        render={({ field: f }) => (
          <Select
            onValueChange={(e) => f.onChange(+e)}
            defaultValue={`${f.value}`}
          >
            <SelectTrigger>
              <SelectValue placeholder="分" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={`${minute}`}>
                  {minute.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
