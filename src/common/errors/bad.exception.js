export class BadException extends Error {
    constructor(message, details = []) {
        super(message);

        this.name = "BadException";
        this.statusCode = 400;
        this.details = details;
    }
}