#include "config.h"

#include <SPI.h>         // needed for Arduino versions later than 0018
#include <Ethernet.h>

#define OFF HIGH
#define ON LOW


// MAC address and IP address for this *particular* Ethernet Shield!
// MAC address is printed on the shield
// IP address is an available address you choose on your subnet where the switcher is also present:
byte mac[] = { MAC_ADDRESS };      // <= SETUP!
IPAddress ip(IP_ADDRESS);              // <= SETUP!


// Include ATEM library and make an instance:
#include <ATEM.h>

// Connect to an ATEM switcher on this address and using this local port:
// The port number is chosen randomly among high numbers.
ATEM AtemSwitcher;


// Related to SkaarhojGPIO2x8:
#include <Wire.h>

void setup() { 

  // Start the Ethernet, Serial (debugging) and UDP:
  Ethernet.begin(mac,ip);
  // Serial.begin(9600);  
  // Serial.println("Serial started");

  Wire.begin(); // Start the wire library for communication with the GPIO chip.

  // Init:
  for (int i=0; i<8; i++)  {
    pinMode(OUTPUT_START+i,OUTPUT);
  }
  // Set:
  for (int i=0; i<8; i++)  {
    digitalWrite(OUTPUT_START+i, ON);
    delay(100); 
  }
  // Clear:
  for (int i=0; i<8; i++)  {
    digitalWrite(OUTPUT_START+i, OFF);
    delay(100); 
  }


  // Initialize a connection to the switcher:
  AtemSwitcher.begin(IPAddress(ATEM_IP), 56417);    // <= SETUP!
  AtemSwitcher.connect();
}


void setTallyProgramOutputs()  {
   // Setting colors of input select buttons:
  for (uint8_t i=0;i<8;i++)  {
    if (AtemSwitcher.getProgramTally(CAMERA_START+i))  {
      digitalWrite(OUTPUT_START+i, ON);
    }       
    else {
      digitalWrite(OUTPUT_START+i, OFF);
    }
  }
}

int calcPinNum(int channel, bool program){
  int num = OUTPUT_START+channel*2;
  num += (program?0:1);
  return num;
}


void setTallyPreviewProgramOutputs()  {
   // Setting colors of input select buttons:
  for (uint8_t i=0;i<4;i++)  {
    if (AtemSwitcher.getProgramTally(CAMERA_START+i))  {
      digitalWrite(calcPinNum(i, true), ON);
      digitalWrite(calcPinNum(i, false), OFF);
      // Serial.print(i);
      // Serial.println("PGM");
    }       
    else if (AtemSwitcher.getPreviewTally(CAMERA_START+i) )  {
      digitalWrite(calcPinNum(i, true), OFF);
      digitalWrite(OUTPUT_START+i*2+1, ON);
      // Serial.print(i);
      // Serial.println("PVW");
    }       
    else {
      digitalWrite(calcPinNum(i, true), OFF);
      digitalWrite(calcPinNum(i, false), OFF);
    }
  }
}

void loop() {

  // Check for packets, respond to them etc. Keeping the connection alive!
  AtemSwitcher.runLoop();

  // If connection is gone anyway, try to reconnect:
  if (AtemSwitcher.isConnectionTimedOut())  {
     // Serial.println("Connection to ATEM Switcher has timed out - reconnecting!");
     AtemSwitcher.connect();
  }  

  // ONLY UNCOMMENT ONE OF THE BELOW!!!
  // setTallyProgramOutputs();        // This will reflect inputs 1-8 Program tally on GPIO 1-8
  setTallyPreviewProgramOutputs();    // This will reflect inputs 1-4 Program/Preview tally on GPO 1-8 (in pairs)
}
