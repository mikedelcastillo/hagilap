# sudo apt install -y zip
npm run build
cd public
zip -rv9 hagilap.zip * .[^.]*

ssh a2 "rm -rf ~/hagilap.mikedc.io/*"
scp hagilap.zip a2:~/hagilap.mikedc.io
ssh a2 "cd hagilap.mikedc.io && unzip -o hagilap.zip -d . && rm hagilap.zip"

rm hagilap.zip
cd ..