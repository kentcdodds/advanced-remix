import { Outlet } from "@remix-run/react";
import { FilePlusIcon, LabelText } from "~/components";

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import { getInvoiceListItems } from "~/models/invoice.server";
import { currencyFormatter } from "~/utils";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  const invoiceListItems = await getInvoiceListItems();
  const dueSoonAmount = invoiceListItems.reduce((sum, li) => {
    if (li.dueStatus !== "due") {
      return sum;
    }
    const remainingBalance = li.totalAmount - li.totalDeposits;
    return sum + remainingBalance;
  }, 0);
  const overdueAmount = invoiceListItems.reduce((sum, li) => {
    if (li.dueStatus !== "overdue") {
      return sum;
    }
    const remainingBalance = li.totalAmount - li.totalDeposits;
    return sum + remainingBalance;
  }, 0);
  return json({
    invoiceListItems,
    overdueAmount,
    dueSoonAmount,
  });
}

export default function InvoicesRoute() {
  const data = useLoaderData<typeof loader>();
  const hundo = data.dueSoonAmount + data.overdueAmount;
  const dueSoonPercent = Math.floor((data.dueSoonAmount / hundo) * 100);
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <InvoicesInfo label="Overdue" amount={data.overdueAmount} />
        <div className="flex h-4 flex-1 overflow-hidden rounded-full">
          <div className="flex-1 bg-yellow-brand" />
          <div
            className="bg-green-brand"
            style={{ width: `${dueSoonPercent}%` }}
          />
        </div>
        <InvoicesInfo label="Due Soon" amount={data.dueSoonAmount} right />
      </div>
      <div className="h-4" />
      <LabelText>Invoice List</LabelText>
      <div className="h-2" />
      <InvoiceList>
        <Outlet />
      </InvoiceList>
    </div>
  );
}

function InvoicesInfo({
  label,
  amount,
  right,
}: {
  label: string;
  amount: number;
  right?: boolean;
}) {
  return (
    <div className={right ? "text-right" : ""}>
      <LabelText>{label}</LabelText>
      <div className="text-[length:18px] text-black">
        {currencyFormatter.format(amount)}
      </div>
    </div>
  );
}

function InvoiceList({ children }: { children: React.ReactNode }) {
  const { invoiceListItems } = useLoaderData<typeof loader>();
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-100">
      <div className="w-1/2 border-r border-gray-100">
        <NavLink
          to="new"
          prefetch="intent"
          className={({ isActive }) =>
            "block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50" +
            " " +
            (isActive ? "bg-gray-50" : "")
          }
        >
          <span className="flex gap-1">
            <FilePlusIcon /> <span>Create new invoice</span>
          </span>
        </NavLink>
        <div className="max-h-96 overflow-y-scroll">
          {invoiceListItems.map((invoice) => (
            <NavLink
              key={invoice.id}
              to={invoice.id}
              prefetch="intent"
              className={({ isActive }) =>
                "block border-b border-gray-50 py-3 px-4 hover:bg-gray-50" +
                " " +
                (isActive ? "bg-gray-50" : "")
              }
            >
              <div className="flex justify-between text-[length:14px] font-bold leading-6">
                <div>{invoice.name}</div>
                <div>{currencyFormatter.format(invoice.totalAmount)}</div>
              </div>
              <div className="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
                <div>{invoice.number}</div>
                <div
                  className={
                    "uppercase" +
                    " " +
                    (invoice.dueStatus === "paid"
                      ? "text-green-brand"
                      : invoice.dueStatus === "overdue"
                      ? "text-red-brand"
                      : "")
                  }
                >
                  {invoice.dueStatusDisplay}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}
