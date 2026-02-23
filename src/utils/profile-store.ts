const STORAGE_KEY = "rayda_profile_update";

export interface ProfileUpdate {
    address: string;
    stateLabel: string;
    countryId: string;
    countryLabel: string;
    phone: string;
}

export function saveProfileUpdate(data: ProfileUpdate): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadProfileUpdate(): ProfileUpdate | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ProfileUpdate) : null;
    } catch {
        return null;
    }
}
