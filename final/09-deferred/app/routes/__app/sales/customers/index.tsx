import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getFirstCustomer } from "~/models/customer.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  const firstCustomer = await getFirstCustomer();
  if (!firstCustomer) {
    return json({});
  }
  return redirect(`/sales/customers/${firstCustomer.id}`);
};

export default function InvoiceIndex() {
  return <div className="p-10">You don't have any customers 😭</div>;
}
