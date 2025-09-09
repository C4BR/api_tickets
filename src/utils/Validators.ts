import { NameError } from "../Errors/NameError";
import { EmailError } from "../Errors/EmailError";
import { PasswordError } from "../Errors/PasswordError";

import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    EMAIL_MIN_LENGTH,
    EMAIL_MAX_LENGTH
} from "../config/Validation"

export function validateName(name: string){
    if(!name || name.trim() === ""){
        throw new NameError('MISSING_NAME')
    }

    if(name.length < NAME_MIN_LENGTH){
        throw new NameError('NAME_IS_TOO_SHORT')
    }

    if(name.length > NAME_MAX_LENGTH){
        throw new NameError('NAME_IS_TOO_LONG')
    }
}

export function validateEmail(email: string){
    if(!email || email.trim() === ""){
        throw new EmailError('MISSING_EMAIL')
    }

    if(email.length < EMAIL_MIN_LENGTH){
        throw new EmailError('EMAIL_IS_TOO_SHORT')
    }

    if(email.length > EMAIL_MAX_LENGTH){
        throw new EmailError('EMAIL_IS_TOO_LONG')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        throw new EmailError("INVALID_EMAIL")
    }
}

export function validatePassword(password: string){
    if(!password || password.trim() === ""){
        throw new PasswordError('MISSING_PASSWORD')
    }

    if(password.includes(" ")){
        throw new PasswordError('PASSWORD_CONTAINS_SPACES')
    }

    if(password.length < PASSWORD_MIN_LENGTH){
        throw new PasswordError('PASSWORD_IS_TOO_SHORT')
    }

    if(password.length > PASSWORD_MAX_LENGTH){
        throw new PasswordError('PASSWORD_IS_TOO_LONG')
    }
}