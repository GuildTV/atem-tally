#ARDUINODIR is the path to where you have installed the Arduino software.
#BOARD tells the script what type of Arduino you want to build for and upload to.
#SERIALDEV is the POSIX device name of the serial device that represents your attached Arduino.

ARDUINODIR := /usr/share/arduino
BOARD := nano328
SERIALDEV := /dev/ttyUSB0

ARDUINODEVEL := lib/ArduinoDevel
LIBRARYPATH := lib $(ARDUINODIR)/libraries

include $(ARDUINODEVEL)/master.mk
