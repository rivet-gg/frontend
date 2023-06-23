import { __extends } from "tslib";
import { ValidateGameVersionInput, ValidateGameVersionOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGameVersionCommand, serializeAws_restJson1ValidateGameVersionCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGameVersionCommand = (function (_super) {
    __extends(ValidateGameVersionCommand, _super);
    function ValidateGameVersionCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGameVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGameVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGameVersionInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGameVersionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGameVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGameVersionCommand(input, context);
    };
    ValidateGameVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGameVersionCommand(output, context);
    };
    return ValidateGameVersionCommand;
}($Command));
export { ValidateGameVersionCommand };
