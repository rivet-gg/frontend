import { __extends } from "tslib";
import { GetGameProfileInput, GetGameProfileOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGameProfileCommand, serializeAws_restJson1GetGameProfileCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGameProfileCommand = (function (_super) {
    __extends(GetGameProfileCommand, _super);
    function GetGameProfileCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGameProfileCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "GetGameProfileCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGameProfileInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGameProfileOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGameProfileCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGameProfileCommand(input, context);
    };
    GetGameProfileCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGameProfileCommand(output, context);
    };
    return GetGameProfileCommand;
}($Command));
export { GetGameProfileCommand };
