import { __extends } from "tslib";
import { RefreshIdentityTokenInput, RefreshIdentityTokenOutput, } from "../models/models_0";
import { deserializeAws_restJson1RefreshIdentityTokenCommand, serializeAws_restJson1RefreshIdentityTokenCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RefreshIdentityTokenCommand = (function (_super) {
    __extends(RefreshIdentityTokenCommand, _super);
    function RefreshIdentityTokenCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RefreshIdentityTokenCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "AuthServiceClient";
        var commandName = "RefreshIdentityTokenCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RefreshIdentityTokenInput.filterSensitiveLog,
            outputFilterSensitiveLog: RefreshIdentityTokenOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RefreshIdentityTokenCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RefreshIdentityTokenCommand(input, context);
    };
    RefreshIdentityTokenCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RefreshIdentityTokenCommand(output, context);
    };
    return RefreshIdentityTokenCommand;
}($Command));
export { RefreshIdentityTokenCommand };
