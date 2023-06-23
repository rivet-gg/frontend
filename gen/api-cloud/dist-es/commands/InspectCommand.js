import { __extends } from "tslib";
import { InspectInput, InspectOutput, } from "../models/models_0";
import { deserializeAws_restJson1InspectCommand, serializeAws_restJson1InspectCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var InspectCommand = (function (_super) {
    __extends(InspectCommand, _super);
    function InspectCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    InspectCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "InspectCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: InspectInput.filterSensitiveLog,
            outputFilterSensitiveLog: InspectOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    InspectCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1InspectCommand(input, context);
    };
    InspectCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1InspectCommand(output, context);
    };
    return InspectCommand;
}($Command));
export { InspectCommand };
