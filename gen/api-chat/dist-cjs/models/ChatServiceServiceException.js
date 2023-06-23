"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServiceServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class ChatServiceServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, ChatServiceServiceException.prototype);
    }
}
exports.ChatServiceServiceException = ChatServiceServiceException;
