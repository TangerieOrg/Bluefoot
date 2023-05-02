import type { StorybookConfig } from "@storybook/preact-webpack5";
import path from "path";

const getPath = (...paths: string[]) => path.resolve(__dirname, "../src", ...paths)

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook-extras/console",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon"' options.
        postCss: {
          implementation: require("postcss")
        },
        cssModules: true
      }
    },
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/preact-webpack5",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  webpackFinal: async (config, options) => {
    if (!config.resolve) config.resolve = {};
    if (!config.module) config.module = {};
    if (!config.module.rules) config.module.rules = [];

    // Setup aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": getPath("./components"),
      "@modules": getPath("./modules"),
      "@assets": getPath("./assets"),
      "@overlays": getPath("./overlays"),
      "@Noodle": getPath("./lib/Noodle"),
      "@SVGUtil": getPath("./lib/SVGUtil")
    }

    // config.module.rules = [
    //   ...config.module.rules,
    //   {
    //     exclude: "/node_modules/",
    //     test: /\.css$/,
    //     sideEffects: true,
    //     use: [
    //       'style-loader',
    //       {
    //         loader: 'css-loader',
    //         options: {
    //           importLoaders: 1,
    //           modules: true
    //         }
    //       },
    //       'postcss-loader'
    //     ]
    //   }
    // ]

    return config;
  }
};
export default config;
