import { ErrorBase } from "./ErrorBase";
import { EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH } from "../config/Validation";

type EmailErrorName = 'MISSING_EMAIL' | 'INVALID_EMAIL' | 'EMAIL_IS_TOO_SHORT' | 'EMAIL_IS_TOO_LONG'

export class EmailError extends ErrorBase<EmailErrorName>{
    constructor(name: EmailErrorName){
        const messages = {
            MISSING_EMAIL: {
                message: "E-mail is required!",
                status: 400
            },
            INVALID_EMAIL: {
                message: "Invalid e-mail!",
                status: 400
            },
            EMAIL_IS_TOO_SHORT: {
                message: `E-mail lenght must be at least ${EMAIL_MIN_LENGTH} characters!`,
                status: 400
            },
            EMAIL_IS_TOO_LONG: {
                message: `E-mail max length is ${EMAIL_MAX_LENGTH} characters!`,
                status: 400
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}