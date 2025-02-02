"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type MailingFormProps = {
  onMailingCreated: () => void
}

const mailingSchema = z.object({
  mailerId: z.string().min(1, "Mailer is required"),
  listId: z.string().min(1, "List is required"),
  scheduleDate: z.date().min(new Date(), "Schedule date must be in the future"),
})

type MailingFormData = z.infer<typeof mailingSchema>

export default function MailingForm({ onMailingCreated }: MailingFormProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<MailingFormData>({
    resolver: zodResolver(mailingSchema),
    defaultValues: {
      mailerId: "",
      listId: "",
      scheduleDate: new Date(),
    },
  })

  const { data: mailers } = useQuery({
    queryKey: ["mailers"],
    queryFn: async () => {
      const response = await fetch("/api/mailers")
      if (!response.ok) {
        throw new Error("Failed to fetch mailers")
      }
      return response.json()
    },
  })

  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await fetch("/api/lists")
      if (!response.ok) {
        throw new Error("Failed to fetch lists")
      }
      return response.json()
    },
  })

  const createMailing = useMutation({
    mutationFn: async (data: MailingFormData) => {
      const response = await fetch("/api/mailings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to create mailing")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailings"] })
      onMailingCreated()
    },
  })

  const onSubmit = (data: MailingFormData) => {
    createMailing.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div className="p-4">
        <Label htmlFor="mailerId" className="text-lg font-medium">
          Mailer
        </Label>
        <Controller
          name="mailerId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a mailer" />
              </SelectTrigger>
              <SelectContent>
                {mailers?.map((mailer:any) => (
                  <SelectItem key={mailer.id} value={mailer.id}>
                    {mailer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.mailerId && <p className="text-red-500 mt-1">{errors.mailerId.message}</p>}
      </div>

      <div className="p-4">
        <Label htmlFor="listId" className="text-lg font-medium">
          List
        </Label>
        <Controller
          name="listId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a list" />
              </SelectTrigger>
              <SelectContent>
                {lists?.map((list:any) => (
                  <SelectItem key={list.id} value={list.id}>
                    {list.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.listId && <p className="text-red-500 mt-1">{errors.listId.message}</p>}
      </div>

      <div className="p-4">
        <Label htmlFor="scheduleDate" className="text-lg font-medium">
          Schedule Date
        </Label>
        <Controller
          name="scheduleDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-2 border rounded mt-1"
            />
          )}
        />
        {errors.scheduleDate && <p className="text-red-500 mt-1">{errors.scheduleDate.message}</p>}
      </div>

      <Button type="submit" disabled={createMailing.isPending} className="w-full">
        {createMailing.isPending ? "Scheduling..." : "Schedule Mailing"}
      </Button>

      {createMailing.isError && <p className="text-red-500 mt-2">An error occurred: {createMailing.error.message}</p>}
    </form>
  )
}

