import { __extends } from "tslib";
import { ValidateGroupInput, ValidateGroupOutput, } from "../models/models_0";
import { deserializeAws_restJson1ValidateGroupCommand, serializeAws_restJson1ValidateGroupCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ValidateGroupCommand = (function (_super) {
    __extends(ValidateGroupCommand, _super);
    function ValidateGroupCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ValidateGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ValidateGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ValidateGroupInput.filterSensitiveLog,
            outputFilterSensitiveLog: ValidateGroupOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ValidateGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ValidateGroupCommand(input, context);
    };
    ValidateGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ValidateGroupCommand(output, context);
    };
    return ValidateGroupCommand;
}($Command));
export { ValidateGroupCommand };
