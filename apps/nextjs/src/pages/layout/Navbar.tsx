import { useState } from "react";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Join",
    href: "#",
  },
];

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const showNav = () => {
    setToggle(!toggle);
  };

  // start mobile first plus facile
  return (
    <nav className="fixed top-0 flex w-full max-w-6xl items-center border-b border-b-stone-200 bg-white p-4">
      <div className="flex w-full flex-wrap items-center justify-between md:flex-nowrap">
        <h1 className="cursor-pointer text-xl font-bold text-black">Logo</h1>

        <button
          className="flex justify-end rounded ring-1 ring-black md:hidden"
          onClick={showNav}
        >
          <i className="fas fa-bars flex h-9 w-9 items-center justify-center text-white hover:text-black"></i>
        </button>

        <ul
          className={`${
            toggle ? "flex" : "hidden"
          } w-full flex-col items-center justify-center first:mt-2 md:flex md:w-auto md:flex-row md:space-x-10`}
        >
          {menuItems.map((link, index) => {
            return (
              <li
                key={index}
                className="flex w-full justify-center p-2.5 md:w-auto md:border-none md:p-0"
              >
                <Link
                  className="hover:text-sky-500"
                  href={link.href}
                  onClick={showNav}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className={`${
            toggle ? "flex" : "hidden"
          } mx-auto mt-4 w-24 items-center justify-center rounded-lg bg-black p-2 px-1 font-medium text-white hover:bg-gray-800 md:mx-0 md:mt-0 md:flex`}
        >
          Join
        </button>
      </div>
    </nav>
  );
}
