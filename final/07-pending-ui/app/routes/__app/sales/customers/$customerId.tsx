import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
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
  const [customerInfo, customerDetails] = await Promise.all([
    getCustomerInfo(customerId),
    getCustomerDetails(customerId),
  ]);
  if (!customerDetails || !customerInfo) {
    throw new Response("not found", { status: 404 });
  }
  return json({
    customerInfo,
    customerDetails,
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
      <table className="w-full">
        <tbody>
          {data.customerDetails.invoiceDetails.map((invoiceDetails) => (
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
