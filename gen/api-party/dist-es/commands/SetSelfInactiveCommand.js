import { __extends } from "tslib";
import { SetSelfInactiveInput, SetSelfInactiveOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetSelfInactiveCommand, serializeAws_restJson1SetSelfInactiveCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetSelfInactiveCommand = (function (_super) {
    __extends(SetSelfInactiveCommand, _super);
    function SetSelfInactiveCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetSelfInactiveCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "SetSelfInactiveCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetSelfInactiveInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetSelfInactiveOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetSelfInactiveCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetSelfInactiveCommand(input, context);
    };
    SetSelfInactiveCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetSelfInactiveCommand(output, context);
    };
    return SetSelfInactiveCommand;
}($Command));
export { SetSelfInactiveCommand };
