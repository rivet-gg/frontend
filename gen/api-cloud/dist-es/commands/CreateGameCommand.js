import { __extends } from "tslib";
import { CreateGameInput, CreateGameOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameCommand, serializeAws_restJson1CreateGameCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameCommand = (function (_super) {
    __extends(CreateGameCommand, _super);
    function CreateGameCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameCommand(input, context);
    };
    CreateGameCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameCommand(output, context);
    };
    return CreateGameCommand;
}($Command));
export { CreateGameCommand };
