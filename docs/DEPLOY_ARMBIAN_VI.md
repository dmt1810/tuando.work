# Cập nhật website hiện có trên Armbian

Source được cập nhật trực tiếp ở nhánh `main` của [dmt1810/tuando.work](https://github.com/dmt1810/tuando.work). GitHub Actions build Astro, kiểm tra và publish Docker image `linux/arm64` ở `ghcr.io/dmt1810/tuando-site:latest`. TV box pull image từ GitHub Container Registry và cập nhật container website hiện có. Không cần cài Node hay build Astro trên TV box.

Ảnh máy chủ cho thấy tài khoản `root`, IP LAN `192.168.50.160`, container website `tuando-website` và Cloudflare Tunnel đang chạy. Kiểm tra đúng cấu hình đang dùng bằng các lệnh dưới đây.

## 1. Đợi GitHub publish image

Mở [Actions](https://github.com/dmt1810/tuando.work/actions), đợi workflow **Build and publish static site** của commit mới hoàn tất màu xanh, gồm bước **docker/build-push-action**.

Lần đầu, vào package **tuando-site → Package settings → Change visibility → Public** nếu muốn TV box pull không cần đăng nhập. Repo public không tự làm package public. Nếu giữ package private, dùng PAT classic có `read:packages` và nhập qua `docker login ghcr.io -u dmt1810`; không gửi token vào chat hoặc ghi vào repo.

## 2. Kiểm tra container hiện có

Nếu chưa ở shell root trên TV box:

```sh
ssh root@192.168.50.160
```

Trên Armbian:

```sh
uname -m
docker compose version
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'
docker inspect tuando-website --format 'Service={{index .Config.Labels "com.docker.compose.service"}}'
docker inspect tuando-website --format 'Project={{index .Config.Labels "com.docker.compose.project"}}'
docker inspect tuando-website --format 'Directory={{index .Config.Labels "com.docker.compose.project.working_dir"}}'
docker inspect tuando-website --format 'Files={{index .Config.Labels "com.docker.compose.project.config_files"}}'
docker inspect tuando-website --format '{{range $name, $_ := .NetworkSettings.Networks}}{{println $name}}{{end}}'
```

`uname -m` phải là `aarch64` cho image arm64 này. Nếu là `armv7l`, cần xuất thêm image arm/v7 trước khi tiếp tục. Ghi lại service, project, directory và các Compose files. Không dump toàn bộ environment của cloudflared vì có thể chứa tunnel token.

Lưu image cũ cho rollback rồi tải image mới trước khi thay container:

```sh
mkdir -p /root/tuando-rollbacks
OLD_IMAGE_ID=$(docker inspect tuando-website --format '{{.Image}}')
docker tag "$OLD_IMAGE_ID" tuando-site:rollback
docker pull ghcr.io/dmt1810/tuando-site:latest
```

Nếu pull báo `denied`, kiểm tra package Public hoặc đăng nhập GHCR theo bước 1. Nếu chưa có image/tag, kiểm tra Actions đã publish thành công chưa.

## 3. Cập nhật đúng stack đang chạy

Mở Compose file từ kết quả `Files` ở bước 2, trong directory đã in ra. Backup file trước khi sửa:

```sh
cd /DUONG_DAN_DIRECTORY_THUC_TE
cp docker-compose.yml docker-compose.yml.before-revamp
nano docker-compose.yml
```

Thay `docker-compose.yml` bằng tên thực tế nếu stack dùng `compose.yaml` hoặc tên khác. Nếu `Files` liệt kê nhiều file, giữ nguyên toàn bộ các `-f` khi chạy Compose. Không chọn folder khác hoặc project name mới: cần cập nhật service của stack cũ.

Ở service website, đổi `image` và bỏ `build`. Ví dụ source cũ dùng service `website`:

```yaml
services:
  website:
    image: ghcr.io/dmt1810/tuando-site:latest
    # Giữ container_name, ports, networks và restart đang dùng.
```

Giữ nguyên các cấu hình đang kết nối domain: tên container `tuando-website`, port mappings, network, restart và các alias. Xem các volume của riêng service website: nếu volume cũ ghi đè `/usr/share/nginx/html` hoặc `/etc/nginx/conf.d/default.conf`, bỏ mount đó để dùng nội dung và nginx config đã đóng gói trong image mới. Không thay cấu hình của n8n, Postgres hoặc cloudflared.

Có thể đặt `mem_limit: 64m` và `cpus: 0.25` cho riêng website. Image mới phục vụ HTTP ở cổng container `80`, giống nginx của website cũ.

Nếu stack được quản lý trong **Arcane**, sửa image và cấu hình service ngay ở stack hiện có trong Arcane rồi redeploy stack đó. Đường dẫn Compose trong Docker labels có thể là đường dẫn bên trong Arcane và không tồn tại ở shell host. Không tạo thêm stack/container cùng tên.

## 4. Pull và cập nhật container

Trong directory của stack hiện có, dùng service đã lấy ở bước 2. Ví dụ service là `website`:

```sh
docker compose config --quiet
docker compose pull website
docker compose up -d --no-deps --no-build website
docker compose ps
docker logs --tail 40 tuando-website
```

Thay `website` bằng service thực tế nếu khác. Nếu stack dùng các `-f` hoặc `-p`, thêm lại đúng các flag cũ vào cả ba lệnh Compose. `--no-deps` chỉ cập nhật website, không khởi động lại các service phụ thuộc.

Không chạy `docker compose down` cho cả hệ thống. Không cần clone source vào folder mới hay build Docker từ source trên TV box.

## 5. Kiểm tra domain

Vì đã giữ nguyên tên container, port và network, route hiện có thường không cần đổi. Nếu Cloudflare Tunnel đang trỏ tới `http://tuando-website:80`, nó tiếp tục dùng tên đó. Nếu đang trỏ qua host port, giữ đúng host port đã kiểm tra ở bước 2.

```sh
curl -I https://tuando.work/
curl -I https://tuando.work/vi/
curl -I https://tuando.work/sitemap-index.xml
curl -I https://tuando.work/Tuan_Do_CV.pdf
curl -I https://tuando.work/not-a-page/
```

Bốn URL đầu phải trả `200`, URL cuối `404`. Mở trình duyệt để kiểm tra office, theme, chuyển ngôn ngữ và CV. Nếu vẫn thấy web cũ, purge cache trong Cloudflare rồi tải lại.

Nếu gặp `502`, kiểm tra container web đã chạy, nginx đang nghe cổng `80`, và web cùng user-defined network với cloudflared khi route dùng tên Docker. Xem riêng tên/network của cloudflared bằng `docker ps` và `docker inspect --format`; không thay tunnel token hoặc tạo tunnel mới.

## 6. Những lần cập nhật sau

Sau mỗi lần push lên `main`, đợi Actions xanh rồi chạy lại:

```sh
cd /DUONG_DAN_DIRECTORY_THUC_TE
docker compose pull website
docker compose up -d --no-deps --no-build website
```

Với Arcane, dùng Pull/Redeploy của stack website hiện có. Không cần thay domain hoặc tạo branch mới.

Rollback: đổi riêng `image` của website về `tuando-site:rollback`, giữ các cấu hình khác và chạy `docker compose up -d --no-deps --no-build website`. Purge cache nếu cần. Tag rollback là local nên không chạy `pull` cho tag đó.

Nguồn kỹ thuật: [Docker Compose networking](https://docs.docker.com/compose/how-tos/networking/), [Docker Compose up](https://docs.docker.com/reference/cli/docker/compose/up/), [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry), [Cloudflare published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/).
