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
            .appendField(Blockly.Msg.CONTROLSETUPLOOP_ARDUINO_PROGRAM);
        this.appendStatementInput("SETUPSTACK")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLSETUPLOOP_SETUPSTACKSETUP);
        this.appendStatementInput("LOOPSTACK")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLSETUPLOOP_LOOPSTACKLOOP);
        this.setInputsInline(true);
        this.setColour('#006468');
        this.setTooltip(Blockly.Msg.CONTROLSETUPLOOP_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROLSETUPLOOP_HELPURL);
    }
};

Blockly.Blocks['io_readdigitalpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_READDIGITALPIN_PINDIGITALREAD);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.IO_READDIGITALPIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_READDIGITALPIN_HELPURL);
    }
};

Blockly.Blocks['io_readanalogpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_READANALOGPIN_PINANALOGREAD);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.IO_READANALOGPIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_READANALOGPIN_HELPURL);
    }
};

Blockly.Blocks['io_writedigitalpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_WRITEDIGITALPIN_PINDIGITALWRITE);
        this.appendValueInput("value")
            .setCheck("Boolean");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.IO_WRITEDIGITALPIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_WRITEDIGITALPIN_HELPURL);
    }
};
Blockly.Blocks['io_writeanalogpin'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_WRITEANALOGPIN_PINANALOGWRITE);
        this.appendValueInput("value")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.IO_WRITEANALOGPIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_WRITEANALOGPIN_HELPURL);
    }
};

Blockly.Blocks['io_pinmode'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_PINMODE_PINPINMODE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.IO_PINMODE_OPTION_OUTPUT, "OUTPUT"], 
                [Blockly.Msg.IO_PINMODE_OPTION_INPUT, "INPUT"], 
                [Blockly.Msg.IO_PINMODE_OPTION_INPUT_PULLUP, "INPUT_PULLUP"]]), 
                "mode");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.IO_PINMODE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_PINMODE_HELPURL);
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
        this.setTooltip(Blockly.Msg.IO_ARDUINO_UNO_DIGITALPIN_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_ARDUINO_UNO_DIGITALPIN_MENU_HELPURL);
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
        this.setTooltip(Blockly.Msg.IO_ARDUINO_UNO_ANALOGPIN_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_ARDUINO_UNO_ANALOGPIN_MENU_HELPURL);
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
        this.setTooltip(Blockly.Msg.IO_ARDUINO_UNO_PWMPIN_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_ARDUINO_UNO_PWMPIN_MENU_HELPURL);
    }
};

Blockly.Blocks['io_pinstate_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.IO_PINSTATE_MENU_OPTION_HIGH, "HIGH"], [Blockly.Msg.IO_PINSTATE_MENU_OPTION_LOW, "LOW"]]), "state");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.IO_PINSTATE_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_PINSTATE_MENU_HELPURL);
    }
};

Blockly.Blocks['io_tone'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_TONE_PINTONE);
        this.appendValueInput("frequency")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.IO_TONE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_TONE_HELPURL);
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
        this.setTooltip(Blockly.Msg.IO_TONE_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_TONE_MENU_HELPURL);
    }
};

Blockly.Blocks['io_notone'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_NOTONE_PINNOTONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.IO_NOTONE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_NOTONE_HELPURL);
    }
};
Blockly.Blocks['io_pulsein'] = {
    init: function () {
        this.appendValueInput("Pin")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_PULSEIN_PINPULSEIN);
        this.appendValueInput("value")
            .setCheck("Boolean");
        this.appendValueInput("timeout")
            .setCheck("Number")
            .appendField(Blockly.Msg.IO_PULSEIN_TIMEOUTTIMEOUT);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.IO_PULSEIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_PULSEIN_HELPURL);
    }
};
Blockly.Blocks['instance_serial'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.INSTANCE_SERIAL_SERIALBEGIN)
            .appendField(new Blockly.FieldDropdown([["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "115200"], ["128000", "128000"]]), "Bandrate")
            .appendField(Blockly.Msg.INSTANCE_SERIAL);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SERIAL_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SERIAL_HELPURL);
    }
};

Blockly.Blocks['serial_print'] = {
    init: function () {
        this.appendValueInput("value")
            .setCheck(["String", "Number", "Boolean"])
            .appendField(Blockly.Msg.SERIAL_PRINT_VALUESERIAL)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.SERIAL_PRINT_OPTION_PRINT, "print"], 
                [Blockly.Msg.SERIAL_PRINT_OPTION_PRINTLN, "println"]]), "action");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cArduinoStatement.primary,
            Blockly.Colours.cArduinoStatement.secondary,
            Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.SERIAL_PRINT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.SERIAL_PRINT_HELPURL);
    }
};
Blockly.Blocks['serial_available'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.SERIAL_AVAILABLE_SERIAL_AVAILABLE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.SERIAL_AVAILABLE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.SERIAL_AVAILABLE_HELPURL);
    }
};

Blockly.Blocks['serial_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.SERIAL_READ_SERIAL_READ);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cArduinoInput.primary,
            Blockly.Colours.cArduinoInput.secondary,
            Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL);
    }
};


/*
 *auto Reserved
 */

Blockly.Blocks.defaultPin = function (theblock, deftext) {
    var used = [];
    var workspace = theblock.workspace;
    if (workspace.isFlyout) workspace = workspace.targetWorkspace;

    var allblocks = workspace.getAllBlocks();
    for (var x = 0, block; block = allblocks[x]; x++) {
        if (block.type === 'io_arduino_uno_pin_usable_menu') {
            var pin = block.inputList[0].fieldRow[0].getValue();
            used.push(pin);
        }
    }

    var ss = deftext.split(':');
    used = used.concat(Blockly.Flyout.prototype.Pin_perOrder_for_Block);

    if (ss[1]) {
        var pins = ss[1].split(',');
        for (var p, i = 0; p = pins[i]; i++) if (used.indexOf(p) < 0) return p;
    }


    var pwms = ['3', '5', '6', '9', '10', '11'];
    var type = ss[0];

    if (type.indexOf('pwm') >= 0) {
        for (var p, i = 0; p = pwms[i]; i++) if (used.indexOf(p) < 0) return p;
    } else if (type.indexOf('analog') >= 0) {
        for (var i = 0; i <= 7; i++) if (used.indexOf('A' + i) < 0) return ('A' + i);
    } else {
        for (var i = 2; i <= 13; i++) if (used.indexOf(i.toString()) < 0) return i.toString();
        for (var i = 0; i <= 1; i++) if (used.indexOf(i.toString()) < 0) return i.toString();
        for (var i = 0; i <= 5; i++) if (used.indexOf('A' + i) < 0) return ('A' + i);
    }

    return null;
}

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

    if (type.indexOf('pwm') >= 0) {
        for (var p, i = 0; p = pwms[i]; i++) if (used.indexOf(p) < 0) menu.push([p, p]);
    } else if (type.indexOf('analog') >= 0) {
        for (var i = 0; i <= 7; i++) if (used.indexOf('A' + i) < 0) menu.push(['A' + i, 'A' + i]);
    } else {
        for (i = 0; i <= 13; i++) if (used.indexOf(i.toString()) < 0) menu.push([i.toString(), i.toString()]);
        for (var i = 0; i <= 5; i++) if (used.indexOf('A' + i) < 0) menu.push(['A' + i, 'A' + i]);
    }
    if (menu.length > 0) return menu;
    return defmenu;
}

function pinChangeValidator(field, text) {
    if (!this.sourceBlock_.workspace.isFlyout) {
        var workspace = this.sourceBlock_.workspace;
        Blockly.FieldInstanceInput.refWorkspaceToolbox(workspace);
    }
}

Blockly.Blocks['io_arduino_uno_pin_usable_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Blockly.Blocks.genMenu, pinChangeValidator), "Pin");
        this.setInputsInline(true);
        this.setOutput(true, "Pin");
        this.setTooltip(Blockly.Msg.IO_ARDUINO_UNO_PIN_USABLE_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.IO_ARDUINO_UNO_PIN_USABLE_MENU_HELPURL);
        this.setColour(
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    },
    dataHook: function (fieldName) {
        if (!this.workspace.isFlyout) return;
        var field = this.getField(fieldName);
        var value = Blockly.Blocks.defaultPin(this, this.data);
        if (value) {
            field.setValue(value);
            Blockly.Flyout.prototype.Pin_perOrder_for_Block.push(value);
        }
        return
    }
};
