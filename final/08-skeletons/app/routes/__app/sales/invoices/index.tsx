import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getFirstInvoice } from "~/models/invoice.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  const firstInvoice = await getFirstInvoice();
  if (!firstInvoice) {
    return json({});
  }
  return redirect(`/sales/invoices/${firstInvoice.id}`);
};

export default function InvoiceIndex() {
  return <div className="p-10">You don't have any invoices 😭</div>;
}
