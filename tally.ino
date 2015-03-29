#include "config.h"

#include <SPI.h>         // needed for Arduino versions later than 0018
#include <Ethernet.h>


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
  Serial.begin(9600);  
  Serial.println("Serial started");

  Wire.begin(); // Start the wire library for communication with the GPIO chip.

  // Set:
  for (int i=1; i<=8; i++)  {
    digitalWrite(OUTPUT_START+i, HIGH);
    delay(100); 
  }
  // Clear:
  for (int i=1; i<=8; i++)  {
    digitalWrite(OUTPUT_START+i, LOW);
    delay(100); 
  }


  // Initialize a connection to the switcher:
  AtemSwitcher.begin(IPAddress(ATEM_IP), 56417);    // <= SETUP!
//  AtemSwitcher.serialOutput(true);
  AtemSwitcher.connect();
}



void setTallyProgramOutputs()  {
   // Setting colors of input select buttons:
  for (uint8_t i=1;i<=8;i++)  {
    if (AtemSwitcher.getProgramTally(i))  {
      digitalWrite(OUTPUT_START+i, HIGH);
    }       
    else {
      digitalWrite(OUTPUT_START+i, LOW);
    }
  }
}

void setTallyPreviewProgramOutputs()  {
   // Setting colors of input select buttons:
  for (uint8_t i=1;i<=4;i++)  {
    if (AtemSwitcher.getProgramTally(i))  {
      digitalWrite(OUTPUT_START+i*2-1, HIGH);
    }       
    else {
      digitalWrite(OUTPUT_START+i*2-1, LOW);
    }

    if (AtemSwitcher.getPreviewTally(i))  {
      digitalWrite(OUTPUT_START+i*2, HIGH);
    }       
    else {
      digitalWrite(OUTPUT_START+i*2, LOW);
    }
  }
}

bool AtemOnline = false;
void loop() {

  // Check for packets, respond to them etc. Keeping the connection alive!
  AtemSwitcher.runLoop();

    // If connection is gone anyway, try to reconnect:
  if (AtemSwitcher.isConnectionTimedOut())  {
     Serial.println("Connection to ATEM Switcher has timed out - reconnecting!");
     AtemSwitcher.connect();
  }  

  // Selecting output mode: Let only ONE of the functions below be run - the others must be commented out:
  // setTallyProgramOutputs();    // This will reflect inputs 1-8 Program tally on GPO 1-8
 setTallyPreviewProgramOutputs();    // This will reflect inputs 1-4 Program/Preview tally on GPO 1-8 (in pairs)
}
