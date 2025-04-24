type Props = {
  selected: boolean;
};

export default function ClientListItem({ selected }: Props) {
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-between px-4 py-2 border-b border-gray-200 flex-shrink-0 rounded-full cursor-pointer ${
        selected ? 'bg-button-primary' : 'bg-tertiary'
      }`}
    >
      <div
        className={`text-base font-semibold flex-shrink-0 tracking-widest ${
          selected ? 'text-primary-foreground' : 'text-black'
        }`}
      >
        秋津田
      </div>
    </div>
  );
}
