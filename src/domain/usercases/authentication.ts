import { AccountModel } from '../models/acount-model'

type AuthenticationParams = {
  email: string
  passqord: string
}

export interface Authentication {
  auth (params: AuthenticationParams): Promise<AccountModel>
}
