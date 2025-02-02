import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import MailingDetailPopup from "./MailingDetailPopup"

type Mailing = {
  id: string
  mailerId: string
  listId: string
  scheduleDate: string
  mailerName?: string
  listName?: string
}

type MailingListProps = {
  mailings: Mailing[]
}

export default function MailingList({ mailings }: MailingListProps) {
  const [selectedMailing, setSelectedMailing] = useState<Mailing | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleViewDetails = (mailing: Mailing) => {
    setSelectedMailing(mailing)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedMailing(null)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-slate-950">ID</TableHead>
            <TableHead className="text-slate-950">Mailer ID</TableHead>
            <TableHead className="text-slate-950">List ID</TableHead>
            <TableHead className="text-right text-slate-950">Schedule Date</TableHead>
            <TableHead className="text-right text-slate-950">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mailings.map((mailing) => (
            <TableRow key={mailing.id}>
              <TableCell className="font-medium">{mailing.id}</TableCell>
              <TableCell>{mailing.mailerId}</TableCell>
              <TableCell>{mailing.listId}</TableCell>
              <TableCell className="text-right">{format(new Date(mailing.scheduleDate), "PPpp")}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(mailing)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MailingDetailPopup mailing={selectedMailing} isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  )
}

