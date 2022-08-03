import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import {
  Await,
  Link,
  useCatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { Suspense } from "react";
import invariant from "tiny-invariant";
import { ErrorFallback, InvoiceDetailsFallback } from "~/components";
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
  const customerInfo = await getCustomerInfo(customerId);
  if (!customerInfo) {
    throw new Response("not found", { status: 404 });
  }
  const customerDetailsPromise = getCustomerDetails(customerId);
  return defer({
    customerInfo,
    customerDetails: customerDetailsPromise,
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
      <Suspense fallback={<InvoiceDetailsFallback />}>
        <Await
          resolve={data.customerDetails}
          errorElement={
            <div className="relative h-full">
              <ErrorFallback />
            </div>
          }
        >
          {(customerDetails) => (
            <table className="w-full">
              <tbody>
                {customerDetails?.invoiceDetails.map((details) => (
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
          )}
        </Await>
      </Suspense>
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
