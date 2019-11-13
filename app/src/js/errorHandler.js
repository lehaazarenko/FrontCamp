import render from './render';

class ErrorHandler {
    constructor() {
        this.errorMessage = '';
    }

    static getInstance() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    handle(message) {
        this.setErrorMessage(message);
        this.renderErrorMessage();
    }

    renderErrorMessage() {
        render.renderErrorMessage(this.errorMessage);
    }

    setErrorMessage(message) {
        this.errorMessage = message;
    }
}

const errorHandlerInstance = new ErrorHandler();
export default errorHandlerInstance;
