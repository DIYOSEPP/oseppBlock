# -*- coding: UTF-8 -*-
import sys

import os
import shutil
import time
import json
import re
import glob
import httplib
import subprocess
import threading
import urllib
import urllib2

cur_dir = os.path.split(os.path.realpath(__file__))[0]

target_dir = cur_dir
cur_dir = os.path.join(cur_dir, "app")
os.chdir(cur_dir)

app_dir = os.path.join(target_dir, "tempapp")

if not os.path.exists(os.path.join(cur_dir, "scratch-blocks")):
    print("Directory is incorrect!")
    exit(0)


src = open(os.path.join(cur_dir, 'getToolboxXml.py')).read()
exec(src)


os.chdir(os.path.join(cur_dir, 'scratch-blocks'))
os.system('python build.py')
os.chdir(cur_dir)


def compilejs(file, saveto):
    params = [
        ("compilation_level", "SIMPLE_OPTIMIZATIONS"),
        ("output_format", "json"),
        ("output_info", "compiled_code"),
        ("output_info", "warnings"),
        ("output_info", "errors"),
        ("output_info", "statistics"),
    ]
    f = open(file)
    params.append(("js_code", "".join(f.readlines())))
    f.close()

    request = urllib2.Request(r"https://closure-compiler.appspot.com/compile")
    request.add_header("Content-type", "application/x-www-form-urlencoded")
    response = urllib2.urlopen(request, urllib.urlencode(params))
    json_str = response.read()
    json_data = json.loads(json_str)
    code = json_data["compiledCode"]

    stats = json_data["statistics"]
    original_b = stats["originalSize"]
    compressed_b = stats["compressedSize"]
    if original_b > 0 and compressed_b > 0:
        f = open(saveto, "w")
        f.write(code)
        f.close()
        original_kb = int(original_b / 1024 + 0.5)
        compressed_kb = int(compressed_b / 1024 + 0.5)
        ratio = int(float(compressed_b) / float(original_b) * 100 + 0.5)
        print(u"Compressed:" + file+" size:%dkB -> %dkB (%.2f)" %
              (original_kb, compressed_kb, ratio))
        return True
    else:
        return False


pg = json.load(open("package.json"))
cur_version = pg['version']
v1, v2, v3 = (''+pg['version']).split('.')
v3 = int(v3)+1
ver_str = '%s.%s.%d' % (v1, v2, v3)

rpjs = re.compile('.*<script src="(.*\.js)"></script>.*')

os.system('rm -rf \"'+app_dir+'\"')
os.mkdir(app_dir)

source_dir = ["blockIcon",
              "media",
              "prettify",
              "jQuery",
              "scratch-blocks/media",
              "scratch-blocks/msg", ]
source_file = ["scratch-blocks/arduino_compressed.js",
               "scratch-blocks/blockly_compressed_vertical.js",
               "scratch-blocks/blocks_compressed_arduino.js",
               "display.js",
               "main.js",
               "serial.js",
               "HWAgent.js",
               "package.json",
               "blocklytoolbox.js"]


for item in source_dir:
    shutil.copytree(os.path.join(cur_dir, item), os.path.join(app_dir, item))

for item in source_file:
    if item.endswith(".js") and os.path.dirname(item) == '' and item != "main.js":
        if not compilejs(os.path.join(cur_dir, item), os.path.join(app_dir, item)):
            shutil.copyfile(os.path.join(cur_dir, item),
                            os.path.join(app_dir, item))
    else:
        shutil.copyfile(os.path.join(cur_dir, item),
                        os.path.join(app_dir, item))

index_file = open(cur_dir+os.path.sep+"index.html", 'r')
appindex = []
webindex = []

delete_flag = False
while True:
    line = index_file.readline()
    if not line:
        break
    if line.strip() == '':
        continue
    if line.find("<!--delete-->") >= 0:
        delete_flag = not delete_flag
        continue
    if delete_flag:
        continue
    if line.find("<!--free") >= 0 or line.find("free-->") >= 0:
        continue
    if line.find('<title>oseppBlock</title>') >= 0:
        line = line.replace('oseppBlock', 'oseppBlock '+cur_version)

    appindex.append(line)
    if line.find('<script src="serial.js"></script>') >= 0:
        continue
    if line.find('genToolboxXml.js') >= 0:
        continue
    if rpjs.match(line):
        subs = rpjs.findall(line)[0]
        line = line.replace(subs, subs+'?v='+cur_version)
    webindex.append(line)

index_file.close()
# for web

if(os.path.exists(os.path.join(target_dir, 'web.zip'))):
    os.remove(os.path.join(target_dir, 'web.zip'))
index_file = open(os.path.join(app_dir, "index.html"), 'w')
index_file.writelines(webindex)
index_file.close()

os.chdir(app_dir)
os.system('zip -rq -9 \"'+os.path.join(target_dir, 'web.zip')+'" ./*')

# index.html for app

if(os.path.exists(target_dir+os.path.sep+'app.zip')):
    os.remove(target_dir+os.path.sep+'app.zip')
index_file = open(app_dir+os.path.sep+"index.html", 'w')
index_file.writelines(appindex)
index_file.close()

os.system('zip -rq -9 \"'+os.path.join(target_dir, 'app.zip')+'" ./*')
os.system('rm -rf \"'+app_dir+'\"')
