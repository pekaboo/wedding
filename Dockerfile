FROM nginx:latest

# 创建目录
RUN mkdir -p /usr/share/nginx/html/

# 将静态资源拷贝到容器中
COPY . /usr/share/nginx/html/

# 将自定义的 Nginx 配置文件拷贝到容器中
# COPY nginx.conf /etc/nginx/nginx.conf

# 开启容器的 80 端口
EXPOSE 8080