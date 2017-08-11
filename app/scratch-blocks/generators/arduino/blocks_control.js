'use strict';

goog.require('Blockly.Arduino');

Blockly.Arduino['control_if'] = function (block) {

    var value_condition = Blockly.Arduino.valueToCode(block, 'IF0', Blockly.Arduino.ORDER_NONE) || 'false';
    var statements_substack = Blockly.Arduino.statementToCode(block, 'DO0');
    // TODO: Assemble Arduino into code variable.
    var code = 'if(' + value_condition + '){\n' + statements_substack + '}';

    for (var n = 1; n <= block.elseifCount_; n++) {
        value_condition = Blockly.Arduino.valueToCode(block, 'IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        statements_substack = Blockly.Arduino.statementToCode(block, 'DO' + n);
        code += ' else if (' + value_condition + ') {\n' + statements_substack + '}';
    }
    if (block.elseCount_) {
        statements_substack = Blockly.Arduino.statementToCode(block, 'ELSE');
        code += ' else {\n' + statements_substack + '}';
    }
    return code + '\n';
};



Blockly.Arduino['control_forloop'] = function (block) {
    var code = 'for(';
    var blockInit = block.getInput('init').connection.targetBlock();
    Blockly.Arduino.valueToCode(block, 'init', Blockly.Arduino.ORDER_NONE);
    if (blockInit) {
        if (blockInit.type == 'instance_create_number') {
            code += blockInit.getFieldValue('NAME') + '=' + blockInit.getFieldValue('INITVALUE');
        } else if ((blockInit.type == 'instance_number_getter') || (blockInit.type == 'instance_array_getter')) {
            var varName = blockInit.getFieldValue('NAME');
            if (varName) code += varName + '=' + (Blockly.Arduino.valueToCode(block, 'initNumber', Blockly.Arduino.ORDER_ASSIGNMENT) || '0');
        }
    }
    code += ';';
    code += Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE);
    code += ';';
    var value_name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);
    if (value_name) {
        var dropdown_step = block.getFieldValue('step');
        if ((dropdown_step == '=') || (dropdown_step == '+=') || (dropdown_step == '-=')) {
            code += value_name + dropdown_step + (Blockly.Arduino.valueToCode(block, 'stepNumber', Blockly.Arduino.ORDER_ASSIGNMENT) || '1');
        } else {
            code += value_name + dropdown_step;
        }
    }
    code += '){\n';
    var statements_substack = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    code += statements_substack;
    code += '}\n';
    return code;


};

Blockly.Arduino['control_while'] = function (block) {
    var value_condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE) || 'false';
    var statements_substack = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    // TODO: Assemble Arduino into code variable.
    var code = 'while (' + value_condition + ') {\n' + statements_substack + '}\n';
    return code;
};

Blockly.Arduino['control_break'] = function (block) {
    return 'break;\n';
};


Blockly.Arduino['control_delay'] = function (block) {
    var value_ms = Blockly.Arduino.valueToCode(block, 'ms', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'delay(' + value_ms + ');\n';
    return code;
};

Blockly.Arduino['control_delaymicroseconds'] = function (block) {
    var value_us = Blockly.Arduino.valueToCode(block, 'us', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = 'delayMicroseconds(' + value_us + ');\n';
    return code;
};

Blockly.Arduino['control_millis'] = function (block) {
    // TODO: Assemble Arduino into code variable.
    var code = 'millis()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['control_micros'] = function (block) {
    // TODO: Assemble Arduino into code variable.
    var code = 'micros()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};