import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { inputClasses, LabelText, submitButtonClasses } from "~/components";
import { createCustomer } from "~/models/customer.server";
import { requireUser } from "~/session.server";

export async function action({ request }: ActionArgs) {
  await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "create": {
      const name = formData.get("name");
      const email = formData.get("email");
      invariant(typeof name === "string", "name is required");
      invariant(typeof email === "string", "email is required");

      const customer = await createCustomer({ name, email });

      return redirect(`/sales/customers/${customer.id}`);
    }
  }
  return new Response(`Unsupported intent: ${intent}`, { status: 400 });
}

export default function NewCustomer() {
  return (
    <div className="relative p-10">
      <h2 className="mb-4 font-display">New Customer</h2>
      <Form method="post" className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">
            <LabelText>Name</LabelText>
          </label>
          <input id="name" name="name" className={inputClasses} type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <LabelText>Email</LabelText>
          </label>
          <input
            id="email"
            name="email"
            className={inputClasses}
            type="email"
          />
        </div>

        <div>
          <button
            type="submit"
            name="intent"
            value="create"
            className={submitButtonClasses}
          >
            Create Customer
          </button>
        </div>
      </Form>
    </div>
  );
}
