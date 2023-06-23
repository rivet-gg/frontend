import { __extends } from "tslib";
import { CreateGameBuildInput, CreateGameBuildOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameBuildCommand, serializeAws_restJson1CreateGameBuildCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameBuildCommand = (function (_super) {
    __extends(CreateGameBuildCommand, _super);
    function CreateGameBuildCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameBuildCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameBuildCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameBuildInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameBuildOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameBuildCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameBuildCommand(input, context);
    };
    CreateGameBuildCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameBuildCommand(output, context);
    };
    return CreateGameBuildCommand;
}($Command));
export { CreateGameBuildCommand };
