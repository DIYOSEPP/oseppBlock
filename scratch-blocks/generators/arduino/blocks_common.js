/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for colour blocks.
 *
 * TODO: These blocks do not really serve a purpose for Arduino code.
 */

'use strict';

goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');



Blockly.Arduino['colour_picker'] = function (block) {
    var colour_colour = block.getFieldValue('COLOUR');
    // TODO: Assemble Arduino into code variable.
    var code = colour_colour;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_number'] = function (block) {
    var number_num = parseFloat(block.getFieldValue('NUM'));
    // TODO: Assemble Arduino into code variable.
    var code = number_num;
    if (isNaN(number_num)) {
        code = '0';
    } else {
        if (number_num == Infinity) {
            code = 'INFINITY';
        } else if (number_num == -Infinity) {
            code = '-INFINITY';
        }
    }
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_integer'] = function (block) {
    var number_num = block.getFieldValue('NUM');
    // TODO: Assemble Arduino into code variable.
    var code;
    if (isNaN(number_num)) {
        code = '0';
    } else {
        code = number_num
    }
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_whole_number'] = function (block) {
    var number_num = block.getFieldValue('NUM');
    // TODO: Assemble Arduino into code variable.
    var code;
    if (isNaN(number_num)) {
        code = '0';
    } else {
        code = number_num
    }
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_positive_number'] = function (block) {
    var number_num = block.getFieldValue('NUM');
    // TODO: Assemble Arduino into code variable.
    var code;
    if (isNaN(number_num)) {
        code = '0';
    } else {
        code = number_num
    }
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_angle'] = function (block) {
    var angle_num = block.getFieldValue('NUM');
    // TODO: Assemble Arduino into code variable.
    var code = angle_num;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text'] = function (block) {
    var text_text = block.getFieldValue('TEXT');
    // TODO: Assemble Arduino into code variable.
    var code = Blockly.Arduino.quote_(text_text);
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};