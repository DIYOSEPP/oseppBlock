'use strict';


goog.require('Blockly.Arduino');


Blockly.Arduino['controlsetuploop'] = function (block) {
    Blockly.Arduino.setups_['userSetupCode'] = Blockly.Arduino.statementToCode(block, 'SETUPSTACK');
    var statements_loopstack = Blockly.Arduino.statementToCode(block, 'LOOPSTACK');
    // TODO: Assemble Arduino into code variable.
    return statements_loopstack;
};

Blockly.Arduino['io_readdigitalpin'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'digitalRead(' + value_pin + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_readanalogpin'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'analogRead(' + value_pin + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_writedigitalpin'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    var value_value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'digitalWrite(' + value_pin + ',' + value_value + ');\n';
    return code;
};

Blockly.Arduino['io_writeanalogpin'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    var value_value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'analogWrite(' + value_pin + ',' + value_value + ');\n';
    return code;
};

Blockly.Arduino['io_pinmode'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Arduino into code variable.
    var code = 'pinMode(' + value_pin + ',' + dropdown_mode + ');\n';
    Blockly.Arduino.reservePin(block, value_pin, dropdown_mode=='OUTPUT'?'OUTPUT':'INPUT','pinMode');
    return code;
};


Blockly.Arduino['io_arduino_uno_digitalpin_menu'] = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_pin;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_arduino_uno_analogpin_menu'] = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_pin;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_arduino_uno_pwmpin_menu'] = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_pin;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_pinstate_menu'] = function (block) {
    var dropdown_state = block.getFieldValue('state');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_state;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_tone'] = function (block) {
    var value_frequency = Blockly.Arduino.valueToCode(block, 'frequency', Blockly.Arduino.ORDER_NONE);
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'tone(' + value_pin + ',' + value_frequency + ');\n';
    return code;
};

Blockly.Arduino['io_tone_menu'] = function (block) {
    var dropdown_tone = block.getFieldValue('Tone');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_tone;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_notone'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'noTone(' + value_pin + ');\n';
    return code;
};

Blockly.Arduino['io_pulsein'] = function (block) {
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    var value_value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_NONE);
    var value_timeout = Blockly.Arduino.valueToCode(block, 'timeout', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'pulseIn(' + value_pin + ',' + value_value + ',' + value_timeout + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_serial'] = function (block) {
    var dropdown_bandrate = block.getFieldValue('Bandrate');
    // TODO: Assemble Arduino into code variable.
    var code = 'Serial.begin(' + dropdown_bandrate + ');\n';
    Blockly.Arduino.reservePin(block, 0, 'RX', 'Serial');
    Blockly.Arduino.reservePin(block, 1, 'TX', ' Serial');
    return code;
};
Blockly.Arduino['serial_print'] = function (block) {
    var dropdown_action = block.getFieldValue('action');
    var value_value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_ATOMIC);
    // TODO: Assemble Arduino into code variable.
    var code = 'Serial.' + dropdown_action + '(' + value_value + ');\n';
    return code;
};

Blockly.Arduino['serial_available'] = function (block) {
    // TODO: Assemble Arduino into code variable.
    var code = 'Serial.available()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino['serial_read'] = function (block) {
    // TODO: Assemble Arduino into code variable.
    var code = 'Serial.read()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_arduino_uno_pin_usable_menu'] = function (block) {
    var dropdown_pin = block.getFieldValue('Pin');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_pin;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};