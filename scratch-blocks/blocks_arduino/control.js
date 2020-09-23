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
        // this.appendValueInput("IF0")
        //     .setCheck(["Boolean", "Number"])
        //     .appendField("if");
        // this.appendStatementInput("DO0")
        //     .setCheck(null);
        // this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_IF_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_IF_HELPURL);
        this.setInputsInline(true);
        // this.setMutator(new Blockly.Mutator(['controls_if_elseif',
        //     'controls_if_else']));
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        this.updateShape_();
    },
    onchange: function (event) {
        if ((!this.workspace) || (event.type == Blockly.Events.UI)) return;
        if (event.blockId != this.id) return;
        if (event.type != Blockly.Events.CHANGE) return;

        var conn_if = [];
        var conn_do = [];
        var conn_else = null;
        for (var i = 0; i <= this.elseifCount_; i++) {
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            conn_if.push(inputIf.connection.targetConnection);
            conn_do.push(inputDo.connection.targetConnection);
        }
        if (this.elseCount_) conn_else = this.getInput('ELSE').connection.targetConnection;

        var index = event.oldValue;
        var action = event.name;
        if (action == "a") {
            if (this.elseCount_) {
                this.elseifCount_++;
                conn_if.splice(index, 0, null);
                conn_do.splice(index, 0, null);
            } else {
                this.elseCount_ = 1;
            }
        } else if (action == "d") {
            if (index > this.elseifCount_) {
                this.elseCount_ = 0;
            } else if (this.elseifCount_) {
                this.elseifCount_--;
                conn_if.splice(index, 1);
                conn_do.splice(index, 1);
            }
        }
        this.rendered = false;
        this.updateShape_();

        for (var i = 0; i <= this.elseifCount_; i++) {
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            inputIf.connection.connect(conn_if[i]);
            inputDo.connection.connect(conn_do[i]);
        }
        if (this.elseCount_) this.getInput('ELSE').connection.connect(conn_else);

        this.initSvg();
        this.render();
        this.bumpNeighbours_();
    },
    updateShape_: function () {
        // Delete everything.
        while (this.inputList[0]) {
            this.removeInput(this.inputList[0].name);
        }
        // Rebuild block.
        for (var i = 0; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck(["Boolean", "Number"])
                .appendField(i == 0 ? Blockly.Msg.CONTROL_IF_IF : Blockly.Msg.CONTROL_IF_ELSE_IF);
            if (i && this.workspace && !this.workspace.isFlyout) {
                this.appendDummyInput()
                    .appendField(new Blockly.FieldIconButton(i, "blockIcon/minus-4-xxl.png", 30, 30, "*"), 'd')
                    //.appendField(new Blockly.FieldIconButton(i, "blockIcon/plus-button.svg", 30, 30, "*"), 'a')
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            this.appendStatementInput('DO' + i).appendField(Blockly.Msg.CONTROL_IF_DO);
        }

        if (this.elseCount_) {
            this.appendDummyInput().appendField(Blockly.Msg.CONTROL_IF_ELSE);
            if (this.workspace && !this.workspace.isFlyout) {
                this.appendDummyInput()
                    .appendField(new Blockly.FieldIconButton(i, "blockIcon/minus-4-xxl.png", 30, 30, "*"), 'd')
                    //.appendField(new Blockly.FieldIconButton(i, "blockIcon/plus-button.svg", 30, 30, "*"), 'a')
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROL_IF_DO);
        }
        if (this.workspace && !this.workspace.isFlyout) {
            this.appendDummyInput()
                .appendField(new Blockly.FieldIconButton(this.elseifCount_ + 1, "blockIcon/plus-4-xxl.png", 30, 30, "*"), 'a');
        }
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
        var clauseBlock = containerBlock;
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [];
        var statementConnections = [];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                case 'controls_if_if':
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
        for (var i = 0; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock;
        var i = 0;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_if':
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
    if (targetBlock) {
        targetBlock.render(false);
    } else {
        var blockChild = input.sourceBlock_.workspace.newBlock('math_number');
        blockChild.setShadow(true);
        blockChild.getField('NUM').setText('1');
        blockChild.initSvg();
        blockChild.render(false);
        input.connection.connect(blockChild.outputConnection);
    }
}
Blockly.Blocks['control_forloop'] = {
    init: function () {
        this.appendValueInput("init")
            .setCheck(["NumberInstanceDefine", "NumberInstance"])
            .appendField(Blockly.Msg.CONTROL_FORLOOP_INITFOR);

        var input = this.appendValueInput("initNumber")
            .appendField(Blockly.Msg.CONTROL_FORLOOP_INITNUMBER)
            .setCheck("Number");

        this.appendValueInput("CONDITION")
            .setCheck(["Boolean", "Number"])
            .appendField(Blockly.Msg.CONTROL_FORLOOP_CONDITION);

        this.appendValueInput("NAME").
            appendField(Blockly.Msg.CONTROL_FORLOOP_STEP).
            setCheck("NumberInstance");

        var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_INC, "++"],
            [Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_DEC, "--"],
            [Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_INCN, "+="],
            [Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_DECN, "-="],
            [Blockly.Msg.CONTROL_FORLOOP_STEP_OPTION_EQ, "="]],
            function (option) {
                this.sourceBlock_.updateStepShape(option);
            });

        this.appendDummyInput()
            .appendField(dropdown, "step");

        var input = this.appendValueInput("stepNumber")
            .setCheck("Number");

        this.appendDummyInput('ending')
            .appendField(Blockly.Msg.CONTROL_FORLOOP_ENDING);

        this.appendStatementInput("SUBSTACK")
            .appendField(Blockly.Msg.CONTROL_IF_DO)
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_FORLOOP_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_FORLOOP_HELPURL);
    },
    afterCreateBeforRender: function () {
        this.updateInitShape();
        this.updateStepShape(this.getFieldValue("step"));
    },
    onchange: function (event) {
        if ((!this.workspace) || (event.type == Blockly.Events.UI)) return;
        if (event.type == Blockly.Events.MOVE) {
            if ((event.oldParentId != this.id) && (event.newParentId != this.id)) return;
            if ((event.newInputName == "init") || (event.oldInputName == "init")) {
                this.updateInitShape();
                this.render();
                this.bumpNeighbours_();
            } else if ((event.newInputName == "NAME") || (event.oldInputName == "NAME")) {
                this.updateStepShape(this.getFieldValue("step"));
                this.render();
                this.bumpNeighbours_();
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
            initNumberInput.setVisible(false);
            initNumberInput.hide = true;
        } else {
            initNumberInput.setVisible(true);
            initNumberInput.hide = false;
            addShadowNumberToInput(initNumberInput);
        }
    },
    updateStepShape: function (option) {
        var stepInput = this.getInput("NAME");
        var input = this.getInput('stepNumber');
        var field = this.getField("step");
        if (!stepInput.connection.targetBlock()) {
            field.hide = true;
            field.setVisible(false);
        } else {
            field.hide = false;
            field.setVisible(true);
        }

        if ((option.indexOf('=') >= 0) && (field.hide == false)) {
            if (input.hide === false) return;
            input.hide = false;
            input.setVisible(true);
            addShadowNumberToInput(input);
            var shadowBlock = input.connection.targetBlock();
            if (shadowBlock) {
                shadowBlock.render(false);
            }
        } else {
            if (input.hide === true) return;
            input.setVisible(false);
            input.hide = true;
        }
    }
};

Blockly.Blocks['control_while'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck(["Boolean", "Number"])
            .appendField(Blockly.Msg.CONTROL_WHILE_CONDITIONWHILE);
        this.appendStatementInput("SUBSTACK")
            .appendField(Blockly.Msg.CONTROL_IF_DO)
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_WHILE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_WHILE_HELPURL);
    }
};

Blockly.Blocks['control_break'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_BREAK_BREAK);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cLoop.primary, Blockly.Colours.cLoop.secondary, Blockly.Colours.cLoop.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_BREAK_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_BREAK_HELPURL);
    }
};

Blockly.Blocks['control_delay'] = {
    init: function () {
        this.appendValueInput("ms")
            .setCheck("Number")
            .appendField(Blockly.Msg.CONTROL_DELAY_MSDELAY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_DELAY_MILLISECONDS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cArduinoStatement.primary, Blockly.Colours.cArduinoStatement.secondary, Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_DELAY_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_DELAY_HELPURL);
    }
};
Blockly.Blocks['control_delaymicroseconds'] = {
    init: function () {
        this.appendValueInput("us")
            .setCheck("Number")
            .appendField(Blockly.Msg.CONTROL_DELAYMICROSECONDS_USDELAY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_DELAYMICROSECONDS_MICROSECONDS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Colours.cArduinoStatement.primary, Blockly.Colours.cArduinoStatement.secondary, Blockly.Colours.cArduinoStatement.tertiary);
        this.setTooltip(Blockly.Msg.CONTROL_DELAYMICROSECONDS_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_DELAYMICROSECONDS_HELPURL);
    }
};

Blockly.Blocks['control_millis'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_MILLIS_MILLIS);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.CONTROL_MILLIS_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_MILLIS_HELPURL);
    }
};
Blockly.Blocks['control_micros'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_MICROS_MICROS);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.secondary, Blockly.Colours.cArduinoInput.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.CONTROL_MICROS_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.CONTROL_MICROS_HELPURL);
    }
};

