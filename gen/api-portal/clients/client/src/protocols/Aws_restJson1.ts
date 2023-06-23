// smithy-typescript generated code
import {
  GetGameProfileCommandInput,
  GetGameProfileCommandOutput,
} from "../commands/GetGameProfileCommand";
import {
  GetSuggestedGamesCommandInput,
  GetSuggestedGamesCommandOutput,
} from "../commands/GetSuggestedGamesCommand";
import {
  RegisterNotificationsCommandInput,
  RegisterNotificationsCommandOutput,
} from "../commands/RegisterNotificationsCommand";
import {
  ResolveBetaJoinRequestCommandInput,
  ResolveBetaJoinRequestCommandOutput,
} from "../commands/ResolveBetaJoinRequestCommand";
import {
  UnregisterNotificationsCommandInput,
  UnregisterNotificationsCommandOutput,
} from "../commands/UnregisterNotificationsCommand";
import { PortalServiceServiceException as __BaseException } from "../models/PortalServiceServiceException";
import {
  BadRequestError,
  ForbiddenError,
  GameLeaderboardCategory,
  GamePlatformLink,
  GameProfile,
  GameSummary,
  GroupExternalLinks,
  GroupHandle,
  GroupSummary,
  InternalError,
  NotFoundError,
  NotificationRegisterFirebaseService,
  NotificationRegisterService,
  RateLimitError,
  UnauthorizedError,
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
  extendedEncodeURIComponent as __extendedEncodeURIComponent,
} from "@aws-sdk/smithy-client";
import {
  DocumentType as __DocumentType,
  Endpoint as __Endpoint,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_restJson1GetGameProfileCommand = async(
  input: GetGameProfileCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_name_id}/profile";
  if (input.gameNameId !== undefined) {
    const labelValue: string = input.gameNameId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: gameNameId.');
    }
    resolvedPath = resolvedPath.replace("{game_name_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: gameNameId.');
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

export const serializeAws_restJson1GetSuggestedGamesCommand = async(
  input: GetSuggestedGamesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/games";
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

export const serializeAws_restJson1RegisterNotificationsCommand = async(
  input: RegisterNotificationsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/notifications/register";
  let body: any;
  body = JSON.stringify({
    ...(input.service !== undefined && input.service !== null &&{ "service": serializeAws_restJson1NotificationRegisterService(input.service, context) }),
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

export const serializeAws_restJson1ResolveBetaJoinRequestCommand = async(
  input: ResolveBetaJoinRequestCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/beta-join-request/{identity_id}";
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
  body = JSON.stringify({
    ...(input.resolution !== undefined && input.resolution !== null &&{ "resolution": input.resolution }),
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

export const serializeAws_restJson1UnregisterNotificationsCommand = async(
  input: UnregisterNotificationsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/notifications/register";
  const query: any = {
    ...(input.service !== undefined && { "service": input.service }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "DELETE",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const deserializeAws_restJson1GetGameProfileCommand = async(
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetGameProfileCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1GetGameProfileCommandError(output, context);
  }
  const contents: GetGameProfileCommandOutput = {
    $metadata: deserializeMetadata(output),
    game: undefined,
    watch: undefined,
  };
  const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
  if (data.game !== undefined && data.game !== null) {
    contents.game = deserializeAws_restJson1GameProfile(data.game, context);
  }
  if (data.watch !== undefined && data.watch !== null) {
    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
  }
  return Promise.resolve(contents);
}

const deserializeAws_restJson1GetGameProfileCommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<GetGameProfileCommandOutput> => {
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

  export const deserializeAws_restJson1GetSuggestedGamesCommand = async(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetSuggestedGamesCommandOutput> => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return deserializeAws_restJson1GetSuggestedGamesCommandError(output, context);
    }
    const contents: GetSuggestedGamesCommandOutput = {
      $metadata: deserializeMetadata(output),
      games: undefined,
      watch: undefined,
    };
    const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
    if (data.games !== undefined && data.games !== null) {
      contents.games = deserializeAws_restJson1GameSummaries(data.games, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
      contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
  }

  const deserializeAws_restJson1GetSuggestedGamesCommandError = async(
    output: __HttpResponse,
    context: __SerdeContext,
  ): Promise<GetSuggestedGamesCommandOutput> => {
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

    export const deserializeAws_restJson1RegisterNotificationsCommand = async(
      output: __HttpResponse,
      context: __SerdeContext
    ): Promise<RegisterNotificationsCommandOutput> => {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1RegisterNotificationsCommandError(output, context);
      }
      const contents: RegisterNotificationsCommandOutput = {
        $metadata: deserializeMetadata(output),
      };
      await collectBody(output.body, context);
      return Promise.resolve(contents);
    }

    const deserializeAws_restJson1RegisterNotificationsCommandError = async(
      output: __HttpResponse,
      context: __SerdeContext,
    ): Promise<RegisterNotificationsCommandOutput> => {
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

      export const deserializeAws_restJson1ResolveBetaJoinRequestCommand = async(
        output: __HttpResponse,
        context: __SerdeContext
      ): Promise<ResolveBetaJoinRequestCommandOutput> => {
        if (output.statusCode !== 200 && output.statusCode >= 300) {
          return deserializeAws_restJson1ResolveBetaJoinRequestCommandError(output, context);
        }
        const contents: ResolveBetaJoinRequestCommandOutput = {
          $metadata: deserializeMetadata(output),
        };
        await collectBody(output.body, context);
        return Promise.resolve(contents);
      }

      const deserializeAws_restJson1ResolveBetaJoinRequestCommandError = async(
        output: __HttpResponse,
        context: __SerdeContext,
      ): Promise<ResolveBetaJoinRequestCommandOutput> => {
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

        export const deserializeAws_restJson1UnregisterNotificationsCommand = async(
          output: __HttpResponse,
          context: __SerdeContext
        ): Promise<UnregisterNotificationsCommandOutput> => {
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return deserializeAws_restJson1UnregisterNotificationsCommandError(output, context);
          }
          const contents: UnregisterNotificationsCommandOutput = {
            $metadata: deserializeMetadata(output),
          };
          await collectBody(output.body, context);
          return Promise.resolve(contents);
        }

        const deserializeAws_restJson1UnregisterNotificationsCommandError = async(
          output: __HttpResponse,
          context: __SerdeContext,
        ): Promise<UnregisterNotificationsCommandOutput> => {
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

          const serializeAws_restJson1NotificationRegisterFirebaseService = (
            input: NotificationRegisterFirebaseService,
            context: __SerdeContext
          ): any => {
            return {
              ...(input.accessKey !== undefined && input.accessKey !== null && { "access_key": input.accessKey }),
            };
          }

          const serializeAws_restJson1NotificationRegisterService = (
            input: NotificationRegisterService,
            context: __SerdeContext
          ): any => {
            return NotificationRegisterService.visit(input, {
              firebase: value => ({ "firebase": serializeAws_restJson1NotificationRegisterFirebaseService(value, context) }),
              _: (name, value) => ({ name: value } as any)
            });
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

          const deserializeAws_restJson1GameLeaderboardCategories = (
            output: any,
            context: __SerdeContext
          ): (GameLeaderboardCategory)[] => {
            const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
              if (entry === null) {
                return null as any;
              }
              return deserializeAws_restJson1GameLeaderboardCategory(entry, context);
            });
            return retVal;
          }

          const deserializeAws_restJson1GameLeaderboardCategory = (
            output: any,
            context: __SerdeContext
          ): GameLeaderboardCategory => {
            return {
              displayName: __expectString(output.display_name),
            } as any;
          }

          const deserializeAws_restJson1GamePlatformLink = (
            output: any,
            context: __SerdeContext
          ): GamePlatformLink => {
            return {
              displayName: __expectString(output.display_name),
              url: __expectString(output.url),
            } as any;
          }

          const deserializeAws_restJson1GamePlatforms = (
            output: any,
            context: __SerdeContext
          ): (GamePlatformLink)[] => {
            const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
              if (entry === null) {
                return null as any;
              }
              return deserializeAws_restJson1GamePlatformLink(entry, context);
            });
            return retVal;
          }

          const deserializeAws_restJson1GameProfile = (
            output: any,
            context: __SerdeContext
          ): GameProfile => {
            return {
              bannerUrl: __expectString(output.banner_url),
              description: __expectString(output.description),
              developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupSummary(output.developer, context): undefined,
              displayName: __expectString(output.display_name),
              gameId: __expectString(output.game_id),
              groupLeaderboardCategories: (output.group_leaderboard_categories !== undefined && output.group_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.group_leaderboard_categories, context): undefined,
              identityLeaderboardCategories: (output.identity_leaderboard_categories !== undefined && output.identity_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.identity_leaderboard_categories, context): undefined,
              logoUrl: __expectString(output.logo_url),
              nameId: __expectString(output.name_id),
              platforms: (output.platforms !== undefined && output.platforms !== null) ? deserializeAws_restJson1GamePlatforms(output.platforms, context): undefined,
              recommendedGroups: (output.recommended_groups !== undefined && output.recommended_groups !== null) ? deserializeAws_restJson1GroupSummaries(output.recommended_groups, context): undefined,
              tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context): undefined,
              url: __expectString(output.url),
            } as any;
          }

          const deserializeAws_restJson1GameSummaries = (
            output: any,
            context: __SerdeContext
          ): (GameSummary)[] => {
            const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
              if (entry === null) {
                return null as any;
              }
              return deserializeAws_restJson1GameSummary(entry, context);
            });
            return retVal;
          }

          const deserializeAws_restJson1GameSummary = (
            output: any,
            context: __SerdeContext
          ): GameSummary => {
            return {
              bannerUrl: __expectString(output.banner_url),
              developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupHandle(output.developer, context): undefined,
              displayName: __expectString(output.display_name),
              gameId: __expectString(output.game_id),
              logoUrl: __expectString(output.logo_url),
              nameId: __expectString(output.name_id),
              tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context): undefined,
              url: __expectString(output.url),
            } as any;
          }

          const deserializeAws_restJson1GameTags = (
            output: any,
            context: __SerdeContext
          ): (string)[] => {
            const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
              if (entry === null) {
                return null as any;
              }
              return __expectString(entry) as any;
            });
            return retVal;
          }

          const deserializeAws_restJson1GroupExternalLinks = (
            output: any,
            context: __SerdeContext
          ): GroupExternalLinks => {
            return {
              chat: __expectString(output.chat),
              profile: __expectString(output.profile),
            } as any;
          }

          const deserializeAws_restJson1GroupHandle = (
            output: any,
            context: __SerdeContext
          ): GroupHandle => {
            return {
              avatarUrl: __expectString(output.avatar_url),
              displayName: __expectString(output.display_name),
              external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context): undefined,
              groupId: __expectString(output.group_id),
              isDeveloper: __expectBoolean(output.is_developer),
            } as any;
          }

          const deserializeAws_restJson1GroupSummaries = (
            output: any,
            context: __SerdeContext
          ): (GroupSummary)[] => {
            const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
              if (entry === null) {
                return null as any;
              }
              return deserializeAws_restJson1GroupSummary(entry, context);
            });
            return retVal;
          }

          const deserializeAws_restJson1GroupSummary = (
            output: any,
            context: __SerdeContext
          ): GroupSummary => {
            return {
              avatarUrl: __expectString(output.avatar_url),
              bio: __expectString(output.bio),
              displayName: __expectString(output.display_name),
              external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context): undefined,
              groupId: __expectString(output.group_id),
              isCurrentIdentityMember: __expectBoolean(output.is_current_identity_member),
              isDeveloper: __expectBoolean(output.is_developer),
              memberCount: __expectInt32(output.member_count),
              ownerIdentityId: __expectString(output.owner_identity_id),
              publicity: __expectString(output.publicity),
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
