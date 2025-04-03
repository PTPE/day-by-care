/* eslint-disable react/no-array-index-key */
export default function LastHalfMonth() {
  return (
    <table
      id="table-to-export1"
      className="w-full mt-4 border-collapse border border-black bg-white table-fixed"
    >
      <thead>
        <tr>
          <th scope="col" colSpan={13} className="text-center border-none">
            臺北市私立安家居家長照機構
          </th>
          <th className="text-right border-none" colSpan={5}>
            11月工作紀錄表
          </th>
        </tr>
        <tr>
          <th scope="col" colSpan={15} className="text-left border-none">
            個案姓名：
          </th>
        </tr>
        <tr>
          <th colSpan={15} className="text-left border-none">
            個案地址：
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th className="text-center" colSpan={3}>
            日期
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 16).map((day) => (
            <td key={day} className="text-center" colSpan={1}>
              {day}
            </td>
          ))}
        </tr>
        <tr>
          <th className="text-center" colSpan={3}>
            星期
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>
        <tr>
          <th className="text-center" colSpan={3}>
            體溫
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>
        <tr>
          <th className="text-center" colSpan={3}>
            時間（簽到）
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>
        <tr>
          <th className="text-center" colSpan={3}>
            時間（簽退）
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center" colSpan={3}>
            BAXX
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center" colSpan={3}>
            衛教教導
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center" colSpan={3}>
            轉介服務
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center" colSpan={3}>
            手部清潔
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center py-10" colSpan={3}>
            居服員簽名
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>

        <tr>
          <th className="text-center py-10" colSpan={3}>
            案主簽名
          </th>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className="text-center" colSpan={1}></td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
