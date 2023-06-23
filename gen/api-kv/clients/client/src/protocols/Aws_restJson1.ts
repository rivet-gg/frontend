// smithy-typescript generated code
import {
  DeleteBatchCommandInput,
  DeleteBatchCommandOutput,
} from "../commands/DeleteBatchCommand";
import {
  DeleteCommandInput,
  DeleteCommandOutput,
} from "../commands/DeleteCommand";
import {
  GetBatchCommandInput,
  GetBatchCommandOutput,
} from "../commands/GetBatchCommand";
import {
  GetCommandInput,
  GetCommandOutput,
} from "../commands/GetCommand";
import {
  PutBatchCommandInput,
  PutBatchCommandOutput,
} from "../commands/PutBatchCommand";
import {
  PutCommandInput,
  PutCommandOutput,
} from "../commands/PutCommand";
import { KvServiceServiceException as __BaseException } from "../models/KvServiceServiceException";
import {
  BadRequestError,
  ForbiddenError,
  InternalError,
  KvEntry,
  NotFoundError,
  PutEntry,
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

export const serializeAws_restJson1DeleteCommand = async(
  input: DeleteCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
  const query: any = {
    ...(input.key !== undefined && { "key": input.key }),
    ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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

export const serializeAws_restJson1DeleteBatchCommand = async(
  input: DeleteBatchCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
  const query: any = {
    ...(input.keys !== undefined && { "keys": (input.keys || []).map(_entry => _entry as any) }),
    ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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

export const serializeAws_restJson1GetCommand = async(
  input: GetCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
  const query: any = {
    ...(input.key !== undefined && { "key": input.key }),
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
    ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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

export const serializeAws_restJson1GetBatchCommand = async(
  input: GetBatchCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
  const query: any = {
    ...(input.keys !== undefined && { "keys": (input.keys || []).map(_entry => _entry as any) }),
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
    ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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

export const serializeAws_restJson1PutCommand = async(
  input: PutCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
  let body: any;
  body = JSON.stringify({
    ...(input.key !== undefined && input.key !== null &&{ "key": input.key }),
    ...(input.namespaceId !== undefined && input.namespaceId !== null &&{ "namespace_id": input.namespaceId }),
    ...(input.value !== undefined && input.value !== null &&{ "value": serializeAws_restJson1Document(input.value, context) }),
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

export const serializeAws_restJson1PutBatchCommand = async(
  input: PutBatchCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
  let body: any;
  body = JSON.stringify({
    ...(input.entries !== undefined && input.entries !== null &&{ "entries": serializeAws_restJson1PutEntries(input.entries, context) }),
    ...(input.namespaceId !== undefined && input.namespaceId !== null &&{ "namespace_id": input.namespaceId }),
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

export const deserializeAws_restJson1DeleteCommand = async(
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1DeleteCommandError(output, context);
  }
  const contents: DeleteCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  await collectBody(output.body, context);
  return Promise.resolve(contents);
}

const deserializeAws_restJson1DeleteCommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<DeleteCommandOutput> => {
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

  export const deserializeAws_restJson1DeleteBatchCommand = async(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DeleteBatchCommandOutput> => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return deserializeAws_restJson1DeleteBatchCommandError(output, context);
    }
    const contents: DeleteBatchCommandOutput = {
      $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
  }

  const deserializeAws_restJson1DeleteBatchCommandError = async(
    output: __HttpResponse,
    context: __SerdeContext,
  ): Promise<DeleteBatchCommandOutput> => {
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

    export const deserializeAws_restJson1GetCommand = async(
      output: __HttpResponse,
      context: __SerdeContext
    ): Promise<GetCommandOutput> => {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetCommandError(output, context);
      }
      const contents: GetCommandOutput = {
        $metadata: deserializeMetadata(output),
        deleted: undefined,
        value: undefined,
        watch: undefined,
      };
      const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
      if (data.deleted !== undefined && data.deleted !== null) {
        contents.deleted = __expectBoolean(data.deleted);
      }
      if (data.value !== undefined && data.value !== null) {
        contents.value = deserializeAws_restJson1Document(data.value, context);
      }
      if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
      }
      return Promise.resolve(contents);
    }

    const deserializeAws_restJson1GetCommandError = async(
      output: __HttpResponse,
      context: __SerdeContext,
    ): Promise<GetCommandOutput> => {
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

      export const deserializeAws_restJson1GetBatchCommand = async(
        output: __HttpResponse,
        context: __SerdeContext
      ): Promise<GetBatchCommandOutput> => {
        if (output.statusCode !== 200 && output.statusCode >= 300) {
          return deserializeAws_restJson1GetBatchCommandError(output, context);
        }
        const contents: GetBatchCommandOutput = {
          $metadata: deserializeMetadata(output),
          entries: undefined,
          watch: undefined,
        };
        const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
        if (data.entries !== undefined && data.entries !== null) {
          contents.entries = deserializeAws_restJson1KvEntries(data.entries, context);
        }
        if (data.watch !== undefined && data.watch !== null) {
          contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
        }
        return Promise.resolve(contents);
      }

      const deserializeAws_restJson1GetBatchCommandError = async(
        output: __HttpResponse,
        context: __SerdeContext,
      ): Promise<GetBatchCommandOutput> => {
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

        export const deserializeAws_restJson1PutCommand = async(
          output: __HttpResponse,
          context: __SerdeContext
        ): Promise<PutCommandOutput> => {
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return deserializeAws_restJson1PutCommandError(output, context);
          }
          const contents: PutCommandOutput = {
            $metadata: deserializeMetadata(output),
          };
          await collectBody(output.body, context);
          return Promise.resolve(contents);
        }

        const deserializeAws_restJson1PutCommandError = async(
          output: __HttpResponse,
          context: __SerdeContext,
        ): Promise<PutCommandOutput> => {
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

          export const deserializeAws_restJson1PutBatchCommand = async(
            output: __HttpResponse,
            context: __SerdeContext
          ): Promise<PutBatchCommandOutput> => {
            if (output.statusCode !== 200 && output.statusCode >= 300) {
              return deserializeAws_restJson1PutBatchCommandError(output, context);
            }
            const contents: PutBatchCommandOutput = {
              $metadata: deserializeMetadata(output),
            };
            await collectBody(output.body, context);
            return Promise.resolve(contents);
          }

          const deserializeAws_restJson1PutBatchCommandError = async(
            output: __HttpResponse,
            context: __SerdeContext,
          ): Promise<PutBatchCommandOutput> => {
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

            const serializeAws_restJson1PutEntries = (
              input: (PutEntry)[],
              context: __SerdeContext
            ): any => {
              return input.filter((e: any) => e != null).map(entry => {
                if (entry === null) { return null as any; }
                return serializeAws_restJson1PutEntry(entry, context);
              });
            }

            const serializeAws_restJson1PutEntry = (
              input: PutEntry,
              context: __SerdeContext
            ): any => {
              return {
                ...(input.key !== undefined && input.key !== null && { "key": input.key }),
                ...(input.value !== undefined && input.value !== null && { "value": serializeAws_restJson1Document(input.value, context) }),
              };
            }

            const serializeAws_restJson1Document = (
              input: __DocumentType,
              context: __SerdeContext
            ): any => {
              return input;
            }

            const deserializeAws_restJson1KeyComponents = (
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

            const deserializeAws_restJson1KvEntries = (
              output: any,
              context: __SerdeContext
            ): (KvEntry)[] => {
              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                if (entry === null) {
                  return null as any;
                }
                return deserializeAws_restJson1KvEntry(entry, context);
              });
              return retVal;
            }

            const deserializeAws_restJson1KvEntry = (
              output: any,
              context: __SerdeContext
            ): KvEntry => {
              return {
                deleted: __expectBoolean(output.deleted),
                key: (output.key !== undefined && output.key !== null) ? deserializeAws_restJson1KeyComponents(output.key, context): undefined,
                value: (output.value !== undefined && output.value !== null) ? deserializeAws_restJson1Document(output.value, context): undefined,
              } as any;
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

            const deserializeAws_restJson1Document = (
              output: any,
              context: __SerdeContext
            ): __DocumentType => {
              return output;
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
