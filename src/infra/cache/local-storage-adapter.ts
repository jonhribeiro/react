import { setStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAdapter implements setStorage {
    async set (key: string, value: any): Promise<void> {
        localStorage.setItem(key, value)
    }
}