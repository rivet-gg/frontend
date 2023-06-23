"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KvServiceServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class KvServiceServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, KvServiceServiceException.prototype);
    }
}
exports.KvServiceServiceException = KvServiceServiceException;
