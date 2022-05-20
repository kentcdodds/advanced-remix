import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json({});
};

export default function ExpensesRoute() {
  return <div>Hope you don't have a lot of these...</div>;
}
