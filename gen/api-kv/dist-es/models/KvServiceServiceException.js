import { __extends } from "tslib";
import { ServiceException as __ServiceException, } from "@aws-sdk/smithy-client";
var KvServiceServiceException = (function (_super) {
    __extends(KvServiceServiceException, _super);
    function KvServiceServiceException(options) {
        var _this = _super.call(this, options) || this;
        Object.setPrototypeOf(_this, KvServiceServiceException.prototype);
        return _this;
    }
    return KvServiceServiceException;
}(__ServiceException));
export { KvServiceServiceException };
