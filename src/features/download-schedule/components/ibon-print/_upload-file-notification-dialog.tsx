import { Dialog, DialogContent, DialogTitle } from '@/ui/dialog';

type Props = {
  pincode: string;
  expirationDate: string;
  open: boolean;
  onClose: () => void;
};

export default function UploadFileNotificationDialog({
  open,
  onClose,
  pincode,
  expirationDate,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center">
        <DialogTitle className="text-center font-bold text-2xl">
          列印通知
        </DialogTitle>

        <div>取件編號已同步發送到您的信箱， 請在期限內至超商列印</div>
        <div>
          取件代碼：<span className="font-bold text-accent">{pincode}</span>
        </div>
        <div>列印期限：{expirationDate}</div>
      </DialogContent>
    </Dialog>
  );
}
