#!/bin/bash

for file in $(ls oseppBlock-*-*.zip); do
	rm -rf $(echo $file | awk -F"." '{print $1}')
	appfile=$(unzip $file "*/app.asar" | grep app.asar | awk -F":" '{print $2}')
	apppath=$(echo $appfile | awk -F '/[^/]*$' '{print $1}')
	app/node_modules/.bin/asar e $appfile $apppath/app
	ls $apppath/app | grep -v node_modules | sed "s:^:$apppath/app/:" | xargs rm -rf
	cp -r app/blockIcon $apppath/app
	cp -r app/jQuery $apppath/app
	cp -r app/media $apppath/app
	cp -r app/prettify $apppath/app
	cp -r app/scratchmedia $apppath/app
	cp -r app/index.html $apppath/app
	cp -r app/main.js $apppath/app
	cp -r app/oseppblock.js $apppath/app
	cp -r app/package.json $apppath/app
	cp -r app/preload.js $apppath/app
	rm $appfile
	app/node_modules/.bin/asar p $apppath/app $appfile
	rm -rf $apppath/app
	zip -u -9 $file $appfile $appfile
	rm -rf $(echo $file | awk -F"." '{print $1}')
done
