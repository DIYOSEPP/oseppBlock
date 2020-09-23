'use strict';

goog.require('Blockly.Arduino');



Blockly.Arduino['instance_create_number'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_name = block.getFieldValue('NAME');
  var number_initvalue = block.getFieldValue('INITVALUE') || '0';
  // TODO: Assemble Arduino into code variable.
  Blockly.Arduino.addDeclaration(text_name, dropdown_type + ' ' + text_name + '=' + number_initvalue + ';');
  return [text_name, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_set_number'] = function(block) {
  var dropdown_instance_name = block.getFieldValue('instance_name');
  Blockly.Arduino.requireInstance(block, dropdown_instance_name);
  var op = block.getFieldValue('op');
  if (op.indexOf('=') >= 0) {
    var value_value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_instance_name + op + value_value;
  } else {
    var code = dropdown_instance_name + op;
  }

  return code + ';\n';
};

Blockly.Arduino['instance_number_getter'] = function(block) {
  var name = block.getFieldValue('NAME');
  Blockly.Arduino.requireInstance(block, name);
  // TODO: Assemble Arduino into code variable.
  var code = name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['instance_create_boolean'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_initvalue = block.getFieldValue('initValue');

  Blockly.Arduino.addDeclaration(text_name, 'boolean ' + text_name + '=' + dropdown_initvalue + ';');
  return [text_name, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_set_boolean'] = function(block) {
  var dropdown_instance_name = block.getFieldValue('instance_name');
  Blockly.Arduino.requireInstance(block, dropdown_instance_name);
  var value_value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  // TODO: Assemble Arduino into code variable.
  var code = dropdown_instance_name + '=' + value_value + ';\n';
  return code;
};

Blockly.Arduino['instance_boolean_getter'] = function(block) {
  var name = block.getFieldValue('NAME');
  Blockly.Arduino.requireInstance(block, name);
  // TODO: Assemble Arduino into code variable.
  var code = name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['instance_create_string'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_initvalue = block.getFieldValue('initValue');
  Blockly.Arduino.addDeclaration(text_name, 'String ' + text_name + '=' + Blockly.Arduino.quote_(text_initvalue) + ';');
  return [text_name, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['instance_set_string'] = function(block) {
  var dropdown_instance_name = block.getFieldValue('instance_name');
  Blockly.Arduino.requireInstance(block, dropdown_instance_name);
  var value_value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  // TODO: Assemble Arduino into code variable.
  var code = dropdown_instance_name + '=' + value_value + ';\n';
  return code;
};

Blockly.Arduino['instance_string_getter'] = function(block) {
  var name = block.getFieldValue('NAME');
  Blockly.Arduino.requireInstance(block, name);
  // TODO: Assemble Arduino into code variable.
  var code = name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_create_array'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_name = block.getFieldValue('NAME');
  var number_initvalue = block.getFieldValue('INITVALUE');
  // TODO: Assemble Arduino into code variable.

  Blockly.Arduino.addDeclaration(text_name, dropdown_type + ' ' + text_name + '[' + number_initvalue + '];');

  return '';
};

Blockly.Arduino['instance_set_array'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_INDEX = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_NONE);
  var value_value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.requireInstance(block, value_name);
  // TODO: Assemble Arduino into code variable.
  var code = value_name + '[' + value_INDEX + ']=' + value_value + ';\n';
  return code;
};

Blockly.Arduino['instance_array_getter'] = function(block) {
  var name = block.getFieldValue('NAME');
  var value_index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_NONE);
  Blockly.Arduino.requireInstance(block, name);
  // TODO: Assemble Arduino into code variable.
  var code = name + '[' + value_index + ']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
