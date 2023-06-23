import { __extends } from "tslib";
import { ListMutualFriendsInput, ListMutualFriendsOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListMutualFriendsCommand, serializeAws_restJson1ListMutualFriendsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListMutualFriendsCommand = (function (_super) {
    __extends(ListMutualFriendsCommand, _super);
    function ListMutualFriendsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListMutualFriendsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "ListMutualFriendsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListMutualFriendsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListMutualFriendsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListMutualFriendsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListMutualFriendsCommand(input, context);
    };
    ListMutualFriendsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListMutualFriendsCommand(output, context);
    };
    return ListMutualFriendsCommand;
}($Command));
export { ListMutualFriendsCommand };
