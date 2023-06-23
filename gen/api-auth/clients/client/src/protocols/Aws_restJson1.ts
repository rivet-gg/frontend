// smithy-typescript generated code
import {
  CompleteEmailVerificationCommandInput,
  CompleteEmailVerificationCommandOutput,
} from "../commands/CompleteEmailVerificationCommand";
import {
  RefreshIdentityTokenCommandInput,
  RefreshIdentityTokenCommandOutput,
} from "../commands/RefreshIdentityTokenCommand";
import {
  StartEmailVerificationCommandInput,
  StartEmailVerificationCommandOutput,
} from "../commands/StartEmailVerificationCommand";
import { AuthServiceServiceException as __BaseException } from "../models/AuthServiceServiceException";
import {
  BadRequestError,
  CaptchaConfig,
  CaptchaConfigHcaptcha,
  CaptchaConfigTurnstile,
  ForbiddenError,
  InternalError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
} from "../models/models_0";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@aws-sdk/protocol-http";
import {
  decorateServiceException as __decorateServiceException,
  expectNonNull as __expectNonNull,
  expectObject as __expectObject,
  expectString as __expectString,
  parseRfc3339DateTime as __parseRfc3339DateTime,
} from "@aws-sdk/smithy-client";
import {
  DocumentType as __DocumentType,
  Endpoint as __Endpoint,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_restJson1CompleteEmailVerificationCommand = async(
  input: CompleteEmailVerificationCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/identity/email/complete-verification";
  let body: any;
  body = JSON.stringify({
    ...(input.code !== undefined && input.code !== null &&{ "code": input.code }),
    ...(input.verificationId !== undefined && input.verificationId !== null &&{ "verification_id": input.verificationId }),
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

export const serializeAws_restJson1RefreshIdentityTokenCommand = async(
  input: RefreshIdentityTokenCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
    ...isSerializableHeaderValue(input.cookie) && { "cookie": (input.cookie! || []).map(_entry => _entry as any).join(', ') },
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/tokens/identity";
  let body: any;
  body = JSON.stringify({
    ...(input.logout !== undefined && input.logout !== null &&{ "logout": input.logout }),
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

export const serializeAws_restJson1StartEmailVerificationCommand = async(
  input: StartEmailVerificationCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/identity/email/start-verification";
  let body: any;
  body = JSON.stringify({
    ...(input.captcha !== undefined && input.captcha !== null &&{ "captcha": serializeAws_restJson1CaptchaConfig(input.captcha, context) }),
    ...(input.email !== undefined && input.email !== null &&{ "email": input.email }),
    ...(input.gameId !== undefined && input.gameId !== null &&{ "game_id": input.gameId }),
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

export const deserializeAws_restJson1CompleteEmailVerificationCommand = async(
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CompleteEmailVerificationCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1CompleteEmailVerificationCommandError(output, context);
  }
  const contents: CompleteEmailVerificationCommandOutput = {
    $metadata: deserializeMetadata(output),
    status: undefined,
  };
  const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
  if (data.status !== undefined && data.status !== null) {
    contents.status = __expectString(data.status);
  }
  return Promise.resolve(contents);
}

const deserializeAws_restJson1CompleteEmailVerificationCommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<CompleteEmailVerificationCommandOutput> => {
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

  export const deserializeAws_restJson1RefreshIdentityTokenCommand = async(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RefreshIdentityTokenCommandOutput> => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return deserializeAws_restJson1RefreshIdentityTokenCommandError(output, context);
    }
    const contents: RefreshIdentityTokenCommandOutput = {
      $metadata: deserializeMetadata(output),
      exp: undefined,
      identityId: undefined,
      setCookie: undefined,
      token: undefined,
    };
    if (output.headers["set-cookie"] !== undefined) {
      contents.setCookie = (output.headers['set-cookie'] || "").split(',').map(_entry => _entry.trim() as any);
    }
    const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
    if (data.exp !== undefined && data.exp !== null) {
      contents.exp = __expectNonNull(__parseRfc3339DateTime(data.exp));
    }
    if (data.identity_id !== undefined && data.identity_id !== null) {
      contents.identityId = __expectString(data.identity_id);
    }
    if (data.token !== undefined && data.token !== null) {
      contents.token = __expectString(data.token);
    }
    return Promise.resolve(contents);
  }

  const deserializeAws_restJson1RefreshIdentityTokenCommandError = async(
    output: __HttpResponse,
    context: __SerdeContext,
  ): Promise<RefreshIdentityTokenCommandOutput> => {
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

    export const deserializeAws_restJson1StartEmailVerificationCommand = async(
      output: __HttpResponse,
      context: __SerdeContext
    ): Promise<StartEmailVerificationCommandOutput> => {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1StartEmailVerificationCommandError(output, context);
      }
      const contents: StartEmailVerificationCommandOutput = {
        $metadata: deserializeMetadata(output),
        verificationId: undefined,
      };
      const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
      if (data.verification_id !== undefined && data.verification_id !== null) {
        contents.verificationId = __expectString(data.verification_id);
      }
      return Promise.resolve(contents);
    }

    const deserializeAws_restJson1StartEmailVerificationCommandError = async(
      output: __HttpResponse,
      context: __SerdeContext,
    ): Promise<StartEmailVerificationCommandOutput> => {
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

      const serializeAws_restJson1CaptchaConfig = (
        input: CaptchaConfig,
        context: __SerdeContext
      ): any => {
        return CaptchaConfig.visit(input, {
          hcaptcha: value => ({ "hcaptcha": serializeAws_restJson1CaptchaConfigHcaptcha(value, context) }),
          turnstile: value => ({ "turnstile": serializeAws_restJson1CaptchaConfigTurnstile(value, context) }),
          _: (name, value) => ({ name: value } as any)
        });
      }

      const serializeAws_restJson1CaptchaConfigHcaptcha = (
        input: CaptchaConfigHcaptcha,
        context: __SerdeContext
      ): any => {
        return {
          ...(input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }),
        };
      }

      const serializeAws_restJson1CaptchaConfigTurnstile = (
        input: CaptchaConfigTurnstile,
        context: __SerdeContext
      ): any => {
        return {
          ...(input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }),
        };
      }

      const deserializeAws_restJson1ErrorMetadata = (
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
