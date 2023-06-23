import { __extends } from "tslib";
import { ValidateGameNamespaceTokenDevelopmentInput, ValidateGameNamespaceTokenDevelopmentOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand, serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGameNamespaceTokenDevelopmentCommand = (function (_super) {
    __extends(ValidateGameNamespaceTokenDevelopmentCommand, _super);
    function ValidateGameNamespaceTokenDevelopmentCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGameNamespaceTokenDevelopmentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGameNamespaceTokenDevelopmentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGameNamespaceTokenDevelopmentInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGameNamespaceTokenDevelopmentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand(input, context);
    };
    ValidateGameNamespaceTokenDevelopmentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand(output, context);
    };
    return ValidateGameNamespaceTokenDevelopmentCommand;
}($Command));
export { ValidateGameNamespaceTokenDevelopmentCommand };
