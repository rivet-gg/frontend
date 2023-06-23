import { __extends } from "tslib";
import { ValidateGameInput, ValidateGameOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGameCommand, serializeAws_restJson1ValidateGameCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGameCommand = (function (_super) {
    __extends(ValidateGameCommand, _super);
    function ValidateGameCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGameCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGameCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGameInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGameOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGameCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGameCommand(input, context);
    };
    ValidateGameCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGameCommand(output, context);
    };
    return ValidateGameCommand;
}($Command));
export { ValidateGameCommand };
