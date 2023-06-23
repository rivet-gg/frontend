import { __extends } from "tslib";
import { ServiceException as __ServiceException, } from "@aws-sdk/smithy-client";
var AuthServiceServiceException = (function (_super) {
    __extends(AuthServiceServiceException, _super);
    function AuthServiceServiceException(options) {
        var _this = _super.call(this, options) || this;
        Object.setPrototypeOf(_this, AuthServiceServiceException.prototype);
        return _this;
    }
    return AuthServiceServiceException;
}(__ServiceException));
export { AuthServiceServiceException };
