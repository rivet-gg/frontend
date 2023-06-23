import { __extends } from "tslib";
import { CreateGameNamespaceTokenPublicInput, CreateGameNamespaceTokenPublicOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand, serializeAws_restJson1CreateGameNamespaceTokenPublicCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameNamespaceTokenPublicCommand = (function (_super) {
    __extends(CreateGameNamespaceTokenPublicCommand, _super);
    function CreateGameNamespaceTokenPublicCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameNamespaceTokenPublicCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameNamespaceTokenPublicCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameNamespaceTokenPublicInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameNamespaceTokenPublicOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameNamespaceTokenPublicCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameNamespaceTokenPublicCommand(input, context);
    };
    CreateGameNamespaceTokenPublicCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand(output, context);
    };
    return CreateGameNamespaceTokenPublicCommand;
}($Command));
export { CreateGameNamespaceTokenPublicCommand };
