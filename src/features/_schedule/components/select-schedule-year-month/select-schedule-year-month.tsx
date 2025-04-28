import { format, getYear } from 'date-fns';
import { zhCN } from 'date-fns/locale';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/ui/select';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';

const currentYear = getYear(new Date());
const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // 過去100年
const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(0, i), 'MMMM', { locale: zhCN })
);

export default function SelectSceduleYearMonth() {
  return (
    <div className="flex gap-5">
      <FormField
        name="year"
        render={({ field: f }) => (
          <FormItem>
            <Select
              onValueChange={(value) => f.onChange(+value)}
              defaultValue={f.value}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="年" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={`${+year}`}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="month"
        render={({ field: f }) => (
          <FormItem>
            <Select
              onValueChange={(value) => f.onChange(+value)}
              defaultValue={f.value}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="月" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={`${index + 1}`}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
