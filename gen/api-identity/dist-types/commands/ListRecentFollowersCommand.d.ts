import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { ListRecentFollowersInput, ListRecentFollowersOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListRecentFollowersCommandInput extends ListRecentFollowersInput {
}
export interface ListRecentFollowersCommandOutput extends ListRecentFollowersOutput, __MetadataBearer {
}
export declare class ListRecentFollowersCommand extends $Command<ListRecentFollowersCommandInput, ListRecentFollowersCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: ListRecentFollowersCommandInput;
    constructor(input: ListRecentFollowersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListRecentFollowersCommandInput, ListRecentFollowersCommandOutput>;
    private serialize;
    private deserialize;
}
