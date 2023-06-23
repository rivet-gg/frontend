import { __extends } from "tslib";
import { GetGroupBansInput, GetGroupBansOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupBansCommand, serializeAws_restJson1GetGroupBansCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupBansCommand = (function (_super) {
    __extends(GetGroupBansCommand, _super);
    function GetGroupBansCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupBansCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupBansCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupBansInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupBansOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupBansCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupBansCommand(input, context);
    };
    GetGroupBansCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupBansCommand(output, context);
    };
    return GetGroupBansCommand;
}($Command));
export { GetGroupBansCommand };
