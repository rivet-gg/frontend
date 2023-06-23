import { __extends } from "tslib";
import { ValidateGameNamespaceInput, ValidateGameNamespaceOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGameNamespaceCommand, serializeAws_restJson1ValidateGameNamespaceCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGameNamespaceCommand = (function (_super) {
    __extends(ValidateGameNamespaceCommand, _super);
    function ValidateGameNamespaceCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGameNamespaceCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGameNamespaceCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGameNamespaceInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGameNamespaceOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGameNamespaceCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGameNamespaceCommand(input, context);
    };
    ValidateGameNamespaceCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGameNamespaceCommand(output, context);
    };
    return ValidateGameNamespaceCommand;
}($Command));
export { ValidateGameNamespaceCommand };
