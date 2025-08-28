export class ErrorBase<Name extends string> extends Error {
    
    readonly name: Name
    readonly status: number

    constructor(name: Name, message: string, status: number){
        super(message),
        this.name = name,
        this.status = status

        Object.setPrototypeOf(this, new.target.prototype)
    }
}