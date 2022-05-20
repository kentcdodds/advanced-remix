import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return json({});
};

export default function DashboardRoute() {
  return <div>Look at all these graphs!</div>;
}
