import math
import time
import requests
import os


urls = [ 
"https://s.hunlihu.com/shows/30a364bfae084b56a16161d91bbe462d.png",
"https://s.hunlihu.com/shows/186b420aa3d74635bb38a4980e7a8f8b.png",
"https://s.hunlihu.com/shows/b19df581fbee40c8967213670f94702e.jpg",
"https://s.hunlihu.com/shows/18ebf3c344b343058bf7e48c0992aad1.png",
"https://s.hunlihu.com/shows/67b74a14661a4540ba6b06667f59f781.png",
"https://s.hunlihu.com/shows/3af3d1f720ed49eda4bd1db5d8e6b021.png",
"https://s.hunlihu.com/shows/6cfcbe3b366a4ebcab57f3bd874a6b7e.png",
"https://s.hunlihu.com/shows/0688a9d02f22463aa35bee8dfabfeec1.jpg",
"https://s.hunlihu.com/shows/5cd712ed57a64b0a8afebb2b01125dbf.jpg",
"https://s.hunlihu.com/shows/c068d594ec7940b58884c02648e77e62.jpg",
"https://s.hunlihu.com/shows/128c1a2bad5d44fba2b19bdbebce8a00.jpg",
"https://s.hunlihu.com/shows/4a1b707c447d4117ae0eba4c243f4bc5.jpg",
"https://s.hunlihu.com/shows/5f61423455f143b59e909fbf5744a16d.png",
"https://s.hunlihu.com/shows/55ca42fe5601437a824c374ad3f7da72.jpg",
"https://s.hunlihu.com/shows/186b420aa3d74635bb38a4980e7a8f8b.png",
"https://s.hunlihu.com/shows/6b1f62fff9b444beadb68843327be9e6.jpg",
"https://s.hunlihu.com/shows/5c90680a0c1c4d5e95a5269a1aa9b3cb.jpg",
"https://s.hunlihu.com/shows/d04ac024ab824e6280bd47e9d68a2342.jpg",
"https://s.hunlihu.com/shows/9a36869937b14c2784b60fd99b9bf2b4.jpg",
"https://s.hunlihu.com/shows/af7c12601e604619811f3c29a85c9947.jpg",
"https://s.hunlihu.com/shows/542e2c3121584cc3ae4601f1958dcd63.jpg",
"https://s.hunlihu.com/shows/867748d83f8e4400bc4705baf60136e8.jpg",
"https://s.hunlihu.com/shows/47ebe7b4c76b454f98114f81728cf58b.jpg",
"https://s.hunlihu.com/shows/fc45f53209a149bd800534b51f1ac02a.jpg",
"https://s.hunlihu.com/shows/186b420aa3d74635bb38a4980e7a8f8b.png",
"https://s.hunlihu.com/shows/adc1fa1a4bec40e287a9e99e49d6cd61.jpg",
"https://s.hunlihu.com/shows/de0727f392c54cffbe709f8650d83209.png",
"https://s.hunlihu.com/shows/471f6407958a4e5eb15a0d9041a1da68.jpg",
"https://s.hunlihu.com/shows/3422d749aa7548678aa6d192bf74c928.jpg",
"https://s.hunlihu.com/shows/917a09c2894740e6ba79baed27a4e47f.jpg",
"https://s.hunlihu.com/shows/618045f8f851485e8778847667d3e280.png",
"https://s.hunlihu.com/shows/f741ae5f4739429b8fa7410b9321096a.png",
"https://s.hunlihu.com/shows/dc6586a96e6c48ab8912d5aaacdd95ce.jpg",
"https://s.hunlihu.com/shows/186b420aa3d74635bb38a4980e7a8f8b.png",
"https://s.hunlihu.com/shows/de0727f392c54cffbe709f8650d83209.png",
"https://s.hunlihu.com/shows/ded287b409ae437b8cee424bfcfcb7cb.png",
]
# 检查目录是否存在，如果不存在，则创建该目录
if not os.path.exists("images"):
    os.makedirs("images")

for url in urls:
    # 提取文件名
    filename = url.split("/")[-1]
    time.sleep(2)
    # 发送 GET 请求并保存响应内容
    response = requests.get(url)
    with open(os.path.join("img", filename), "wb") as f:
        f.write(response.content)

print("所有图片已下载完成。")