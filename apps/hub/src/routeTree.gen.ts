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
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedLayoutRoute.addChildren([
      AuthenticatedLayoutIndexRoute,
      AuthenticatedLayoutGamesGameIdRoute,
      AuthenticatedLayoutTeamsGroupIdRoute,
    ]),
  ]),
])

/* prettier-ignore-end */