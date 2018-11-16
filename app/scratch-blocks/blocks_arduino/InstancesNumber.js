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
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["int"], "int"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["long"], "long"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["unsigned int"], "unsigned int"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["unsigned long"], "unsigned long"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["char"], "char"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["byte"], "byte"],
                [Blockly.Msg.INSTANCE_CREATE_NUMBER_OPTION["float"], "float"]]),
                "TYPE");
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceInput('NumberInstance'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_CREATE_NUMBER)
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
            var TOOLTIPS = Blockly.Msg.INSTANCE_CREATE_NUMBER_TOOLTIP;
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('TYPE');
            var url = Blockly.Msg.INSTANCE_CREATE_NUMBER_HELPURL;
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
        this.setTooltip(Blockly.Msg.INSTANCE_NUMBER_GETTER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_NUMBER_GETTER_HELPURL);
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
    }
};

Blockly.Blocks['instance_set_number'] = {
    init: function () {
        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["="], "="],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["++"], "++"],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["--"], "--"],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["+="], "+="],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["-="], "-="],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["*="], "*="],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["/="], "/="],
            [Blockly.Msg.INSTANCE_SET_NUMBER_OPTION["%="], "%="]],
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
        this.setTooltip(Blockly.Msg.INSTANCE_SET_NUMBER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SET_NUMBER_HELPURL);
    },
    afterCreateBeforRender: function () {
        var option = this.getFieldValue("op");
        this.updateShape(option);
    },
    updateShape: function (option) {
        var input = this.getInput('VALUE');
        if (!option) return;
        if (option.indexOf('=') >= 0) {
            if (input.hide === false) return;
            input.hide = false;
            input.setVisible(true);
            addShadowNumberToInput(input);
        } else {
            if (input.hide === true) return;
            input.setVisible(false);
            input.hide = true;
        }
    }
};

Blockly.Blocks['instance_create_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.INSTANCE_CREATE_BOOLEAN_BOOLEAN)
            .appendField(new Blockly.FieldInstanceInput('BooleanInstance'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_CREATE_BOOLEAN_ASSIGN)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.INSTANCE_CREATE_BOOLEAN_OPTION["false"], "false"],
                [Blockly.Msg.INSTANCE_CREATE_BOOLEAN_OPTION["true"], "true"]
            ]), "initValue");
        this.setInputsInline(true);
        this.setOutput(true, "booleanInstanceDefine");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_CREATE_BOOLEAN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_CREATE_BOOLEAN_HELPURL);
    }
};

Blockly.Blocks['instance_set_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("BooleanInstance"), "instance_name")
            .appendField(Blockly.Msg.INSTANCE_SET_BOOLEAN_ASSIGN);
        this.appendValueInput("VALUE")
            .setCheck("Boolean");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.primary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SET_BOOLEAN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SET_BOOLEAN_HELPURL);
    }
};

Blockly.Blocks['instance_boolean_getter'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, ["Boolean", "BooleanInstance"]);
        this.setTooltip(Blockly.Msg.INSTANCE_BOOLEAN_GETTER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_BOOLEAN_GETTER_HELPURL);
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
            .appendField(Blockly.Msg.INSTANCE_CREATE_STRING_STRING)
            .appendField(new Blockly.FieldInstanceInput('StringInstance', 'str1', 'str'), "NAME")
            .appendField(Blockly.Msg.INSTANCE_CREATE_STRING_ASSIGN)
            .appendField(new Blockly.FieldTextInput("hello!"), "initValue");
        this.setInputsInline(true);
        this.setOutput(true, "StringInstanceDefine");
        this.setOutputShape(Blockly.OUTPUT_SHAPE_SQUARE);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_CREATE_STRING_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_CREATE_STRING_HELPURL);
    }
};


Blockly.Blocks['instance_set_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceDropdown("StringInstance"), "instance_name")
            .appendField(Blockly.Msg.INSTANCE_SET_STRING_ASSIGN);
        this.appendValueInput("VALUE")
            .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(
            Blockly.Colours.cVariableOperation.primary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_SET_STRING_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SET_STRING_HELPURL);
    }
};

Blockly.Blocks['instance_string_getter'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, ["String", "StringInstance"]);
        this.setTooltip(Blockly.Msg.INSTANCE_STRING_GETTER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_STRING_GETTER_HELPURL);
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
            .appendField(new Blockly.FieldDropdown(
                [[Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["int"], "int"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["long"], "long"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["unsigned int"], "unsigned int"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["unsigned long"], "unsigned long"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["char"], "char"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["byte"], "byte"],
                [Blockly.Msg.INSTANCE_CREATE_ARRAY_OPTION["float"], "float"]]),
                "TYPE");
        this.appendDummyInput()
            .appendField(new Blockly.FieldInstanceInput('ArrayInstance', 'arr', 'arr'), "NAME")
            .appendField('[')
            .appendField(new Blockly.FieldNumber(10, 0), "INITVALUE")
            .appendField(']');
        this.setInputsInline(true);
        this.setColour(
            Blockly.Colours.cVariableDefine.primary,
            Blockly.Colours.cVariableDefine.secondary,
            Blockly.Colours.cVariableDefine.tertiary);
        this.setTooltip(Blockly.Msg.INSTANCE_CREATE_ARRAY_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_CREATE_ARRAY_HELPURL);

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
        this.setTooltip(Blockly.Msg.INSTANCE_ARRAY_NUMBER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_ARRAY_NUMBER_HELPURL);
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
        this.setTooltip(Blockly.Msg.INSTANCE_ARRAY_ARRAY_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_ARRAY_ARRAY_HELPURL);
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
        this.setTooltip(Blockly.Msg.INSTANCE_SET_ARRAY_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_SET_ARRAY_HELPURL);
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
        this.setTooltip(Blockly.Msg.INSTANCE_ARRAY_GETTER_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_ARRAY_GETTER_HELPURL);
        this.setColour(
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.secondary,
            Blockly.Colours.cVariableOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
    }
};
