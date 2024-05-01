<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./apps/docs/public/icon-text-white.svg">
        <img src="./apps/docs/public/icon-text-black.svg">
    </picture>
</p>
<h1 align="center">Rivet Hub</h1>
<p align="center">
    <a href="https://rivet.gg/discord"><img src="https://img.shields.io/discord/822914074136018994"></a>
</p>

---

> [!WARNING] > _This repository is in a proof-of-concept state. Everything here can and will change._

## 📦 Installation

1. Install Node and yarn (if you haven't already)

2. Run the following commands:

```bash
yarn install
```

## 🚀 Getting started

1. Run the following command:

```bash
yarn start
```

This will start the development server and open the Rivet Hub in your default browser. If it doesn't, you can open it manually by navigating to `http://localhost:5173`. It will also start the storybook server, which you can access by navigating to `http://localhost:6006`.

## 📚 Documentation

### Technologies

- [React](https://reactjs.org/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Turbo](https://turbo.build/)

### File structure

- `apps/` - Contains the main applications.

  - `hub/` - The Rivet Hub application.

    - `src/` - Contains the source code.
      - `components/` - Contains the components used in the application.
      - `contexts/` - Contains the React contexts
      - `forms/` - Contains the forms.
      - `layouts/` - Contains the layouts, used in routing.
      - `queries/` - Contains the TanStack queries and mutations configs.
      - `routes/` - Contains the routes.
      - `views/` - Contains the views.

  - `docs/` - The Storybook application.

- `packages/` - Contains the shared components
  - `components/` - Contains the shared components.

### Routing

The routing is done using the [TanStack Router](https://tanstack.com/router). The routes are defined in the `apps/hub/src/routes` folder. For more information, check the [TanStack Router documentation](https://tanstack.com/router). The project is using TanStack's Router Vite integration for dynamically generating route types. This means that all parameters and query parameters are typed and validated.

#### Routes

To define a route, create a new file in the `apps/hub/src/routes` folder. The route file should export a `Route` constant. See already existing routes for examples.

#### Layouts

To define a reusable layout, you can create a layout component in the `apps/hub/src/layouts` folder and use it in the route definition. See already existing layouts for examples.

### Data fetching

The data fetching is done using the [TanStack Query](https://tanstack.com/query). The queries are defined in the `apps/hub/src/queries` folder. For more information, check the [TanStack Query documentation](https://tanstack.com/query).

#### Query and mutation configs

All query and mutation configs are grouped by the business logic they are related to. For example, all queries related to the games are in the `games.ts` file. Configs define the query key, the query function, and other query options, like the query cache time or the query selector. All queries are cached by default in the local storage. To adjust the cache time, consult the [TanStack Query documentation](https://tanstack.com/query).

### Forms

The forms are created using the [React Hook Form](https://react-hook-form.com/) library. The form schemas are defined using the [Zod](https://zod.dev/) library. The forms are defined in the `apps/hub/src/forms` folder. For more information, check the [React Hook Form documentation](https://react-hook-form.com/) and the [Zod documentation](https://zod.dev/). For convenience, the form factory is used to create the forms. The form factory is defined in the `apps/hub/lib/create-schema-form.tsx` file.

### Reusable components (across the Rivet products)

The reusable components are defined in the `packages/components/src` folder. The components are grouped by the business logic they are related to. For example, all components related to the games are in the `games` folder. The components are using the [shadcn/ui](https://ui.shadcn.com/) library for styling. The atom components (like buttons, inputs, etc.) are defined in the `packages/components/src/ui`. Atom components represent the smallest components that can be used in the application, like buttons and inputs. Please keep the components as small and reusable as possible.

### Hub components

The components used in the Rivet Hub are defined in the `apps/hub/src/components` folder. The components are grouped by the business logic they are related to. For example, all components related to the games are in the `games` folder. The components are using the same technology stack as the reusable components. The components here are more specific to the Rivet Hub and are not meant to be reused across the Rivet products.

#### Views

Views are special components that are used in the routes, following MVC pattern. They are defined in the `apps/hub/src/views` folder. The views are using the components and the queries to display the data. The views are not meant to be reused across the Rivet products.

### Configuration

The project is designed to be built once and used in multiple environments. UI package uses a React context to determine environment configuration. Hub app, on the other hand, uses an HTML element to fetch the configuration and pass it to the UI elements. To configure project put the following element in the `public/index.html` file:

```html
<script type="application/json" id="RIVET_CONFIG">
  { "apiUrl": "YOUR API URL", "assetsUrl": "YOUR ASSETS URL" }
</script>
```

and fill it with the appropriate values.

## 🏗️ Contributing

1. Look for any issue that describes something that needs to be done - or, if
   you're willing to add a new feature, create a new issue with an appropriate
   description.
2. Submit your pull request.
3. Rivet team will review your changes.
4. Don't forget to join [Rivet's Discord](https://rivet.gg/discord) to hang out
   with the devs, or to pairprogram together!
