import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { ListMutualFriendsInput, ListMutualFriendsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListMutualFriendsCommandInput extends ListMutualFriendsInput {
}
export interface ListMutualFriendsCommandOutput extends ListMutualFriendsOutput, __MetadataBearer {
}
export declare class ListMutualFriendsCommand extends $Command<ListMutualFriendsCommandInput, ListMutualFriendsCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: ListMutualFriendsCommandInput;
    constructor(input: ListMutualFriendsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListMutualFriendsCommandInput, ListMutualFriendsCommandOutput>;
    private serialize;
    private deserialize;
}
