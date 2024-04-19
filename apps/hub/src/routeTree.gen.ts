/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedLayoutImport } from './routes/_authenticated._layout'
import { Route as AuthenticatedLayoutIndexImport } from './routes/_authenticated._layout/index'
import { Route as AuthenticatedLayoutTeamsGroupIdImport } from './routes/_authenticated._layout/teams/$groupId'
import { Route as AuthenticatedLayoutGamesGameIdImport } from './routes/_authenticated._layout/games/$gameId'
import { Route as AuthenticatedLayoutTeamsGroupIdIndexImport } from './routes/_authenticated._layout/teams/$groupId/index'
import { Route as AuthenticatedLayoutGamesGameIdIndexImport } from './routes/_authenticated._layout/games/$gameId/index'
import { Route as AuthenticatedLayoutTeamsGroupIdSettingsImport } from './routes/_authenticated._layout/teams/$groupId/settings'
import { Route as AuthenticatedLayoutTeamsGroupIdMembersImport } from './routes/_authenticated._layout/teams/$groupId/members'
import { Route as AuthenticatedLayoutTeamsGroupIdBillingImport } from './routes/_authenticated._layout/teams/$groupId/billing'
import { Route as AuthenticatedLayoutGamesGameIdTokensImport } from './routes/_authenticated._layout/games/$gameId/tokens'
import { Route as AuthenticatedLayoutGamesGameIdSettingsImport } from './routes/_authenticated._layout/games/$gameId/settings'
import { Route as AuthenticatedLayoutGamesGameIdBillingImport } from './routes/_authenticated._layout/games/$gameId/billing'
import { Route as AuthenticatedLayoutGamesGameIdBackendImport } from './routes/_authenticated._layout/games/$gameId/backend'
import { Route as AuthenticatedLayoutTeamsGroupIdSettingsIndexImport } from './routes/_authenticated._layout/teams/$groupId/settings/index'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/index'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdVersionsImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/versions'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdTokensImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/tokens'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/matchmaker'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerIndexImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/matchmaker/index'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerSettingsImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/matchmaker/settings'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLogsImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/matchmaker/logs'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLobbiesImport } from './routes/_authenticated._layout/games/$gameId_/namespaces/$namespaceId/matchmaker/lobbies'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutIndexRoute = AuthenticatedLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedLayoutRoute,
} as any)

const AuthenticatedLayoutTeamsGroupIdRoute =
  AuthenticatedLayoutTeamsGroupIdImport.update({
    path: '/teams/$groupId',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdRoute =
  AuthenticatedLayoutGamesGameIdImport.update({
    path: '/games/$gameId',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdIndexRoute =
  AuthenticatedLayoutTeamsGroupIdIndexImport.update({
    path: '/',
    getParentRoute: () => AuthenticatedLayoutTeamsGroupIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdIndexRoute =
  AuthenticatedLayoutGamesGameIdIndexImport.update({
    path: '/',
    getParentRoute: () => AuthenticatedLayoutGamesGameIdRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdSettingsRoute =
  AuthenticatedLayoutTeamsGroupIdSettingsImport.update({
    path: '/settings',
    getParentRoute: () => AuthenticatedLayoutTeamsGroupIdRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdMembersRoute =
  AuthenticatedLayoutTeamsGroupIdMembersImport.update({
    path: '/members',
    getParentRoute: () => AuthenticatedLayoutTeamsGroupIdRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdBillingRoute =
  AuthenticatedLayoutTeamsGroupIdBillingImport.update({
    path: '/billing',
    getParentRoute: () => AuthenticatedLayoutTeamsGroupIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdTokensRoute =
  AuthenticatedLayoutGamesGameIdTokensImport.update({
    path: '/tokens',
    getParentRoute: () => AuthenticatedLayoutGamesGameIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdSettingsRoute =
  AuthenticatedLayoutGamesGameIdSettingsImport.update({
    path: '/settings',
    getParentRoute: () => AuthenticatedLayoutGamesGameIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdBillingRoute =
  AuthenticatedLayoutGamesGameIdBillingImport.update({
    path: '/billing',
    getParentRoute: () => AuthenticatedLayoutGamesGameIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdBackendRoute =
  AuthenticatedLayoutGamesGameIdBackendImport.update({
    path: '/backend',
    getParentRoute: () => AuthenticatedLayoutGamesGameIdRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdSettingsIndexRoute =
  AuthenticatedLayoutTeamsGroupIdSettingsIndexImport.update({
    path: '/',
    getParentRoute: () => AuthenticatedLayoutTeamsGroupIdSettingsRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport.update({
    path: '/games/$gameId/namespaces/$namespaceId',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport.update({
    path: '/',
    getParentRoute: () =>
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdVersionsRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdVersionsImport.update({
    path: '/versions',
    getParentRoute: () =>
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdTokensRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdTokensImport.update({
    path: '/tokens',
    getParentRoute: () =>
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport.update({
    path: '/matchmaker',
    getParentRoute: () =>
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerIndexRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerIndexImport.update(
    {
      path: '/',
      getParentRoute: () =>
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute,
    } as any,
  )

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerSettingsRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerSettingsImport.update(
    {
      path: '/settings',
      getParentRoute: () =>
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute,
    } as any,
  )

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLogsRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLogsImport.update(
    {
      path: '/logs',
      getParentRoute: () =>
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute,
    } as any,
  )

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLobbiesRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLobbiesImport.update(
    {
      path: '/lobbies',
      getParentRoute: () =>
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute,
    } as any,
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_layout': {
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_layout/': {
      preLoaderRoute: typeof AuthenticatedLayoutIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/backend': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdBackendImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdImport
    }
    '/_authenticated/_layout/games/$gameId/billing': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdBillingImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdImport
    }
    '/_authenticated/_layout/games/$gameId/settings': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdSettingsImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdImport
    }
    '/_authenticated/_layout/games/$gameId/tokens': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdTokensImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdImport
    }
    '/_authenticated/_layout/teams/$groupId/billing': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdBillingImport
      parentRoute: typeof AuthenticatedLayoutTeamsGroupIdImport
    }
    '/_authenticated/_layout/teams/$groupId/members': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdMembersImport
      parentRoute: typeof AuthenticatedLayoutTeamsGroupIdImport
    }
    '/_authenticated/_layout/teams/$groupId/settings': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdSettingsImport
      parentRoute: typeof AuthenticatedLayoutTeamsGroupIdImport
    }
    '/_authenticated/_layout/games/$gameId/': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdIndexImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdImport
    }
    '/_authenticated/_layout/teams/$groupId/': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdIndexImport
      parentRoute: typeof AuthenticatedLayoutTeamsGroupIdImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId/settings/': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdSettingsIndexImport
      parentRoute: typeof AuthenticatedLayoutTeamsGroupIdSettingsImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/tokens': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdTokensImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/versions': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdVersionsImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLobbiesImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/logs': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLogsImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/settings': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerSettingsImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerIndexImport
      parentRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedLayoutRoute.addChildren([
      AuthenticatedLayoutIndexRoute,
      AuthenticatedLayoutGamesGameIdRoute.addChildren([
        AuthenticatedLayoutGamesGameIdBackendRoute,
        AuthenticatedLayoutGamesGameIdBillingRoute,
        AuthenticatedLayoutGamesGameIdSettingsRoute,
        AuthenticatedLayoutGamesGameIdTokensRoute,
        AuthenticatedLayoutGamesGameIdIndexRoute,
      ]),
      AuthenticatedLayoutTeamsGroupIdRoute.addChildren([
        AuthenticatedLayoutTeamsGroupIdBillingRoute,
        AuthenticatedLayoutTeamsGroupIdMembersRoute,
        AuthenticatedLayoutTeamsGroupIdSettingsRoute.addChildren([
          AuthenticatedLayoutTeamsGroupIdSettingsIndexRoute,
        ]),
        AuthenticatedLayoutTeamsGroupIdIndexRoute,
      ]),
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdRoute.addChildren([
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerRoute.addChildren(
          [
            AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLobbiesRoute,
            AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerLogsRoute,
            AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerSettingsRoute,
            AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdMatchmakerIndexRoute,
          ],
        ),
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdTokensRoute,
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdVersionsRoute,
        AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexRoute,
      ]),
    ]),
  ]),
])

/* prettier-ignore-end */
