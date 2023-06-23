import { __extends } from "tslib";
import { GroupBillingCheckoutInput, GroupBillingCheckoutOutput, } from "../models/models_0";
import { deserializeAws_restJson1GroupBillingCheckoutCommand, serializeAws_restJson1GroupBillingCheckoutCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GroupBillingCheckoutCommand = (function (_super) {
    __extends(GroupBillingCheckoutCommand, _super);
    function GroupBillingCheckoutCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GroupBillingCheckoutCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GroupBillingCheckoutCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GroupBillingCheckoutInput.filterSensitiveLog,
            outputFilterSensitiveLog: GroupBillingCheckoutOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GroupBillingCheckoutCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GroupBillingCheckoutCommand(input, context);
    };
    GroupBillingCheckoutCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GroupBillingCheckoutCommand(output, context);
    };
    return GroupBillingCheckoutCommand;
}($Command));
export { GroupBillingCheckoutCommand };
