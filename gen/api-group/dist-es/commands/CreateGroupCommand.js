import { __extends } from "tslib";
import { CreateGroupInput, CreateGroupOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGroupCommand, serializeAws_restJson1CreateGroupCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGroupCommand = (function (_super) {
    __extends(CreateGroupCommand, _super);
    function CreateGroupCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "CreateGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGroupInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGroupOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGroupCommand(input, context);
    };
    CreateGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGroupCommand(output, context);
    };
    return CreateGroupCommand;
}($Command));
export { CreateGroupCommand };
