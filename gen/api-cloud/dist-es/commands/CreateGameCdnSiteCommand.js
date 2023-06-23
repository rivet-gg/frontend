import { __extends } from "tslib";
import { CreateGameCdnSiteInput, CreateGameCdnSiteOutput, } from "../models/models_0";
import { deserializeAws_restJson1CreateGameCdnSiteCommand, serializeAws_restJson1CreateGameCdnSiteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var CreateGameCdnSiteCommand = (function (_super) {
    __extends(CreateGameCdnSiteCommand, _super);
    function CreateGameCdnSiteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    CreateGameCdnSiteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "CreateGameCdnSiteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateGameCdnSiteInput.filterSensitiveLog,
            outputFilterSensitiveLog: CreateGameCdnSiteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateGameCdnSiteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1CreateGameCdnSiteCommand(input, context);
    };
    CreateGameCdnSiteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1CreateGameCdnSiteCommand(output, context);
    };
    return CreateGameCdnSiteCommand;
}($Command));
export { CreateGameCdnSiteCommand };
