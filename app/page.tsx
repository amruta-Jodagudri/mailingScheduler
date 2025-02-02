import MailingScheduler from "@/component/MailingScheduler"

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl glass-effect p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-primary">Mailing Scheduler</h1>
        <MailingScheduler />
      </div>
    </main>
  )
}

