ionic cordova plugin save
ionic cordova platform remove android
ionic cordova platform add android --save
ionic cordova build android --prod --release

ionic cordova build android -- --buildFlag="-UseModernBuildSystem=0"
ionic cordova run android -- --buildFlag="-UseModernBuildSystem=0"