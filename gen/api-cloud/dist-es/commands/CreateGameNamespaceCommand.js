import { __extends } from "tslib";
import { CreateGameNamespaceInput, CreateGameNamespaceOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameNamespaceCommand, serializeAws_restJson1CreateGameNamespaceCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameNamespaceCommand = (function (_super) {
    __extends(CreateGameNamespaceCommand, _super);
    function CreateGameNamespaceCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameNamespaceCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameNamespaceCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameNamespaceInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameNamespaceOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameNamespaceCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameNamespaceCommand(input, context);
    };
    CreateGameNamespaceCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameNamespaceCommand(output, context);
    };
    return CreateGameNamespaceCommand;
}($Command));
export { CreateGameNamespaceCommand };
