import { ErrorBase } from "./ErrorBase";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../config/Validation";

type PasswordErrorName = 'MISSING_PASSWORD' | 'PASSWORD_IS_TOO_SHORT' | 'PASSWORD_IS_TOO_LONG' | 'PASSWORD_CONTAINS_SPACES'

export class PasswordError extends ErrorBase<PasswordErrorName>{
    constructor(name: PasswordErrorName){
        const messages = {
            MISSING_PASSWORD: {
                message: "Password is required!",
                status: 400
            },
            PASSWORD_IS_TOO_SHORT: {
                message: `Password length must be at least ${PASSWORD_MIN_LENGTH} characters!`,
                status: 400
            },
            PASSWORD_IS_TOO_LONG:{
                message: `Password max length is ${PASSWORD_MAX_LENGTH} characters!`,
                status: 400
            },
            PASSWORD_CONTAINS_SPACES:{
                message: "Password can't contain spaces!",
                status: 400
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}