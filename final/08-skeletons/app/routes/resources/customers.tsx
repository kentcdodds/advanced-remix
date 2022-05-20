import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { useId, useState } from "react";
import invariant from "tiny-invariant";
import { LabelText } from "~/components";
import { searchCustomers } from "~/models/customer.server";
import { requireUser } from "~/session.server";

type CustomerSearchResult = {
  customers: Awaited<ReturnType<typeof searchCustomers>>;
};

export const action: ActionFunction = async ({ request }) => {
  await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "customer-search": {
      const query = formData.get("query");
      invariant(typeof query === "string", "query is required");
      return json<CustomerSearchResult>({
        customers: await searchCustomers(query),
      });
    }
    default: {
      return json({ error: `Unsupported intent: ${intent}` });
    }
  }
};

type Customer = CustomerSearchResult["customers"][number];

export function CustomerCombobox({ error }: { error?: string | null }) {
  const customerFetcher = useFetcher();
  const id = useId();
  const customers =
    (customerFetcher.data as CustomerSearchResult | null)?.customers ?? [];
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | null | undefined
  >(null);

  // sorry Ryan. I was going to use @reach/combobox, but ran into this issue:
  // https://github.com/reach/reach-ui/pull/628
  const cb = useCombobox<Customer>({
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedCustomer(selectedItem);
    },
    items: customers,
    itemToString: (item) => (item ? item.name : ""),
    onInputValueChange: (changes) => {
      if (!changes.inputValue) return;

      customerFetcher.submit(
        {
          intent: "customer-search",
          query: changes.inputValue,
        },
        { method: "post", action: "/resources/customers" }
      );
    },
  });

  const displayMenu = cb.isOpen && customers.length > 0;

  return (
    <div className="relative">
      <input
        name="customerId"
        type="hidden"
        value={selectedCustomer?.id ?? ""}
      />
      <div className="flex flex-wrap items-center gap-1">
        <label {...cb.getLabelProps()}>
          <LabelText>Customer</LabelText>
        </label>
        {error ? (
          <em id="customer-error" className="text-d-p-xs text-red-600">
            {error}
          </em>
        ) : null}
      </div>
      <div {...cb.getComboboxProps()}>
        <input
          {...cb.getInputProps({
            className: clsx("text-lg w-full border border-gray-500 px-2 py-1", {
              "rounded-t rounded-b-0": displayMenu,
              rounded: !displayMenu,
            }),
            "aria-invalid": Boolean(error) || undefined,
            "aria-errormessage": error ? "customer-error" : undefined,
          })}
        />
      </div>
      <ul
        {...cb.getMenuProps({
          className: clsx(
            "absolute z-10 bg-white shadow-lg rounded-b w-full border border-t-0 border-gray-500 max-h-[180px] overflow-scroll",
            { hidden: !displayMenu }
          ),
        })}
      >
        {cb.isOpen
          ? customers.map((customer, index) => (
              <li
                className={clsx("cursor-pointer py-1 px-2", {
                  "bg-green-200": cb.highlightedIndex === index,
                })}
                key={customer.id}
                {...cb.getItemProps({ item: customer, index })}
              >
                {customer.name} ({customer.email})
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
