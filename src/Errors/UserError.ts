import { ErrorBase } from './ErrorBase'

type UserErrorName = 'USER_ALREADY_EXISTS' | 'INVALID_CREDENTIALS'

export class UserError extends ErrorBase<UserErrorName>{
    constructor(name: UserErrorName){
        const messages = {
            USER_ALREADY_EXISTS: { message: "User already exists", status: 409},
            INVALID_CREDENTIALS: { message: "Invalid e-mail or password", status: 401}
        }

        super(name, messages[name].message, messages[name].status)
    }
}