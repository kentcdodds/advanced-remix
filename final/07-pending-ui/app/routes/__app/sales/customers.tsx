import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { FilePlusIcon } from "~/components";
import { requireUser } from "~/session.server";
import { getCustomerListItems } from "~/models/customer.server";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  return json({
    customers: await getCustomerListItems(),
  });
}

export default function Customers() {
  const { customers } = useLoaderData<typeof loader>();

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
            <FilePlusIcon /> <span>Create new customer</span>
          </span>
        </NavLink>
        <div className="max-h-96 overflow-y-scroll">
          {customers.map((customer) => (
            <NavLink
              key={customer.id}
              to={customer.id}
              prefetch="intent"
              className={({ isActive }) =>
                "block border-b border-gray-50 py-3 px-4 hover:bg-gray-50" +
                " " +
                (isActive ? "bg-gray-50" : "")
              }
            >
              <div className="flex justify-between text-[length:14px] font-bold leading-6">
                <div>{customer.name}</div>
              </div>
              <div className="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
                <div>{customer.email}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-between">
        <Outlet />
        <small className="p-2 text-center">
          Note: this is arbitrarily slow to demonstrate pending UI.
        </small>
      </div>
    </div>
  );
}
