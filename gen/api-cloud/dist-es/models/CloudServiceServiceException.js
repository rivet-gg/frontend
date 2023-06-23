import { __extends } from "tslib";
import { ServiceException as __ServiceException, } from "@aws-sdk/smithy-client";
var CloudServiceServiceException = (function (_super) {
    __extends(CloudServiceServiceException, _super);
    function CloudServiceServiceException(options) {
        var _this = _super.call(this, options) || this;
        Object.setPrototypeOf(_this, CloudServiceServiceException.prototype);
        return _this;
    }
    return CloudServiceServiceException;
}(__ServiceException));
export { CloudServiceServiceException };
