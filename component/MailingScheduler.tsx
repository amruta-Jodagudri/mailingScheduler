"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import MailingForm from "./MailingForm"
import MailingList from "./MailingList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MailingScheduler() {
  const [activeTab, setActiveTab] = useState("create")
  const queryClient = useQueryClient()

  const {
    data: mailings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mailings"],
    queryFn: async () => {
      const response = await fetch("/api/mailings")
      if (!response.ok) {
        throw new Error("Failed to fetch mailings")
      }
      return response.json()
    },
  })

  const handleMailingCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["mailings"] })
    setActiveTab("list")
  }

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">An error occurred: {error.message}</div>

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex w-full justify-between mb-4">
        <TabsTrigger className="w-1/2" value="create">Create Mailing</TabsTrigger>
        <TabsTrigger className="w-1/2" value="list">Scheduled Mailings</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <MailingForm onMailingCreated={handleMailingCreated} />
      </TabsContent>
      <TabsContent value="list">
        <MailingList mailings={mailings} />
      </TabsContent>
    </Tabs>
  )
}

