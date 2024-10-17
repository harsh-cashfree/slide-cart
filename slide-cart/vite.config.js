import replace from "@rollup/plugin-replace";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: mode === "production" ? env.VITE_PROXY_URL : "/",
    esbuild: {
      minify: true,
      minifySyntax: false,
    },
    build: {
      outDir: "./dist/build/",
      sourcemap: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/main.js"),
        name: "MyLib",
        // the proper extensions will be added
        fileName: "script",
        formats: ["iife"],
      },
      rollupOptions: {
        treeshake: "smallest", // recommended for best tree shaking results
        plugins: [
          replace({
            __SENTRY_DEBUG__: false,
            __SENTRY_TRACING__: false,
          }),
          // ... other plugins (best placed after)
        ],
      },
    },
    plugins: [
      svelte(),
      ...(mode === "production"
        ? [
          sentryVitePlugin({
            org: "ecom360",
            project: "ecom360",
            authToken: env.VITE_SENTRY_AUTH_TOKEN,
            sourcemaps: {
              assets: "./dist/**",
            },
          }),
        ]
        : []),
    ],
    server: {
      // ...(env.VITE_ENVIRONMENT !== "local" && {
      //   proxy: {
      //     "/": {
      //       target: env.VITE_PROXY_URL,
      //     },
      //   },
      // }),

      hmr: {
        host: "localhost",
      },
      port: 5176,
      strictPort: true,
    },
  };
});