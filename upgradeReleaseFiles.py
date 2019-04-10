# -*- coding: UTF-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

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

cur_dir = os.path.abspath(os.getcwd())
target_dir = os.path.abspath(os.path.join(cur_dir, "release"))

if os.path.exists(os.path.join(cur_dir, "app")):
    cur_dir = os.path.join(cur_dir, "app")
    os.chdir(cur_dir)
    target_dir = os.path.abspath(os.path.join(cur_dir, ".."))

app_dir = os.path.join(target_dir, "tempapp")
rar_path = "\"C:\\Program Files\\WinRAR\\WinRAR.exe\""


gentoolbox = raw_input(
    u'Regenerate the toolbox configuration file??:[Y]') or "Y"
genscratch = raw_input(u'Regenerate scratchBlock?:[Y]') or "Y"
genapp = raw_input(u"Regenerate the oseppBlock publisher file ?[Y]") or 'Y'

if gentoolbox.upper().find("Y") >= 0:
   execfile('getToolboxXml.py')

if genscratch.upper().find("Y") >= 0:
    os.chdir(os.path.join(cur_dir, 'scratch-blocks'))
    os.system(sys.executable+' build.py')
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
        print(u"compressed:" + file+" size:%dkB -> %dkB (%.2f)" %
              (original_kb, compressed_kb, ratio))
        return True
    else:
        return False


# get version number
pg = json.load(open("package.json"))
cur_version = pg['version']
v1, v2, v3 = (''+pg['version']).split('.')
v3 = int(v3)+1
ver_str = '%s.%s.%d' % (v1, v2, v3)
#print ver_str

rpjs = re.compile('.*<script src="(.*\.js)"></script>.*')
if(os.path.exists(app_dir)):
    os.system('\"rd /s/q \"'+app_dir+'\"')
    os.mkdir(app_dir)
    time.sleep(0.1)


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

print(u"Copy files to a temporary directory")
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
print(u"Rebuild index.html,And packaged into web.zip")
if(os.path.exists(target_dir+os.path.sep+'web.zip')):
    os.remove(target_dir+os.path.sep+'web.zip')
index_file = open(app_dir+os.path.sep+"index.html", 'w')
index_file.writelines(webindex)
index_file.close()

rar_cmd = rar_path
rar_cmd += ' a -afzip -m5 -r -ep1 '
rar_cmd += ' \"'+target_dir+os.path.sep+'web.zip\"'
rar_cmd += ' \"'+app_dir+os.path.sep+'\"'
os.system('\"'+rar_cmd+'\"')

if genapp.upper().find('Y') < 0:
    exit(0)

# index.html for app
print(u"Rebuild index.html,And packaged into app.zip")
if(os.path.exists(target_dir+os.path.sep+'app.zip')):
    os.remove(target_dir+os.path.sep+'app.zip')
index_file = open(app_dir+os.path.sep+"index.html", 'w')
index_file.writelines(appindex)
index_file.close()

rar_cmd = rar_path
rar_cmd += ' a -afzip -m5 -r -ep1 '
rar_cmd += ' \"'+target_dir+os.path.sep+'app.zip\"'
rar_cmd += ' \"'+app_dir+os.path.sep+'\"'
os.system('\"'+rar_cmd+'\"')


def extract_file_from_zip(zip, file, savePath):
    # delete file first
    if os.path.exists(file):
        os.remove(file)
    rar_cmd = rar_path
    rar_cmd += ' e '
    rar_cmd += ' \"'+zip+'\"'
    rar_cmd = '%s e "%s" "%s" "%s"' % (rar_path, zip, file, savePath)
    os.system('\"'+rar_cmd+'\"')


def add_file_to_zip(zip, file, pathInZip):
    rar_cmd = rar_path + \
        ' a -ep1 -ap\"%s\" \"%s\" \"%s\"' % (pathInZip, zip, file)
    os.system('\"'+rar_cmd+'\"')


def del_file_from_zip(zip, file):
    rar_cmd = rar_path+' d \"%s\" \"%s\"' % (zip, file)
    os.system('\"'+rar_cmd+'\"')


def extract_asar_file(asarf, tdir):
    fstr = '\"'+asarf+'\"'
    dstr = '\"'+tdir+'\"'
    cmd = ".\\node_modules\\.bin\\asar e %s %s" % (fstr, dstr)
    os.system('\"'+cmd+'\"')


def package_asar(fdir, tfile):
    if os.path.exists(tfile):
        os.remove(tfile)  # delete first
    fstr = '\"'+fdir+'\"'
    dstr = '\"'+tfile+'\"'
    cmd = ".\\node_modules\\.bin\\asar p %s %s" % (fstr, dstr)
    os.system('\"'+cmd+'\"')


def copydir(fdir, tdir):
    filelist = os.listdir(fdir)
    for item in filelist:
        if os.path.isdir(item):
            shutil.copytree(os.path.join(fdir, item), os.path.join(tdir, item))
        else:
            shutil.copy(os.path.join(fdir, item), tdir)


def rebulid(zfile, asar_app_path):
    print(u"Building "+os.path.basename(zfile))
    workdir = os.path.join(target_dir, "rebuildTMP")
    if os.path.exists(workdir):
        os.system('\"rd /s/q \"'+workdir+'\"')
    os.mkdir(workdir)
    time.sleep(0.1)
    print(u"	Extract app.asar")
    extract_file_from_zip(zfile, os.path.join(
        asar_app_path, "app.asar"), workdir)
    print(u"	unpack app.asar")
    extract_asar_file(os.path.join(workdir, "app.asar"), workdir)
    print(u"	Delete files other than the node_modules directory")
    files = os.listdir(workdir)
    for item in files:
        if item == "node_modules":
            continue
        if os.path.isdir(item):
            os.system('\"rd /s/q \"'+os.path.join(workdir, item)+'\"')
        else:
            os.remove(os.path.join(workdir, item))
    print(u"	Copy the required files")
    copydir(app_dir, workdir)
    print(u"	repack app.asar")
    package_asar(workdir, os.path.join(target_dir, "app.asar"))
    print(u"	Delete the app.asar in the zip file")
    del_file_from_zip(zfile, os.path.join(asar_app_path, "app.asar"))
    print(u"	Save the new app.asar to the zip file")
    add_file_to_zip(zfile, os.path.join(target_dir, "app.asar"), asar_app_path)
    print(u"	Delete temporary folder")
    os.system('\"rd /s/q \"'+workdir+'\"')
    os.remove(os.path.join(target_dir, "app.asar"))
    print(u"	completed")


rebulid(os.path.join(target_dir, "oseppBlock-darwin-x64.zip"),
        "oseppBlock-darwin-x64\\oseppBlock.app\\Contents\\Resources")
rebulid(os.path.join(target_dir, "oseppBlock-linux-armv7l.zip"),
        "oseppBlock-linux-armv7l\\resources")
rebulid(os.path.join(target_dir, "oseppBlock-linux-ia32.zip"),
        "oseppBlock-linux-ia32\\resources")
rebulid(os.path.join(target_dir, "oseppBlock-linux-x64.zip"),
        "oseppBlock-linux-x64\\resources")
rebulid(os.path.join(target_dir, "oseppBlock-win32-ia32.zip"),
        "oseppBlock-win32-ia32\\resources")
rebulid(os.path.join(target_dir, "oseppBlock-win32-x64.zip"),
        "oseppBlock-win32-x64\\resources")

os.system('\"rd /s/q \"'+app_dir)
print(u"all done")
os.system("pause")
