const STORAGE_KEY = "rayda_notifications";

export interface NotificationItem {
    id: string;
    type: "success" | "info" | "processing";
    title: string;
    description: string;
    read: boolean;
}

export const ORDER_CONFIRMED_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "order-confirmed",
        type: "success",
        title: "Order confirmed",
        description: "Your order has been confirmed and is being processed.",
        read: false,
    },
    {
        id: "email-sent",
        type: "info",
        title: "Confirmation email sent",
        description: "A confirmation email has been sent to phoenix@rayda.co.",
        read: false,
    },
    {
        id: "order-processing",
        type: "processing",
        title: "Order in processing",
        description: "Your equipment order is now being prepared for delivery.",
        read: false,
    },
];

export function loadNotifications(): NotificationItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as NotificationItem[]) : [];
    } catch {
        return [];
    }
}

export function saveNotifications(notifications: NotificationItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function markAllRead(): void {
    const notifications = loadNotifications().map((n) => ({ ...n, read: true }));
    saveNotifications(notifications);
}
