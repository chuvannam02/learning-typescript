# ---------- Stage 1: Build ----------
FROM node:20-bullseye AS builder

# Tạo user và group không phải root
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tạo group và user non-root trên Debian
RUN groupadd -r appgroup \
 && useradd -r -g appgroup -d /app -s /sbin/nologin appuser

#Giải thích:
#groupadd -r appgroup → tạo system group
#useradd -r -g appgroup -d /app -s /sbin/nologin appuser
#-r → system user
#-g appgroup → gán group
#-d /app → home directory (không tạo folder thực tế)
#-s /sbin/nologin → không login shell
#Lưu ý: Debian-based image không hỗ trợ adduser -S như Alpine.

WORKDIR /app

# Tạo thư mục node_modules với quyền appuser
RUN mkdir -p /app/node_modules && chown -R appuser:appgroup /app

# Chuyển sang user non-root
USER appuser
# Copy package.json và tsconfig.json trước để tận dụng cache
COPY . ./

# Cài đặt dependencies
RUN npm ci --silent

RUN npm run build


# ---------- Stage 2: Runtime ----------
FROM nginx:1.29-alpine-slim

# Tạo user và group non-root
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tạo non-root user
RUN addgroup -S appgroup \
 && adduser -S appuser -G appgroup

# Xóa nội dung mặc định
RUN rm -rf /usr/share/nginx/html/*

# Copy build từ stage trước
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy cấu hình nginx (ví dụ dùng port 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Tạo và cấp quyền thư mục cần thiết
RUN mkdir -p /run/nginx && \
    chown -R appuser:appgroup /usr/share/nginx /var/cache/nginx /var/run /run /etc/nginx

# Chạy bằng user non-root
USER appuser

# Mở port 8080
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:8080/ || exit 1

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
