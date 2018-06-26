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

goog.provide('Blockly.Blocks.ArduinoModules');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');


Blockly.Blocks['instance_rgb'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/rgb.png", 40, 40, "*"))
            .appendField("RGB Module:")
            .appendField(new Blockly.FieldInstanceInput('RGB', 'rgb1', 'rgb'), "NAME");
        this.appendValueInput("R")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("R=");
        this.appendValueInput("G")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("G=");
        this.appendValueInput("B")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("B=");
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setInputsInline(false);
    },
    provideBlocks: ['module_set_rgb', 'rgbtocolor']
};



Blockly.Blocks['module_set_rgb'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldInstanceDropdown("RGB"), "rgb")
            .appendField("=");
        this.appendValueInput("colour")
            .setCheck("Colour");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('CLICK A COLOR TO CHANGE RGB LED COLOR');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['rgbtocolor'] = {
    init: function () {
        this.appendValueInput("r")
            .setCheck(null)
            .appendField("R");
        this.appendValueInput("g")
            .setCheck(null)
            .appendField("G");
        this.appendValueInput("b")
            .setCheck(null)
            .appendField("B");
        this.setInputsInline(true);
        this.setOutput(true, "Colour");
        this.setColour(
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('CHOOSE INDIVIDUAL (RED, GREEN, BLUE)RGB LED LEADS ');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['instance_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/led.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LED', 'led1', 'led'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The LED module allows easy plug and play configuration to your Arduino\'s I/O lines.' +
            ' The LED can be controlled through a PWM signal or a digital high/ low output');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/68-led-modules');
    },
    provideBlocks: ['module_set_led']
};

Blockly.Blocks['module_set_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldInstanceDropdown("LED"), "NAME");
        this.appendValueInput("state")
            .setCheck(["Boolean", "Number"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('SET AN LED HIGH OR LOW (ON OR OFF)');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/68-led-modules');
    }
};

Blockly.Blocks['instance_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/button.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('BUTTON', 'button1', 'button'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The push button module allows detection in states ' +
            'of high or low from the onboard momentary push button.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/76-push-button-module');
    },
    provideBlocks: ['module_read_button']
};

Blockly.Blocks['module_read_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("BUTTON"), "NAME")
            .appendField("Pressed");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('DETECT IF BUTTON IS PRESSED');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/76-push-button-module');
    }
};

Blockly.Blocks['instance_lcd1602'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/1602lcd.svg", 40, 40, "*"))
            .appendField("Lcd1602 ")
            .appendField(new Blockly.FieldInstanceInput('LCD1602', 'lcd1', 'lcd'), "NAME");
        this.appendValueInput("RS")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("RS Pin");
        this.appendValueInput("EN")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("EN Pin");
        this.appendValueInput("D4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("D4 Pin");
        this.appendValueInput("D5")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("D5 Pin");
        this.appendValueInput("D6")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("D6 Pin");
        this.appendValueInput("D7")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("D7 Pin");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The LCD display is a 16 character by 2 line (16*2) LCD display');
        this.setHelpUrl('https://osepp.com/electronic-modules/breakout-boards/13-16-2-lcd-display');
    },
    provideBlocks: ['module_lcd_print', 'module_lcd_clear', 'module_lcd_goto']
};


Blockly.Blocks['module_lcd_print'] = {
    init: function () {
        this.appendValueInput("value")
            .setCheck(["String", "Number"])
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField("print");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('DISPLAYS TO THE LCD DISPLAY');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystalPrint');
    }
};

Blockly.Blocks['module_lcd_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField("clear");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('REFRESH (CLEAR) THE LCD DISPLAY');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystalClear');
    }
};

Blockly.Blocks['module_lcd_goto'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField("Goto");
        this.appendValueInput("column")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("line")
            .setCheck("Number")
            .appendField("Y");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('SET THE ROW AND COLUMN OF THE LCD DISPLAY');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystalSetCursor');
    }
};


Blockly.Blocks['instance_buzzer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/buzzer.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('BUZZER', 'buzzer1', 'buzzer'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The Piezo sensor acts both as an output buzzer' +
            ' device and an input device measuring sound pressure.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/72-piezo-sensor-module');
    },
    provideBlocks: ['module_set_buzzer']
};

Blockly.Blocks['module_set_buzzer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldInstanceDropdown("BUZZER"), "NAME");
        this.appendValueInput("state")
            .setCheck(["Boolean", "Number"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('TURN THE BUZZER HIGH OR LOW (ON OR OFF)');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/72-piezo-sensor-module');
    }
};

Blockly.Blocks['instance_speaker'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/speaker.svg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SPEAKER', 'speaker1', 'speaker'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    provideBlocks: ['module_buzzer_playtone', 'module_buzzer_notone']
};

Blockly.Blocks['module_buzzer_playtone'] = {
    init: function () {
        this.appendValueInput("frequency")
            .setCheck("Number")
            .appendField(new Blockly.FieldInstanceDropdown("SPEAKER"), "NAME")
            .appendField("play");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('PLAY A NOTE FROM THE SPEAKER');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Tone');
    }
};

Blockly.Blocks['module_buzzer_notone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SPEAKER"), "NAME")
            .appendField("stop");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('STOP THE SPEAKER');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/NoTone');
    }
};

Blockly.Blocks['instance_fanmotor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/fanmotor.png", 40, 40, "*"))
            .appendField("Fan Motor")
            .appendField(new Blockly.FieldInstanceInput('FANMOTOR', 'fan1', 'fan'), "NAME");
        this.appendValueInput("INA")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("INA");
        this.appendValueInput("INB")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("INB");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The fan motor controller board allows speed and direction control of a low power DC motor.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/59-fan-motor-module');
    },
    provideBlocks: ['module_set_fanmotor']
};

Blockly.Blocks['module_set_fanmotor'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([["forward", "f"], ["backward", "b"], ["stop", "s"]],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("FANMOTOR"), "NAME")
            .appendField(" ")
            .appendField(dropdown, "dir");
        this.appendValueInput("pwm")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('CHOOSE THE SPEED AND DIRECTION OF FAN MOTOR');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/59-fan-motor-module');
    },
    afterCreateBeforRender: function () {
        this.updateStepShape(this.getFieldValue("dir"));
    },
    updateStepShape: function (option) {
        var input = this.getInput('pwm');
        var oldVisible = !(input.hide || false);
        var newVisible;
        if (option == 's') {
            newVisible = false;
        } else {
            newVisible = true;
        }
        if (oldVisible != newVisible) {
            input.setVisible(newVisible);
            input.hide = !newVisible;
            if (newVisible) {
                var shadowBlock = input.connection.targetBlock();
                if (shadowBlock) {
                    shadowBlock.render(false);
                }
            }
        }
    }
};




Blockly.Blocks['instance_servo'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/servo.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SERVO', 'servo1', 'servo'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('ervos have integrated gears and a shaft that can be precisely controlled. ' +
            'Standard servos allow the shaft to be positioned at various angles, usually between 0 and 180 degrees');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Servo');
    },
    provideBlocks: ['module_servo_write']
};


function randomAngle() {
    return parseInt(Math.random() * 180);
}

Blockly.Blocks['angle_picker'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldAngle(randomAngle()), "ANGLE");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setColour(Blockly.Colours.textField);
    }
};


Blockly.Blocks['module_servo_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SERVO"), "NAME");
        this.appendValueInput("angle")
            .setCheck("Number")
            .appendField("write");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('WRITE A SPECIFIC ANGLE FOR THE SERVO MOTOR');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/ServoWrite');
    }
};


Blockly.Blocks['instance_stepper'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/stepper.png", 40, 40, "*"))
            .appendField("Stepper Motor")
            .appendField(new Blockly.FieldInstanceInput('STEPPER', 'stepper1', 'stepper'), "NAME");

        var dropdown = new Blockly.FieldDropdown([["FourPin", "F"], ["TwoPin", "T"]],
            function (option) {
                this.sourceBlock_.updateShape(option);
            });
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Pin Number")
            .appendField(dropdown, "pinNumber");
        this.appendValueInput("Pin1")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("INA");
        this.appendValueInput("Pin2")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("INB");
        this.appendValueInput("Pin3")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("INC");
        this.appendValueInput("Pin4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("IND");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Steps per revolution")
            .appendField(new Blockly.FieldNumber(0, 1, Infinity, 1), "spv");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("speed(rpm)")
            .appendField(new Blockly.FieldNumber(0, 1, Infinity, 1), "rpm");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Stepper');
    },
    afterCreateBeforRender: function () {
        this.updateShape(this.getFieldValue("pinNumber"));
    },
    updateShape: function (option) {
        var pin3 = this.getInput('Pin3');
        var oldVisible = pin3.isVisible();
        var newVisible;
        if (option == 'T') {
            newVisible = false;
        } else {
            newVisible = true;
        }
        if (oldVisible != newVisible) {
            function visableinput(input, visilbe) {
                input.setVisible(visilbe);
                input.hide = !visilbe;
                var shadowBlock = input.connection.targetBlock();
                if (shadowBlock) {
                    if (visilbe) {
                        shadowBlock.render(false);
                    } else {
                        //free the pin
                        if (shadowBlock.isShadow()) {
                            shadowBlock.getField('Pin').setValue('select pin');
                        } else {
                            shadowBlock.unplug();
                        }
                    }
                }
            }
            visableinput(pin3, newVisible);
            visableinput(this.getInput('Pin4'), newVisible);
        }
    },
    provideBlocks: ['module_stepper_move', 'module_stepper_speed']
};

Blockly.Blocks['module_stepper_move'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("STEPPER"), "NAME");
        this.appendValueInput("step")
            .setCheck("Number")
            .appendField("step");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('INPUT THE STEPPER MOTORS STEP AMOUNT');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/StepperStep');
    }
};

Blockly.Blocks['module_stepper_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("STEPPER"), "NAME");
        this.appendValueInput("speed")
            .setCheck("Number")
            .appendField("setSpeed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('SET THE SPEED OF THE STEPPER MOTOR');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/StepperSetSpeed');
    }
};

Blockly.Blocks['instance_pir'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/pir.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('PIR', 'pir1', 'pir'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The Passive Infrared sensor detects changes in motion within its environmen');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/73-passive-infrared-sensor-pir-module');
    },
    provideBlocks: ['module_pir_get']
};

Blockly.Blocks['module_pir_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("PIR"), "NAME")
            .appendField("Trigged");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('DETECT IF THE PIR SENSOR WAS TRIGGERED');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/73-passive-infrared-sensor-pir-module');
    }
};

Blockly.Blocks['instance_potentiometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/potentiometer.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('POTENTIOMETER', 'potentiometer', 'potentiometer'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The potentiometer module is able to adjust and read variations in voltage.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/74-potentiometer-module');
    },
    provideBlocks: ['module_potentiometer_get']
};

Blockly.Blocks['module_potentiometer_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("POTENTIOMETER"), "NAME")
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE KNOB (POTENTIOMETER) VALUE(0-1023)');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/74-potentiometer-module');
    }
};

Blockly.Blocks['instance_slider'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/slider.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SLIDER', 'slider', 'slider'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    provideBlocks: ['module_slider_get']
};

Blockly.Blocks['module_slider_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SLIDER"), "NAME")
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE SLIDER VALUE(0-1023)');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['instance_lightsensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/lightsensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LIGHTSENSOR', 'light1', 'light'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    provideBlocks: ['module_lightsensor_get']
};

Blockly.Blocks['module_lightsensor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LIGHTSENSOR"), "NAME")
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE LIGHT VALUE(0-1023) FROM THE LIGHT SENSOR');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['instance_lm35'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/temperaturesensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LM35', 'lm35_1', 'lm35_'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('LM35 Temperature sensor uses the LM35 integrated circuit. ' +
            'Can be used in numerous weather detection applications for home automation / weather monitoring.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/79-lm35-temperature-sensor-module');
    },
    provideBlocks: ['module_lm35_get']
};

Blockly.Blocks['module_lm35_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LM35"), "NAME")
            .appendField("Celsius");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE TEMPERATURE IN CELSIUS FROM THE TEMPERATURE SENSOR');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/79-lm35-temperature-sensor-module');
    }
};



Blockly.Blocks['instance_soundsensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/soundsensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SOUNDSENSOR', 'soundSensor', 'soundSensor'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('The sound sensor is the perfect sensor to detect environmental variations in noise.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/78-sound-sensor-module');
    },
    provideBlocks: ['module_soundsensor_get']
};

Blockly.Blocks['module_soundsensor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SOUNDSENSOR"), "NAME")
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE SOUND VOLUME(0-1023) FROM THE SOUND SENSOR');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/78-sound-sensor-module');
    }
};

Blockly.Blocks['instance_ultrasonic'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/ultrasonic.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('ULTRASONIC', 'ultrasonic', 'ultrasonic'), "NAME");
        this.appendValueInput("trigPin")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("trig pin");
        this.appendValueInput("echoPin")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("echo pin");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('An ultrasonic transmitter and receiver sensor all in one.');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/62-osepp-ultrasonic-sensor-module');
    },
    provideBlocks: ['module_ultrasonic_get']
};

Blockly.Blocks['module_ultrasonic_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("mm of")
            .appendField(new Blockly.FieldInstanceDropdown("ULTRASONIC"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE DISTANCE IN MILLIMETERS OF THE ULTRASONIC SENSOR');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/62-osepp-ultrasonic-sensor-module');
    }
};

Blockly.Blocks['instance_4dtouch'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(
                new Blockly.FieldImage("https://osepp.com/images/igallery/resized/1-100/LS00010_web-81-300-225-80.jpg",
                    40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('TOUCH4D', 'TOUCH4D_', 'TOUCH4D_'), "NAME");
        this.appendValueInput("OUT1")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("OUT1");
        this.appendValueInput("OUT2")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("OUT2");
        this.appendValueInput("OUT3")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("OUT3");
        this.appendValueInput("OUT4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("OUT4");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('Capacitive touch Module');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/53-4-digit-touch-sensor-module');
    },
    provideBlocks: ['module_4dtouch_get']
};

Blockly.Blocks['module_4dtouch_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("TOUCH4D"), "NAME")
            .appendField(" ");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["OUT1", "OUT1"], ["OUT2", "OUT2"], ["OUT3", "OUT3"], ["OUT4", "OUT4"]]),
                "CHANNEL")
            .appendField("Pressed");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('DETECT IF TOUCH SENSOR IS PRESSED');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/53-4-digit-touch-sensor-module');
    }
};

Blockly.Blocks['instance_flame'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(
                "https://osepp.com/images/igallery/resized/1-100/Flame_Sensor_Module-92-800-600-80.jpg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('FLAME', 'Flame1', 'Flame'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(
            'detect variations in light wavelength (such as fire flame detection) in the range of 760nm-1100 nm');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/60-flame-sensor-module');
    },
    provideBlocks: ['module_read_flame']
};

Blockly.Blocks['module_read_flame'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("FLAME"), "NAME")
            .appendField("Value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('DETECT VALUE OF FLAME SENSOR');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/60-flame-sensor-module');
    }
};

Blockly.Blocks['instance_irdetector'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(
                "https://osepp.com/images/igallery/resized/101-200/IR_DETECTOR_IRDET_01-101-300-225-80.jpg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('IRDETECTOR', 'detector1', 'detector'), "NAME")
            .appendField("on Pin");
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('Obstacle avoidance module');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/64-ir-detector');
    },
    provideBlocks: ['module_read_irdetector']
};

Blockly.Blocks['module_read_irdetector'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("IRDETECTOR"), "NAME")
            .appendField("Trigged");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('Detects when objects are within the calibrated range');
        this.setHelpUrl('https://osepp.com/electronic-modules/sensor-modules/64-ir-detector');
    }
};

Blockly.Blocks['instance_TB6612MotorDriver'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/tb6612motordriver.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('TB6612MotorDriver', 'Motor', 'Motor'), "NAME");

        this.appendValueInput("DIR")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["Forward", "f"], ["Backward", "b"]]), "frb")
            .appendField("DIR");
        this.appendValueInput("PWM")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("PWM");

        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('Capacitive touch Module');
    },
    provideBlocks: ['module_set_TB6612MotorDriver']
};

Blockly.Blocks['module_set_TB6612MotorDriver'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([["forward", "f"], ["backward", "b"], ["stop", "s"]],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("TB6612MotorDriver"), "NAME")
            .appendField(" ")
            .appendField(dropdown, "dir");
        this.appendValueInput("pwm")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip('CHOOSE THE SPEED AND DIRECTION OF MOTOR');
    },
    afterCreateBeforRender: function () {
        this.updateStepShape(this.getFieldValue("dir"));
    },
    updateStepShape: function (option) {
        var input = this.getInput('pwm');
        var oldVisible = !(input.hide || false);
        var newVisible;
        if (option == 's') {
            newVisible = false;
        } else {
            newVisible = true;
        }
        if (oldVisible != newVisible) {
            input.setVisible(newVisible);
            input.hide = !newVisible;
            if (newVisible) {
                var shadowBlock = input.connection.targetBlock();
                if (shadowBlock) {
                    shadowBlock.render(false);
                }
            }
        }
    }
};

Blockly.Blocks['instance_RangeFinder'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/pingsensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('RangeFinder', 'RangeFinder', 'RangeFinder'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField("on Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('An ultrasonic transmitter and receiver sensor all in one.');
    },
    provideBlocks: ['module_RangeFinder_Ping']
};

Blockly.Blocks['module_RangeFinder_Ping'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("mm of")
            .appendField(new Blockly.FieldInstanceDropdown("RangeFinder"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('READ THE DISTANCE IN MILLIMETERS OF THE ULTRASONIC SENSOR');
    }
};

Blockly.Blocks['instance_OseppRemote'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Remote Update");
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceInput('remote', 'remote','remote'), "NAME").setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip('');
    },
    provideBlocks: ['module_OseppRemote_Button','module_OseppRemote_Channel','module_OseppRemote_isTimeout']
};

Blockly.Blocks['module_OseppRemote_Button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Remote")
            .appendField(new Blockly.FieldDropdown([
                ["L", "1"], ["R", "2"], ["U", "4"], ["D", "8"],
                ["A", "16"], ["B", "32"], ["X", "64"], ["Y", "128"]
            ]),
                "CHANNEL")
            .appendField("Pressed");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('DETECT IF REMOTE BUTTON IS PRESSED');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['module_OseppRemote_Channel'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Remote")
            .appendField(new Blockly.FieldDropdown([
                ["Left X", "0"], ["Left Y", "1"], ["Right X", "2"], ["Right Y", "3"],
                ["Gravity X", "4"], ["Gravity Y", "5"], ["Gravity Z", "6"]
            ]),
                "CHANNEL");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('DETECT IF REMOTE BUTTON IS PRESSED');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['module_OseppRemote_isTimeout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Remote Timeout");
        this.appendValueInput("time")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('DETECT IF REMOTE IS TIMEOUT');
        this.setHelpUrl('');
    }
};