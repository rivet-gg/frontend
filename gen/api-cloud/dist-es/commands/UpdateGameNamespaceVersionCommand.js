import { __extends } from "tslib";
import { UpdateGameNamespaceVersionInput, UpdateGameNamespaceVersionOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateGameNamespaceVersionCommand, serializeAws_restJson1UpdateGameNamespaceVersionCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateGameNamespaceVersionCommand = (function (_super) {
    __extends(UpdateGameNamespaceVersionCommand, _super);
    function UpdateGameNamespaceVersionCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateGameNamespaceVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "UpdateGameNamespaceVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateGameNamespaceVersionInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateGameNamespaceVersionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateGameNamespaceVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateGameNamespaceVersionCommand(input, context);
    };
    UpdateGameNamespaceVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateGameNamespaceVersionCommand(output, context);
    };
    return UpdateGameNamespaceVersionCommand;
}($Command));
export { UpdateGameNamespaceVersionCommand };
