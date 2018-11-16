/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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

/**
 * @fileoverview Procedure blocks for Scratch.
 */
'use strict';

goog.provide('Blockly.Blocks.procedures');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');


Blockly.Blocks['instance_procedure'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.INSTANCE_PROCEDURE_VOID)
            .appendField(new Blockly.FieldInstanceInput("ProcedureInstance", "", "procedure"), "NAME");
        this.appendStatementInput("statement")
            .setCheck(null);
        this.setInputsInline(true);
        this.setColour('#1f9999', '#2a8c8c', '#287373');
        this.setTooltip(Blockly.Msg.INSTANCE_PROCEDURE_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_PROCEDURE_HELPURL);
    }
};

Blockly.Blocks['instance_procedure_call'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.INSTANCE_PROCEDURE_CALL_CALL)
            .appendField(new Blockly.FieldInstanceGetter('', ''), "NAME");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#2a8c8c', '#2a8c8c', '#287373');
        this.setTooltip(Blockly.Msg.INSTANCE_PROCEDURE_CALL_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.INSTANCE_PROCEDURE_CALL_HELPURL);
    }
};

Blockly.Blocks['procedure_return'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURE_RETURN_RETURN);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#2a8c8c', '#2a8c8c', '#287373');
        this.setTooltip(Blockly.Msg.PROCEDURE_RETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURE_RETURN_HELPURL);
    }
};