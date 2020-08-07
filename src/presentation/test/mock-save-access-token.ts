import { SaveAccessToken } from "@/domain/usercases/save-access-token"

export class SaveAccessTokenMock implements SaveAccessToken {
    accessToken: string

    async save (accessToken: string): Promise<void> {
        this.accessToken = accessToken
    }
}