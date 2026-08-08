import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    /**
     * Pin the workspace root to THIS directory.
     *
     * There is an unrelated 87-byte package-lock.json sitting in ~, so Next
     * walked up, found two lockfiles, and inferred /Users/kushjain as the
     * workspace root. That put Turbopack's persistence directory outside the
     * project, where a `next build` cache and a `next dev` cache end up
     * fighting over the same files. The symptom is a dev server that reports
     * "Ready" and then dies with:
     *
     *   Failed to open database
     *     0: Loading persistence directory failed
     *     1: invalid digit found in string
     *
     * Pinning the root keeps the cache in ./.next and silences the warning.
     */
    root: dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
