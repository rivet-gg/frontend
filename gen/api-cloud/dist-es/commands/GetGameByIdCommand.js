import { __extends } from "tslib";
import { GetGameByIdInput, GetGameByIdOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGameByIdCommand, serializeAws_restJson1GetGameByIdCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGameByIdCommand = (function (_super) {
    __extends(GetGameByIdCommand, _super);
    function GetGameByIdCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGameByIdCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGameByIdCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGameByIdInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGameByIdOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGameByIdCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGameByIdCommand(input, context);
    };
    GetGameByIdCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGameByIdCommand(output, context);
    };
    return GetGameByIdCommand;
}($Command));
export { GetGameByIdCommand };
