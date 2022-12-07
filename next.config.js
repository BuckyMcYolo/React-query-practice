/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DEEPGRAM_API_KEY: "df1ee24f09b2ebc2d08829ff4180f8be39848c5c",
    OPENAI_API_KEY: "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",
  },
};

module.exports = nextConfig;
