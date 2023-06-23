import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GameBannerUploadPrepareInput, GameBannerUploadPrepareOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GameBannerUploadPrepareCommandInput extends GameBannerUploadPrepareInput {
}
export interface GameBannerUploadPrepareCommandOutput extends GameBannerUploadPrepareOutput, __MetadataBearer {
}
/**
 * Prepares a game banner image upload.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameBannerUploadPrepareCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameBannerUploadPrepareCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameBannerUploadPrepareCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameBannerUploadPrepareCommandInput} for command's `input` shape.
 * @see {@link GameBannerUploadPrepareCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GameBannerUploadPrepareCommand extends $Command<GameBannerUploadPrepareCommandInput, GameBannerUploadPrepareCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GameBannerUploadPrepareCommandInput;
    constructor(input: GameBannerUploadPrepareCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GameBannerUploadPrepareCommandInput, GameBannerUploadPrepareCommandOutput>;
    private serialize;
    private deserialize;
}
