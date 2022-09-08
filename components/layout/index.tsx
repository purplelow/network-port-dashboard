import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { cls } from "@libs/utils";
import { BsHouseDoor } from "react-icons/bs";
import { FiSettings, FiMonitor } from "react-icons/fi";
import { FaLanguage } from "react-icons/fa";

interface LayoutProps {
  title?: string;
  transLang?: boolean;
  deviceReboot?: boolean;
  children: React.ReactNode;
}

// const dashboardIco = <i className="fa-solid fa-house"></i>;
// const settingIco = <i className="fa-solid fa-gear"></i>;
// const managementIco = <i className="fa-solid fa-desktop"></i>;

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
  };
  const manageHightlight = () => {
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
  };
  const subTitleIco = () => {
    let result;
    switch (router.pathname) {
      case "/":
        result = <BsHouseDoor className="mr-1 text-xl" />;
        break;
      case "/settings/deviceSetting":
        result = <FiSettings className="mr-1 text-lg" />;
        break;
      case "/settings/portSetting":
        result = <FiSettings className="btext-lg mr-1" />;
        break;
      case "/management/history":
        result = <FiMonitor className="mr-1 text-lg" />;
        break;
      case "/management/systemManage":
        result = <FiMonitor className="mr-1 text-lg" />;
        break;
      default:
        result = "";
    }
    return result;
  };

  return (
    <div className="flex h-screen w-screen">
      <nav className="fixed top-0 left-0 z-10 h-screen w-[200px] bg-white shadow-md">
        <div className="mx-auto my-5 h-11 w-[140px] bg-logo bg-contain bg-center bg-no-repeat"></div>
        <Link href="/">
          <a
            className={cls(
              "flex w-full items-center py-3 px-6 text-sm",
              router.pathname === "/"
                ? "bg-blue-800 text-white"
                : "transition-colors hover:text-blue-600"
            )}
          >
            <BsHouseDoor className="text-2xl" />
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
            <FiSettings className="text-2xl" />
            <span className="h-full w-full cursor-default pl-3">설정</span>
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
            className={cls(
              "flex w-full items-center py-3 px-6 text-sm",
              manageHightlight()
            )}
          >
            <FiMonitor className="text-2xl" />
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
      <div className="h-full w-screen pl-[200px]">
        <div className="flex max-h-[56px] items-center justify-between px-4">
          <div className="">
            {title ? (
              <div className="flex items-center justify-center space-x-1">
                {subTitleIco()}
                <span className="text-xl font-semibold">{title}</span>
              </div>
            ) : null}
          </div>
          <button className="h-full">
            <FaLanguage className="text-5xl" />
          </button>
        </div>

        <div className="h-[calc(100%-50px)] w-full px-4 pb-4 ">{children}</div>
      </div>
    </div>
  );
}
