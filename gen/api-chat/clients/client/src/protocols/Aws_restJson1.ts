// smithy-typescript generated code
import {
  GetDirectThreadCommandInput,
  GetDirectThreadCommandOutput,
} from "../commands/GetDirectThreadCommand";
import {
  GetThreadHistoryCommandInput,
  GetThreadHistoryCommandOutput,
} from "../commands/GetThreadHistoryCommand";
import {
  GetThreadTopicCommandInput,
  GetThreadTopicCommandOutput,
} from "../commands/GetThreadTopicCommand";
import {
  SendChatMessageCommandInput,
  SendChatMessageCommandOutput,
} from "../commands/SendChatMessageCommand";
import {
  SetThreadReadCommandInput,
  SetThreadReadCommandOutput,
} from "../commands/SetThreadReadCommand";
import {
  SetTypingStatusCommandInput,
  SetTypingStatusCommandOutput,
} from "../commands/SetTypingStatusCommand";
import {
  WatchThreadCommandInput,
  WatchThreadCommandOutput,
} from "../commands/WatchThreadCommand";
import { ChatServiceServiceException as __BaseException } from "../models/ChatServiceServiceException";
import {
  BadRequestError,
  ChatIdentityTypingStatus,
  ChatMessage,
  ChatMessageBody,
  ChatMessageBodyChatCreate,
  ChatMessageBodyDeleted,
  ChatMessageBodyGroupJoin,
  ChatMessageBodyGroupLeave,
  ChatMessageBodyGroupMemberKick,
  ChatMessageBodyIdentityFollow,
  ChatMessageBodyPartyActivityChange,
  ChatMessageBodyPartyInvite,
  ChatMessageBodyPartyJoin,
  ChatMessageBodyPartyJoinRequest,
  ChatMessageBodyPartyLeave,
  ChatMessageBodyText,
  ChatSimpleTopic,
  ChatSimpleTopicDirect,
  ChatSimpleTopicGroup,
  ChatSimpleTopicParty,
  ChatTypingStatus,
  ForbiddenError,
  GameHandle,
  IdentityExternalLinks,
  IdentityGameActivity,
  IdentityHandle,
  IdentityPresence,
  InternalError,
  NotFoundError,
  PartyActivity,
  PartyActivityIdle,
  PartyActivityMatchmakerFindingLobby,
  PartyActivityMatchmakerLobby,
  PartyExternalLinks,
  PartyHandle,
  PartyMatchmakerLobby,
  RateLimitError,
  SendChatTopic,
  SendMessageBody,
  SendMessageBodyPartyInvite,
  SendMessageBodyText,
  UnauthorizedError,
  Unit,
  WatchResponse,
} from "../models/models_0";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@aws-sdk/protocol-http";
import {
  decorateServiceException as __decorateServiceException,
  expectBoolean as __expectBoolean,
  expectInt32 as __expectInt32,
  expectNonNull as __expectNonNull,
  expectObject as __expectObject,
  expectString as __expectString,
  expectUnion as __expectUnion,
  extendedEncodeURIComponent as __extendedEncodeURIComponent,
  parseRfc3339DateTime as __parseRfc3339DateTime,
} from "@aws-sdk/smithy-client";
import {
  DocumentType as __DocumentType,
  Endpoint as __Endpoint,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_restJson1GetDirectThreadCommand = async(
  input: GetDirectThreadCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/identities/{identity_id}/thread";
  if (input.identityId !== undefined) {
    const labelValue: string = input.identityId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: identityId.');
    }
    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: identityId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1GetThreadHistoryCommand = async(
  input: GetThreadHistoryCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/history";
  if (input.threadId !== undefined) {
    const labelValue: string = input.threadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: threadId.');
    }
    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: threadId.');
  }
  const query: any = {
    ...(input.ts !== undefined && { "ts": input.ts.toISOString().toString() }),
    ...(input.count !== undefined && { "count": input.count.toString() }),
    ...(input.queryDirection !== undefined && { "query_direction": input.queryDirection }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1GetThreadTopicCommand = async(
  input: GetThreadTopicCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/topic";
  if (input.threadId !== undefined) {
    const labelValue: string = input.threadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: threadId.');
    }
    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: threadId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1SendChatMessageCommand = async(
  input: SendChatMessageCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/messages";
  let body: any;
  body = JSON.stringify({
    ...(input.messageBody !== undefined && input.messageBody !== null &&{ "message_body": serializeAws_restJson1SendMessageBody(input.messageBody, context) }),
    ...(input.topic !== undefined && input.topic !== null &&{ "topic": serializeAws_restJson1SendChatTopic(input.topic, context) }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1SetThreadReadCommand = async(
  input: SetThreadReadCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/read";
  if (input.threadId !== undefined) {
    const labelValue: string = input.threadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: threadId.');
    }
    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: threadId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.lastReadTs !== undefined && input.lastReadTs !== null &&{ "last_read_ts": input.lastReadTs.toISOString() }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1SetTypingStatusCommand = async(
  input: SetTypingStatusCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/typing-status";
  if (input.threadId !== undefined) {
    const labelValue: string = input.threadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: threadId.');
    }
    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: threadId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.status !== undefined && input.status !== null &&{ "status": serializeAws_restJson1ChatTypingStatus(input.status, context) }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "PUT",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1WatchThreadCommand = async(
  input: WatchThreadCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/live";
  if (input.threadId !== undefined) {
    const labelValue: string = input.threadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: threadId.');
    }
    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: threadId.');
  }
  const query: any = {
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const deserializeAws_restJson1GetDirectThreadCommand = async(
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetDirectThreadCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1GetDirectThreadCommandError(output, context);
  }
  const contents: GetDirectThreadCommandOutput = {
    $metadata: deserializeMetadata(output),
    identity: undefined,
    threadId: undefined,
  };
  const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
  if (data.identity !== undefined && data.identity !== null) {
    contents.identity = deserializeAws_restJson1IdentityHandle(data.identity, context);
  }
  if (data.thread_id !== undefined && data.thread_id !== null) {
    contents.threadId = __expectString(data.thread_id);
  }
  return Promise.resolve(contents);
}

const deserializeAws_restJson1GetDirectThreadCommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<GetDirectThreadCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context)
  };
  let response: __BaseException;
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadRequestError":
    case "rivet.error#BadRequestError":
      throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
    case "ForbiddenError":
    case "rivet.error#ForbiddenError":
      throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
    case "InternalError":
    case "rivet.error#InternalError":
      throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
    case "NotFoundError":
    case "rivet.error#NotFoundError":
      throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
    case "RateLimitError":
    case "rivet.error#RateLimitError":
      throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
    case "UnauthorizedError":
    case "rivet.error#UnauthorizedError":
      throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      response = new __BaseException({
        name: parsedBody.code || parsedBody.Code || errorCode,
        $fault: "client",
        $metadata: deserializeMetadata(output)
      });
      throw __decorateServiceException(response, parsedBody);
    }
  }

  export const deserializeAws_restJson1GetThreadHistoryCommand = async(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetThreadHistoryCommandOutput> => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return deserializeAws_restJson1GetThreadHistoryCommandError(output, context);
    }
    const contents: GetThreadHistoryCommandOutput = {
      $metadata: deserializeMetadata(output),
      chatMessages: undefined,
    };
    const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
    if (data.chat_messages !== undefined && data.chat_messages !== null) {
      contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
    }
    return Promise.resolve(contents);
  }

  const deserializeAws_restJson1GetThreadHistoryCommandError = async(
    output: __HttpResponse,
    context: __SerdeContext,
  ): Promise<GetThreadHistoryCommandOutput> => {
    const parsedOutput: any = {
      ...output,
      body: await parseBody(output.body, context)
    };
    let response: __BaseException;
    let errorCode: string = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
      case "BadRequestError":
      case "rivet.error#BadRequestError":
        throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
      case "ForbiddenError":
      case "rivet.error#ForbiddenError":
        throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
      case "InternalError":
      case "rivet.error#InternalError":
        throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
      case "NotFoundError":
      case "rivet.error#NotFoundError":
        throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
      case "RateLimitError":
      case "rivet.error#RateLimitError":
        throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
      case "UnauthorizedError":
      case "rivet.error#UnauthorizedError":
        throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
      default:
        const parsedBody = parsedOutput.body;
        response = new __BaseException({
          name: parsedBody.code || parsedBody.Code || errorCode,
          $fault: "client",
          $metadata: deserializeMetadata(output)
        });
        throw __decorateServiceException(response, parsedBody);
      }
    }

    export const deserializeAws_restJson1GetThreadTopicCommand = async(
      output: __HttpResponse,
      context: __SerdeContext
    ): Promise<GetThreadTopicCommandOutput> => {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetThreadTopicCommandError(output, context);
      }
      const contents: GetThreadTopicCommandOutput = {
        $metadata: deserializeMetadata(output),
        topic: undefined,
      };
      const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
      if (data.topic !== undefined && data.topic !== null) {
        contents.topic = deserializeAws_restJson1ChatSimpleTopic(__expectUnion(data.topic), context);
      }
      return Promise.resolve(contents);
    }

    const deserializeAws_restJson1GetThreadTopicCommandError = async(
      output: __HttpResponse,
      context: __SerdeContext,
    ): Promise<GetThreadTopicCommandOutput> => {
      const parsedOutput: any = {
        ...output,
        body: await parseBody(output.body, context)
      };
      let response: __BaseException;
      let errorCode: string = "UnknownError";
      errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
      switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
          throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
          throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
          throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
          throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
          throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
          throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
          const parsedBody = parsedOutput.body;
          response = new __BaseException({
            name: parsedBody.code || parsedBody.Code || errorCode,
            $fault: "client",
            $metadata: deserializeMetadata(output)
          });
          throw __decorateServiceException(response, parsedBody);
        }
      }

      export const deserializeAws_restJson1SendChatMessageCommand = async(
        output: __HttpResponse,
        context: __SerdeContext
      ): Promise<SendChatMessageCommandOutput> => {
        if (output.statusCode !== 200 && output.statusCode >= 300) {
          return deserializeAws_restJson1SendChatMessageCommandError(output, context);
        }
        const contents: SendChatMessageCommandOutput = {
          $metadata: deserializeMetadata(output),
          chatMessageId: undefined,
        };
        const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
        if (data.chat_message_id !== undefined && data.chat_message_id !== null) {
          contents.chatMessageId = __expectString(data.chat_message_id);
        }
        return Promise.resolve(contents);
      }

      const deserializeAws_restJson1SendChatMessageCommandError = async(
        output: __HttpResponse,
        context: __SerdeContext,
      ): Promise<SendChatMessageCommandOutput> => {
        const parsedOutput: any = {
          ...output,
          body: await parseBody(output.body, context)
        };
        let response: __BaseException;
        let errorCode: string = "UnknownError";
        errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
        switch (errorCode) {
          case "BadRequestError":
          case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
          case "ForbiddenError":
          case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
          case "InternalError":
          case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
          case "NotFoundError":
          case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
          case "RateLimitError":
          case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
          case "UnauthorizedError":
          case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
          default:
            const parsedBody = parsedOutput.body;
            response = new __BaseException({
              name: parsedBody.code || parsedBody.Code || errorCode,
              $fault: "client",
              $metadata: deserializeMetadata(output)
            });
            throw __decorateServiceException(response, parsedBody);
          }
        }

        export const deserializeAws_restJson1SetThreadReadCommand = async(
          output: __HttpResponse,
          context: __SerdeContext
        ): Promise<SetThreadReadCommandOutput> => {
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return deserializeAws_restJson1SetThreadReadCommandError(output, context);
          }
          const contents: SetThreadReadCommandOutput = {
            $metadata: deserializeMetadata(output),
          };
          await collectBody(output.body, context);
          return Promise.resolve(contents);
        }

        const deserializeAws_restJson1SetThreadReadCommandError = async(
          output: __HttpResponse,
          context: __SerdeContext,
        ): Promise<SetThreadReadCommandOutput> => {
          const parsedOutput: any = {
            ...output,
            body: await parseBody(output.body, context)
          };
          let response: __BaseException;
          let errorCode: string = "UnknownError";
          errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
          switch (errorCode) {
            case "BadRequestError":
            case "rivet.error#BadRequestError":
              throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
            case "ForbiddenError":
            case "rivet.error#ForbiddenError":
              throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
            case "InternalError":
            case "rivet.error#InternalError":
              throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
            case "NotFoundError":
            case "rivet.error#NotFoundError":
              throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
            case "RateLimitError":
            case "rivet.error#RateLimitError":
              throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
            case "UnauthorizedError":
            case "rivet.error#UnauthorizedError":
              throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
            default:
              const parsedBody = parsedOutput.body;
              response = new __BaseException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
              });
              throw __decorateServiceException(response, parsedBody);
            }
          }

          export const deserializeAws_restJson1SetTypingStatusCommand = async(
            output: __HttpResponse,
            context: __SerdeContext
          ): Promise<SetTypingStatusCommandOutput> => {
            if (output.statusCode !== 200 && output.statusCode >= 300) {
              return deserializeAws_restJson1SetTypingStatusCommandError(output, context);
            }
            const contents: SetTypingStatusCommandOutput = {
              $metadata: deserializeMetadata(output),
            };
            await collectBody(output.body, context);
            return Promise.resolve(contents);
          }

          const deserializeAws_restJson1SetTypingStatusCommandError = async(
            output: __HttpResponse,
            context: __SerdeContext,
          ): Promise<SetTypingStatusCommandOutput> => {
            const parsedOutput: any = {
              ...output,
              body: await parseBody(output.body, context)
            };
            let response: __BaseException;
            let errorCode: string = "UnknownError";
            errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
            switch (errorCode) {
              case "BadRequestError":
              case "rivet.error#BadRequestError":
                throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
              case "ForbiddenError":
              case "rivet.error#ForbiddenError":
                throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
              case "InternalError":
              case "rivet.error#InternalError":
                throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
              case "NotFoundError":
              case "rivet.error#NotFoundError":
                throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
              case "RateLimitError":
              case "rivet.error#RateLimitError":
                throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
              case "UnauthorizedError":
              case "rivet.error#UnauthorizedError":
                throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
              default:
                const parsedBody = parsedOutput.body;
                response = new __BaseException({
                  name: parsedBody.code || parsedBody.Code || errorCode,
                  $fault: "client",
                  $metadata: deserializeMetadata(output)
                });
                throw __decorateServiceException(response, parsedBody);
              }
            }

            export const deserializeAws_restJson1WatchThreadCommand = async(
              output: __HttpResponse,
              context: __SerdeContext
            ): Promise<WatchThreadCommandOutput> => {
              if (output.statusCode !== 200 && output.statusCode >= 300) {
                return deserializeAws_restJson1WatchThreadCommandError(output, context);
              }
              const contents: WatchThreadCommandOutput = {
                $metadata: deserializeMetadata(output),
                chatMessages: undefined,
                typingStatuses: undefined,
                watch: undefined,
              };
              const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
              if (data.chat_messages !== undefined && data.chat_messages !== null) {
                contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
              }
              if (data.typing_statuses !== undefined && data.typing_statuses !== null) {
                contents.typingStatuses = deserializeAws_restJson1ChatIdentityTypingStatuses(data.typing_statuses, context);
              }
              if (data.watch !== undefined && data.watch !== null) {
                contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
              }
              return Promise.resolve(contents);
            }

            const deserializeAws_restJson1WatchThreadCommandError = async(
              output: __HttpResponse,
              context: __SerdeContext,
            ): Promise<WatchThreadCommandOutput> => {
              const parsedOutput: any = {
                ...output,
                body: await parseBody(output.body, context)
              };
              let response: __BaseException;
              let errorCode: string = "UnknownError";
              errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
              switch (errorCode) {
                case "BadRequestError":
                case "rivet.error#BadRequestError":
                  throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
                case "ForbiddenError":
                case "rivet.error#ForbiddenError":
                  throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
                case "InternalError":
                case "rivet.error#InternalError":
                  throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
                case "NotFoundError":
                case "rivet.error#NotFoundError":
                  throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
                case "RateLimitError":
                case "rivet.error#RateLimitError":
                  throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
                case "UnauthorizedError":
                case "rivet.error#UnauthorizedError":
                  throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
                default:
                  const parsedBody = parsedOutput.body;
                  response = new __BaseException({
                    name: parsedBody.code || parsedBody.Code || errorCode,
                    $fault: "client",
                    $metadata: deserializeMetadata(output)
                  });
                  throw __decorateServiceException(response, parsedBody);
                }
              }

              const deserializeAws_restJson1BadRequestErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<BadRequestError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new BadRequestError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const deserializeAws_restJson1ForbiddenErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<ForbiddenError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new ForbiddenError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const deserializeAws_restJson1InternalErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<InternalError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new InternalError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const deserializeAws_restJson1NotFoundErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<NotFoundError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new NotFoundError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const deserializeAws_restJson1RateLimitErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<RateLimitError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new RateLimitError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const deserializeAws_restJson1UnauthorizedErrorResponse = async (
                parsedOutput: any,
                context: __SerdeContext
              ): Promise<UnauthorizedError> => {
                const contents: any = {};
                const data: any = parsedOutput.body;
                if (data.code !== undefined && data.code !== null) {
                  contents.code = __expectString(data.code);
                }
                if (data.documentation !== undefined && data.documentation !== null) {
                  contents.documentation = __expectString(data.documentation);
                }
                if (data.message !== undefined && data.message !== null) {
                  contents.message = __expectString(data.message);
                }
                if (data.metadata !== undefined && data.metadata !== null) {
                  contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
                }
                const exception = new UnauthorizedError({
                  $metadata: deserializeMetadata(parsedOutput),
                  ...contents
                });
                return __decorateServiceException(exception, parsedOutput.body);
              };

              const serializeAws_restJson1SendChatTopic = (
                input: SendChatTopic,
                context: __SerdeContext
              ): any => {
                return SendChatTopic.visit(input, {
                  groupId: value => ({ "group_id": value }),
                  identityId: value => ({ "identity_id": value }),
                  partyId: value => ({ "party_id": value }),
                  threadId: value => ({ "thread_id": value }),
                  _: (name, value) => ({ name: value } as any)
                });
              }

              const serializeAws_restJson1SendMessageBody = (
                input: SendMessageBody,
                context: __SerdeContext
              ): any => {
                return SendMessageBody.visit(input, {
                  partyInvite: value => ({ "party_invite": serializeAws_restJson1SendMessageBodyPartyInvite(value, context) }),
                  text: value => ({ "text": serializeAws_restJson1SendMessageBodyText(value, context) }),
                  _: (name, value) => ({ name: value } as any)
                });
              }

              const serializeAws_restJson1SendMessageBodyPartyInvite = (
                input: SendMessageBodyPartyInvite,
                context: __SerdeContext
              ): any => {
                return {
                  ...(input.token !== undefined && input.token !== null && { "token": input.token }),
                };
              }

              const serializeAws_restJson1SendMessageBodyText = (
                input: SendMessageBodyText,
                context: __SerdeContext
              ): any => {
                return {
                  ...(input.body !== undefined && input.body !== null && { "body": input.body }),
                };
              }

              const serializeAws_restJson1ChatTypingStatus = (
                input: ChatTypingStatus,
                context: __SerdeContext
              ): any => {
                return ChatTypingStatus.visit(input, {
                  idle: value => ({ "idle": serializeAws_restJson1Unit(value, context) }),
                  typing: value => ({ "typing": serializeAws_restJson1Unit(value, context) }),
                  _: (name, value) => ({ name: value } as any)
                });
              }

              const serializeAws_restJson1Unit = (
                input: Unit,
                context: __SerdeContext
              ): any => {
                return {
                };
              }

              const deserializeAws_restJson1ChatIdentityTypingStatus = (
                output: any,
                context: __SerdeContext
              ): ChatIdentityTypingStatus => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                  status: (output.status !== undefined && output.status !== null) ? deserializeAws_restJson1ChatTypingStatus(__expectUnion(output.status), context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatIdentityTypingStatuses = (
                output: any,
                context: __SerdeContext
              ): (ChatIdentityTypingStatus)[] => {
                const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                  if (entry === null) {
                    return null as any;
                  }
                  return deserializeAws_restJson1ChatIdentityTypingStatus(entry, context);
                });
                return retVal;
              }

              const deserializeAws_restJson1ChatMessage = (
                output: any,
                context: __SerdeContext
              ): ChatMessage => {
                return {
                  body: (output.body !== undefined && output.body !== null) ? deserializeAws_restJson1ChatMessageBody(__expectUnion(output.body), context): undefined,
                  chatMessageId: __expectString(output.chat_message_id),
                  sendTs: (output.send_ts !== undefined && output.send_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.send_ts)): undefined,
                  threadId: __expectString(output.thread_id),
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBody = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBody => {
                if (output.chat_create !== undefined && output.chat_create !== null) {
                  return {
                    chatCreate: deserializeAws_restJson1ChatMessageBodyChatCreate(output.chat_create, context)
                  };
                }
                if (output.deleted !== undefined && output.deleted !== null) {
                  return {
                    deleted: deserializeAws_restJson1ChatMessageBodyDeleted(output.deleted, context)
                  };
                }
                if (output.group_join !== undefined && output.group_join !== null) {
                  return {
                    groupJoin: deserializeAws_restJson1ChatMessageBodyGroupJoin(output.group_join, context)
                  };
                }
                if (output.group_leave !== undefined && output.group_leave !== null) {
                  return {
                    groupLeave: deserializeAws_restJson1ChatMessageBodyGroupLeave(output.group_leave, context)
                  };
                }
                if (output.group_member_kick !== undefined && output.group_member_kick !== null) {
                  return {
                    groupMemberKick: deserializeAws_restJson1ChatMessageBodyGroupMemberKick(output.group_member_kick, context)
                  };
                }
                if (output.identity_follow !== undefined && output.identity_follow !== null) {
                  return {
                    identityFollow: deserializeAws_restJson1ChatMessageBodyIdentityFollow(output.identity_follow, context)
                  };
                }
                if (output.party_activity_change !== undefined && output.party_activity_change !== null) {
                  return {
                    partyActivityChange: deserializeAws_restJson1ChatMessageBodyPartyActivityChange(output.party_activity_change, context)
                  };
                }
                if (output.party_invite !== undefined && output.party_invite !== null) {
                  return {
                    partyInvite: deserializeAws_restJson1ChatMessageBodyPartyInvite(output.party_invite, context)
                  };
                }
                if (output.party_join !== undefined && output.party_join !== null) {
                  return {
                    partyJoin: deserializeAws_restJson1ChatMessageBodyPartyJoin(output.party_join, context)
                  };
                }
                if (output.party_join_request !== undefined && output.party_join_request !== null) {
                  return {
                    partyJoinRequest: deserializeAws_restJson1ChatMessageBodyPartyJoinRequest(output.party_join_request, context)
                  };
                }
                if (output.party_leave !== undefined && output.party_leave !== null) {
                  return {
                    partyLeave: deserializeAws_restJson1ChatMessageBodyPartyLeave(output.party_leave, context)
                  };
                }
                if (output.text !== undefined && output.text !== null) {
                  return {
                    text: deserializeAws_restJson1ChatMessageBodyText(output.text, context)
                  };
                }
                return { $unknown: Object.entries(output)[0] };
              }

              const deserializeAws_restJson1ChatMessageBodyChatCreate = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyChatCreate => {
                return {
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyDeleted = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyDeleted => {
                return {
                  sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyGroupJoin = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyGroupJoin => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyGroupLeave = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyGroupLeave => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyGroupMemberKick = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyGroupMemberKick => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyIdentityFollow = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyIdentityFollow => {
                return {
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyPartyActivityChange = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyPartyActivityChange => {
                return {
                  activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity(__expectUnion(output.activity), context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyPartyInvite = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyPartyInvite => {
                return {
                  inviteToken: __expectString(output.invite_token),
                  party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context): undefined,
                  sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyPartyJoin = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyPartyJoin => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyPartyJoinRequest = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyPartyJoinRequest => {
                return {
                  sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyPartyLeave = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyPartyLeave => {
                return {
                  identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessageBodyText = (
                output: any,
                context: __SerdeContext
              ): ChatMessageBodyText => {
                return {
                  body: __expectString(output.body),
                  sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1ChatMessages = (
                output: any,
                context: __SerdeContext
              ): (ChatMessage)[] => {
                const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                  if (entry === null) {
                    return null as any;
                  }
                  return deserializeAws_restJson1ChatMessage(entry, context);
                });
                return retVal;
              }

              const deserializeAws_restJson1ChatSimpleTopic = (
                output: any,
                context: __SerdeContext
              ): ChatSimpleTopic => {
                if (output.direct !== undefined && output.direct !== null) {
                  return {
                    direct: deserializeAws_restJson1ChatSimpleTopicDirect(output.direct, context)
                  };
                }
                if (output.group !== undefined && output.group !== null) {
                  return {
                    group: deserializeAws_restJson1ChatSimpleTopicGroup(output.group, context)
                  };
                }
                if (output.party !== undefined && output.party !== null) {
                  return {
                    party: deserializeAws_restJson1ChatSimpleTopicParty(output.party, context)
                  };
                }
                return { $unknown: Object.entries(output)[0] };
              }

              const deserializeAws_restJson1ChatSimpleTopicDirect = (
                output: any,
                context: __SerdeContext
              ): ChatSimpleTopicDirect => {
                return {
                  identityAId: __expectString(output.identity_a_id),
                  identityBId: __expectString(output.identity_b_id),
                } as any;
              }

              const deserializeAws_restJson1ChatSimpleTopicGroup = (
                output: any,
                context: __SerdeContext
              ): ChatSimpleTopicGroup => {
                return {
                  groupId: __expectString(output.group_id),
                } as any;
              }

              const deserializeAws_restJson1ChatSimpleTopicParty = (
                output: any,
                context: __SerdeContext
              ): ChatSimpleTopicParty => {
                return {
                  partyId: __expectString(output.party_id),
                } as any;
              }

              const deserializeAws_restJson1ChatTypingStatus = (
                output: any,
                context: __SerdeContext
              ): ChatTypingStatus => {
                if (output.idle !== undefined && output.idle !== null) {
                  return {
                    idle: deserializeAws_restJson1Unit(output.idle, context)
                  };
                }
                if (output.typing !== undefined && output.typing !== null) {
                  return {
                    typing: deserializeAws_restJson1Unit(output.typing, context)
                  };
                }
                return { $unknown: Object.entries(output)[0] };
              }

              const deserializeAws_restJson1WatchResponse = (
                output: any,
                context: __SerdeContext
              ): WatchResponse => {
                return {
                  index: __expectString(output.index),
                } as any;
              }

              const deserializeAws_restJson1ErrorMetadata = (
                output: any,
                context: __SerdeContext
              ): __DocumentType => {
                return output;
              }

              const deserializeAws_restJson1GameHandle = (
                output: any,
                context: __SerdeContext
              ): GameHandle => {
                return {
                  bannerUrl: __expectString(output.banner_url),
                  displayName: __expectString(output.display_name),
                  gameId: __expectString(output.game_id),
                  logoUrl: __expectString(output.logo_url),
                  nameId: __expectString(output.name_id),
                } as any;
              }

              const deserializeAws_restJson1IdentityExternalLinks = (
                output: any,
                context: __SerdeContext
              ): IdentityExternalLinks => {
                return {
                  chat: __expectString(output.chat),
                  profile: __expectString(output.profile),
                  settings: __expectString(output.settings),
                } as any;
              }

              const deserializeAws_restJson1IdentityGameActivity = (
                output: any,
                context: __SerdeContext
              ): IdentityGameActivity => {
                return {
                  game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                  message: __expectString(output.message),
                  mutualMetadata: (output.mutual_metadata !== undefined && output.mutual_metadata !== null) ? deserializeAws_restJson1Document(output.mutual_metadata, context): undefined,
                  publicMetadata: (output.public_metadata !== undefined && output.public_metadata !== null) ? deserializeAws_restJson1Document(output.public_metadata, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1IdentityHandle = (
                output: any,
                context: __SerdeContext
              ): IdentityHandle => {
                return {
                  accountNumber: __expectInt32(output.account_number),
                  avatarUrl: __expectString(output.avatar_url),
                  displayName: __expectString(output.display_name),
                  external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1IdentityExternalLinks(output.external, context): undefined,
                  identityId: __expectString(output.identity_id),
                  isRegistered: __expectBoolean(output.is_registered),
                  party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context): undefined,
                  presence: (output.presence !== undefined && output.presence !== null) ? deserializeAws_restJson1IdentityPresence(output.presence, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1IdentityPresence = (
                output: any,
                context: __SerdeContext
              ): IdentityPresence => {
                return {
                  gameActivity: (output.game_activity !== undefined && output.game_activity !== null) ? deserializeAws_restJson1IdentityGameActivity(output.game_activity, context): undefined,
                  status: __expectString(output.status),
                  updateTs: (output.update_ts !== undefined && output.update_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.update_ts)): undefined,
                } as any;
              }

              const deserializeAws_restJson1PartyActivity = (
                output: any,
                context: __SerdeContext
              ): PartyActivity => {
                if (output.idle !== undefined && output.idle !== null) {
                  return {
                    idle: deserializeAws_restJson1PartyActivityIdle(output.idle, context)
                  };
                }
                if (output.matchmaker_finding_lobby !== undefined && output.matchmaker_finding_lobby !== null) {
                  return {
                    matchmakerFindingLobby: deserializeAws_restJson1PartyActivityMatchmakerFindingLobby(output.matchmaker_finding_lobby, context)
                  };
                }
                if (output.matchmaker_lobby !== undefined && output.matchmaker_lobby !== null) {
                  return {
                    matchmakerLobby: deserializeAws_restJson1PartyActivityMatchmakerLobby(output.matchmaker_lobby, context)
                  };
                }
                return { $unknown: Object.entries(output)[0] };
              }

              const deserializeAws_restJson1PartyActivityIdle = (
                output: any,
                context: __SerdeContext
              ): PartyActivityIdle => {
                return {
                } as any;
              }

              const deserializeAws_restJson1PartyActivityMatchmakerFindingLobby = (
                output: any,
                context: __SerdeContext
              ): PartyActivityMatchmakerFindingLobby => {
                return {
                  game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1PartyActivityMatchmakerLobby = (
                output: any,
                context: __SerdeContext
              ): PartyActivityMatchmakerLobby => {
                return {
                  game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                  lobby: (output.lobby !== undefined && output.lobby !== null) ? deserializeAws_restJson1PartyMatchmakerLobby(output.lobby, context): undefined,
                } as any;
              }

              const deserializeAws_restJson1PartyExternalLinks = (
                output: any,
                context: __SerdeContext
              ): PartyExternalLinks => {
                return {
                  chat: __expectString(output.chat),
                } as any;
              }

              const deserializeAws_restJson1PartyHandle = (
                output: any,
                context: __SerdeContext
              ): PartyHandle => {
                return {
                  activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity(__expectUnion(output.activity), context): undefined,
                  createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)): undefined,
                  external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1PartyExternalLinks(output.external, context): undefined,
                  partyId: __expectString(output.party_id),
                } as any;
              }

              const deserializeAws_restJson1PartyMatchmakerLobby = (
                output: any,
                context: __SerdeContext
              ): PartyMatchmakerLobby => {
                return {
                  lobbyId: __expectString(output.lobby_id),
                } as any;
              }

              const deserializeAws_restJson1Document = (
                output: any,
                context: __SerdeContext
              ): __DocumentType => {
                return output;
              }

              const deserializeAws_restJson1Unit = (
                output: any,
                context: __SerdeContext
              ): Unit => {
                return {
                } as any;
              }

              const deserializeMetadata = (output: __HttpResponse): __ResponseMetadata => ({
                httpStatusCode: output.statusCode,
                requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"],
                extendedRequestId: output.headers["x-amz-id-2"],
                cfId: output.headers["x-amz-cf-id"],
              });

              // Collect low-level response body stream to Uint8Array.
              const collectBody = (streamBody: any = new Uint8Array(), context: __SerdeContext): Promise<Uint8Array> => {
                if (streamBody instanceof Uint8Array) {
                  return Promise.resolve(streamBody);
                }
                return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
              };

              // Encode Uint8Array data into string with utf-8.
              const collectBodyString = (streamBody: any, context: __SerdeContext): Promise<string> => collectBody(streamBody, context).then(body => context.utf8Encoder(body))

              const isSerializableHeaderValue = (value: any): boolean =>
                value !== undefined &&
                value !== null &&
                value !== "" &&
                (!Object.getOwnPropertyNames(value).includes("length") ||
                  value.length != 0) &&
                (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);

              const parseBody = (streamBody: any, context: __SerdeContext): any => collectBodyString(streamBody, context).then(encoded => {
                if (encoded.length) {
                  return JSON.parse(encoded);
                }
                return {};
              });

              /**
               * Load an error code for the aws.rest-json-1.1 protocol.
               */
              const loadRestJsonErrorCode = (output: __HttpResponse, data: any): string => {
                const findKey = (object: any, key: string) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());

                const sanitizeErrorCode = (rawValue: string): string => {
                  let cleanValue = rawValue;
                  if (cleanValue.indexOf(":") >= 0) {
                    cleanValue = cleanValue.split(":")[0];
                  }
                  if (cleanValue.indexOf("#") >= 0) {
                    cleanValue = cleanValue.split("#")[1];
                  }
                  return cleanValue;
                };

                const headerKey = findKey(output.headers, "x-amzn-errortype");
                if (headerKey !== undefined) {
                  return sanitizeErrorCode(output.headers[headerKey]);
                }

                if (data.code !== undefined) {
                  return sanitizeErrorCode(data.code);
                }

                if (data["__type"] !== undefined) {
                  return sanitizeErrorCode(data["__type"]);
                }

                return "";
              };
