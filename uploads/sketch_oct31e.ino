// Define the LED digit patters, from 0 - 9
// Note that these patterns are for common cathode displays
// For common anode displays, change the 1's to 0's and 0's to 1's
// 1 = LED on, 0 = LED off, in this order:
//                                    Arduino pin: 0,1,2,3,4,5,6,7,8,9
byte seven_seg_digits[10][10] = { { 0,0,0,0,0,0,0,0,1,0 },  // = 0
                                  { 1,0,1,0,0,1,1,1,1,0 },  // = 1
                                  { 0,1,0,0,1,0,0,1,0,0 },  // = 2
                                  { 1,1,0,0,0,0,1,1,0,0 },  // = 3
                                  { 0,0,1,0,0,1,1,0,0,1 },  // = 4
                                  { 1,0,0,1,0,0,1,0,0,1 },  // = 5
                                  { 0,1,0,1,0,0,0,0,0,1 },  // = 6
                                  { 1,1,0,0,0,1,1,1,1,1 },  // = 7
                                  { 0,0,0,0,0,0,0,0,0,0 },  // = 8
                                  { 0,0,0,0,0,1,1,0,0,0 }   // = 9
                                 };                               
int count = 0;
int lastButtonState = LOW;
void setup() {
  Serial.end();
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);   
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);  //start
  pinMode(12, INPUT); //button
}

void writeDot(byte dot) {
  digitalWrite(10, dot);
}
    
void sevenSegWrite(byte digit) {
  byte pin = 0;
  for (byte segCount = 0; segCount < 10; ++segCount) {
    digitalWrite(pin, seven_seg_digits[digit][segCount]);
    ++pin;
  }
}

void loop() {
  int buttonState = digitalRead(12);
  if (buttonState != lastButtonState && buttonState == HIGH){
      count++;
      if(count > 9){ count = 0; }
  }
  lastButtonState = buttonState;
  digitalWrite(11,HIGH);
  sevenSegWrite(count);
  delay(100);
  
}

