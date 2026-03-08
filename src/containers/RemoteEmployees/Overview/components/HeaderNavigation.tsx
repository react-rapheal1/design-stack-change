"use client";

import { useEffect, useRef, useState } from "react";
import { Bell02, Settings01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";
import { type NotificationItem, loadNotifications, markAllRead } from "@/utils/notification-store";
import { notificationIcons } from "../notificationIcons";

export function HeaderNavigation() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadNotifications());
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleBellClick() {
    if (!isOpen && unreadCount > 0) {
      markAllRead();
      setNotifications((items) => items.map((item) => ({ ...item, read: true })));
    }
    setIsOpen((value) => !value);
  }

  return (
    <header className="sticky top-0 z-40 flex w-full shrink-0 flex-col items-center border-b border-[#22262f] bg-[#0c0e12]">
      <div className="flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8">
        <RaydaLogo variant="white" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
              <Settings01 className="size-5" />
            </button>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={handleBellClick}
                className="relative flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"
              >
                <Bell02 className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 left-6 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fda29b] px-1 text-[10px] font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isOpen && <NotificationsDropdown notifications={notifications} />}
            </div>
          </div>
          <div className="relative size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
            <span className="absolute inset-0 rounded-full border border-white/[0.12]" />
            <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">OR</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationsDropdown({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <div className="absolute top-[calc(100%+8px)] right-0 w-[380px] overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-3">
        <p className="text-sm font-semibold text-[#101828]">Notifications</p>
        {notifications.length > 0 && (
          <span className="text-xs font-medium text-[#667085]">
            {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-[#667085]">No notifications</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {notifications.map((item, index) => (
            <NotificationRow key={item.id} item={item} showBorder={index < notifications.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationRow({ item, showBorder }: { item: NotificationItem; showBorder: boolean }) {
  const { icon: Icon, bg, color } = notificationIcons[item.type];
  return (
    <div className={cx("flex gap-3 px-4 py-4", showBorder && "border-b border-[#eaecf0]")}>
      <div className={cx("flex size-9 shrink-0 items-center justify-center rounded-full", bg)}>
        <Icon className={cx("size-4", color)} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-[#101828]">{item.title}</p>
        <p className="text-xs leading-5 text-[#667085]">{item.description}</p>
      </div>
    </div>
  );
}
