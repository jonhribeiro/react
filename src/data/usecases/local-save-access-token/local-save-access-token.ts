import { SaveAccessToken } from '@/domain/usercases/save-access-token';
import { setStorage } from '@/data/protocols/cache/set-storage';

export class LocalSaveAccessToken implements SaveAccessToken {
    constructor (private readonly setStorage: setStorage) {}
    
    async save (accessToken: string): Promise<void> {
        await this.setStorage.set('accessToken', accessToken)
    }
}