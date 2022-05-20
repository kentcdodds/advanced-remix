import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";
import { safeRedirect } from "~/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return logout(request, safeRedirect(formData.get("redirectTo"), "/"));
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
