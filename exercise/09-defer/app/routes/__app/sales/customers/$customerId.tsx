import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ErrorFallback } from "~/components";
import { getCustomerDetails, getCustomerInfo } from "~/models/customer.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);
  const { customerId } = params;
  invariant(
    typeof customerId === "string",
    "params.customerId is not available",
  );
  // The customerDetails are slow, so let's defer that.
  // 🐨 Change this from a Promise.all to two separate calls
  // 🐨 Await the customer info, and not the customer details (so the value of customerDetails will be a promise).
  const [customerInfo, customerDetails] = await Promise.all([
    getCustomerInfo(customerId),
    getCustomerDetails(customerId),
  ]);
  // 🐨 we no longer can determine at this stage whether or not there are
  // `customerDetails`, so remove that from this if statement
  if (!customerDetails || !customerInfo) {
    throw new Response("not found", { status: 404 });
  }
  // 🐨 change this from "json" to "defer" (from @remix-run/node)
  return json({
    customerInfo,
    customerDetails, // this should be assigned to a promise
  });
}

const lineItemClassName = "border-t border-gray-100 text-[14px] h-[56px]";

export default function CustomerRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        {data.customerInfo.email}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {data.customerInfo.name}
      </div>
      <div className="h-4" />
      <div className="text-m-h3 font-bold leading-8">Invoices</div>
      <div className="h-4" />
      {/*
        🐨 Wrap this in <Suspense><Await /></Suspense> components with:
        - Suspense "fallback" prop should be <InvoiceDetailsFallback /> (imported from "~/components")
        - Await "resolve" prop as data.invoiceDetails
        - Await "errorElement" prop can be the ErrorFallback component (imported from "~/components")
      */}
      <table className="w-full">
        <tbody>
          {data.customerDetails.invoiceDetails.map((details) => (
            <tr key={details.id} className={lineItemClassName}>
              <td>
                <Link
                  className="text-blue-600 underline"
                  to={`../../invoices/${details.id}`}
                >
                  {details.number}
                </Link>
              </td>
              <td
                className={
                  "text-center uppercase" +
                  " " +
                  (details.dueStatus === "paid"
                    ? "text-green-brand"
                    : details.dueStatus === "overdue"
                    ? "text-red-brand"
                    : "")
                }
              >
                {details.dueStatusDisplay}
              </td>
              <td className="text-right">
                {currencyFormatter.format(details.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return (
      <div className="relative h-full">
        <ErrorFallback
          message={`No customer found with the ID of "${params.customerId}"`}
        />
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
