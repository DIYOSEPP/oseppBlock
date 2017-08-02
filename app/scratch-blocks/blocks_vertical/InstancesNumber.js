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

goog.provide('Blockly.Blocks.InstancesNumber');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');



Blockly.Blocks['instance_create_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["long", "long"], ["unsigned int", "unsigned int"], ["unsigned long", "unsigned long"], ["char", "char"], ["byte", "byte"], ["float", "float"]]), "TYPE");
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldInstanceInput('NumberInstance'), "NAME")
            .appendField("=")
            .appendField(new Blockly.FieldTextInput('0'), "INITVALUE");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setOutput(true, "NumberInstanceDefine");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('TYPE');
            var TOOLTIPS = {
                'int': 'Integers are your primary data-type for number storage.',
                'long': 'Long variables are extended size variables for number storage, and store 32 bits (4 bytes), from -2,147,483,648 to 2,147,483,647.',
                'unsigned int': 'only store positive values, yielding a useful range of 0 to 65,535 (2^16) - 1).',
                'unsigned long': 'Unsigned long variables are extended size variables for number storage, and store 32 bits (4 bytes). Unlike standard longs unsigned longs won\'t store negative numbers, making their range from 0 to 4,294,967,295 (2^32 - 1).',
                'char': 'A data type that takes up 1 byte of memory that stores a character value',
                'byte': 'A byte stores an 8-bit unsigned number, from 0 to 255.',
                'float': 'Datatype for floating-point numbers, a number that has a decimal point.'
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('TYPE');
            var url = {
                'int': 'https://www.arduino.cc/en/Reference/Int',
                'long': 'https://www.arduino.cc/en/Reference/Long',
                'unsigned int': 'https://www.arduino.cc/en/Reference/UnsignedInt',
                'unsigned long': 'https://www.arduino.cc/en/Reference/UnsignedLong',
                'char': 'https://www.arduino.cc/en/Reference/Char',
                'byte': 'https://www.arduino.cc/en/Reference/Byte',
                'float': 'https://www.arduino.cc/en/Reference/Float'
            };
            return url[op];
        });
    }
};

Blockly.Blocks['instance_number_getter'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, ["Number", "NumberInstance"]);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('retrieve value from variable sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Scope');
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
    }
};

Blockly.Blocks['instance_set_number'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([["=", "="], ["++", "++"], ["- -", "--"], ["+=", "+="], ["- =", "-="], ["*=", "*="], ["/=", "/="], ["%=", "%="]],
                function (option) {
                    this.sourceBlock_.updateShape(option);
                });
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("NumberInstance"), "instance_name")
            .appendField(dropdown, "op");
        this.appendValueInput("VALUE")
            .setCheck(["Number", "Boolean"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.primary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip('Stores the value to the right of the equal sign in the variable to the left of the equal sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Assignment');
    },
    onchange: function (event) {
        if (!this.workspace || event.type == Blockly.Events.UI) return;

        if ((event.blockId == this.id)||(event.ids && (event.ids.indexOf(this.id) >= 0))) {
            this.updateShape(this.getFieldValue("op"));
        }

    },
    updateShape: function (option) {
        var input = this.getInput('VALUE');
        if (!option) return;
        if (option.indexOf('=') >= 0) {
            input.hide = false;
            input.setVisible(true);
            addShadowNumberToInput(input);
            var shadowBlock = input.connection.targetBlock();
            if (shadowBlock) {
                shadowBlock.render();
            }
        } else {
            var targetBlock = input.connection.targetBlock();
            if (targetBlock && !targetBlock.isShadow()) {
                targetBlock.unplug(true);
            }
            input.setVisible(false);
            input.hide = true;
        }
        this.render();
    }
};

Blockly.Blocks['instance_create_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("boolean ")
            .appendField(new Blockly.FieldInstanceInput('BooleanInstance'), "NAME")
            .appendField("=")
            .appendField(new Blockly.FieldDropdown([["False", "false"], ["True", "true"]]), "initValue");
        this.setInputsInline(true);
        this.setOutput(true, "booleanInstanceDefine");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip('A boolean holds one of two values, true or false.');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/BooleanVariables');
    }
};

Blockly.Blocks['instance_set_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("BooleanInstance"), "instance_name")
            .appendField("=");
        this.appendValueInput("VALUE")
            .setCheck("Boolean");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.primary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip('Stores the value to the right of the equal sign in the variable to the left of the equal sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Assignment');
    }
};

Blockly.Blocks['instance_boolean_getter'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, ["Boolean", "BooleanInstance"]);
        this.setTooltip('retrieve value from variable sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Scope');
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
    }
};

Blockly.Blocks['instance_create_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("string ")
            .appendField(new Blockly.FieldInstanceInput('StringInstance', 'str1', 'str'), "NAME")
            .appendField("=")
            .appendField(new Blockly.FieldTextInput("hello!"), "initValue");
        this.setInputsInline(true);
        this.setOutput(true, "StringInstanceDefine");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip('The String class,allows you to use and manipulate strings');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/StringObject');
    }
};


Blockly.Blocks['instance_set_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("StringInstance"), "instance_name")
            .appendField("=");
        this.appendValueInput("VALUE")
            .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.primary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip('Stores the value to the right of the equal sign in the variable to the left of the equal sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/String');
    }
};

Blockly.Blocks['instance_string_getter'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, ["String", "StringInstance"]);
        this.setTooltip('retrieve value from variable sign');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/String');
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
    }
};

Blockly.Blocks['instance_create_array'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["int", "int"], ["long", "long"], ["unsigned int", "unsigned int"], ["unsigned long", "unsigned long"], ["char", "char"], ["byte", "byte"], ["float", "float"]]), "TYPE");
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldInstanceInput('ArrayInstance', 'arr', 'arr'), "NAME")
            .appendField("[")
            .appendField(new Blockly.FieldNumber(10, 0), "INITVALUE")
            .appendField("]");
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip('An array is a collection of variables that are accessed with an index number');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Array');

        //this.setMutator(new Blockly.Mutator(['instance_array_number']));

        this.initValue = [];
    },
    mutationToDom: function () {
        if (this.initValue.length <= 0) {
            return null;
        }
        var container = document.createElement('mutation');
        container.setAttribute('initValue', this.initValue.toString());
        return container;
    },
    domToMutation: function (xmlElement) {
        if (xmlElement) {
            this.initValue = xmlElement.getAttribute('initValue');
            if (!this.initValue) this.initValue = [];
        } else {
            this.initValue = [];
        }
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('instance_array_array');
        containerBlock.setFieldValue(this.getFieldValue('NAME'), 'NAME');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 0; i < this.initValue.length; i++) {
            var init = workspace.newBlock('instance_array_number');
            init.setFieldValue(this.initValue[i], 'initValue');
            init.initSvg();
            connection.connect(init.previousConnection);
            connection = init.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 0;
        this.initValue = [];
        while (clauseBlock) {
            this.initValue[i] = clauseBlock.getFieldValue('initValue');
            i++;
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
    },
    saveConnections: function (containerBlock) {

    },
    updateShape_: function () {
    }
};

Blockly.Blocks['instance_array_number'] = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldTextInput("0"), "initValue");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['instance_array_array'] = {
    /**
     * Mutator block for array container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.appendDummyInput()
            .appendField('arrayName', 'NAME');
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    }
};


Blockly.Blocks['instance_set_array'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.appendValueInput("INDEX")
            .setCheck("Number")
            .appendField("[");
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("] =");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip('assign a value to an array');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Array');
    }
};

Blockly.Blocks['instance_array_getter'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME")
            .appendField("[")
        this.appendValueInput("INDEX")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, ["Number", "NumberInstance"]);
        this.setTooltip('retrieve a value from an array');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Array');
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    }
};
