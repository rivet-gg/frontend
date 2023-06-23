import { __extends } from "tslib";
import { ListRecentFollowersInput, ListRecentFollowersOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListRecentFollowersCommand, serializeAws_restJson1ListRecentFollowersCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListRecentFollowersCommand = (function (_super) {
    __extends(ListRecentFollowersCommand, _super);
    function ListRecentFollowersCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListRecentFollowersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "ListRecentFollowersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListRecentFollowersInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListRecentFollowersOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListRecentFollowersCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListRecentFollowersCommand(input, context);
    };
    ListRecentFollowersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListRecentFollowersCommand(output, context);
    };
    return ListRecentFollowersCommand;
}($Command));
export { ListRecentFollowersCommand };
