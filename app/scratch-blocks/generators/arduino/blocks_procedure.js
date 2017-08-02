'use strict';

goog.require('Blockly.Arduino');

Blockly.Arduino['instance_procedure'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var statements_statement = Blockly.Arduino.statementToCode(block, 'statement');
    // TODO: Assemble Arduino into code variable.
    if (statements_statement) {
        var code = Blockly.Arduino.prefixLines(statements_statement, Blockly.Arduino.INDENT);
    } else {
        var code = '\n';
    }
    Blockly.Arduino.userFunctions_[text_name] ='void '+text_name+'(){\n'+ code+'}\n';
    return '';
};

Blockly.Arduino['instance_procedure_call'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    requireInstance(block, text_name);
    var code = text_name+'();\n';
    return code;
};