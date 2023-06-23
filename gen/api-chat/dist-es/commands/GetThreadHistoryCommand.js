import { __extends } from "tslib";
import { GetThreadHistoryInput, GetThreadHistoryOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetThreadHistoryCommand, serializeAws_restJson1GetThreadHistoryCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetThreadHistoryCommand = (function (_super) {
    __extends(GetThreadHistoryCommand, _super);
    function GetThreadHistoryCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetThreadHistoryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "GetThreadHistoryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetThreadHistoryInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetThreadHistoryOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetThreadHistoryCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetThreadHistoryCommand(input, context);
    };
    GetThreadHistoryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetThreadHistoryCommand(output, context);
    };
    return GetThreadHistoryCommand;
}($Command));
export { GetThreadHistoryCommand };
