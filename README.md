# Completed Setup

[Confluence page for the complete initial setup of this repo](https://nestosh.atlassian.net/wiki/spaces/HC/pages/1763868687/PWA+Kit+Initial+Setup)

The Storefront demo has been build successfully. Deployed on [Managed Runtime](https://temp-pwa-development.mobify-storefront.com/)

# The Retail React App

A project template that includes an isomorphic JavaScript storefront and [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) built using [React](https://reactjs.org/) and [Express](https://expressjs.com/). It uses a modern headless architecture that enables developers to decouple front-end code from back-end systems. It leverages popular open-source libraries in the React ecosystem, such as [Chakra UI](https://chakra-ui.com/) components, [Emotion](https://emotion.sh/docs/introduction) (CSS-in-JS), [Webpack](https://webpack.js.org/), and many more.

Developers don’t have to worry about the underlying infrastructure, whether they’re developing their app locally, deploying it to a [Managed Runtime](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/mrt-overview.html) environment, or testing the app live.

## Requirements

-   Node 14.17.0 or later
-   npm 6.14.4 or later

## How to use the pwa-custom-core submodule with pwa?

There are basically two ways to add a submodule in the repository.

-   Adding the submodule into the repository.

-   Cloning from a repository that contains the submodule.

### Adding a Submodule:

To add a submodule to your repository, you use the git submodule add command, providing the repository URL you want to include and the path where the submodule should be placed in your project.

```
git submodule add <URL of submodule repository> <path to submodule directory>
```

After adding the submodule, you need to initialize it. This step is essential as it tells Git to fetch the contents of the submodule repository and checkout the specific commit that the parent repository references.

```
git submodule init
```

### Cloning from a repository that contains the submodule hash:

When you clone a repository that contains submodules, you need to use the --recursive flag to ensure the submodules are also cloned and checked out.

```
git clone --recursive <URL of your repository>
```

We will use the 2nd method because we have already added the submodule in the repository.

<b>For Example:</b>

```
git clone --recursive https://<Your_UserName>@bitbucket.org/nestosh/pwa.git
```

This will clone the code from the submodule repository.

## Get Started

To start your web server for local development, run the following command in your project directory:

```bash
npm start
```

Now that the development server is running, you can open a browser and preview your commerce app:

-   Go to http://localhost:3000/

## Localization

See the [Localization README.md](./app/translations/README.md) for important setup instructions for localization.

## Configuration Files

The Retail React App's configuration files are located in the `app/config` folder. For more details, see [Configuration Files](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html) in the documentation.

## Documentation

The full documentation for PWA Kit and Managed Runtime is hosted on the [Salesforce Developers](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/overview) portal.

### Useful Links:

-   [Get Started](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/getting-started.html)
-   [Skills for Success](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/skills-for-success.html)
-   [Set Up API Access](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/setting-up-api-access.html)
-   [Configuration Options](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html)
-   [Proxy Requests](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/proxying-requests.html)
-   [Push and Deploy Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html)
-   [The Retail React App](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/retail-react-app.html)
-   [Rendering](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/rendering.html)
-   [Routing](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/routing.html)
-   [Phased Headless Rollouts](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/phased-headless-rollouts.html)
-   [Launch Your Storefront](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/launching-your-storefront.html)
