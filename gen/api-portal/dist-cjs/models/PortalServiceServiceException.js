"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalServiceServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class PortalServiceServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, PortalServiceServiceException.prototype);
    }
}
exports.PortalServiceServiceException = PortalServiceServiceException;
