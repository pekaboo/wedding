FROM harbor.j-net.cn/tools/gateway:latest 
ADD . /usr/share/gateway/html
WORKDIR /usr/share/gateway/html
EXPOSE 80