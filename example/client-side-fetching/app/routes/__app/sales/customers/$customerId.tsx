import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { InvoiceDetailsFallback } from "~/components";
import { getCustomerDetails, getCustomerInfo } from "~/models/customer.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";

type CustomerDetails = NonNullable<
  Awaited<ReturnType<typeof getCustomerDetails>>
>;

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);

  const { customerId } = params;
  invariant(
    typeof customerId === "string",
    "params.customerId is not available",
  );
  if (new URL(request.url).searchParams.get("invoiceDetails")) {
    return json({
      customerDetails: await getCustomerDetails(customerId),
    });
  }

  const customerInfo = await getCustomerInfo(customerId);
  if (!customerInfo) {
    throw new Response("not found", { status: 404 });
  }

  return json({
    customerInfo,
  });
}

const lineItemClassName = "border-t border-gray-100 text-[14px] h-[56px]";

export default function CustomerRoute() {
  const data = useLoaderData<typeof loader>();
  if (!("customerInfo" in data)) {
    throw new Error("customerInfo is not available");
  }
  const params = useParams();
  const { load: loadInvoiceDetails, ...invoiceDetailsFetcher } = useFetcher();

  useEffect(() => {
    loadInvoiceDetails(
      `/sales/customers/${params.customerId}?invoiceDetails=true`,
    );
  }, [loadInvoiceDetails, params.customerId]);

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
      {invoiceDetailsFetcher.state === "idle" && invoiceDetailsFetcher.data ? (
        <table className="w-full">
          <tbody>
            {(
              invoiceDetailsFetcher.data.customerDetails as CustomerDetails
            ).invoiceDetails.map((invoiceDetails) => (
              <tr key={invoiceDetails.id} className={lineItemClassName}>
                <td>
                  <Link
                    className="text-blue-600 underline"
                    to={`../../invoices/${invoiceDetails.id}`}
                  >
                    {invoiceDetails.number}
                  </Link>
                </td>
                <td
                  className={
                    "text-center uppercase" +
                    " " +
                    (invoiceDetails.dueStatus === "paid"
                      ? "text-green-brand"
                      : invoiceDetails.dueStatus === "overdue"
                      ? "text-red-brand"
                      : "")
                  }
                >
                  {invoiceDetails.dueStatusDisplay}
                </td>
                <td className="text-right">
                  {currencyFormatter.format(invoiceDetails.totalAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <InvoiceDetailsFallback />
      )}
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return (
      <div className="p-12 text-red-500">
        No customer found with the ID of "{params.customerId}"
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
