# -*- coding: UTF-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


from xml.dom import minidom

doc=minidom.parse('toolbox.xml')

filetext="""'use strict';
var blockToolboxXml=
'<xml id="toolbox-block" xmlns="http://www.w3.org/1999/xhtml">'+
"""

blockToolboxXml=doc.getElementsByTagName("blockToolboxXml")
categorys=blockToolboxXml[0]
text=''
for category in categorys.childNodes:text+=category.toprettyxml()
lines=text.splitlines()
for l in lines:
	if l.strip()!='':filetext+="'%s'+\n"%l
filetext+="'  </xml>'+\n''\n"


filetext+="""
var ModuleToolboxXml=
'<xml id="toolbox-Modules" xmlns="http://www.w3.org/1999/xhtml">'+
"""

blockToolboxXml=doc.getElementsByTagName("ModuleToolboxXml")
categorys=blockToolboxXml[0]
text=''
for category in categorys.childNodes:text+=category.toprettyxml()
lines=text.splitlines()
for l in lines:
	if l.strip()!='':filetext+="'%s'+\n"%l


filetext+="'  </xml>'+\n''\n"



f=open("blocklytoolbox.js",'w+')
f.write(filetext)
f.close()

print(u'blocklytoolbox.js file has been regenerated')