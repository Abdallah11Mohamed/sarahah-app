export class BadException extends Error {
    constructor(message, statusCode = 400, details = []) {
        super(message);
        this.name = "BadException";
        this.statusCode = statusCode;
        this.details = details;
    }
}
