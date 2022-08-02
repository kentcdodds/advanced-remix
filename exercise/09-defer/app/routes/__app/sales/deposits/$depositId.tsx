import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { deleteDeposit, getDepositDetails } from "~/models/deposit.server";
import { requireUser } from "~/session.server";
import invariant from "tiny-invariant";
import { TrashIcon } from "~/components";

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);
  const { depositId } = params;
  if (typeof depositId !== "string") {
    throw new Error("This should be unpossible.");
  }
  const depositDetails = await getDepositDetails(depositId);
  if (!depositDetails) {
    throw new Response("not found", { status: 404 });
  }

  return json({
    depositNote: depositDetails.note,
  });
}

export async function action({ request, params }: ActionArgs) {
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
}

export default function DepositRoute() {
  const data = useLoaderData<typeof loader>();
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
          <span className="text-m-p-sm md:text-d-p-sm uppercase text-gray-500">
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
