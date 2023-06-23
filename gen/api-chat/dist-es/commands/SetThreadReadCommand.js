import { __extends } from "tslib";
import { SetThreadReadInput, SetThreadReadOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetThreadReadCommand, serializeAws_restJson1SetThreadReadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetThreadReadCommand = (function (_super) {
    __extends(SetThreadReadCommand, _super);
    function SetThreadReadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetThreadReadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "SetThreadReadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetThreadReadInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetThreadReadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetThreadReadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetThreadReadCommand(input, context);
    };
    SetThreadReadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetThreadReadCommand(output, context);
    };
    return SetThreadReadCommand;
}($Command));
export { SetThreadReadCommand };
