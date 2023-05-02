import type { Preview } from "@storybook/preact";
import "../src/styles/index.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const parameters = {
  darkMode: {
    current: 'dark',
    stylePreview: true
  },
  console: {
    disable: false,
    patterns: [/^dev$/],
    omitFirst: true
  }
};