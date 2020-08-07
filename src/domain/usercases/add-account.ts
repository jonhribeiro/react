import { AccountModel } from '@/domain/models/acount-model'

export type AuthenticationParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (params: AddAccount) => Promise<AccountModel>
}
