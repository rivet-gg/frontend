"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudServiceServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class CloudServiceServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, CloudServiceServiceException.prototype);
    }
}
exports.CloudServiceServiceException = CloudServiceServiceException;
