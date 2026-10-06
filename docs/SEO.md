# Crawler policy

Verified on 2026-10-06. All crawlers are allowed by default in v1. TODO(human): decide on training crawlers and confirm Cloudflare bot settings match the policy.

- OpenAI: https://developers.openai.com/api/docs/bots (OAI-SearchBot, ChatGPT-User, GPTBot).
- Anthropic: https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler (ClaudeBot, Claude-User, Claude-SearchBot).
- Perplexity: https://docs.perplexity.ai/docs/resources/perplexity-crawlers (PerplexityBot).
- Google: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers (Googlebot, Google-Extended).
- Common Crawl: https://commoncrawl.org/ccbot (CCBot).

Page text, profile facts and semantic office fallback render into static HTML. `llms.txt` is an additional index, not a search ranking guarantee. Case study dates represent editorial updates, not employment dates.

Astro's current official Tailwind path is `@tailwindcss/vite`. The older `@astrojs/tailwind` integration is deprecated: https://docs.astro.build/en/guides/integrations-guide/tailwind/. This revamp uses the current official path.
