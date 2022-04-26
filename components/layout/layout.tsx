import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { cls } from "../../lib/utils";

interface LayoutProps {
  title?: string;
  transLang?: boolean;
  deviceReboot?: boolean;
  children: React.ReactNode;
}

const dashboardIco = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const settingIco = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const managementIco = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export default function Layout({
  title,
  transLang,
  deviceReboot,
  children,
}: LayoutProps) {
  const router = useRouter();
  console.log(router);
  // const onClick = () => {
  //   router.back();
  // };

  function setHightlight() {
    let result;
    switch (router.pathname) {
      case "/settings/deviceSetting":
        result = "bg-blue-800 text-white";
        break;
      case "/settings/portSetting":
        result = "bg-blue-800 text-white";
        break;
      default:
        result = "transition-colors hover:text-blue-800";
    }
    return result;
  }
  function manageHightlight() {
    let result;
    switch (router.pathname) {
      case "/management/history":
        result = "bg-blue-800 text-white";
        break;
      case "/management/systemManage":
        result = "bg-blue-800 text-white";
        break;
      default:
        result = "transition-colors hover:text-blue-800";
    }
    return result;
  }
  function subTitleIco() {
    let result;
    switch (router.pathname) {
      case "/":
        result = dashboardIco;
        break;
      case "/settings/deviceSetting":
        result = settingIco;
        break;
      case "/settings/portSetting":
        result = settingIco;
        break;
      case "/management/history":
        result = managementIco;
        break;
      case "/management/systemManage":
        result = managementIco;
        break;
      default:
        result = "";
    }
    return result;
  }

  return (
    <>
      <nav className="fixed top-0 h-full w-52 border-r bg-white shadow-sm">
        <div className="m-auto h-20 w-3/4 bg-logo bg-contain bg-center bg-no-repeat"></div>
        <Link href="/">
          <a
            className={cls(
              "flex w-full items-center p-3",
              router.pathname === "/"
                ? "bg-blue-800 text-white"
                : "transition-colors hover:text-gray-500"
            )}
          >
            {dashboardIco}
            <span className="h-full w-full pl-3">Dashboard</span>
          </a>
        </Link>

        <div>
          <div className={cls("flex w-full items-center p-3", setHightlight())}>
            {settingIco}
            <span className="h-full w-full pl-3">Settings</span>
          </div>

          <Link href="/settings/deviceSetting">
            <a
              className={cls(
                "flex w-full p-1.5",
                router.pathname === "/settings/deviceSetting"
                  ? "font-semibold text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/settings/deviceSetting"
                      ? "opacity-100"
                      : ""
                  )}
                ></span>
                장비 기본 설정
              </span>
            </a>
          </Link>
          <Link href="/settings/portSetting">
            <a
              className={cls(
                "mb-2 flex w-full p-1.5",
                router.pathname === "/settings/portSetting"
                  ? "text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/settings/portSetting"
                      ? "opacity-100"
                      : ""
                  )}
                ></span>
                포트 설정
              </span>
            </a>
          </Link>
        </div>
        <div>
          <div
            className={cls("flex w-full items-center p-3", manageHightlight())}
          >
            {managementIco}
            <span className="h-full w-full pl-3">Management</span>
          </div>

          <Link href="/management/history">
            <a
              className={cls(
                "flex w-full p-1.5",
                router.pathname === "/management/history"
                  ? "font-semibold text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/management/history"
                      ? "opacity-100"
                      : ""
                  )}
                ></span>
                History
              </span>
            </a>
          </Link>
          <Link href="/management/systemManage">
            <a
              className={cls(
                "mb-2 flex w-full p-1.5",
                router.pathname === "/management/systemManage"
                  ? "text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/management/systemManage"
                      ? "opacity-100"
                      : ""
                  )}
                ></span>
                시스템 관리
              </span>
            </a>
          </Link>
        </div>
      </nav>
      <div className="h-full ">
        <div className="flex h-14 items-center justify-between pl-56 pr-4">
          <div className="flex ">
            {title ? (
              <div className="flex items-center justify-center space-x-1">
                {subTitleIco()}
                <span className="text-2xl font-semibold">{title}</span>
              </div>
            ) : null}
          </div>
          <div className="space-x-4">
            <button>
              <i className="fa-solid fa-language text-3xl"></i>
            </button>
            <button>
              <i className="fa-solid fa-power-off text-3xl"></i>
            </button>
          </div>
        </div>

        <div className="h-full pl-56 pr-4 pb-4">{children}</div>
      </div>
    </>
  );
}
