import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { format } from "date-fns"

type Mailing = {
  id: string
  mailerId: string
  listId: string
  scheduleDate: string
  mailerName?: string
  listName?: string
}

type MailingDetailPopupProps = {
  mailing: Mailing | null
  isOpen: boolean
  onClose: () => void
}

export default function MailingDetailPopup({ mailing, isOpen, onClose }: MailingDetailPopupProps) {
  if (!mailing) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            Mailing Details
            {/* <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button> */}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">ID</h3>
              <p>{mailing.id}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Mailer</h3>
              <p>{mailing.mailerName || mailing.mailerId}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">List</h3>
              <p>{mailing.listName || mailing.listId}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Schedule</h3>
              <p>{format(new Date(mailing.scheduleDate), "PPpp")}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

