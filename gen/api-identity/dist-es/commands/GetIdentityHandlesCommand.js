import { __extends } from "tslib";
import { GetIdentityHandlesInput, GetIdentityHandlesOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentityHandlesCommand, serializeAws_restJson1GetIdentityHandlesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentityHandlesCommand = (function (_super) {
    __extends(GetIdentityHandlesCommand, _super);
    function GetIdentityHandlesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentityHandlesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetIdentityHandlesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityHandlesInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityHandlesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityHandlesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentityHandlesCommand(input, context);
    };
    GetIdentityHandlesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentityHandlesCommand(output, context);
    };
    return GetIdentityHandlesCommand;
}($Command));
export { GetIdentityHandlesCommand };
