// DEPRECATED
//
// Use @rivet-gg/api-internal instead

import * as portal from '@rivet-gg/portal';
import * as identity from '@rivet-gg/identity';
import * as group from '@rivet-gg/group';
import * as kv from '@rivet-gg/kv';
import * as auth from '@rivet-gg/auth';

export const requestHandlerMiddleware = portal.common.middleware.requestHandlerMiddleware;

export { portal, identity, group, auth, kv };
