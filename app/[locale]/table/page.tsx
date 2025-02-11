import { Payment, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      amount: 99.99,
      status: "pending",
      email: "alice.johnson@example.com"
    },
    {
      id: "87654321-1234-5678-9abc-def012345678",
      amount: 199.99,
      status: "pending",
      email: "bob.smith@example.com"
    },
    {
      id: "abcdef12-3456-7890-abcdef-1234567890ab",
      amount: 299.99,
      status: "failed",
      email: "charlie.brown@example.com"
    },
    {
      id: "fedcba98-7654-3210-fedcba-9876543210fe",
      amount: 399.99,
      status: "pending",
      email: "david.lee@example.com"
    },
    {
      id: "01234567-89ab-cdef-0123-456789abcdef0",
      amount: 499.99,
      status: "pending",
      email: "emily.wilson@example.com"
    },
    {
      id: "9abcdef01-2345-6789-abcdef-0123456789ab",
      amount: 599.99,
      status: "failed",
      email: "frank.taylor@example.com"
    },
    {
      id: "fedcba987-6543-210f-edcba9-876543210fed",
      amount: 699.99,
      status: "pending",
      email: "grace.miller@example.com"
    },
    {
      id: "01234567-89ab-cdef-0123-456789abcdef0",
      amount: 799.99,
      status: "pending",
      email: "henry.davis@example.com"
    },
    {
      id: "fedcba987-6543-210f-edcba9-876543210fed",
      amount: 899.99,
      status: "failed",
      email: "iris.wilson@example.com"
    },
    {
      id: "01234567-89ab-cdef-0123-456789abcdef0",
      amount: 999.99,
      status: "pending",
      email: "jack.smith@example.com"
    }
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 bg-white">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
