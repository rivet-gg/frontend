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
import { Route as AuthenticatedLayoutTeamsGroupIdIndexImport } from './routes/_authenticated._layout/teams/$groupId/index'
import { Route as AuthenticatedLayoutGamesGameIdIndexImport } from './routes/_authenticated._layout/games/$gameId/index'
import { Route as AuthenticatedLayoutTeamsGroupIdMembersImport } from './routes/_authenticated._layout/teams/$groupId/members'
import { Route as AuthenticatedLayoutTeamsGroupIdBillingImport } from './routes/_authenticated._layout/teams/$groupId/billing'
import { Route as AuthenticatedLayoutGamesGameIdTokensImport } from './routes/_authenticated._layout/games/$gameId/tokens'
import { Route as AuthenticatedLayoutGamesGameIdSettingsImport } from './routes/_authenticated._layout/games/$gameId/settings'
import { Route as AuthenticatedLayoutGamesGameIdBillingImport } from './routes/_authenticated._layout/games/$gameId/billing'
import { Route as AuthenticatedLayoutGamesGameIdBackendImport } from './routes/_authenticated._layout/games/$gameId/backend'
import { Route as AuthenticatedLayoutTeamsGroupIdSettingsIndexImport } from './routes/_authenticated._layout/teams/$groupId/settings/index'
import { Route as AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport } from './routes/_authenticated._layout/games/$gameId/namespaces/$namespaceId/index'

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

const AuthenticatedLayoutTeamsGroupIdIndexRoute =
  AuthenticatedLayoutTeamsGroupIdIndexImport.update({
    path: '/teams/$groupId/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdIndexRoute =
  AuthenticatedLayoutGamesGameIdIndexImport.update({
    path: '/games/$gameId/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdMembersRoute =
  AuthenticatedLayoutTeamsGroupIdMembersImport.update({
    path: '/teams/$groupId/members',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdBillingRoute =
  AuthenticatedLayoutTeamsGroupIdBillingImport.update({
    path: '/teams/$groupId/billing',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdTokensRoute =
  AuthenticatedLayoutGamesGameIdTokensImport.update({
    path: '/games/$gameId/tokens',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdSettingsRoute =
  AuthenticatedLayoutGamesGameIdSettingsImport.update({
    path: '/games/$gameId/settings',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdBillingRoute =
  AuthenticatedLayoutGamesGameIdBillingImport.update({
    path: '/games/$gameId/billing',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdBackendRoute =
  AuthenticatedLayoutGamesGameIdBackendImport.update({
    path: '/games/$gameId/backend',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutTeamsGroupIdSettingsIndexRoute =
  AuthenticatedLayoutTeamsGroupIdSettingsIndexImport.update({
    path: '/teams/$groupId/settings/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexRoute =
  AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport.update({
    path: '/games/$gameId/namespaces/$namespaceId/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

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
    '/_authenticated/_layout/games/$gameId/backend': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdBackendImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/billing': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdBillingImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/settings': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdSettingsImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/tokens': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdTokensImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId/billing': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdBillingImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId/members': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdMembersImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId/': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/teams/$groupId/settings/': {
      preLoaderRoute: typeof AuthenticatedLayoutTeamsGroupIdSettingsIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/': {
      preLoaderRoute: typeof AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedLayoutRoute.addChildren([
      AuthenticatedLayoutIndexRoute,
      AuthenticatedLayoutGamesGameIdBackendRoute,
      AuthenticatedLayoutGamesGameIdBillingRoute,
      AuthenticatedLayoutGamesGameIdSettingsRoute,
      AuthenticatedLayoutGamesGameIdTokensRoute,
      AuthenticatedLayoutTeamsGroupIdBillingRoute,
      AuthenticatedLayoutTeamsGroupIdMembersRoute,
      AuthenticatedLayoutGamesGameIdIndexRoute,
      AuthenticatedLayoutTeamsGroupIdIndexRoute,
      AuthenticatedLayoutTeamsGroupIdSettingsIndexRoute,
      AuthenticatedLayoutGamesGameIdNamespacesNamespaceIdIndexRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
