import { AuthenticationParams } from "@/domain/usercases/authentication";
import faker from 'faker'
import { AccountModel } from "../models/acount-model";

export const mockAuthentication = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAcountModel = (): AccountModel => ({
    accessToken: faker.random.uuid()
})