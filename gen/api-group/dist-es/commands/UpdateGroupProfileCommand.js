import { __extends } from "tslib";
import { UpdateGroupProfileInput, UpdateGroupProfileOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateGroupProfileCommand, serializeAws_restJson1UpdateGroupProfileCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateGroupProfileCommand = (function (_super) {
    __extends(UpdateGroupProfileCommand, _super);
    function UpdateGroupProfileCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateGroupProfileCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "UpdateGroupProfileCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateGroupProfileInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateGroupProfileOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateGroupProfileCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateGroupProfileCommand(input, context);
    };
    UpdateGroupProfileCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateGroupProfileCommand(output, context);
    };
    return UpdateGroupProfileCommand;
}($Command));
export { UpdateGroupProfileCommand };
