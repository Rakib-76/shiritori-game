

import Link from "next/link";
import React from "react";
import { auth } from "@/auth"; // server-side auth helper
// import { signOut } from "next-auth/react"; // client-side signout
import Logout from "./Logout";

export default async function Navbar() {
  // Get session from NextAuth
  const session = await auth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link href="/">
              <li>
                <a>Home</a>
              </li>
            </Link>
            <Link href="/about">
              <li>
                <a>About</a>
              </li>
            </Link>
            <Link href="/shiritoriGame">
              <li>
                <a>Game</a>
              </li>
            </Link>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Shiritori</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link href="/">
            <li>
              <a>Home</a>
            </li>
          </Link>
          <Link href="/about">
            <li>
              <a>About</a>
            </li>
          </Link>
          <Link href="/shiritoriGame">
            <li>
              <a>Game</a>
            </li>
          </Link>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {session?.user ? (
          <>
            {/* Show user info */}
            <span className="hidden md:flex items-center gap-2">
              <image
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{session.user.name}</span>
            </span>

            {/* Sign Out button */}
            <div>
              <Logout/>
            </div>
          </>
        ) : (
          // Sign In button
          <Link href="/login">
            <button className="btn">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
}
