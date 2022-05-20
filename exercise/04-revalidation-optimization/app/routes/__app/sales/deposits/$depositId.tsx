import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { deleteDeposit, getDepositDetails } from "~/models/deposit.server";
import { requireUser } from "~/session.server";
import invariant from "tiny-invariant";
import { TrashIcon } from "~/components";

type LoaderData = {
  depositNote: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  const { depositId } = params;
  if (typeof depositId !== "string") {
    throw new Error("This should be unpossible.");
  }
  const depositDetails = await getDepositDetails(depositId);
  if (!depositDetails) {
    throw new Response("not found", { status: 404 });
  }

  return json<LoaderData>({
    depositNote: depositDetails.note,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { depositId } = params;
  if (typeof depositId !== "string") {
    throw new Error("This should be unpossible.");
  }
  const formData = await request.formData();
  const intent = formData.get("intent");
  invariant(typeof intent === "string", "intent must be a string");
  switch (intent) {
    case "delete": {
      await deleteDeposit(depositId);
      return redirect("/sales/deposits");
    }
    default: {
      throw new Error(`Unsupported intent: ${intent}`);
    }
  }
};

export default function DepositRoute() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="p-8">
      <div className="flex justify-between">
        {data.depositNote ? (
          <span>
            Note:
            <br />
            <span className="pl-1">{data.depositNote}</span>
          </span>
        ) : (
          <span className="text-m-p-sm uppercase text-gray-500 md:text-d-p-sm">
            No note
          </span>
        )}
        <div>
          <Form method="post">
            <button
              type="submit"
              title="Delete deposit"
              name="intent"
              value="delete"
            >
              <TrashIcon />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  // no outlet is rendered if it doesn't match a deposit in the UI
  // so this should never be called
  return null;
}
