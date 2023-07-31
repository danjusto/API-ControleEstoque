export class AppError {
    message: String;
    statusCode: Number;

    constructor(message: String, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}