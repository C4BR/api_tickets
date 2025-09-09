import { ErrorBase } from "./ErrorBase";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "../config/Validation";

type NameErrorName = 'MISSING_NAME' | 'NAME_IS_TOO_SHORT' | 'NAME_IS_TOO_LONG'

export class NameError extends ErrorBase<NameErrorName>{
    constructor(name: NameErrorName){
        const messages = {
            MISSING_NAME: {
                message: "Name is required!", 
                status: 400
            },
            NAME_IS_TOO_SHORT: {
                message: `Minimun name's length is ${NAME_MIN_LENGTH} characters!`,
                status: 400
            },
            NAME_IS_TOO_LONG:{
                message: `Maximun name's length is ${NAME_MAX_LENGTH} characters!`,
                status: 400
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}