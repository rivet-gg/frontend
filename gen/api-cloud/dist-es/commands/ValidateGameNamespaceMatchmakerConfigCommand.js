import { __extends } from "tslib";
import { ValidateGameNamespaceMatchmakerConfigInput, ValidateGameNamespaceMatchmakerConfigOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand, serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGameNamespaceMatchmakerConfigCommand = (function (_super) {
    __extends(ValidateGameNamespaceMatchmakerConfigCommand, _super);
    function ValidateGameNamespaceMatchmakerConfigCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGameNamespaceMatchmakerConfigCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGameNamespaceMatchmakerConfigCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGameNamespaceMatchmakerConfigInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGameNamespaceMatchmakerConfigCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand(input, context);
    };
    ValidateGameNamespaceMatchmakerConfigCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand(output, context);
    };
    return ValidateGameNamespaceMatchmakerConfigCommand;
}($Command));
export { ValidateGameNamespaceMatchmakerConfigCommand };
