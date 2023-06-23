import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GameLogoUploadPrepareInput, GameLogoUploadPrepareOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GameLogoUploadPrepareCommandInput extends GameLogoUploadPrepareInput {
}
export interface GameLogoUploadPrepareCommandOutput extends GameLogoUploadPrepareOutput, __MetadataBearer {
}
/**
 * Prepares a game logo image upload.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameLogoUploadPrepareCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameLogoUploadPrepareCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameLogoUploadPrepareCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameLogoUploadPrepareCommandInput} for command's `input` shape.
 * @see {@link GameLogoUploadPrepareCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GameLogoUploadPrepareCommand extends $Command<GameLogoUploadPrepareCommandInput, GameLogoUploadPrepareCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GameLogoUploadPrepareCommandInput;
    constructor(input: GameLogoUploadPrepareCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GameLogoUploadPrepareCommandInput, GameLogoUploadPrepareCommandOutput>;
    private serialize;
    private deserialize;
}
