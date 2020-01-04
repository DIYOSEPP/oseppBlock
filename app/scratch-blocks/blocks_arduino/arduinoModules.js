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
            .appendField(Blockly.Msg.INSTANCE_RGB_NAME)
            .appendField(new Blockly.FieldInstanceInput('RGB', 'rgb1', 'rgb'), "NAME");
        this.appendValueInput("R")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_RGB_R);
        this.appendValueInput("G")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_RGB_G);
        this.appendValueInput("B")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_RGB_B);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_RGB_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_RGB_HELPURL);
        this.setInputsInline(false);
    },
    provideBlocks: ['module_set_rgb', 'rgbtocolor']
};



Blockly.Blocks['module_set_rgb'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_SET_RGB_SET)
            .appendField(new Blockly.FieldInstanceDropdown("RGB"), "rgb")
            .appendField(Blockly.Msg.MODULE_SET_RGB_TO);
        this.appendValueInput("colour")
            .setCheck("Colour");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_SET_RGB_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SET_RGB_HELPURL);
    }
};

Blockly.Blocks['rgbtocolor'] = {
    init: function () {
        this.appendValueInput("r")
            .setCheck(null)
            .appendField(Blockly.Msg.RGBTOCOLOR_R);
        this.appendValueInput("g")
            .setCheck(null)
            .appendField(Blockly.Msg.RGBTOCOLOR_G);
        this.appendValueInput("b")
            .setCheck(null)
            .appendField(Blockly.Msg.RGBTOCOLOR_B);
        this.setInputsInline(true);
        this.setOutput(true, "Colour");
        this.setColour(
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.RGBTOCOLOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.RGBTOCOLOR_HELPURL);
    }
};

Blockly.Blocks['instance_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/led.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LED', 'led1', 'led'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_LED_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_LED_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_LED_HELPURL);
    },
    provideBlocks: ['module_set_led']
};

Blockly.Blocks['module_set_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_SET_LED_SET)
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
        this.setTooltip(Blockly.Msg.MODULE_SET_LED_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SET_LED_HELPURL);
    }
};

Blockly.Blocks['instance_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/button.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('BUTTON', 'button1', 'button'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_BUTTON_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_BUTTON_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_BUTTON_HELPURL);
    },
    provideBlocks: ['module_read_button']
};

Blockly.Blocks['module_read_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("BUTTON"), "NAME")
            .appendField(Blockly.Msg.MODULE_READ_BUTTON_PRESSED);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_READ_BUTTON_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_READ_BUTTON_HELPURL);
    }
};

Blockly.Blocks['instance_lcd1602'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/1602lcd.svg", 40, 40, "*"))
            .appendField(Blockly.Msg.INSTANCE_LCD1602_LCD1602)
            .appendField(new Blockly.FieldInstanceInput('LCD1602', 'lcd1', 'lcd'), "NAME");
        this.appendValueInput("RS")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_RS);
        this.appendValueInput("EN")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_EN);
        this.appendValueInput("D4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_D4);
        this.appendValueInput("D5")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_D5);
        this.appendValueInput("D6")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_D6);
        this.appendValueInput("D7")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_LCD1602_D7);
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_LCD1602_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_LCD1602_HELPURL);
    },
    provideBlocks: ['module_lcd_print', 'module_lcd_clear', 'module_lcd_goto']
};


Blockly.Blocks['module_lcd_print'] = {
    init: function () {
        this.appendValueInput("value")
            .setCheck(["String", "Number"])
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField(Blockly.Msg.MODULE_LCD_PRINT_VALUEPRINT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_LCD_PRINT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LCD_PRINT_HELPURL);
    }
};

Blockly.Blocks['module_lcd_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField(Blockly.Msg.MODULE_LCD_CLEAR_CLEAR);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_LCD_CLEAR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LCD_CLEAR_HELPURL);
    }
};

Blockly.Blocks['module_lcd_goto'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LCD1602"), "NAME")
            .appendField(Blockly.Msg.MODULE_LCD_GOTO_GOTO);
        this.appendValueInput("column")
            .setCheck("Number")
            .appendField(Blockly.Msg.MODULE_LCD_GOTO_COLUMNX);
        this.appendValueInput("line")
            .setCheck("Number")
            .appendField(Blockly.Msg.MODULE_LCD_GOTO_LINEY);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_LCD_GOTO_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LCD_GOTO_HELPURL);
    }
};


Blockly.Blocks['instance_buzzer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/buzzer.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('BUZZER', 'buzzer1', 'buzzer'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_BUZZER_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_BUZZER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_BUZZER_HELPURL);
    },
    provideBlocks: ['module_set_buzzer']
};

Blockly.Blocks['module_set_buzzer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_SET_BUZZER_SET)
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
        this.setTooltip(Blockly.Msg.MODULE_SET_BUZZER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SET_BUZZER_HELPURL);
    }
};

Blockly.Blocks['instance_speaker'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/speaker.svg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SPEAKER', 'speaker1', 'speaker'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_SPEAKER_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SPEAKER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SPEAKER_HELPURL);
    },
    provideBlocks: ['module_buzzer_playtone', 'module_buzzer_notone']
};

Blockly.Blocks['module_buzzer_playtone'] = {
    init: function () {
        this.appendValueInput("frequency")
            .setCheck("Number")
            .appendField(new Blockly.FieldInstanceDropdown("SPEAKER"), "NAME")
            .appendField(Blockly.Msg.MODULE_BUZZER_PLAYTONE_FREQUENCYPLAY);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_BUZZER_PLAYTONE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_BUZZER_PLAYTONE_HELPURL);
    }
};

Blockly.Blocks['module_buzzer_notone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SPEAKER"), "NAME")
            .appendField(Blockly.Msg.MODULE_BUZZER_NOTONE_STOP);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_BUZZER_NOTONE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_BUZZER_NOTONE_HELPURL);
    }
};

Blockly.Blocks['instance_fanmotor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/fanmotor.png", 40, 40, "*"))
            .appendField(Blockly.Msg.INSTANCE_FANMOTOR_FANMOTOR)
            .appendField(new Blockly.FieldInstanceInput('FANMOTOR', 'fan1', 'fan'), "NAME");
        this.appendValueInput("INA")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_FANMOTOR_INA);
        this.appendValueInput("INB")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_FANMOTOR_INB);
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_FANMOTOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_FANMOTOR_HELPURL);
    },
    provideBlocks: ['module_set_fanmotor']
};

Blockly.Blocks['module_set_fanmotor'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.MODULE_SET_FANMOTOR_OPTION["f"], "f"], 
            [Blockly.Msg.MODULE_SET_FANMOTOR_OPTION["b"], "b"], 
            [Blockly.Msg.MODULE_SET_FANMOTOR_OPTION["s"], "s"]],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("FANMOTOR"), "NAME")
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
        this.setTooltip(Blockly.Msg.MODULE_SET_FANMOTOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SET_FANMOTOR_HELPURL);
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
            .appendField(Blockly.Msg.INSTANCE_SERVO_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SERVO_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SERVO_HELPURL);
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
            .appendField(Blockly.Msg.MODULE_SERVO_WRITE_ANGLEWRITE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_SERVO_WRITE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SERVO_WRITE_HELPURL);
    }
};


Blockly.Blocks['instance_stepper'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/stepper.png", 40, 40, "*"))
            .appendField(Blockly.Msg.INSTANCE_STEPPER_STEPPER_MOTOR)
            .appendField(new Blockly.FieldInstanceInput('STEPPER', 'stepper1', 'stepper'), "NAME");

        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.INSTANCE_STEPPER_PIN_NUMBER_OPTION['F'], "F"],
            [Blockly.Msg.INSTANCE_STEPPER_PIN_NUMBER_OPTION['T'], "T"]],
            function (option) {
                this.sourceBlock_.updateShape(option);
            });
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_PIN_NUMBER)
            .appendField(dropdown, "pinNumber");
        this.appendValueInput("Pin1")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_PIN1INA);
        this.appendValueInput("Pin2")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_PIN2INB);
        this.appendValueInput("Pin3")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_PIN3INC);
        this.appendValueInput("Pin4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_PIN4IND);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_STEPS_PER_REVOLUTION)
            .appendField(new Blockly.FieldNumber(0, 1, Infinity, 1), "spv");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_STEPPER_SPEED_RPM)
            .appendField(new Blockly.FieldNumber(0, 1, Infinity, 1), "rpm");
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_STEPPER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_STEPPER_HELPURL);
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
            .appendField(Blockly.Msg.MODULE_STEPPER_MOVE_STEPSTEP);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_STEPPER_MOVE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_STEPPER_MOVE_HELPURL);
    }
};

Blockly.Blocks['module_stepper_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("STEPPER"), "NAME");
        this.appendValueInput("speed")
            .setCheck("Number")
            .appendField(Blockly.Msg.MODULE_STEPPER_SPEED_SPEEDSETSPEED);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceStatement.primary,
            Blockly.Colours.cInstanceStatement.secondary,
            Blockly.Colours.cInstanceStatement.tertiary);
        this.setTooltip(Blockly.Msg.MODULE_STEPPER_SPEED_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_STEPPER_SPEED_HELPURL);
    }
};

Blockly.Blocks['instance_pir'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/pir.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('PIR', 'pir1', 'pir'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_PIR_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_PIR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_PIR_HELPURL);
    },
    provideBlocks: ['module_pir_get']
};

Blockly.Blocks['module_pir_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("PIR"), "NAME")
            .appendField(Blockly.Msg.MODULE_PIR_GET_TRIGGED);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_PIR_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_PIR_GET_HELPURL);
    }
};

Blockly.Blocks['instance_potentiometer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/potentiometer.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('POTENTIOMETER', 'potentiometer', 'potentiometer'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_POTENTIOMETER_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_POTENTIOMETER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_POTENTIOMETER_HELPURL);
    },
    provideBlocks: ['module_potentiometer_get']
};

Blockly.Blocks['module_potentiometer_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("POTENTIOMETER"), "NAME")
            .appendField(Blockly.Msg.MODULE_POTENTIOMETER_GET_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_POTENTIOMETER_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_POTENTIOMETER_GET_HELPURL);
    }
};

Blockly.Blocks['instance_slider'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/slider.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SLIDER', 'slider', 'slider'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_SLIDER_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SLIDER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SLIDER_HELPURL);
    },
    provideBlocks: ['module_slider_get']
};

Blockly.Blocks['module_slider_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SLIDER"), "NAME")
            .appendField(Blockly.Msg.MODULE_SLIDER_GET_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_SLIDER_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SLIDER_GET_HELPURL);
    }
};

Blockly.Blocks['instance_lightsensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/lightsensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LIGHTSENSOR', 'light1', 'light'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_LIGHTSENSOR_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_LIGHTSENSOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_LIGHTSENSOR_HELPURL);
    },
    provideBlocks: ['module_lightsensor_get']
};

Blockly.Blocks['module_lightsensor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LIGHTSENSOR"), "NAME")
            .appendField(Blockly.Msg.MODULE_LIGHTSENSOR_GET_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_LIGHTSENSOR_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LIGHTSENSOR_GET_HELPURL);
    }
};

Blockly.Blocks['instance_lm35'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/temperaturesensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LM35', 'lm35_1', 'lm35_'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_LM35_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_LM35_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_LM35_HELPURL);
    },
    provideBlocks: ['module_lm35_get']
};

Blockly.Blocks['module_lm35_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LM35"), "NAME")
            .appendField(Blockly.Msg.MODULE_LM35_GET_CELSIUS);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_LM35_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LM35_GET_HELPURL);
    }
};



Blockly.Blocks['instance_soundsensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/soundsensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('SOUNDSENSOR', 'soundSensor', 'soundSensor'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_SOUNDSENSOR_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SOUNDSENSOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SOUNDSENSOR_HELPURL);
    },
    provideBlocks: ['module_soundsensor_get']
};

Blockly.Blocks['module_soundsensor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("SOUNDSENSOR"), "NAME")
            .appendField(Blockly.Msg.MODULE_SOUNDSENSOR_GET_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_SOUNDSENSOR_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SOUNDSENSOR_GET_HELPURL);
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
            .appendField(Blockly.Msg.INSTANCE_ULTRASONIC_TRIGPIN);
        this.appendValueInput("echoPin")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_ULTRASONIC_ECHOPIN);
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_ULTRASONIC_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_ULTRASONIC_HELPURL);
    },
    provideBlocks: ['module_ultrasonic_get']
};

Blockly.Blocks['module_ultrasonic_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_ULTRASONIC_GET_MM)
            .appendField(new Blockly.FieldInstanceDropdown("ULTRASONIC"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_ULTRASONIC_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_ULTRASONIC_GET_HELPURL);
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
            .appendField(Blockly.Msg.INSTANCE_4DTOUCH_OUT1);
        this.appendValueInput("OUT2")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_4DTOUCH_OUT2);
        this.appendValueInput("OUT3")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_4DTOUCH_OUT3);
        this.appendValueInput("OUT4")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_4DTOUCH_OUT4);
        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_4DTOUCH_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_4DTOUCH_HELPURL);
    },
    provideBlocks: ['module_4dtouch_get']
};

Blockly.Blocks['module_4dtouch_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("TOUCH4D"), "NAME");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["OUT1", "OUT1"], ["OUT2", "OUT2"], ["OUT3", "OUT3"], ["OUT4", "OUT4"]]),
                "CHANNEL")
            .appendField(Blockly.Msg.MODULE_4DTOUCH_GET_PRESSED);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_4DTOUCH_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_4DTOUCH_GET_HELPURL);
    }
};

Blockly.Blocks['instance_flame'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(
                "https://osepp.com/images/igallery/resized/1-100/Flame_Sensor_Module-92-800-600-80.jpg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('FLAME', 'Flame1', 'Flame'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_FLAME_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_FLAME_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_FLAME_HELPURL);
    },
    provideBlocks: ['module_read_flame']
};

Blockly.Blocks['module_read_flame'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("FLAME"), "NAME")
            .appendField(Blockly.Msg.MODULE_READ_FLAME_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_READ_FLAME_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_READ_FLAME_HELPURL);
    }
};

Blockly.Blocks['instance_irdetector'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(
                "https://osepp.com/images/igallery/resized/101-200/IR_DETECTOR_IRDET_01-101-300-225-80.jpg", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('IRDETECTOR', 'detector1', 'detector'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_IRDETECTOR_ONPIN);
        this.appendValueInput("Pin")
            .setCheck("Pin");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_IRDETECTOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_IRDETECTOR_HELPURL);
    },
    provideBlocks: ['module_read_irdetector']
};

Blockly.Blocks['module_read_irdetector'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("IRDETECTOR"), "NAME")
            .appendField(Blockly.Msg.MODULE_READ_IRDETECTOR_TRIGGED);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_READ_IRDETECTOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_READ_IRDETECTOR_HELPURL);
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
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_DIR_OPTION['f'], "f"], 
                [Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_DIR_OPTION['b'], "b"]]), "frb")
            .appendField(Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_DIR);
        this.appendValueInput("PWM")
            .setCheck("Pin")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_PWM);

        this.setInputsInline(false);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_TB6612MOTORDRIVER_HELPURL);
    },
    provideBlocks: ['module_set_TB6612MotorDriver']
};

Blockly.Blocks['module_set_TB6612MotorDriver'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_OPTION['f'], 'f'],
            [Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_OPTION['b'], 'b'],
            [Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_OPTION['s'], 's']],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("TB6612MotorDriver"), "NAME")
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
        this.setTooltip(Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_SET_TB6612MOTORDRIVER_HELPURL);
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
            .appendField(Blockly.Msg.INSTANCE_RANGEFINDER_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_RANGEFINDER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_RANGEFINDER_HELPURL);
    },
    provideBlocks: ['module_RangeFinder_Ping']
};

Blockly.Blocks['module_RangeFinder_Ping'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_RANGEFINDER_PING_MM)
            .appendField(new Blockly.FieldInstanceDropdown("RangeFinder"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_RANGEFINDER_PING_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_RANGEFINDER_PING_HELPURL);
    }
};

Blockly.Blocks['instance_OseppRemote'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.INSTANCE_OSEPPREMOTE_REMOTE_UPDATE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceInput('remote', 'remote', 'remote'), "NAME").setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_OSEPPREMOTE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_OSEPPREMOTE_HELPURL);
    },
    provideBlocks: ['module_OseppRemote_Button', 'module_OseppRemote_Channel', 'module_OseppRemote_isTimeout']
};

Blockly.Blocks['module_OseppRemote_Button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_REMOTE)
            .appendField(new Blockly.FieldDropdown([
                ["L", "button_L"], ["R", "button_R"], ["U", "button_U"], ["D", "button_D"],
                ["A", "button_A"], ["B", "button_B"], ["X", "button_X"], ["Y", "button_Y"]
            ]),
                "CHANNEL")
            .appendField(Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_PRESSED);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_OSEPPREMOTE_BUTTON_HELPURL);
    }
};

Blockly.Blocks['module_OseppRemote_Channel'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_REMOTE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['0'], 'left_X'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['1'], 'left_Y'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['2'], 'right_X'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['3'], 'right_Y'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['4'], 'gravity_X'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['5'], 'gravity_Y'],
                [Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_OPTION['6'], 'gravity_Z']]),
                "CHANNEL");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_OSEPPREMOTE_CHANNEL_HELPURL);
    }
};

Blockly.Blocks['module_OseppRemote_isTimeout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_REMOTE_TIMEOUT);
        this.appendValueInput("time")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_OSEPPREMOTE_ISTIMEOUT_HELPURL);
    }
};

Blockly.Blocks['instance_linesensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("blockIcon/linesensor.png", 40, 40, "*"))
            .appendField(new Blockly.FieldInstanceInput('LINESENSOR', 'line1', 'line'), "NAME");
        this.appendValueInput("Pin")
            .setCheck("Pin")
            .appendField(Blockly.Msg.INSTANCE_LIGHTSENSOR_PINON);
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cInstanceDefine.primary,
            Blockly.Colours.cInstanceDefine.secondary,
            Blockly.Colours.cInstanceDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_LIGHTSENSOR_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_LIGHTSENSOR_HELPURL);
    },
    provideBlocks: ['module_linesensor_get']
};

Blockly.Blocks['module_linesensor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("LINESENSOR"), "NAME")
            .appendField(Blockly.Msg.MODULE_LIGHTSENSOR_GET_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(
            Blockly.Colours.cModuleInput.primary,
            Blockly.Colours.cModuleInput.secondary,
            Blockly.Colours.cModuleInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MODULE_LIGHTSENSOR_GET_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MODULE_LIGHTSENSOR_GET_HELPURL);
    }
};