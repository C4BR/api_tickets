import { ErrorBase } from "./ErrorBase";

type AuthErrorName = 'MISSING_TOKEN' | 'INVALID_TOKEN' | 'SESSION_EXPIRED'

export class AuthError extends ErrorBase<AuthErrorName>{
    constructor(name: AuthErrorName){
        const messages = {
            MISSING_TOKEN: {
                message: "Missing or malformed Authorization header!", 
                status: 401
            },
            INVALID_TOKEN: {
                message: "Invalid authentication token!",
                status: 401
            },
            SESSION_EXPIRED: {
                message: "Session expired or invalid session, login again!",
                status: 401
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}