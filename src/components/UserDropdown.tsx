import { createPopper } from "@popperjs/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface UserDropdownProps {
  onLogout: () => void;
}

const UserDropdown = ({ onLogout }: UserDropdownProps) => {
  const router = useRouter();

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<HTMLAnchorElement>();
  const popoverDropdownRef = React.createRef<HTMLDivElement>();


  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="block"
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full">
            <img
              alt="profile"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/images/profile.png"
            />
          </span>
        </div>
      </a>

      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "fixed " : "hidden ") +
          "bg-white text-base z-50 right-0 top-16 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          href="/login"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;
