import { setStorage } from '../protocols/cache/set-storage'

export class SetStorageSpy implements setStorage {
    key: string
    value: any
    
    async set (key: string, value: any): Promise<void> {
        this.key = key
        this.value = value
    }
}