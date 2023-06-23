"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class AuthServiceServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, AuthServiceServiceException.prototype);
    }
}
exports.AuthServiceServiceException = AuthServiceServiceException;
