import { ErrorBase } from "./ErrorBase";

type BodyErrorName = "BODY_HAS_EXTRA_FIELDS"

export class BodyError extends ErrorBase<BodyErrorName>{
    constructor(name: BodyErrorName){
        const messages = {
            BODY_HAS_EXTRA_FIELDS: {
                message: "Body can't have extra fields!",
                status: 400
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}