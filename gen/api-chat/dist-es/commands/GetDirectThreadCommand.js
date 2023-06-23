import { __extends } from "tslib";
import { GetDirectThreadInput, GetDirectThreadOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetDirectThreadCommand, serializeAws_restJson1GetDirectThreadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetDirectThreadCommand = (function (_super) {
    __extends(GetDirectThreadCommand, _super);
    function GetDirectThreadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetDirectThreadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "GetDirectThreadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetDirectThreadInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetDirectThreadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetDirectThreadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetDirectThreadCommand(input, context);
    };
    GetDirectThreadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetDirectThreadCommand(output, context);
    };
    return GetDirectThreadCommand;
}($Command));
export { GetDirectThreadCommand };
