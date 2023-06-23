import { __extends } from "tslib";
import { GetNamespaceLobbyInput, GetNamespaceLobbyOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetNamespaceLobbyCommand, serializeAws_restJson1GetNamespaceLobbyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetNamespaceLobbyCommand = (function (_super) {
    __extends(GetNamespaceLobbyCommand, _super);
    function GetNamespaceLobbyCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetNamespaceLobbyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetNamespaceLobbyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetNamespaceLobbyInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetNamespaceLobbyOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetNamespaceLobbyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetNamespaceLobbyCommand(input, context);
    };
    GetNamespaceLobbyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetNamespaceLobbyCommand(output, context);
    };
    return GetNamespaceLobbyCommand;
}($Command));
export { GetNamespaceLobbyCommand };
