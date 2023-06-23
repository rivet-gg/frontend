import { __extends } from "tslib";
import { CreateGameVersionInput, CreateGameVersionOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameVersionCommand, serializeAws_restJson1CreateGameVersionCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameVersionCommand = (function (_super) {
    __extends(CreateGameVersionCommand, _super);
    function CreateGameVersionCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameVersionInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameVersionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameVersionCommand(input, context);
    };
    CreateGameVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameVersionCommand(output, context);
    };
    return CreateGameVersionCommand;
}($Command));
export { CreateGameVersionCommand };
