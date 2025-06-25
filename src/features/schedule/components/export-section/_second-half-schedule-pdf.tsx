import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { Client } from '@/types/client';
import { serviceItemMap } from '@/const/service-items';
import { FilledServiceTime } from '@/utils/fill-missing-service-dates';

type Props = {
  serviceTime: FilledServiceTime[];
  client: Client;
};

function getWeekdayInChinese(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'EEEEE', { locale: zhTW });
}

export default function SecondHalfSchedulePdf({ serviceTime, client }: Props) {
  const isDownload = true;

  const downloadCellClass = isDownload ? 'p-[3px] pb-5' : '';
  const downloadTableClass = isDownload
    ? 'absolute w-[1440px] h-[990px] top-[-9999px] left-[-9999px]'
    : 'w-full';

  return (
    <table
      id={`${isDownload ? `second-half-month-${client.clientId}` : `second-half-month-${client.clientId}`}`}
      className={`mt-4 border-collapse border bg-white table-fixed ${downloadTableClass}`}
    >
      <tbody>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            日期
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {time.date.split('-').pop()}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            星期
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {getWeekdayInChinese(time.date)}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            體溫
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            簽到
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {time.serviceTime.map((t) => (
                <>
                  {t.start}
                  <br />
                </>
              ))}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            簽退
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {time.serviceTime.map((t) => (
                <>
                  {t.end}
                  <br />
                </>
              ))}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            服務項目
          </th>
        </tr>

        {client.serviceItemIds.map((id) => (
          <tr key={id}>
            <th className={`text-center ${downloadCellClass}`} colSpan={5}>
              {id} {serviceItemMap[id]}
            </th>
            {serviceTime.map((time) => (
              <td
                key={time.date}
                className={`text-center ${downloadCellClass}`}
                colSpan={1}
              />
            ))}
          </tr>
        ))}

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            其他
          </th>
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            衛教教導
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            />
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            轉介服務
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            />
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={5}>
            手部清潔
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            />
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            簽名
          </th>
        </tr>

        <tr>
          <th className={`text-center py-12 `} colSpan={5}>
            居服員簽名
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            />
          ))}
        </tr>

        <tr>
          <th className={`text-center py-12 `} colSpan={5}>
            案主簽名
          </th>
          {serviceTime.map((time) => (
            <td
              key={time.date}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            />
          ))}
        </tr>

        <tr>
          <th className="text-center p-[3px] pb-7 py-5" colSpan={5}>
            案主狀況
          </th>
          <td colSpan={serviceTime.length} />
        </tr>

        <tr>
          <th className="text-center p-[3px] pb-7 py-5" colSpan={5}>
            特殊事故紀錄與意見
          </th>
          <td colSpan={serviceTime.length - 4} />
          <td colSpan={4} />
        </tr>
      </tbody>
    </table>
  );
}
