import { appCookies } from "@/hooks/appCookies";
import usePostLogout from "@/hooks/usePostLogout";
import { createPopper } from "@popperjs/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const UserDropdown = () => {
  const router = useRouter();
  const { setCookie } = appCookies();

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

  const { mutate: postLogout } = usePostLogout({
    onSuccess(res) {
      setCookie({
        name: 'access_token',
        value: ''
      });
      router.replace('/login');
    },
  });


  return (
    <>
      <div
        className="fixed top-2 right-4 z-10"
        onClick={(e) => {
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
      </div>

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
            postLogout();
          }}
        >
          Logout
        </Link>
      </div>
    </>
  );
};
