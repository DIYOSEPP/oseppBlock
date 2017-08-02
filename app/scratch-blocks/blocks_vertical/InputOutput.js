/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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

'use strict';

goog.provide('Blockly.Blocks.ArduinoInputOutput');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');



Blockly.Blocks['controlsetuploop'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Arduino Program");
        this.appendStatementInput("SETUPSTACK")
            .setCheck(null)
            .appendField("Setup");
        this.appendStatementInput("LOOPSTACK")
            .setCheck(null)
            .appendField("Loop");
        this.setInputsInline(true);
        this.setColour('#006468');
        this.setTooltip('Arduino program structure,do setup once and do loop foreven');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/HomePage');
    }
};

Blockly.Blocks['io_readdigitalpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("digitalRead");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('Reads the value from a specified digital pin, either HIGH or LOW');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/DigitalRead');
    }
};

Blockly.Blocks['io_readanalogpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("analogRead");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Reads the value from the specified analog pin');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/AnalogRead');
    }
};

Blockly.Blocks['io_writedigitalpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("digitalWrite");
        this.appendValueInput("value")
            .setCheck("Boolean")
            .appendField(" ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Write a HIGH or a LOW value to a digital pin');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/DigitalWrite');
    }
};
Blockly.Blocks['io_writeanalogpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("analogWrite");
        this.appendValueInput("value")
            .setCheck("Number")
            .appendField(" ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Writes an analog value (PWM wave) to a pin');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/AnalogWrite');
    }
};

Blockly.Blocks['io_pinmode'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("pinMode");
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([["OUTPUT", "OUTPUT"], ["INPUT", "INPUT"], ["INPUT_PULLUP", "INPUT_PULLUP"]]), "mode");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Configures the specified pin to behave either as an input or an output');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/PinMode');
    }
};

Blockly.Blocks['io_arduino_uno_digitalpin_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]]), "Pin");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['io_arduino_uno_analogpin_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]]), "Pin");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['io_arduino_uno_pwmpin_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]]), "Pin");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['io_pinstate_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "state");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['io_tone'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("tone");
        this.appendValueInput("frequency")
            .setCheck("Number")
            .appendField(" ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Generates a square wave of the specified frequency (and 50% duty cycle) on a pin');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Tone');
    }
};

Blockly.Blocks['io_tone_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["NOTE_C3", "131"], ["NOTE_D3", "147"], ["NOTE_E3", "165"], ["NOTE_F3", "175"], ["NOTE_G3", "196"], ["NOTE_A3", "220"], ["NOTE_B3", "247"], ["NOTE_C4", "262"], ["NOTE_D4", "294"], ["NOTE_E4", "330"], ["NOTE_F4", "349"], ["NOTE_G4", "392"], ["NOTE_A4", "440"], ["NOTE_B4", "494"], ["NOTE_C5", "532"], ["NOTE_D5", "587"], ["NOTE_E5", "659"], ["NOTE_F5", "698"], ["NOTE_G5", "784"], ["NOTE_A5", "880"], ["NOTE_B5", "988"]]), "Tone");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['io_notone'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("noTone");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Stops the generation of a square wave triggered by tone(). Has no effect if no tone is being generated.');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/NoTone');
    }
};
Blockly.Blocks['io_pulsein'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField("pulseIn");
        this.appendValueInput("value")
            .setCheck("Boolean")
            .appendField(" ");
        this.appendValueInput("timeout")
            .setCheck("Number")
            .appendField("Timeout");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Reads a pulse (either HIGH or LOW) on a pin');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/PulseIn');
    }
};
Blockly.Blocks['instance_serial'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Serial.begin(")
            .appendField(new Blockly.FieldDropdown([["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "115200"], ["128000", "128000"]]), "Bandrate")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Sets the data rate in bits per second (baud) for serial data transmission');
        this.setHelpUrl('https://www.arduino.cc/en/Serial/Begin');
    }
};

Blockly.Blocks['serial_print'] = {
    init: function () {
        this.appendValueInput("value")
            .setCheck(["String", "Number", "Boolean"])
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([["print", "print"], ["println", "println"]]), "action");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['serial_available'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Serial.available");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Get the number of bytes (characters) available for reading from the serial port');
        this.setHelpUrl('https://www.arduino.cc/en/Serial/Available');
    }
};

Blockly.Blocks['serial_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Serial.read");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Reads incoming serial data');
        this.setHelpUrl('https://www.arduino.cc/en/Serial/Read');
    }
};


/*
 *auto Reserved
 */


Blockly.Blocks.genMenu = function () {
    var defmenu = [['select pin', 'select pin']]
    var used = [];
    var field = this;
    if (!field || !field.sourceBlock_) return defmenu;
    var workspace = field.sourceBlock_.workspace;
    if (workspace.isFlyout) workspace = workspace.targetWorkspace;

    var allblocks = workspace.getAllBlocks();
    for (var x = 0, block; block = allblocks[x]; x++) {
        if (block.type === 'io_arduino_uno_pin_usable_menu') {
            var pin = block.inputList[0].fieldRow[0].getValue();
            used.push(pin);
        }
    }
    var menu = [];
    var pwms = ['3', '5', '6', '9', '10', '11'];
    var type;
    if (this.sourceBlock_.data) type = this.sourceBlock_.data.toLocaleLowerCase(); else type = 'a';

    switch (type) {
        case 'pwm':
            for (var p, i = 0; p = pwms[i]; i++) if (used.indexOf(p) < 0) menu.push([p, p]);
            break;
        case 'analog':
            for (var i = 0; i <= 7; i++) if (used.indexOf('A' + i) < 0) menu.push(['A' + i, 'A' + i]);
            break;
        default:
            for (i = 0; i <= 13; i++) if (used.indexOf(i.toString()) < 0) menu.push([i.toString(), i.toString()]);
            for (var i = 0; i <= 5; i++) if (used.indexOf('A' + i) < 0) menu.push(['A' + i, 'A' + i]);
    }
    if (menu.length > 0) return menu;
    return defmenu;
}

Blockly.Blocks['io_arduino_uno_pin_usable_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.genMenu), "Pin");
        this.setInputsInline(true);
        this.setOutput(true, "Pin");
        this.setTooltip('digital pin set');
        this.setHelpUrl('');
        this.setColour(
    Blockly.Colours.cInstanceDefine.secondary,
    Blockly.Colours.cInstanceDefine.secondary,
    Blockly.Colours.cInstanceDefine.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    }
};
