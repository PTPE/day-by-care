export default function TimeSlot() {
  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
      <div className="text-base text-primary font-bold">09:00-12:00</div>
      <div className="flex items-center gap-2">
        <div className="aspect-square flex items-center justify-center rounded-md hover:bg-accent cursor-pointer p-2">
          <div className="icon-[material-symbols--edit-square-outline] text-primary cursor-pointer text-xl" />
        </div>
        <div className="aspect-square flex items-center justify-center rounded-md hover:bg-accent cursor-pointer p-2">
          <div className="icon-[material-symbols--delete-outline] text-destructive cursor-pointer text-xl" />
        </div>
      </div>
    </div>
  );
}
