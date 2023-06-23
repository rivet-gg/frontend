import { __extends } from "tslib";
import { ListGameCdnSitesInput, ListGameCdnSitesOutput, } from "../models/models_0";
import { deserializeAws_restJson1ListGameCdnSitesCommand, serializeAws_restJson1ListGameCdnSitesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var ListGameCdnSitesCommand = (function (_super) {
    __extends(ListGameCdnSitesCommand, _super);
    function ListGameCdnSitesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    ListGameCdnSitesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "ListGameCdnSitesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListGameCdnSitesInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListGameCdnSitesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListGameCdnSitesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListGameCdnSitesCommand(input, context);
    };
    ListGameCdnSitesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListGameCdnSitesCommand(output, context);
    };
    return ListGameCdnSitesCommand;
}($Command));
export { ListGameCdnSitesCommand };
