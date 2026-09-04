import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Agent Kit includes optional OpenTelemetry integrations that are resolved
  // at runtime. Keeping it external avoids bundling those integrations into
  // the Inngest route and prevents false-positive Webpack warnings.
  serverExternalPackages: ["@inngest/agent-kit"],
};

export default nextConfig;
