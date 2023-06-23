import { __extends } from "tslib";
import { ListNamespaceLobbiesInput, ListNamespaceLobbiesOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListNamespaceLobbiesCommand, serializeAws_restJson1ListNamespaceLobbiesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListNamespaceLobbiesCommand = (function (_super) {
    __extends(ListNamespaceLobbiesCommand, _super);
    function ListNamespaceLobbiesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListNamespaceLobbiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ListNamespaceLobbiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListNamespaceLobbiesInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListNamespaceLobbiesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListNamespaceLobbiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListNamespaceLobbiesCommand(input, context);
    };
    ListNamespaceLobbiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListNamespaceLobbiesCommand(output, context);
    };
    return ListNamespaceLobbiesCommand;
}($Command));
export { ListNamespaceLobbiesCommand };
