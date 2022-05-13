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

const dashboardIco = <i className="fa-solid fa-house"></i>;
const settingIco = <i className="fa-solid fa-gear"></i>;
const managementIco = <i className="fa-solid fa-desktop"></i>;

export default function Layout({
  title,
  transLang,
  deviceReboot,
  children,
}: LayoutProps) {
  const router = useRouter();

  const setHightlight = () => {
    let result;
    switch (router.pathname) {
      case "/settings/devicesetting":
        result = "bg-blue-800 text-white";
        break;
      case "/settings/portsetting":
        result = "bg-blue-800 text-white";
        break;
      default:
        result = "transition-colors hover:text-blue-800";
    }
    return result;
  };
  const manageHightlight = () => {
    let result;
    switch (router.pathname) {
      case "/management/history":
        result = "bg-blue-800 text-white";
        break;
      case "/management/systemmanage":
        result = "bg-blue-800 text-white";
        break;
      default:
        result = "transition-colors hover:text-blue-800";
    }
    return result;
  };
  const subTitleIco = () => {
    let result;
    switch (router.pathname) {
      case "/":
        result = dashboardIco;
        break;
      case "/settings/devicesetting":
        result = settingIco;
        break;
      case "/settings/portsetting":
        result = settingIco;
        break;
      case "/management/history":
        result = managementIco;
        break;
      case "/management/systemmanage":
        result = managementIco;
        break;
      default:
        result = "";
    }
    return result;
  };

  return (
    <div className="flex w-screen">
      <nav className="fixed top-0 left-0 z-50 h-screen w-[200px] bg-white shadow-sm">
        <div className="m-auto h-20 w-[140px] bg-logo bg-contain bg-center bg-no-repeat"></div>
        <Link href="/">
          <a
            className={cls(
              "flex w-full items-center py-3 px-6 text-sm",
              router.pathname === "/"
                ? "bg-blue-800 text-white"
                : "transition-colors hover:text-blue-600"
            )}
          >
            {dashboardIco}
            <span className="h-full w-full pl-3">대시보드</span>
          </a>
        </Link>

        <div>
          <div
            className={cls(
              "flex w-full items-center py-3 px-6 text-sm",
              setHightlight()
            )}
          >
            {settingIco}
            <span className="h-full w-full cursor-default pl-3">설정</span>
          </div>

          <Link href="/settings/devicesetting">
            <a
              className={cls(
                "flex w-full p-1.5",
                router.pathname === "/settings/devicesetting"
                  ? "font-semibold text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/settings/devicesetting"
                      ? "opacity-100"
                      : ""
                  )}
                ></span>
                장비 기본 설정
              </span>
            </a>
          </Link>
          <Link href="/settings/portsetting">
            <a
              className={cls(
                "mb-2 flex w-full p-1.5",
                router.pathname === "/settings/portsetting"
                  ? "text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/settings/portsetting"
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
            className={cls(
              "flex w-full items-center py-3 px-6 text-sm",
              manageHightlight()
            )}
          >
            {managementIco}
            <span className="h-full w-full cursor-default pl-3">관리</span>
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
                히스토리
              </span>
            </a>
          </Link>
          <Link href="/management/systemmanage">
            <a
              className={cls(
                "mb-2 flex w-full p-1.5",
                router.pathname === "/management/systemmanage"
                  ? "text-blue-600"
                  : "transition-colors hover:text-blue-600"
              )}
            >
              <span className="flex items-center justify-center pl-10 text-sm">
                <span
                  className={cls(
                    "mr-2 flex h-4 w-1.5 bg-blue-800 opacity-0 transition",
                    router.pathname === "/management/systemmanage"
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
      <div className="h-screen w-screen pl-48">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="">
            {title ? (
              <div className="flex items-center justify-center space-x-1">
                {subTitleIco()}
                <span className="text-xl font-semibold">{title}</span>
              </div>
            ) : null}
          </div>
          <div className="space-x-4">
            <button>
              <i className="fa-solid fa-language text-3xl"></i>
            </button>
          </div>
        </div>

        <div className="h-[calc(100%-56px)] w-full px-4 pb-4 ">{children}</div>
      </div>
    </div>
  );
}
