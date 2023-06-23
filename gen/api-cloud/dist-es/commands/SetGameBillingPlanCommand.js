import { __extends } from "tslib";
import { SetGameBillingPlanInput, SetGameBillingPlanOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetGameBillingPlanCommand, serializeAws_restJson1SetGameBillingPlanCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetGameBillingPlanCommand = (function (_super) {
    __extends(SetGameBillingPlanCommand, _super);
    function SetGameBillingPlanCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetGameBillingPlanCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "SetGameBillingPlanCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetGameBillingPlanInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetGameBillingPlanOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetGameBillingPlanCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetGameBillingPlanCommand(input, context);
    };
    SetGameBillingPlanCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetGameBillingPlanCommand(output, context);
    };
    return SetGameBillingPlanCommand;
}($Command));
export { SetGameBillingPlanCommand };
