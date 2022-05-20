import { Form, useActionData } from "@remix-run/react";
import {
  inputClasses,
  LabelText,
  MinusIcon,
  PlusIcon,
  submitButtonClasses,
} from "~/components";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { requireUser } from "~/session.server";
import invariant from "tiny-invariant";
import { useId, useState } from "react";
import type { LineItemFields } from "~/models/invoice.server";
import { createInvoice } from "~/models/invoice.server";
import { parseDate } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json({});
};

type ActionData = {
  errors: {
    customerId: string | null;
    dueDate: string | null;
    lineItems: Record<
      string,
      {
        quantity: string | null;
        unitPrice: string | null;
      }
    >;
  };
};

function validateCustomerId(customerId: string) {
  // the database won't let us create an invoice without a customer
  // so all we need to do is make sure this is not an empty string
  return customerId === "" ? "Please select a customer" : null;
}

function validateDueDate(date: Date) {
  if (Number.isNaN(date.getTime())) {
    return "Please enter a valid date";
  }
  return null;
}

function validateLineItemQuantity(quantity: number) {
  if (quantity <= 0) return "Must be greater than 0";
  if (Number(quantity.toFixed(0)) !== quantity) {
    return "Fractional quantities are not allowed";
  }
  return null;
}

function validateLineItemUnitPrice(unitPrice: number) {
  if (unitPrice <= 0) return "Must be greater than 0";
  if (Number(unitPrice.toFixed(2)) !== unitPrice) {
    return "Must only have two decimal places";
  }
  return null;
}

export const action: ActionFunction = async ({ request }) => {
  await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "create": {
      const customerId = formData.get("customerId");
      const dueDateString = formData.get("dueDate");
      invariant(typeof customerId === "string", "customerId is required");
      invariant(typeof dueDateString === "string", "dueDate is required");
      const dueDate = parseDate(dueDateString);

      const lineItemIds = formData.getAll("lineItemId");
      const lineItemQuantities = formData.getAll("quantity");
      const lineItemUnitPrices = formData.getAll("unitPrice");
      const lineItemDescriptions = formData.getAll("description");
      const lineItems: Array<LineItemFields> = [];
      for (let i = 0; i < lineItemQuantities.length; i++) {
        const quantity = +lineItemQuantities[i];
        const unitPrice = +lineItemUnitPrices[i];
        const description = lineItemDescriptions[i];
        invariant(typeof quantity === "number", "quantity is required");
        invariant(typeof unitPrice === "number", "unitPrice is required");
        invariant(typeof description === "string", "description is required");

        lineItems.push({ quantity, unitPrice, description });
      }

      const errors: ActionData["errors"] = {
        customerId: validateCustomerId(customerId),
        dueDate: validateDueDate(dueDate),
        lineItems: lineItems.reduce((acc, lineItem, index) => {
          const id = lineItemIds[index];
          invariant(typeof id === "string", "lineItem ids are required");
          acc[id] = {
            quantity: validateLineItemQuantity(lineItem.quantity),
            unitPrice: validateLineItemUnitPrice(lineItem.unitPrice),
          };
          return acc;
        }, {} as ActionData["errors"]["lineItems"]),
      };

      const customerIdHasError = errors.customerId !== null;
      const dueDateHasError = errors.dueDate !== null;
      const lineItemsHaveErrors = Object.values(errors.lineItems).some(
        (lineItem) => Object.values(lineItem).some(Boolean)
      );
      const hasErrors =
        dueDateHasError || customerIdHasError || lineItemsHaveErrors;
      if (hasErrors) {
        return json<ActionData>({ errors });
      }

      const invoice = await createInvoice({ dueDate, customerId, lineItems });

      return redirect(`/sales/invoices/${invoice.id}`);
    }
  }
  return new Response(`Unsupported intent: ${intent}`, { status: 400 });
};

export default function NewInvoice() {
  const actionData = useActionData() as ActionData | undefined;
  return (
    <div className="relative p-10">
      <h2 className="mb-4 font-display">New Invoice</h2>
      <Form method="post" className="flex flex-col gap-4">
        {/* 💿 Render the CustomerCombobox here */}
        <div>
          <div className="flex flex-wrap items-center gap-1">
            <label htmlFor="dueDate">
              <LabelText>Due Date</LabelText>
            </label>
            {actionData?.errors.dueDate ? (
              <em id="dueDate-error" className="text-d-p-xs text-red-600">
                {actionData.errors.dueDate}
              </em>
            ) : null}
          </div>
          <input
            id="dueDate"
            name="dueDate"
            className={inputClasses}
            type="date"
            aria-invalid={Boolean(actionData?.errors.dueDate) || undefined}
            aria-errormessage={
              actionData?.errors.dueDate ? "dueDate-error" : undefined
            }
          />
        </div>
        <LineItems />
        <div>
          <button
            type="submit"
            name="intent"
            value="create"
            className={submitButtonClasses}
          >
            Create Invoice
          </button>
        </div>
      </Form>
    </div>
  );
}

const generateRandomId = () => Math.random().toString(32).slice(2);

function LineItems() {
  const firstId = useId();
  const [lineItems, setLineItems] = useState(() => [firstId]);
  return (
    <div className="flex flex-col gap-2">
      {lineItems.map((lineItemClientId, index) => (
        <LineItemFormFields
          key={lineItemClientId}
          lineItemClientId={lineItemClientId}
          index={index}
          onRemoveClick={() => {
            setLineItems((lis) =>
              lis.filter((id, i) => id !== lineItemClientId)
            );
          }}
        />
      ))}
      <div className="mt-3 text-right">
        <button
          title="Add Line Item"
          type="button"
          onClick={() => setLineItems((lis) => [...lis, generateRandomId()])}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

function LineItemFormFields({
  lineItemClientId,
  index,
  onRemoveClick,
}: {
  lineItemClientId: string;
  index: number;
  onRemoveClick: () => void;
}) {
  const actionData = useActionData() as ActionData | undefined;
  const errors = actionData?.errors.lineItems[lineItemClientId];
  return (
    <fieldset key={lineItemClientId} className="border-b-2 py-2">
      <div className="flex gap-2">
        <button type="button" title="Remove Line Item" onClick={onRemoveClick}>
          <MinusIcon />
        </button>
        <legend>Line Item {index + 1}</legend>
      </div>
      <input value={lineItemClientId} name="lineItemId" type="hidden" />
      <div className="flex flex-col gap-1">
        <div className="flex w-full gap-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1">
              <LabelText>
                <label htmlFor={`quantity-${lineItemClientId}`}>
                  Quantity:
                </label>
              </LabelText>
              {errors?.quantity ? (
                <em id="quantity-error" className="text-d-p-xs text-red-600">
                  {errors.quantity}
                </em>
              ) : null}
            </div>
            <input
              id={`quantity-${lineItemClientId}`}
              name="quantity"
              type="number"
              className={inputClasses}
              aria-invalid={Boolean(errors?.quantity) || undefined}
              aria-errormessage={errors?.quantity ? "name-error" : undefined}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1">
              <LabelText>
                <label htmlFor={`unitPrice-${lineItemClientId}`}>
                  Unit Price:
                </label>
              </LabelText>
              {errors?.unitPrice ? (
                <em id="unitPrice-error" className="text-d-p-xs text-red-600">
                  {errors.unitPrice}
                </em>
              ) : null}
            </div>
            <input
              id={`unitPrice-${lineItemClientId}`}
              name="unitPrice"
              type="number"
              min="1"
              step="any"
              className={inputClasses}
              aria-invalid={Boolean(errors?.unitPrice) || undefined}
              aria-errormessage={errors?.unitPrice ? "name-error" : undefined}
            />
          </div>
        </div>
        <div>
          <LabelText>
            <label htmlFor={`description-${lineItemClientId}`}>
              Description:
            </label>
          </LabelText>
          <input
            id={`description-${lineItemClientId}`}
            name="description"
            className={inputClasses}
          />
        </div>
      </div>
    </fieldset>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="absolute inset-0 flex justify-center bg-red-100 pt-4">
      <div className="text-center text-red-brand">
        <div className="text-[14px] font-bold">Oh snap!</div>
        <div className="px-2 text-[12px]">There was a problem. Sorry.</div>
      </div>
    </div>
  );
}
