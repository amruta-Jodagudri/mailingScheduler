# Mailing Scheduler

This project is a mailing scheduling feature built with Next.js, allowing users to create and manage email campaigns.

## Features

- Create and schedule mailings
- View list of scheduled mailings
- Mock API for mailers, lists, and mailings

## Technologies Used

- Next.js 13+ with App Router
- React Server Components
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Zod for schema validation
- Tanstack Query (React Query)
- date-fns
- react-datepicker

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/amruta-jodagudri/mailingScheduler.git
   cd Mail_Scheduler
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application pages and API routes
- `components/`: React components used in the application
- `public/`: Static assets

## API Routes

- `/api/mailers`: GET - Fetch list of mailers
- `/api/lists`: GET - Fetch list of mailing lists
- `/api/mailings`: GET - Fetch scheduled mailings, POST - Create a new mailing

## Deployment

To deploy this project, you can use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.