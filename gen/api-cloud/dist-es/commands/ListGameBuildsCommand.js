import { __extends } from "tslib";
import { ListGameBuildsInput, ListGameBuildsOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListGameBuildsCommand, serializeAws_restJson1ListGameBuildsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListGameBuildsCommand = (function (_super) {
    __extends(ListGameBuildsCommand, _super);
    function ListGameBuildsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListGameBuildsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ListGameBuildsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListGameBuildsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListGameBuildsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListGameBuildsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListGameBuildsCommand(input, context);
    };
    ListGameBuildsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListGameBuildsCommand(output, context);
    };
    return ListGameBuildsCommand;
}($Command));
export { ListGameBuildsCommand };
