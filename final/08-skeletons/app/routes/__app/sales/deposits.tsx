import * as React from "react";
import { Link, useLoaderData, useOutlet, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { CevronDownIcon } from "~/components";
import { getDepositListItems } from "~/models/deposit.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";
import clsx from "clsx";

type LoaderData = {
  deposits: Awaited<ReturnType<typeof getDepositListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json<LoaderData>({
    deposits: await getDepositListItems(),
  });
};

export default function Deposits() {
  const data = useLoaderData() as LoaderData;
  const outlet = useOutlet();
  const { depositId } = useParams();
  const depositNotFound =
    depositId && data.deposits.every((d) => d.id !== depositId);
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {depositNotFound ? (
        <div className="p-12 text-red-500">
          No deposit found with the ID of "{depositId}"
        </div>
      ) : null}
      <table className="w-full">
        <thead className="border-b-2 border-gray-200">
          <tr>
            <th className="border border-gray-100 py-2 px-4"></th>
            <th className="border border-gray-100 py-2 px-4">Date</th>
            <th className="border border-gray-100 py-2 px-4">Invoice</th>
            <th className="border border-gray-100 py-2 px-4">Customer</th>
            <th className="border border-gray-100 py-2 px-4">Amount</th>
          </tr>
        </thead>
        <tbody className="max-h-[100px]">
          {data.deposits.map((d) => (
            <React.Fragment key={d.id}>
              <tr>
                <td className="border border-gray-100 py-2 px-4">
                  <Link
                    to={d.id === depositId ? "." : d.id}
                    className="flex justify-center"
                  >
                    <CevronDownIcon
                      className={clsx({
                        "-rotate-90": d.id === depositId,
                      })}
                    />
                  </Link>
                </td>
                <td className="border border-gray-100 py-2 px-4">
                  {d.depositDateFormatted}
                </td>
                <td className="border border-gray-100 py-2 px-4">
                  <Link
                    className="text-blue-600 underline"
                    to={`../invoices/${d.invoice.id}`}
                  >
                    {d.invoice.number}
                  </Link>
                </td>
                <td className="border border-gray-100 py-2 px-4">
                  <Link
                    className="text-blue-600 underline"
                    to={`../customers/${d.invoice.customer.id}`}
                  >
                    {d.invoice.customer.name}
                  </Link>
                </td>
                <td className="border border-gray-100 py-2 px-4">
                  {currencyFormatter.format(d.amount)}
                </td>
              </tr>
              {d.id === depositId ? (
                <tr>
                  <td colSpan={5}>{outlet}</td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
