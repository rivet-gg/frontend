import { __extends } from "tslib";
import { GetGameBillingPlansInput, GetGameBillingPlansOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGameBillingPlansCommand, serializeAws_restJson1GetGameBillingPlansCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGameBillingPlansCommand = (function (_super) {
    __extends(GetGameBillingPlansCommand, _super);
    function GetGameBillingPlansCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGameBillingPlansCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGameBillingPlansCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGameBillingPlansInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGameBillingPlansOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGameBillingPlansCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGameBillingPlansCommand(input, context);
    };
    GetGameBillingPlansCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGameBillingPlansCommand(output, context);
    };
    return GetGameBillingPlansCommand;
}($Command));
export { GetGameBillingPlansCommand };
