/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview English strings.
 * @author ascii@media.mit.edu (Andrew Sliwinski)
 *
 * After modifying this file, run `npm run translate` from the root directory
 * to regenerate `./msg/json/en.json`.
 * IMPORTANT:
 * All message strings must use single quotes for the scripts to work properly
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

// Context menus
Blockly.Msg.DUPLICATE = 'Duplicate';
Blockly.Msg.DELETE = 'Delete';
Blockly.Msg.ADD_COMMENT = 'Add Comment';
Blockly.Msg.REMOVE_COMMENT = 'Remove Comment';
Blockly.Msg.DELETE_BLOCK = 'Delete Block';
Blockly.Msg.DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.Msg.DELETE_ALL_BLOCKS = 'Delete all %1 blocks?';
Blockly.Msg.CLEAN_UP = 'Clean up Blocks';
Blockly.Msg.HELP = 'Help';
Blockly.Msg.UNDO = 'Undo';
Blockly.Msg.REDO = 'Redo';
Blockly.Msg.EDIT_PROCEDURE = 'Edit';
Blockly.Msg.SHOW_PROCEDURE_DEFINITION = 'Go to definition';
Blockly.Msg.WORKSPACE_COMMENT_DEFAULT_TEXT = 'Say something...';

// Color
Blockly.Msg.COLOUR_HUE_LABEL = 'Color';
Blockly.Msg.COLOUR_SATURATION_LABEL = 'Saturation';
Blockly.Msg.COLOUR_BRIGHTNESS_LABEL = 'Brightness';

// Variables
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.CHANGE_VALUE_TITLE = 'Change value:';
Blockly.Msg.RENAME_VARIABLE = 'Rename variable';
Blockly.Msg.RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';
Blockly.Msg.RENAME_VARIABLE_MODAL_TITLE = 'Rename Variable';
Blockly.Msg.NEW_VARIABLE = 'Make a Variable';
Blockly.Msg.NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.Msg.VARIABLE_MODAL_TITLE = 'New Variable';
Blockly.Msg.VARIABLE_ALREADY_EXISTS = 'A variable named "%1" already exists.';
Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = 'A variable named "%1" already exists for another variable of type "%2".';
Blockly.Msg.DELETE_VARIABLE_CONFIRMATION = 'Delete %1 uses of the "%2" variable?';
Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = 'Can\'t delete the variable "%1" because it\'s part of the definition of the function "%2"';
Blockly.Msg.DELETE_VARIABLE = 'Delete the "%1" variable';

// Custom Procedures
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_PROCEDURE = 'Make a Block';
Blockly.Msg.PROCEDURE_ALREADY_EXISTS = 'A procedure named "%1" already exists.';
Blockly.Msg.PROCEDURE_DEFAULT_NAME = 'block name';

// Lists
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_LIST = 'Make a List';
Blockly.Msg.NEW_LIST_TITLE = 'New list name:';
Blockly.Msg.LIST_MODAL_TITLE = 'New List';
Blockly.Msg.LIST_ALREADY_EXISTS = 'A list named "%1" already exists.';
Blockly.Msg.RENAME_LIST_TITLE = 'Rename all "%1" lists to:';
Blockly.Msg.RENAME_LIST_MODAL_TITLE = 'Rename List';
Blockly.Msg.DEFAULT_LIST_ITEM = 'thing';
Blockly.Msg.DELETE_LIST = 'Delete the "%1" list';
Blockly.Msg.RENAME_LIST = 'Rename list';

// // Broadcast Messages
// // @todo Remove these once fully managed by Scratch VM / Scratch GUI
// Blockly.Msg.NEW_BROADCAST_MESSAGE = 'New message';
// Blockly.Msg.NEW_BROADCAST_MESSAGE_TITLE = 'New message name:';
// Blockly.Msg.BROADCAST_MODAL_TITLE = 'New Message';
// Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME = 'message1';

Blockly.Msg.ButtonNewWorkspace = 'New Workspace';
Blockly.Msg.ButtonSaveBlocksToFile = 'Save Blocks To File';
Blockly.Msg.ButtonLoadBlocksFromFile = 'load blocks from file';
Blockly.Msg.ButtonUndo = 'Undo';
Blockly.Msg.ButtonRedo = 'Redo';
Blockly.Msg.ButtonSendCodeToArduinoIde = 'save sketch to file';
Blockly.Msg.ButtonVerify = 'Verify';
Blockly.Msg.ButtonUpLoad = 'Upload';
Blockly.Msg.ButtonToogleSerial = 'toggle serial message box open/close';
Blockly.Msg.ButtonConnectSerial = 'connect serial port';
Blockly.Msg.ButtonResetUno = 'reset uno';
Blockly.Msg.ButtonSendMsg = 'send text to uno';
Blockly.Msg.LabelArduinoUnoOn = "Arduino Uno on";
Blockly.Msg.LabelNoLineEnding = "No line ending";
Blockly.Msg.LabelNewline = "Newline";
Blockly.Msg.LabelCarriageReturn = "Carriage return";
Blockly.Msg.LabelBothNLCR = "Both NL&CR";



Blockly.Msg.CATEGORY_CONTROL = 'Control';
Blockly.Msg.CATEGORY_ARDUINO = 'Arduino';
Blockly.Msg.CATEGORY_OPERATORS = 'Operators';
Blockly.Msg.CATEGORY_VARIABLE = 'Variable';
Blockly.Msg.CATEGORY_PROCEDURE = 'Procedure';
Blockly.Msg.CATEGORY_ROBOTMODULES = 'Robot Modules';
Blockly.Msg.CATEGORY_DISPLAYMODULES = 'Display Modules';
Blockly.Msg.CATEGORY_INPUTMODULES = 'Input Modules';
Blockly.Msg.CATEGORY_OUTPUTMODULES = 'Output Modules';

Blockly.Msg.CONTROL_IF_TOOLTIP = 'IF A VALUE IS TRUE TO A CONDITION, DO SOMETHING. ELSE IS EXCEPTION';
Blockly.Msg.CONTROL_IF_HELPURL = 'https://www.arduino.cc/en/Reference/If';
Blockly.Msg.CONTROL_IF_IF = 'if';
Blockly.Msg.CONTROL_IF_ELSE = 'else';
Blockly.Msg.CONTROL_IF_ELSE_IF = 'else if';
Blockly.Msg.CONTROL_IF_DO = 'Do';

Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP = '';
Blockly.Msg.CONTROLS_IF_ELSEIF_HELPURL = '';
Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'else if';

Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP = '';
Blockly.Msg.CONTROLS_IF_ELSE_HELPURL = '';
Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE = 'else';

Blockly.Msg.CONTROLS_IF_IF_TOOLTIP = '';
Blockly.Msg.CONTROLS_IF_IF_HELPURL = '';
Blockly.Msg.CONTROLS_IF_IF_TITLE_IF = 'if';

Blockly.Msg.CONTROL_FORLOOP_TOOLTIP = 'THE "FOR" STATEMENT IS USED TO REPEAT AN ACTION WITHIN THIS BLOCK IF SET CONDITIONS ARE TRUE.s';
Blockly.Msg.CONTROL_FORLOOP_HELPURL = 'https://www.arduino.cc/en/Reference/For';
Blockly.Msg.CONTROL_FORLOOP_INITFOR = 'for(';
Blockly.Msg.CONTROL_FORLOOP_INITNUMBER = '=';
Blockly.Msg.CONTROL_FORLOOP_CONDITION = ';';
Blockly.Msg.CONTROL_FORLOOP_STEP = ';';
Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_INC = '++';
Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_DEC = '- -';
Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_INCN = '+=';
Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_DECN = '- =';
Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_EQ = '=';
Blockly.Msg.CONTROL_FORLOOP_ENDING = ')';

Blockly.Msg.CONTROL_WHILE_TOOLTIP = 'WHILE A VALUE IS TRUE, THEN A LOOP OCCURS';
Blockly.Msg.CONTROL_WHILE_HELPURL = 'https://www.arduino.cc/en/Reference/While';
Blockly.Msg.CONTROL_WHILE_CONDITIONWHILE = 'while';

Blockly.Msg.CONTROL_BREAK_TOOLTIP = 'BREAK IS USED TO EXIT FROM LOOPS';
Blockly.Msg.CONTROL_BREAK_HELPURL = 'https://www.arduino.cc/en/Reference/Break';
Blockly.Msg.CONTROL_BREAK_BREAK = 'break';

Blockly.Msg.CONTROL_DELAY_TOOLTIP = 'PAUSE THE PROGRAM FOR THE AMOUNT OF TIME (IN MILLISECONDS)';
Blockly.Msg.CONTROL_DELAY_HELPURL = 'https://www.arduino.cc/en/Reference/Delay';
Blockly.Msg.CONTROL_DELAY_MSDELAY = 'delay';
Blockly.Msg.CONTROL_DELAY_MILLISECONDS = 'Milliseconds';

Blockly.Msg.CONTROL_DELAYMICROSECONDS_TOOLTIP = 'PAUSE THE PROGRAM FOR THE AMOUNT OF TIME (1000 Microseconds = 1 sec)';
Blockly.Msg.CONTROL_DELAYMICROSECONDS_HELPURL = 'https://www.arduino.cc/en/Reference/DelayMicroseconds';
Blockly.Msg.CONTROL_DELAYMICROSECONDS_USDELAY = 'delay';
Blockly.Msg.CONTROL_DELAYMICROSECONDS_MICROSECONDS = 'Microseconds';

Blockly.Msg.CONTROL_MILLIS_TOOLTIP = 'RETURNS THE NUMBER OF MILLISECONDS (1 sec = 1000 milliseconds) SINCE THE ARDUINO BOARD BEGAN RUNNING THE CURRENT PROGRAM';
Blockly.Msg.CONTROL_MILLIS_HELPURL = 'https://www.arduino.cc/en/Reference/Millis';
Blockly.Msg.CONTROL_MILLIS_MILLIS = 'Millis';

Blockly.Msg.CONTROL_MICROS_TOOLTIP = 'RETURNS THE NUMBER OF MICROSECONDS (1 sec = 1,000,000 microseconds) SINCE THE ARDUINO BOARD BEGAN RUNNING THE CURRENT PROGRAM';
Blockly.Msg.CONTROL_MICROS_HELPURL = 'https://www.arduino.cc/en/Reference/Micros';
Blockly.Msg.CONTROL_MICROS_MICROS = 'Micros';


Blockly.Msg.ARITHMETICOPERATORS_TOOLTIP = {
    '+': 'These operators return the sum of the two operands',
    '-': 'These operators return the difference of the two operands',
    '*': 'These operators return the product of the two operands',
    '/': 'These operators return the quotient (respectively) of the two operands',
    '%': 'Calculates the remainder when one integer is divided by another.'
};

Blockly.Msg.ARITHMETICOPERATORS_HELPURL = {
    '+': 'https://www.arduino.cc/en/Reference/Arithmetic',
    '-': 'https://www.arduino.cc/en/Reference/Arithmetic',
    '*': 'https://www.arduino.cc/en/Reference/Arithmetic',
    '/': 'https://www.arduino.cc/en/Reference/Arithmetic',
    '%': 'https://www.arduino.cc/en/Reference/Modulo'
};
Blockly.Msg.ARITHMETICOPERATORS_OPTION_PLUS = '+';
Blockly.Msg.ARITHMETICOPERATORS_OPTION_MINUS = '-';
Blockly.Msg.ARITHMETICOPERATORS_OPTION_MUL = '*';
Blockly.Msg.ARITHMETICOPERATORS_OPTION_DIV = '/';
Blockly.Msg.ARITHMETICOPERATORS_OPTION_MOD = '%';



Blockly.Msg.NEGATIVEOPERATORS_TOOLTIP = 'Return negative number';
Blockly.Msg.NEGATIVEOPERATORS_HELPURL = '';
Blockly.Msg.NEGATIVEOPERATORS_NUM2NEGATIVE = 'Negative';

Blockly.Msg.COMPARISONOPERATORS_TOOLTIP = {
    ' == ': 'x == y(x is equal to y) ? ',
    ' != ': 'x != y(x is not equal to y) ? ',
    ' < ': 'x < y(x is less than y) ? ',
    ' > ': 'x > y(x is greater than y) ? ',
    ' <= ': 'x <= y(x is less than or equal to y) ? ',
    ' >= ': 'x >= y(x is greater than or equal to y) ? '
};

Blockly.Msg.COMPARISONOPERATORS_HELPURL = {
    ' == ': '',
    ' != ': '',
    ' < ': '',
    ' > ': '',
    ' <= ': '',
    ' >= ': ''
};
Blockly.Msg.COMPARISONOPERATORS_OPTION_EQ = "==";
Blockly.Msg.COMPARISONOPERATORS_OPTION_NE = "!=";
Blockly.Msg.COMPARISONOPERATORS_OPTION_LT = "<";
Blockly.Msg.COMPARISONOPERATORS_OPTION_GT = ">";
Blockly.Msg.COMPARISONOPERATORS_OPTION_LE = "<=";
Blockly.Msg.COMPARISONOPERATORS_OPTION_GE = ">=";


Blockly.Msg.BOOLEANOPERATORS_TOOLTIP = {
    ' && ': 'True only if both operands are true',
    ' || ': 'True if either operand is true'
};

Blockly.Msg.BOOLEANOPERATORS_HELPURL = {
    ' && ': 'https://www.arduino.cc/en/Reference/Boolean',
    ' || ': 'https://www.arduino.cc/en/Reference/Boolean'
};
Blockly.Msg.BOOLEANOPERATORS_OPTION_AND = 'AND';
Blockly.Msg.BOOLEANOPERATORS_OPTION_OR = 'OR';


Blockly.Msg.NOTOPERATORS_TOOLTIP = 'True if the operand is false';
Blockly.Msg.NOTOPERATORS_HELPURL = 'https://www.arduino.cc/en/Reference/Boolean';
Blockly.Msg.NOTOPERATORS_NUM2NOT = 'NOT';


Blockly.Msg.MATHMINMAX_TOOLTIP = {
    'min': 'Calculates the minimum of two numbers',
    'max': 'Calculates the maximum of two numbers'
};
Blockly.Msg.MATHMINMAX_HELPURL = {
    'min': 'https://www.arduino.cc/en/Reference/Min',
    'max': 'https://www.arduino.cc/en/Reference/Max'
};
Blockly.Msg.MATHMINMAX_OPTION_MIN = 'min';
Blockly.Msg.MATHMINMAX_OPTION_MAX = 'max';

Blockly.Msg.MATHMINMAX_NUM1 = 'of';
Blockly.Msg.MATHMINMAX_NUM2 = 'or';

Blockly.Msg.MATHOPERATORS_TOOLTIP = {
    'abs': 'Computes the absolute value of a number',
    'sqrt': 'Calculates the square root of a number',
    'sin': 'Calculates the sine of an angle(in radians).The result will be between - 1 and 1.',
    'cos': 'Calculates the cos of an angle(in radians).The result will be between - 1 and 1.',
    'tan': 'Calculates the tangent of an angle(in radians).The result will be between negative infinity and infinity.'
};
Blockly.Msg.MATHOPERATORS_HELPURL = {
    'abs': 'https://www.arduino.cc/en/Reference/Abs',
    'sqrt': 'https://www.arduino.cc/en/Reference/Sqrt',
    'sin': 'https://www.arduino.cc/en/Reference/Sin',
    'cos': 'https://www.arduino.cc/en/Reference/Cos',
    'tan': 'https://www.arduino.cc/en/Reference/Tan'
};
Blockly.Msg.MATHOPERATORS_NUMOF = 'of';

Blockly.Msg.MATHOPERATORS_OPTION_ABS = 'abs';
Blockly.Msg.MATHOPERATORS_OPTION_SQRT = 'sqrt';
Blockly.Msg.MATHOPERATORS_OPTION_SIN = 'sin';
Blockly.Msg.MATHOPERATORS_OPTION_COS = 'cos';
Blockly.Msg.MATHOPERATORS_OPTION_TAN = 'tan';


Blockly.Msg.MATHCONSTRAIN_TOOLTIP = 'Constrains a number to be within a range';
Blockly.Msg.MATHCONSTRAIN_HELPURL = 'https://www.arduino.cc/en/Reference/Constrain';
Blockly.Msg.MATHCONSTRAIN_XCONSTRAIN = 'constrain';
Blockly.Msg.MATHCONSTRAIN_ARANGE = 'range';
Blockly.Msg.MATHCONSTRAIN_BTO = 'to';


Blockly.Msg.MATHMAP_TOOLTIP = 'Re-maps a number from one range to another';
Blockly.Msg.MATHMAP_HELPURL = 'https://www.arduino.cc/en/Reference/Map';
Blockly.Msg.MATHMAP_XMAP = 'map';
Blockly.Msg.MATHMAP_FLFROM = 'from';
Blockly.Msg.MATHMAP_FH = ',';
Blockly.Msg.MATHMAP_TLTO = 'to';
Blockly.Msg.MATHMAP_TH = ',';

Blockly.Msg.MATHRANDOM_TOOLTIP = 'generates pseudo-random numbers';
Blockly.Msg.MATHRANDOM_HELPURL = 'https://www.arduino.cc/en/Reference/Random';
Blockly.Msg.MATHRANDOM_LRANDOM_FROM = 'random from';
Blockly.Msg.MATHRANDOM_HTO = 'to';

Blockly.Msg.MATH_BOOLEAN_MENU_TOOLTIP = '';
Blockly.Msg.MATH_BOOLEAN_MENU_HELPURL = '';

Blockly.Msg.MATH_BOOLEAN_MENU_OPTION_TRUE = 'True';
Blockly.Msg.MATH_BOOLEAN_MENU_OPTION_FALSE = 'False';


Blockly.Msg.CONTROLSETUPLOOP_TOOLTIP = 'Arduino program structure,do setup once and do loop foreven';
Blockly.Msg.CONTROLSETUPLOOP_HELPURL = 'https://www.arduino.cc/en/Reference/HomePage';
Blockly.Msg.CONTROLSETUPLOOP_ARDUINO_PROGRAM = 'Arduino Program';
Blockly.Msg.CONTROLSETUPLOOP_SETUPSTACKSETUP = 'Setup';
Blockly.Msg.CONTROLSETUPLOOP_LOOPSTACKLOOP = 'Loop';

Blockly.Msg.IO_READDIGITALPIN_TOOLTIP = 'READ THE VALUES FROM A SPECIFIC DIGITAL PIN, EITHER HIGH OR LOW';
Blockly.Msg.IO_READDIGITALPIN_HELPURL = 'https://www.arduino.cc/en/Reference/DigitalRead';
Blockly.Msg.IO_READDIGITALPIN_PINDIGITALREAD = 'digitalRead';

Blockly.Msg.IO_READANALOGPIN_TOOLTIP = 'READ THE VALUES(0-1023) FROM SPECIFIED ANALOG PIN';
Blockly.Msg.IO_READANALOGPIN_HELPURL = 'https://www.arduino.cc/en/Reference/AnalogRead';
Blockly.Msg.IO_READANALOGPIN_PINANALOGREAD = 'analogRead';

Blockly.Msg.IO_WRITEDIGITALPIN_TOOLTIP = 'WRITE A HIGH OR LOW VALUE TO A DIGITAL PIN';
Blockly.Msg.IO_WRITEDIGITALPIN_HELPURL = 'https://www.arduino.cc/en/Reference/DigitalWrite';
Blockly.Msg.IO_WRITEDIGITALPIN_PINDIGITALWRITE = 'digitalWrite';

Blockly.Msg.IO_WRITEANALOGPIN_TOOLTIP = 'WRITE AS AN ANALOG VALUE(0-255) TO A PIN.';
Blockly.Msg.IO_WRITEANALOGPIN_HELPURL = 'https://www.arduino.cc/en/Reference/AnalogWrite';
Blockly.Msg.IO_WRITEANALOGPIN_PINANALOGWRITE = 'analogWrite';

Blockly.Msg.IO_PINMODE_TOOLTIP = 'CONFIGURES THE SPECIFIC PIN TO BEHAVE EITHER AS AN INPUT OR OUTPUT';
Blockly.Msg.IO_PINMODE_HELPURL = 'https://www.arduino.cc/en/Reference/PinMode';
Blockly.Msg.IO_PINMODE_PINPINMODE = 'pinMode';
Blockly.Msg.IO_PINMODE_OPTION_OUTPUT = 'OUTPUT';
Blockly.Msg.IO_PINMODE_OPTION_INPUT = 'INPUT';
Blockly.Msg.IO_PINMODE_OPTION_INPUT_PULLUP = 'INPUT_PULLUP';



Blockly.Msg.IO_ARDUINO_UNO_DIGITALPIN_MENU_TOOLTIP = '';
Blockly.Msg.IO_ARDUINO_UNO_DIGITALPIN_MENU_HELPURL = '';

Blockly.Msg.IO_ARDUINO_UNO_ANALOGPIN_MENU_TOOLTIP = '';
Blockly.Msg.IO_ARDUINO_UNO_ANALOGPIN_MENU_HELPURL = '';

Blockly.Msg.IO_ARDUINO_UNO_PWMPIN_MENU_TOOLTIP = '';
Blockly.Msg.IO_ARDUINO_UNO_PWMPIN_MENU_HELPURL = '';

Blockly.Msg.IO_PINSTATE_MENU_TOOLTIP = '';
Blockly.Msg.IO_PINSTATE_MENU_HELPURL = '';
Blockly.Msg.IO_PINSTATE_MENU_OPTION_HIGH = 'HIGH';
Blockly.Msg.IO_PINSTATE_MENU_OPTION_LOW = 'LOW';



Blockly.Msg.IO_TONE_TOOLTIP = 'GENERATES A SPECIFIC TONE SOUND';
Blockly.Msg.IO_TONE_HELPURL = 'https://www.arduino.cc/en/Reference/Tone';
Blockly.Msg.IO_TONE_PINTONE = 'tone';


Blockly.Msg.IO_TONE_MENU_TOOLTIP = '';
Blockly.Msg.IO_TONE_MENU_HELPURL = '';

Blockly.Msg.IO_NOTONE_TOOLTIP = 'STOPS THE TONE() SOUND';
Blockly.Msg.IO_NOTONE_HELPURL = 'https://www.arduino.cc/en/Reference/NoTone';
Blockly.Msg.IO_NOTONE_PINNOTONE = 'noTone';

Blockly.Msg.IO_PULSEIN_TOOLTIP = 'READS A PULSE (EITHER HIGH OR LOW) ON A PIN';
Blockly.Msg.IO_PULSEIN_HELPURL = 'https://www.arduino.cc/en/Reference/PulseIn';
Blockly.Msg.IO_PULSEIN_PINPULSEIN = 'pulseIn';
Blockly.Msg.IO_PULSEIN_TIMEOUTTIMEOUT = 'Timeout';

Blockly.Msg.INSTANCE_SERIAL_TOOLTIP = 'SETS THE DATA RATE IN BITS PER SECOND (BAUD) FOR SERIAL DATA TRANSMISSION';
Blockly.Msg.INSTANCE_SERIAL_HELPURL = 'https://www.arduino.cc/en/Serial/Begin';
Blockly.Msg.INSTANCE_SERIAL_SERIALBEGIN = 'Serial.begin(';
Blockly.Msg.INSTANCE_SERIAL = ')';

Blockly.Msg.SERIAL_PRINT_TOOLTIP = 'PRINT A VARIABLE TO THE SERIAL PORT';
Blockly.Msg.SERIAL_PRINT_HELPURL = 'https://www.arduino.cc/en/Serial/Print';
Blockly.Msg.SERIAL_PRINT_VALUESERIAL = 'Serial';
Blockly.Msg.SERIAL_PRINT_OPTION_PRINT = 'print';
Blockly.Msg.SERIAL_PRINT_OPTION_PRINTLN = 'println';

Blockly.Msg.SERIAL_AVAILABLE_TOOLTIP = 'GET THE NUMBER OF BYTES (CHARACTERS) AVAILABLE FOR READING FROM THE SERIAL PORT';
Blockly.Msg.SERIAL_AVAILABLE_HELPURL = 'https://www.arduino.cc/en/Serial/Available';
Blockly.Msg.SERIAL_AVAILABLE_SERIAL_AVAILABLE = 'Serial.available';

Blockly.Msg.SERIAL_READ_TOOLTIP = 'READS INCOMING SERIAL DATA';
Blockly.Msg.SERIAL_READ_HELPURL = 'https://www.arduino.cc/en/Serial/Read';
Blockly.Msg.SERIAL_READ_SERIAL_READ = 'Serial.read';

Blockly.Msg.IO_ARDUINO_UNO_PIN_USABLE_MENU_TOOLTIP = 'digital pin set';
Blockly.Msg.IO_ARDUINO_UNO_PIN_USABLE_MENU_HELPURL = '';

Blockly.Msg.INSTANCE_CREATE_NUMBER_TOOLTIP = {
    'int': 'Integers are your primary data-type for number storage.',
    'long': 'Long variables are extended size variables for number storage, and store 32 bits (4 bytes), from -2,147,483,648 to 2,147,483,647.',
    'unsigned int': 'only store positive values, yielding a useful range of 0 to 65,535 (2^16) - 1).',
    'unsigned long': 'Unsigned long variables are extended size variables for number storage, and store 32 bits (4 bytes). Unlike standard longs unsigned longs won\'t store negative numbers, making their range from 0 to 4,294,967,295 (2^32 - 1).',
    'char': 'A data type that takes up 1 byte of memory that stores a character value',
    'byte': 'A byte stores an 8-bit unsigned number, from 0 to 255.',
    'float': 'Datatype for floating-point numbers, a number that has a decimal point.'
};

Blockly.Msg.INSTANCE_CREATE_NUMBER_HELPURL = {
    'int': 'https://www.arduino.cc/en/Reference/Int',
    'long': 'https://www.arduino.cc/en/Reference/Long',
    'unsigned int': 'https://www.arduino.cc/en/Reference/UnsignedInt',
    'unsigned long': 'https://www.arduino.cc/en/Reference/UnsignedLong',
    'char': 'https://www.arduino.cc/en/Reference/Char',
    'byte': 'https://www.arduino.cc/en/Reference/Byte',
    'float': 'https://www.arduino.cc/en/Reference/Float'
};
Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION = {
    'int': 'int',
    'long': 'long',
    'unsigned int': 'unsigned int',
    'unsigned long': 'unsigned long',
    'char': 'char',
    'byte': 'byte',
    'float': 'float'
};
Blockly.Msg.INSTANCE_CREATE_NUMBER = '=';

Blockly.Msg.INSTANCE_NUMBER_GETTER_TOOLTIP = 'retrieve value from variable sign';
Blockly.Msg.INSTANCE_NUMBER_GETTER_HELPURL = 'https://www.arduino.cc/en/Reference/Scope';

Blockly.Msg.INSTANCE_SET_NUMBER_TOOLTIP = 'Stores the value to the right of the equal sign in the variable to the left of the equal sign';
Blockly.Msg.INSTANCE_SET_NUMBER_HELPURL = 'https://www.arduino.cc/en/Reference/Assignment';

Blockly.Msg.INSTANCE_SET_NUMBER_OPTION = {
    '=': '=',
    '++': '++',
    '--': '- -',
    '+=': '+=',
    '-=': '- =',
    '*=': '*=',
    '/=': '/=',
    '%=': '%='
};


Blockly.Msg.INSTANCE_CREATE_BOOLEAN_TOOLTIP = 'A boolean holds one of two values, true or false.';
Blockly.Msg.INSTANCE_CREATE_BOOLEAN_HELPURL = 'https://www.arduino.cc/en/Reference/BooleanVariables';
Blockly.Msg.INSTANCE_CREATE_BOOLEAN_BOOLEAN = 'boolean ';
Blockly.Msg.INSTANCE_CREATE_BOOLEAN_ASSIGN = '=';
Blockly.Msg.INSTANCE_CREATE_BOOLEAN_OPTION = {
    "false": "False",
    "true": "True"
};


Blockly.Msg.INSTANCE_SET_BOOLEAN_TOOLTIP = 'Stores the value to the right of the equal sign in the variable to the left of the equal sign';
Blockly.Msg.INSTANCE_SET_BOOLEAN_HELPURL = 'https://www.arduino.cc/en/Reference/Assignment';
Blockly.Msg.INSTANCE_SET_BOOLEAN_ASSIGN = '=';

Blockly.Msg.INSTANCE_BOOLEAN_GETTER_TOOLTIP = 'retrieve value from variable sign';
Blockly.Msg.INSTANCE_BOOLEAN_GETTER_HELPURL = 'https://www.arduino.cc/en/Reference/Scope';

Blockly.Msg.INSTANCE_CREATE_STRING_TOOLTIP = 'The String class,allows you to use and manipulate strings';
Blockly.Msg.INSTANCE_CREATE_STRING_HELPURL = 'https://www.arduino.cc/en/Reference/StringObject';
Blockly.Msg.INSTANCE_CREATE_STRING_STRING = 'string ';
Blockly.Msg.INSTANCE_CREATE_STRING_ASSIGN = '=';


Blockly.Msg.INSTANCE_SET_STRING_TOOLTIP = 'Stores the value to the right of the equal sign in the variable to the left of the equal sign';
Blockly.Msg.INSTANCE_SET_STRING_HELPURL = 'https://www.arduino.cc/en/Reference/String';
Blockly.Msg.INSTANCE_SET_STRING_ASSIGN = '=';

Blockly.Msg.INSTANCE_STRING_GETTER_TOOLTIP = 'retrieve value from variable sign';
Blockly.Msg.INSTANCE_STRING_GETTER_HELPURL = 'https://www.arduino.cc/en/Reference/String';

Blockly.Msg.INSTANCE_CREATE_ARRAY_TOOLTIP = 'An array is a collection of variables that are accessed with an index number';
Blockly.Msg.INSTANCE_CREATE_ARRAY_HELPURL = 'https://www.arduino.cc/en/Reference/Array';
Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION = {
    'int': 'int array',
    'long': 'long array',
    'unsigned int': 'unsigned int array',
    'unsigned long': 'unsigned long array',
    'char': 'char array',
    'byte': 'byte array',
    'float': 'float array'
};


Blockly.Msg.INSTANCE_ARRAY_NUMBER_TOOLTIP = '';
Blockly.Msg.INSTANCE_ARRAY_NUMBER_HELPURL = '';

Blockly.Msg.INSTANCE_ARRAY_ARRAY_TOOLTIP = '';
Blockly.Msg.INSTANCE_ARRAY_ARRAY_HELPURL = '';

Blockly.Msg.INSTANCE_SET_ARRAY_TOOLTIP = 'assign a value to an array';
Blockly.Msg.INSTANCE_SET_ARRAY_HELPURL = 'https://www.arduino.cc/en/Reference/Array';


Blockly.Msg.INSTANCE_ARRAY_GETTER_TOOLTIP = 'retrieve a value from an array';
Blockly.Msg.INSTANCE_ARRAY_GETTER_HELPURL = 'https://www.arduino.cc/en/Reference/Array';

Blockly.Msg.INSTANCE_RGB_TOOLTIP = '';
Blockly.Msg.INSTANCE_RGB_HELPURL = '';
Blockly.Msg.INSTANCE_RGB_NAME = 'RGB Module';
Blockly.Msg.INSTANCE_RGB_R = 'R=';
Blockly.Msg.INSTANCE_RGB_G = 'G=';
Blockly.Msg.INSTANCE_RGB_B = 'B=';

Blockly.Msg.MODULE_SET_RGB_TOOLTIP = 'CLICK A COLOR TO CHANGE RGB LED COLOR';
Blockly.Msg.MODULE_SET_RGB_HELPURL = '';
Blockly.Msg.MODULE_SET_RGB_SET = 'set';
Blockly.Msg.MODULE_SET_RGB_TO = '=';

Blockly.Msg.RGBTOCOLOR_TOOLTIP = 'CHOOSE INDIVIDUAL (RED, GREEN, BLUE)RGB LED LEADS ';
Blockly.Msg.RGBTOCOLOR_HELPURL = '';
Blockly.Msg.RGBTOCOLOR_R = 'R';
Blockly.Msg.RGBTOCOLOR_G = 'G';
Blockly.Msg.RGBTOCOLOR_B = 'B';

Blockly.Msg.INSTANCE_LED_TOOLTIP = 'The LED module allows easy plug and play configuration to your Arduino\'s I/O lines. The LED can be controlled through a PWM signal or a digital high/ low output';
Blockly.Msg.INSTANCE_LED_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/68-led-modules';
Blockly.Msg.INSTANCE_LED_ONPIN = 'on Pin';

Blockly.Msg.MODULE_SET_LED_TOOLTIP = 'SET AN LED HIGH OR LOW (ON OR OFF)';
Blockly.Msg.MODULE_SET_LED_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/68-led-modules';
Blockly.Msg.MODULE_SET_LED_SET = 'set';

Blockly.Msg.INSTANCE_BUTTON_TOOLTIP = 'The push button module allows detection in states of high or low from the onboard momentary push button.';
Blockly.Msg.INSTANCE_BUTTON_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/76-push-button-module';
Blockly.Msg.INSTANCE_BUTTON_ONPIN = 'on Pin';

Blockly.Msg.MODULE_READ_BUTTON_TOOLTIP = 'DETECT IF BUTTON IS PRESSED';
Blockly.Msg.MODULE_READ_BUTTON_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/76-push-button-module';
Blockly.Msg.MODULE_READ_BUTTON_PRESSED = 'Pressed';

Blockly.Msg.INSTANCE_LCD1602_TOOLTIP = 'The LCD display is a 16 character by 2 line (16*2) LCD display';
Blockly.Msg.INSTANCE_LCD1602_HELPURL = 'https://osepp.com/electronic-modules/breakout-boards/13-16-2-lcd-display';
Blockly.Msg.INSTANCE_LCD1602_LCD1602 = 'Lcd1602 ';
Blockly.Msg.INSTANCE_LCD1602_RS = 'RS Pin';
Blockly.Msg.INSTANCE_LCD1602_EN = 'EN Pin';
Blockly.Msg.INSTANCE_LCD1602_D4 = 'D4 Pin';
Blockly.Msg.INSTANCE_LCD1602_D5 = 'D5 Pin';
Blockly.Msg.INSTANCE_LCD1602_D6 = 'D6 Pin';
Blockly.Msg.INSTANCE_LCD1602_D7 = 'D7 Pin';

Blockly.Msg.MODULE_LCD_PRINT_TOOLTIP = 'DISPLAYS TO THE LCD DISPLAY';
Blockly.Msg.MODULE_LCD_PRINT_HELPURL = 'https://www.arduino.cc/en/Reference/LiquidCrystalPrint';
Blockly.Msg.MODULE_LCD_PRINT_VALUEPRINT = 'print';

Blockly.Msg.MODULE_LCD_CLEAR_TOOLTIP = 'REFRESH (CLEAR) THE LCD DISPLAY';
Blockly.Msg.MODULE_LCD_CLEAR_HELPURL = 'https://www.arduino.cc/en/Reference/LiquidCrystalClear';
Blockly.Msg.MODULE_LCD_CLEAR_CLEAR = 'clear';

Blockly.Msg.MODULE_LCD_GOTO_TOOLTIP = 'SET THE ROW AND COLUMN OF THE LCD DISPLAY';
Blockly.Msg.MODULE_LCD_GOTO_HELPURL = 'https://www.arduino.cc/en/Reference/LiquidCrystalSetCursor';
Blockly.Msg.MODULE_LCD_GOTO_GOTO = 'Goto';
Blockly.Msg.MODULE_LCD_GOTO_COLUMNX = 'X';
Blockly.Msg.MODULE_LCD_GOTO_LINEY = 'Y';

Blockly.Msg.INSTANCE_BUZZER_TOOLTIP = 'The Piezo sensor acts both as an output buzzer device and an input device measuring sound pressure.';
Blockly.Msg.INSTANCE_BUZZER_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/72-piezo-sensor-module';
Blockly.Msg.INSTANCE_BUZZER_ONPIN = 'on Pin';

Blockly.Msg.MODULE_SET_BUZZER_TOOLTIP = 'TURN THE BUZZER HIGH OR LOW (ON OR OFF)';
Blockly.Msg.MODULE_SET_BUZZER_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/72-piezo-sensor-module';
Blockly.Msg.MODULE_SET_BUZZER_SET = 'set';

Blockly.Msg.INSTANCE_SPEAKER_TOOLTIP = '';
Blockly.Msg.INSTANCE_SPEAKER_HELPURL = '';
Blockly.Msg.INSTANCE_SPEAKER_ONPIN = 'on Pin';

Blockly.Msg.MODULE_BUZZER_PLAYTONE_TOOLTIP = 'PLAY A NOTE FROM THE SPEAKER';
Blockly.Msg.MODULE_BUZZER_PLAYTONE_HELPURL = 'https://www.arduino.cc/en/Reference/Tone';
Blockly.Msg.MODULE_BUZZER_PLAYTONE_FREQUENCYPLAY = 'play';

Blockly.Msg.MODULE_BUZZER_NOTONE_TOOLTIP = 'STOP THE SPEAKER';
Blockly.Msg.MODULE_BUZZER_NOTONE_HELPURL = 'https://www.arduino.cc/en/Reference/NoTone';
Blockly.Msg.MODULE_BUZZER_NOTONE_STOP = 'stop';

Blockly.Msg.INSTANCE_FANMOTOR_TOOLTIP = 'The fan motor controller board allows speed and direction control of a low power DC motor.';
Blockly.Msg.INSTANCE_FANMOTOR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/59-fan-motor-module';
Blockly.Msg.INSTANCE_FANMOTOR_FANMOTOR = 'Fan Motor';
Blockly.Msg.INSTANCE_FANMOTOR_INA = 'INA';
Blockly.Msg.INSTANCE_FANMOTOR_INB = 'INB';

Blockly.Msg.MODULE_SET_FANMOTOR_TOOLTIP = 'CHOOSE THE SPEED AND DIRECTION OF FAN MOTOR';
Blockly.Msg.MODULE_SET_FANMOTOR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/59-fan-motor-module';
Blockly.Msg.MODULE_SET_FANMOTOR_OPTION = {
    'f': 'forward',
    'b': 'backward',
    's': 'stop'
};

Blockly.Msg.INSTANCE_SERVO_TOOLTIP = 'servos have integrated gears and a shaft that can be precisely controlled. Standard servos allow the shaft to be positioned at various angles, usually between 0 and 180 degrees';
Blockly.Msg.INSTANCE_SERVO_HELPURL = 'https://www.arduino.cc/en/Reference/Servo';
Blockly.Msg.INSTANCE_SERVO_PINON = 'on Pin';

Blockly.Msg.MODULE_SERVO_WRITE_TOOLTIP = 'WRITE A SPECIFIC ANGLE FOR THE SERVO MOTOR';
Blockly.Msg.MODULE_SERVO_WRITE_HELPURL = 'https://www.arduino.cc/en/Reference/ServoWrite';
Blockly.Msg.MODULE_SERVO_WRITE_ANGLEWRITE = 'write';

Blockly.Msg.INSTANCE_STEPPER_TOOLTIP = '';
Blockly.Msg.INSTANCE_STEPPER_HELPURL = 'https://www.arduino.cc/en/Reference/Stepper';
Blockly.Msg.INSTANCE_STEPPER_STEPPER_MOTOR = 'Stepper Motor';
Blockly.Msg.INSTANCE_STEPPER_PIN_NUMBER = 'Pin Number';
Blockly.Msg.INSTANCE_STEPPER_PIN_NUMBER_OPTION = {
    'F': 'FourPin',
    'T': 'TwoPin'
};
Blockly.Msg.INSTANCE_STEPPER_PIN1INA = 'INA';
Blockly.Msg.INSTANCE_STEPPER_PIN2INB = 'INB';
Blockly.Msg.INSTANCE_STEPPER_PIN3INC = 'INC';
Blockly.Msg.INSTANCE_STEPPER_PIN4IND = 'IND';
Blockly.Msg.INSTANCE_STEPPER_STEPS_PER_REVOLUTION = 'Steps per revolution';
Blockly.Msg.INSTANCE_STEPPER_SPEED_RPM = 'speed(rpm)';

Blockly.Msg.MODULE_STEPPER_MOVE_TOOLTIP = 'INPUT THE STEPPER MOTORS STEP AMOUNT';
Blockly.Msg.MODULE_STEPPER_MOVE_HELPURL = 'https://www.arduino.cc/en/Reference/StepperStep';
Blockly.Msg.MODULE_STEPPER_MOVE_STEPSTEP = 'step';

Blockly.Msg.MODULE_STEPPER_SPEED_TOOLTIP = 'SET THE SPEED OF THE STEPPER MOTOR';
Blockly.Msg.MODULE_STEPPER_SPEED_HELPURL = 'https://www.arduino.cc/en/Reference/StepperSetSpeed';
Blockly.Msg.MODULE_STEPPER_SPEED_SPEEDSETSPEED = 'setSpeed';

Blockly.Msg.INSTANCE_PIR_TOOLTIP = 'The Passive Infrared sensor detects changes in motion within its environmen';
Blockly.Msg.INSTANCE_PIR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/73-passive-infrared-sensor-pir-module';
Blockly.Msg.INSTANCE_PIR_PINON = 'on Pin';

Blockly.Msg.MODULE_PIR_GET_TOOLTIP = 'DETECT IF THE PIR SENSOR WAS TRIGGERED';
Blockly.Msg.MODULE_PIR_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/73-passive-infrared-sensor-pir-module';
Blockly.Msg.MODULE_PIR_GET_TRIGGED = 'Trigged';

Blockly.Msg.INSTANCE_POTENTIOMETER_TOOLTIP = 'The potentiometer module is able to adjust and read variations in voltage.';
Blockly.Msg.INSTANCE_POTENTIOMETER_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/74-potentiometer-module';
Blockly.Msg.INSTANCE_POTENTIOMETER_PINON = 'on Pin';

Blockly.Msg.MODULE_POTENTIOMETER_GET_TOOLTIP = 'READ THE KNOB (POTENTIOMETER) VALUE(0-1023)';
Blockly.Msg.MODULE_POTENTIOMETER_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/74-potentiometer-module';
Blockly.Msg.MODULE_POTENTIOMETER_GET_VALUE = 'value';

Blockly.Msg.INSTANCE_SLIDER_TOOLTIP = '';
Blockly.Msg.INSTANCE_SLIDER_HELPURL = '';
Blockly.Msg.INSTANCE_SLIDER_PINON = 'on Pin';

Blockly.Msg.MODULE_SLIDER_GET_TOOLTIP = 'READ THE SLIDER VALUE(0-1023)';
Blockly.Msg.MODULE_SLIDER_GET_HELPURL = '';
Blockly.Msg.MODULE_SLIDER_GET_VALUE = 'value';

Blockly.Msg.INSTANCE_LIGHTSENSOR_TOOLTIP = '';
Blockly.Msg.INSTANCE_LIGHTSENSOR_HELPURL = '';
Blockly.Msg.INSTANCE_LIGHTSENSOR_PINON = 'on Pin';

Blockly.Msg.MODULE_LIGHTSENSOR_GET_TOOLTIP = 'READ THE LIGHT VALUE(0-1023) FROM THE LIGHT SENSOR';
Blockly.Msg.MODULE_LIGHTSENSOR_GET_HELPURL = '';
Blockly.Msg.MODULE_LIGHTSENSOR_GET_VALUE = 'value';

Blockly.Msg.INSTANCE_LM35_TOOLTIP = 'LM35 Temperature sensor uses the LM35 integrated circuit. Can be used in numerous weather detection applications for home automation / weather monitoring.';
Blockly.Msg.INSTANCE_LM35_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/79-lm35-temperature-sensor-module';
Blockly.Msg.INSTANCE_LM35_PINON = 'on Pin';

Blockly.Msg.MODULE_LM35_GET_TOOLTIP = 'READ THE TEMPERATURE IN CELSIUS FROM THE TEMPERATURE SENSOR';
Blockly.Msg.MODULE_LM35_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/79-lm35-temperature-sensor-module';
Blockly.Msg.MODULE_LM35_GET_CELSIUS = 'Celsius';

Blockly.Msg.INSTANCE_SOUNDSENSOR_TOOLTIP = 'The sound sensor is the perfect sensor to detect environmental variations in noise.';
Blockly.Msg.INSTANCE_SOUNDSENSOR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/78-sound-sensor-module';
Blockly.Msg.INSTANCE_SOUNDSENSOR_PINON = 'on Pin';

Blockly.Msg.MODULE_SOUNDSENSOR_GET_TOOLTIP = 'READ THE SOUND VOLUME(0-1023) FROM THE SOUND SENSOR';
Blockly.Msg.MODULE_SOUNDSENSOR_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/78-sound-sensor-module';
Blockly.Msg.MODULE_SOUNDSENSOR_GET_VALUE = 'value';

Blockly.Msg.INSTANCE_ULTRASONIC_TOOLTIP = 'An ultrasonic transmitter and receiver sensor all in one.';
Blockly.Msg.INSTANCE_ULTRASONIC_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/62-osepp-ultrasonic-sensor-module';
Blockly.Msg.INSTANCE_ULTRASONIC_TRIGPIN = 'trig pin';
Blockly.Msg.INSTANCE_ULTRASONIC_ECHOPIN = 'echo pin';

Blockly.Msg.MODULE_ULTRASONIC_GET_TOOLTIP = 'READ THE DISTANCE IN MILLIMETERS OF THE ULTRASONIC SENSOR';
Blockly.Msg.MODULE_ULTRASONIC_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/62-osepp-ultrasonic-sensor-module';
Blockly.Msg.MODULE_ULTRASONIC_GET_MM = 'mm of';

Blockly.Msg.INSTANCE_4DTOUCH_TOOLTIP = 'Capacitive touch Module';
Blockly.Msg.INSTANCE_4DTOUCH_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/53-4-digit-touch-sensor-module';
Blockly.Msg.INSTANCE_4DTOUCH_OUT1 = 'OUT1';
Blockly.Msg.INSTANCE_4DTOUCH_OUT2 = 'OUT2';
Blockly.Msg.INSTANCE_4DTOUCH_OUT3 = 'OUT3';
Blockly.Msg.INSTANCE_4DTOUCH_OUT4 = 'OUT4';

Blockly.Msg.MODULE_4DTOUCH_GET_TOOLTIP = 'DETECT IF TOUCH SENSOR IS PRESSED';
Blockly.Msg.MODULE_4DTOUCH_GET_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/53-4-digit-touch-sensor-module';
Blockly.Msg.MODULE_4DTOUCH_GET_PRESSED = 'Pressed';

Blockly.Msg.INSTANCE_FLAME_TOOLTIP = 'detect variations in light wavelength (such as fire flame detection) in the range of 760nm-1100 nm';
Blockly.Msg.INSTANCE_FLAME_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/60-flame-sensor-module';
Blockly.Msg.INSTANCE_FLAME_ONPIN = 'on Pin';

Blockly.Msg.MODULE_READ_FLAME_TOOLTIP = 'DETECT VALUE OF FLAME SENSOR';
Blockly.Msg.MODULE_READ_FLAME_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/60-flame-sensor-module';
Blockly.Msg.MODULE_READ_FLAME_VALUE = 'Value';

Blockly.Msg.INSTANCE_IRDETECTOR_TOOLTIP = 'Obstacle avoidance module';
Blockly.Msg.INSTANCE_IRDETECTOR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/64-ir-detector';
Blockly.Msg.INSTANCE_IRDETECTOR_ONPIN = 'on Pin';

Blockly.Msg.MODULE_READ_IRDETECTOR_TOOLTIP = 'Detects when objects are within the calibrated range';
Blockly.Msg.MODULE_READ_IRDETECTOR_HELPURL = 'https://osepp.com/electronic-modules/sensor-modules/64-ir-detector';
Blockly.Msg.MODULE_READ_IRDETECTOR_TRIGGED = 'Trigged';

Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_TOOLTIP = '';
Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_HELPURL = '';
Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_DIR = 'DIR';
Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_DIR_OPTION = {
    "f": "Forward",
    "b": "Backward"
};
Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_PWM = 'PWM';

Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_TOOLTIP = 'CHOOSE THE SPEED AND DIRECTION OF MOTOR';
Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_HELPURL = '';
Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_OPTION = {
    'f': 'forward',
    'b': 'backward',
    's': 'stop'
};

Blockly.Msg.INSTANCE_RANGEFINDER_TOOLTIP = 'An ultrasonic transmitter and receiver sensor all in one.';
Blockly.Msg.INSTANCE_RANGEFINDER_HELPURL = '';
Blockly.Msg.INSTANCE_RANGEFINDER_PINON = 'on Pin';

Blockly.Msg.MODULE_RANGEFINDER_PING_TOOLTIP = 'READ THE DISTANCE IN MILLIMETERS OF THE ULTRASONIC SENSOR';
Blockly.Msg.MODULE_RANGEFINDER_PING_HELPURL = '';
Blockly.Msg.MODULE_RANGEFINDER_PING_MM = 'mm of';

Blockly.Msg.INSTANCE_OSEPPREMOTE_TOOLTIP = '';
Blockly.Msg.INSTANCE_OSEPPREMOTE_HELPURL = '';
Blockly.Msg.INSTANCE_OSEPPREMOTE_REMOTE_UPDATE = 'Remote Update';

Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_TOOLTIP = 'DETECT IF REMOTE BUTTON IS PRESSED';
Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_HELPURL = '';
Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_REMOTE = 'Remote';
Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_PRESSED = 'Pressed';

Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_TOOLTIP = 'Get the value of the remote remote channel';
Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_HELPURL = '';
Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_REMOTE = 'Remote';
Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION = {
    '0': 'Left X',
    '1': 'Left Y',
    '2': 'Right X',
    '3': 'Right Y',
    '4': 'Gravity X',
    '5': 'Gravity Y',
    '6': 'Gravity Z'
};

Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_TOOLTIP = 'DETECT IF REMOTE IS TIMEOUT';
Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_HELPURL = '';
Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_REMOTE_TIMEOUT = 'Remote Timeout';



Blockly.Msg.INSTANCE_PROCEDURE_TOOLTIP = 'PROCEDURE IS A SEQUENCE OF PROGRAM INSTRUCTIONS THAT PERFORM A SPECIFIC TASK';
Blockly.Msg.INSTANCE_PROCEDURE_HELPURL = 'https://en.wikipedia.org/wiki/Subroutine';
Blockly.Msg.INSTANCE_PROCEDURE_VOID = 'void ';

Blockly.Msg.INSTANCE_PROCEDURE_CALL_TOOLTIP = 'Execute a sequence of instructions';
Blockly.Msg.INSTANCE_PROCEDURE_CALL_HELPURL = 'https://en.wikipedia.org/wiki/Subroutine';
Blockly.Msg.INSTANCE_PROCEDURE_CALL_CALL = 'call ';

Blockly.Msg.PROCEDURE_RETURN_TOOLTIP = 'Terminate a function and return';
Blockly.Msg.PROCEDURE_RETURN_HELPURL = 'https://www.arduino.cc/en/Reference/Return';
Blockly.Msg.PROCEDURE_RETURN_RETURN = 'return';

Blockly.Msg.setArduinoPath = "setArduinoPath";
Blockly.Msg.selectArduinoPath = 'select arduino path';
Blockly.Msg.setArduinoPathFeedback = "setArduinoPathFeedback";

Blockly.Msg.sendCode2ArduinoIDE_title = 'coding in arduino IDE';
Blockly.Msg.sendCode2ArduinoIDE = 'Arduino IDE is starting, please wait a moment!';
Blockly.Msg.verifycode = 'Verify code';
Blockly.Msg.verifycode_error = 'error at verify';
Blockly.Msg.upload = 'Uploading';
Blockly.Msg.saveBlocks='Enter the file name under which to save your blocks';
Blockly.Msg.saveINO='Enter the file name under which to save your sketch';