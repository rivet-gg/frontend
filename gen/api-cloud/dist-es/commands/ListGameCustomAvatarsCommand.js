import { __extends } from "tslib";
import { ListGameCustomAvatarsInput, ListGameCustomAvatarsOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListGameCustomAvatarsCommand, serializeAws_restJson1ListGameCustomAvatarsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListGameCustomAvatarsCommand = (function (_super) {
    __extends(ListGameCustomAvatarsCommand, _super);
    function ListGameCustomAvatarsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListGameCustomAvatarsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ListGameCustomAvatarsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListGameCustomAvatarsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListGameCustomAvatarsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListGameCustomAvatarsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListGameCustomAvatarsCommand(input, context);
    };
    ListGameCustomAvatarsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListGameCustomAvatarsCommand(output, context);
    };
    return ListGameCustomAvatarsCommand;
}($Command));
export { ListGameCustomAvatarsCommand };
