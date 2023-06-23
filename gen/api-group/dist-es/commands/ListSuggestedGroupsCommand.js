import { __extends } from "tslib";
import { ListSuggestedGroupsInput, ListSuggestedGroupsOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListSuggestedGroupsCommand, serializeAws_restJson1ListSuggestedGroupsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListSuggestedGroupsCommand = (function (_super) {
    __extends(ListSuggestedGroupsCommand, _super);
    function ListSuggestedGroupsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListSuggestedGroupsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "ListSuggestedGroupsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListSuggestedGroupsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListSuggestedGroupsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListSuggestedGroupsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListSuggestedGroupsCommand(input, context);
    };
    ListSuggestedGroupsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListSuggestedGroupsCommand(output, context);
    };
    return ListSuggestedGroupsCommand;
}($Command));
export { ListSuggestedGroupsCommand };
