# Cutover to the static revamp

Build locally or in GitHub Actions. Never install Node dependencies or build on the TV box.

## Before changing the live route

1. Review `docs/OWNER_BACKLOG.md` and the preview, especially Vietnamese copy and the Tastech role.
2. Push the reviewed branch and merge into main when authorized. Confirm Actions tests, audit and arm64 image publish pass. Make the GHCR package public if anonymous pulls are needed.
3. Inspect the existing cloudflared route and Docker networks. The old compose uses service `website`, whereas the plan requests `tuando-website`. Confirm the actual live hostname and network.
4. Keep the old image and compose file for rollback.

## Verify on a spare port

The default compose binds `127.0.0.1:8080`. Choose another spare port with `SITE_PORT` if needed.

```sh
docker compose pull
docker compose up -d
curl -I http://127.0.0.1:8080/
curl -I http://127.0.0.1:8080/vi/
curl -I http://127.0.0.1:8080/Tuan_Do_CV.pdf
curl -I http://127.0.0.1:8080/not-a-page/
```

The last request must return 404. Verify theme, office, language links, CV download, security headers and page content with the staging route.

## Connect the tunnel

If cloudflared runs in Docker, set `CLOUDFLARED_NETWORK` to its existing network, then use both compose files:

```sh
docker compose -f docker-compose.yml -f docker-compose.cloudflare.yml up -d
```

Point the confirmed route to `http://tuando-website:80` on that network. If cloudflared runs on the host, use `http://127.0.0.1:8080`. Apply the live route change after preview verification and owner authorization.

## After cutover

- Purge Cloudflare cache. Cache hashed assets for a year and HTML briefly at the edge.
- Check root, Vietnamese pages, a case study, sitemap, PDF and custom 404.
- Check bot settings do not contradict `robots.txt`.
- Refresh the LinkedIn Post Inspector preview for `https://tuando.work`.
- Submit `https://tuando.work/sitemap-index.xml` to Search Console and Bing Webmaster Tools.
- Update later with `docker compose pull && docker compose up -d`, adding override flags when used for the tunnel network.

Rollback: restore the saved compose and old container, restore the previous tunnel target, then purge edge cache.
