import { __extends } from "tslib";
import { CreateGameNamespaceTokenDevelopmentInput, CreateGameNamespaceTokenDevelopmentOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand, serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameNamespaceTokenDevelopmentCommand = (function (_super) {
    __extends(CreateGameNamespaceTokenDevelopmentCommand, _super);
    function CreateGameNamespaceTokenDevelopmentCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameNamespaceTokenDevelopmentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameNamespaceTokenDevelopmentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameNamespaceTokenDevelopmentInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameNamespaceTokenDevelopmentCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand(input, context);
    };
    CreateGameNamespaceTokenDevelopmentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand(output, context);
    };
    return CreateGameNamespaceTokenDevelopmentCommand;
}($Command));
export { CreateGameNamespaceTokenDevelopmentCommand };
