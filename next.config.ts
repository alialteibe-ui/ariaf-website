import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are local (public/image/chalets/) — no remote domains needed.
    // localPatterns allows next/image to optimize them.
    localPatterns: [
      { pathname: "/image/chalets/**" },
      { pathname: "/image/farm/**" },
    ],
  },
};

export default nextConfig;
