import { AuthenticationParams } from "@/domain/usercases";
import { AccountModel } from "../models";
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAcountModel = (): AccountModel => ({
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
})