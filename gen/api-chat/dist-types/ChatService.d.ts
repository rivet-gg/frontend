import { ChatServiceClient } from "./ChatServiceClient";
import { GetDirectThreadCommandInput, GetDirectThreadCommandOutput } from "./commands/GetDirectThreadCommand";
import { GetThreadHistoryCommandInput, GetThreadHistoryCommandOutput } from "./commands/GetThreadHistoryCommand";
import { GetThreadTopicCommandInput, GetThreadTopicCommandOutput } from "./commands/GetThreadTopicCommand";
import { SendChatMessageCommandInput, SendChatMessageCommandOutput } from "./commands/SendChatMessageCommand";
import { SetThreadReadCommandInput, SetThreadReadCommandOutput } from "./commands/SetThreadReadCommand";
import { SetTypingStatusCommandInput, SetTypingStatusCommandOutput } from "./commands/SetTypingStatusCommand";
import { WatchThreadCommandInput, WatchThreadCommandOutput } from "./commands/WatchThreadCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class ChatService extends ChatServiceClient {
    /**
     * Returns a thread ID with a given identity.
     */
    getDirectThread(args: GetDirectThreadCommandInput, options?: __HttpHandlerOptions): Promise<GetDirectThreadCommandOutput>;
    getDirectThread(args: GetDirectThreadCommandInput, cb: (err: any, data?: GetDirectThreadCommandOutput) => void): void;
    getDirectThread(args: GetDirectThreadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetDirectThreadCommandOutput) => void): void;
    /**
     * Returns message history for a given thread in a certain direction.
     *
     * Defaults to querying messages before ts.
     */
    getThreadHistory(args: GetThreadHistoryCommandInput, options?: __HttpHandlerOptions): Promise<GetThreadHistoryCommandOutput>;
    getThreadHistory(args: GetThreadHistoryCommandInput, cb: (err: any, data?: GetThreadHistoryCommandOutput) => void): void;
    getThreadHistory(args: GetThreadHistoryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetThreadHistoryCommandOutput) => void): void;
    /**
     * Fetches the topic of a thread.
     */
    getThreadTopic(args: GetThreadTopicCommandInput, options?: __HttpHandlerOptions): Promise<GetThreadTopicCommandOutput>;
    getThreadTopic(args: GetThreadTopicCommandInput, cb: (err: any, data?: GetThreadTopicCommandOutput) => void): void;
    getThreadTopic(args: GetThreadTopicCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetThreadTopicCommandOutput) => void): void;
    /**
     * Sends a chat message to a given topic.
     */
    sendChatMessage(args: SendChatMessageCommandInput, options?: __HttpHandlerOptions): Promise<SendChatMessageCommandOutput>;
    sendChatMessage(args: SendChatMessageCommandInput, cb: (err: any, data?: SendChatMessageCommandOutput) => void): void;
    sendChatMessage(args: SendChatMessageCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SendChatMessageCommandOutput) => void): void;
    /**
     * Updates the current identity's last read timestamp in the given thread.
     */
    setThreadRead(args: SetThreadReadCommandInput, options?: __HttpHandlerOptions): Promise<SetThreadReadCommandOutput>;
    setThreadRead(args: SetThreadReadCommandInput, cb: (err: any, data?: SetThreadReadCommandOutput) => void): void;
    setThreadRead(args: SetThreadReadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SetThreadReadCommandOutput) => void): void;
    /**
     * Updates the current identity's typing status in the given thread.
     */
    setTypingStatus(args: SetTypingStatusCommandInput, options?: __HttpHandlerOptions): Promise<SetTypingStatusCommandOutput>;
    setTypingStatus(args: SetTypingStatusCommandInput, cb: (err: any, data?: SetTypingStatusCommandOutput) => void): void;
    setTypingStatus(args: SetTypingStatusCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SetTypingStatusCommandOutput) => void): void;
    /**
     * Fetches all relevant changes from a thread that have happened since the
     * given watch index.
     */
    watchThread(args: WatchThreadCommandInput, options?: __HttpHandlerOptions): Promise<WatchThreadCommandOutput>;
    watchThread(args: WatchThreadCommandInput, cb: (err: any, data?: WatchThreadCommandOutput) => void): void;
    watchThread(args: WatchThreadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: WatchThreadCommandOutput) => void): void;
}
