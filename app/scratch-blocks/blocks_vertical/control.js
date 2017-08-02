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

goog.provide('Blockly.Blocks.control');
goog.require('Blockly.Colours');
goog.require('Blockly.Blocks');





Blockly.Blocks['control_if'] = {
    init: function () {
        this.appendValueInput("IF0")
            .setCheck(["Boolean", "Number"])
            .appendField("if");
        this.appendStatementInput("DO0")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip('if a value is true or non-zero,then do some statements');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/If');

        this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                     'controls_if_else']));
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        if (xmlElement) {
            this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
            this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        } else {
            this.elseifCount_ = 0;
            this.elseCount_ = 0;
        }
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck(["Boolean", "Number"])
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + i);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    }
};

Blockly.Blocks['controls_if_elseif'] = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};
Blockly.Blocks['controls_if_else'] = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};
Blockly.Blocks['controls_if_if'] = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};


function addShadowNumberToInput(input) {
    var targetBlock = input.connection.targetBlock();
    if (targetBlock) return;
    var blockChild = input.sourceBlock_.workspace.newBlock('math_number');  
    blockChild.setShadow(true);
    blockChild.getField('NUM').setText('1');
    blockChild.initSvg();
    blockChild.render();
    input.connection.connect(blockChild.outputConnection);
}
Blockly.Blocks['control_forloop'] = {
    init: function () {
        this.appendValueInput("init")
            .setCheck(["NumberInstanceDefine", "NumberInstance"])
            .appendField("for(");

        var input = this.appendValueInput("initNumber")
            .appendField("=")
            .setCheck("Number");

        this.appendValueInput("CONDITION")
            .setCheck(["Boolean", "Number"])
            .appendField(";");

        this.appendValueInput("NAME").
            appendField(";").
            setCheck("NumberInstance");

        var dropdown = new Blockly.FieldDropdown([["++", "++"], ["- -", "--"], ["=", "="]],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(dropdown, "step");

        var input = this.appendValueInput("stepNumber")
            .setCheck("Number");

        this.appendDummyInput('ending')
            .appendField(")");

        this.appendStatementInput("SUBSTACK")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip('The for statement is used to repeat a block of statements enclosed in curly braces');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/For');
    },
    onchange: function (event) {
        if (!this.workspace || event.type == Blockly.Events.UI) return;
        if (event.type == Blockly.Events.MOVE) {
            if ((event.oldParentId != this.id) && (event.newParentId != this.id)) return;
            if ((event.newInputName == "init") || (event.oldInputName == "init")) {
                this.updateInitShape();
            }
        } else if (event.type == Blockly.Events.CREATE) {
            if (event.ids.indexOf(this.id)>=0) {
                this.updateStepShape(this.getFieldValue("step"));
                this.updateInitShape();
            }
        }
    },
    updateInitShape: function () {
        var initInput = this.getInput('init');
        var initNumberInput = this.getInput('initNumber');
        var initType = null;

        var target = initInput.connection.targetBlock();
        if (target) {
            var input = this.getInput('initNumber');
            initType = target.type;
        }
        
        if ((initType != 'instance_number_getter') && (initType != 'instance_array_getter')) {
            var targetBlock = initNumberInput.connection.targetBlock();
            if (targetBlock && !targetBlock.isShadow()) {
                targetBlock.unplug(true);
            }
            initNumberInput.setVisible(false);
            initNumberInput.hide = true;
        } else {
            initNumberInput.setVisible(true);
            initNumberInput.hide = false;
            addShadowNumberToInput(initNumberInput);
            var shadowBlock = initNumberInput.connection.targetBlock();
            if (shadowBlock) {
                shadowBlock.render();
            }
            
        }
        this.render();
    },
    updateStepShape: function (option) {
        var input = this.getInput('stepNumber');
        if (option == '=') {
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

Blockly.Blocks['control_while'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck(["Boolean", "Number"])
            .appendField("while");
        this.appendStatementInput("SUBSTACK")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip('while a value is true,do some statements');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/While');
    }
};

Blockly.Blocks['control_break'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("break");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip('break is used to exit from a do, for, or while loop, bypassing the normal loop condition.');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Break');
    }
};


Blockly.Blocks['control_delay'] = {
    init: function () {
        this.appendValueInput("ms")
            .setCheck("Number")
            .appendField("delay");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cArduinoStatement.primary, Blockly.Colours.cArduinoStatement.secondary, Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Pauses the program for the amount of time (in miliseconds)');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Delay');
    }
};
Blockly.Blocks['control_delaymicroseconds'] = {
    init: function () {
        this.appendValueInput("us")
            .setCheck("Number")
            .appendField("delayMicroseconds");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cArduinoStatement.primary, Blockly.Colours.cArduinoStatement.secondary, Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip('Pauses the program for the amount of time (in microseconds)');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/DelayMicroseconds');
    }
};

Blockly.Blocks['control_millis'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Millis");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Returns the number of milliseconds since the Arduino board began running the current program');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Millis');
    }
};
Blockly.Blocks['control_micros'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get micros");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Returns the number of microseconds since the Arduino board began running the current program');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Micros');
    }
};

