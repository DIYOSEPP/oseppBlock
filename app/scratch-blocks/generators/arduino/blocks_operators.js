'use strict';


goog.require('Blockly.Arduino');



Blockly.Arduino['arithmeticoperators'] = function (block) {
    var dropdown_operators = block.getFieldValue('Operators');

    var order = ((dropdown_operators === '+') || (dropdown_operators === '-')) ?
        Blockly.Arduino.ORDER_ADDITIVE : Blockly.Arduino.ORDER_MULTIPLICATIVE;

    var value_num1 = Blockly.Arduino.valueToCode(block, 'NUM1', order);
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', order);
    // TODO: Assemble Arduino into code variable.
    var code = value_num1 + dropdown_operators + value_num2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, order];
};

Blockly.Arduino['negativeoperators'] = function (block) {
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
    // TODO: Assemble Arduino into code variable.
    var code = '-' + value_num2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
};

Blockly.Arduino['comparisonoperators'] = function (block) {
    var dropdown_operators = block.getFieldValue('Operators');
    var order = ((dropdown_operators === '==') || (dropdown_operators === '!=')) ?
        Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
    var value_num1 = Blockly.Arduino.valueToCode(block, 'NUM1', order);
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', order);
    // TODO: Assemble Arduino into code variable.
    var code = value_num1 + dropdown_operators + value_num2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, order];
};

Blockly.Arduino['booleanoperators'] = function (block) {
    var dropdown_operators = block.getFieldValue('Operators');
    var order = (dropdown_operators === '||') ?
        Blockly.Arduino.ORDER_LOGICAL_OR : Blockly.Arduino.ORDER_LOGICAL_AND;
    var value_num1 = Blockly.Arduino.valueToCode(block, 'NUM1', order) || 'false';
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', order) || 'false';
    // TODO: Assemble Arduino into code variable.
    var code = value_num1 + dropdown_operators + value_num2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, order];
};

Blockly.Arduino['notoperators'] = function (block) {
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_UNARY_PREFIX) || 'true';
    // TODO: Assemble Arduino into code variable.
    var code = '!' + value_num2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
};

Blockly.Arduino['mathminmax'] = function (block) {
    var dropdown_operator = block.getFieldValue('OPERATOR');
    var value_num1 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_NONE);
    var value_num2 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_operator + '(' + value_num1 + ',' + value_num2 + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['mathoperators'] = function (block) {
    var dropdown_operator = block.getFieldValue('OPERATOR');
    var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_operator + '(' + value_num + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['mathconstrain'] = function (block) {
    var value_x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
    var value_a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_NONE);
    var value_b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'constrain(' + value_x + ',' + value_a + ',' + value_b + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['mathmap'] = function (block) {
    var value_x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
    var value_fl = Blockly.Arduino.valueToCode(block, 'FL', Blockly.Arduino.ORDER_NONE);
    var value_fh = Blockly.Arduino.valueToCode(block, 'FH', Blockly.Arduino.ORDER_NONE);
    var value_tl = Blockly.Arduino.valueToCode(block, 'TL', Blockly.Arduino.ORDER_NONE);
    var value_th = Blockly.Arduino.valueToCode(block, 'TH', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'map(' + value_x + ',' + value_fl + ',' + value_fh + ',' + value_tl + ',' + value_th + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['mathrandom'] = function (block) {
    var value_l = Blockly.Arduino.valueToCode(block, 'L', Blockly.Arduino.ORDER_NONE);
    var value_h = Blockly.Arduino.valueToCode(block, 'H', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'random(' + value_l + ',' + value_h + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_boolean_menu'] = function (block) {
    var dropdown_state = block.getFieldValue('state');
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_state;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};