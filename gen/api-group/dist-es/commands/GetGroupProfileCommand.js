import { __extends } from "tslib";
import { GetGroupProfileInput, GetGroupProfileOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupProfileCommand, serializeAws_restJson1GetGroupProfileCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupProfileCommand = (function (_super) {
    __extends(GetGroupProfileCommand, _super);
    function GetGroupProfileCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupProfileCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupProfileCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupProfileInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupProfileOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupProfileCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupProfileCommand(input, context);
    };
    GetGroupProfileCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupProfileCommand(output, context);
    };
    return GetGroupProfileCommand;
}($Command));
export { GetGroupProfileCommand };
