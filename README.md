# oseppBlock

 <https://osepp.com/oseppblock-ide>  
 A graphical block system to demystify coding concepts based on the Arduino platform

![screen](screen.PNG)

---

## Using a precompiled version

1. Download the corresponding version of your system and unzip it  
 run the oseppBlock program in the directory
2. For linux system,make sure you have sufficient permissions on the folder and confirm that there is serial port permission  
 or run `sudo gpasswd --add ${USER} dialout`.  
 ubuntu19.xx maybe also need to run  
 `echo 'SUBSYSTEMS=="usb-serial", TAG+="uaccess"' | sudo tee /etc/udev/rules.d/01-ttyusb.rules && sudo udevadm control --reload`  
 and then Re-plug the Arduino board.
3. For windows, do not put files on the c drive, or the system directory such as desktop
4. If you are using network discovery(for OTA)  
 linux needs package `sudo apt-get -y install libavahi-compat-libdnssd-dev`  
 windows needs to install **Bonjour**  
 *(most systems are pre-installed)*
5. Execute the install.sh script(included in the archive) on the Linux system to create the desktop icon and .obp file association:  
 `chmod +x install.sh && ./install.sh`.  
 Uninstall by `./install -u`.

---

## Rebuild oseppBlock

### install Dependencies

+ Go to url: [https://nodejs.org](https://nodejs.org) and follow the instructions to install nodejs
+ java
+ python2
+ for windows,execute `npm install --global --production windows-build-tools`  
  It will automatically install `msBuildTools` and `python2.7` *(if they are not installed on your system)*  

### Get `oseppBlock` source code

```bash
        sudo apt-get update&&sudo apt-get -y install git #only need on linux
        cd $HOME
        #for windows , you need to download and install git first
        #then execute the following command in the bash environment
        git clone --depth 1 git://github.com/DIYOSEPP/oseppBlock.git
        cd oseppBlock
        git checkout master
        cd app/
```

### build

```bash
        npm install
        node build.js #rebuild scratch and copy file
        npx electron-rebuild -f #rebulid nodejs modules for electron
        npx electron . #try to run oseppBlock
```

 You should see oseppBlock already running

### Repackaged

```bash
        #linux windows
        npx electron-packager . --overwrite --asar --icon=media/osepp.ico  --prune=true --out=../release-builds
        #mac os
        npx electron-packager . --overwrite --asar --icon=media/osepp.icns --prune=true --out=../release-builds
```

 Packaged files will be stored in ../release-builds

### Compile/upload to Arduino board

When you use oseppBlock to compile and upload the program you designed, it will ask you the path of Arduino, make sure the Arduino IDE version you choose is **1.8.9**

### custom block

If you want to add your own block, please refer to  
[scratch-block wiki](https://github.com/LLK/scratch-blocks/wiki)  
[Introduction to Blockly](https://developers.google.com/blockly/guides/overview)

## change log

+ 20201023
  + Use mdns-js library instead of mdns, so that libavahi is no longer dependent.
  + Separate scratch and app, now they are two parallel projects
  + Update electron version
  + Add google-closure-compiler and google-closure-library, now scratch will be compiled locally
+ 20200104
  1. Built-in arduino-builder (because the arduino-builder included with arduino 1.8.10 IDE is not executable.)
  2. No longer necessary to link to the arduino IDE, so `send code to the arduino` has been canceled and modified to download the INO file.
  3. Added screenshot function to save Blocks as PNG files.
  4. Add some blocks and modify some blocks(from directly generating code to using libraries).So the Arduino IDE needs to install the [oseppRobot](https://github.com/DIYOSEPP/oseppBlock/raw/master/oseppRobot.zip) library to compile the INO file downloaded from oseppBlock.
+ 20190410
  1. Add Chinese support,Usually the display language is the system language,can be specified by adding `locale = [en | zh-cn]` on the command line.
  2. Add jquery ui, separate serial port message and IDE prompt information
  3. add line sensor Block
+ 20180704
  1. add negative Block
  2. change comment Text Font Size
+ 20180626
  1. Updated to the latest **scratch block** core
  2. Update to the latest **electron**
  3. add **robot** blocks and **remote** blocks
  4. add **tcp Serial Monitor**
  5. When the port is an IP address, use **arduino OTA** to upload the sketch (compatible with Arduino Uno Wifi)

note: Cross build for ia32

```bash
        apt-get install gcc-multilib g++-multilib
        npx electron-rebuild -f -a ia32
        npx electron-packager . --overwrite --asar --icon=media/osepp.ico  --prune=true --out=../release-builds --arch=ia32
```
