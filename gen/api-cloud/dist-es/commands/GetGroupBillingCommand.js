import { __extends } from "tslib";
import { GetGroupBillingInput, GetGroupBillingOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupBillingCommand, serializeAws_restJson1GetGroupBillingCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupBillingCommand = (function (_super) {
    __extends(GetGroupBillingCommand, _super);
    function GetGroupBillingCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupBillingCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGroupBillingCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupBillingInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupBillingOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupBillingCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupBillingCommand(input, context);
    };
    GetGroupBillingCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupBillingCommand(output, context);
    };
    return GetGroupBillingCommand;
}($Command));
export { GetGroupBillingCommand };
