import ClientItem from './_client_item';

export default function SelectExportClient() {
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-2">
      <div className="font-bold">選擇匯出的案主</div>

      <div className="flex gap-2">
        <ClientItem clientId="123" clientName="123" />
        <ClientItem clientId="123" clientName="123" />
        <ClientItem clientId="123" clientName="123" />
      </div>
    </div>
  );
}
