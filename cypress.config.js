import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    waitForAnimations: false,
    baseUrl: 'http://localhost:3000',
  },
});
