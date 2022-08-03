import { Form, Link, NavLink, Outlet } from "@remix-run/react";
import clsx from "clsx";
import {
  FullFakebooksLogo,
  LogoutIcon,
  SpinnerIcon,
  UpRightArrowIcon,
} from "~/components";

export default function AppRoute() {
  // 🐨 add useTransition here.
  // 💯 add useSpinDelay (from 'spin-delay') here
  return (
    <div className="relative flex h-full rounded-lg bg-white text-gray-600">
      <div className="border-r border-gray-100 bg-gray-50">
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1">
            <Link to=".">
              <FullFakebooksLogo size="sm" position="left" />
            </Link>
            {/* 🐨 add the <Spinner /> here and show it when we're transitioning */}
          </div>
          <div className="h-7" />
          <div className="flex flex-col font-bold text-gray-800">
            <NavItem to="dashboard">Dashboard</NavItem>
            <NavItem to="accounts">Accounts</NavItem>
            <NavItem to="sales">Sales</NavItem>
            <NavItem to="expenses">Expenses</NavItem>
            <NavItem to="reports">Reports</NavItem>
            <a
              href="https://github.com/FrontendMasters/advanced-remix"
              className="my-1 flex gap-1 py-1 px-2 pr-16 text-[length:14px]"
            >
              GitHub <UpRightArrowIcon />
            </a>

            <Form
              method="post"
              action="/logout"
              className="my-1 py-1 px-2 pr-16 text-[length:14px]"
            >
              <button type="submit" className="flex gap-1 font-bold">
                Logout <LogoutIcon />
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      className={({ isActive }) =>
        `my-1 py-1 px-2 pr-16 text-[length:14px] ${
          isActive ? "rounded-md bg-gray-100" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Spinner({ visible }: { visible: boolean }) {
  return (
    <SpinnerIcon
      className={clsx("animate-spin transition-opacity", {
        "opacity-0": !visible,
        "opacity-100": visible,
      })}
    />
  );
}

/*
eslint
  @typescript-eslint/no-unused-vars: "off",
*/
