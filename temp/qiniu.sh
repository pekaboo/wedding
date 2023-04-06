cp -r * ./temp 
rm -rf ./temp/.git
rm -rf ./temp/temp
qshell qupload2 --thread-count=2 --bucket=myhtml  --src-dir=./temp --rescan-local=true --overwrite=true --check-exists=true  --check-hash=true --check-size=true
echo https://nav.cwcr.xyz >qshell.txt
qshell cdnrefresh -i qshell.txt