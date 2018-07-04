#!/bin/sh

for file in `ls oseppBlock-*-*.zip`; 
do 
	rm -rf $(echo $file | awk -F"." '{print $1}')
	appfile=$(unzip $file "*/app.asar" | grep app.asar | awk -F":" '{print $2}')
	apppath=$(echo $appfile | awk -F '/[^/]*$' '{print $1}')
	asar e $appfile $apppath/app
	ls $apppath/app | grep -v node_modules | sed "s:^:$apppath/app/:" | xargs rm -rf
	unzip -q app.zip -d $apppath/app
	rm $appfile
	asar p $apppath/app $appfile
	rm -rf $apppath/app
	zip -u -9 $file $appfile $appfile
	rm -rf $(echo $file | awk -F"." '{print $1}')
done;

