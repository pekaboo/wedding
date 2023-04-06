
docker stop my-nginx-container && docker rm my-nginx-container
docker rmi my-nginx-image
docker build -t my-nginx-image .
docker run -d -p 8088:8080 --name my-nginx-container my-nginx-image