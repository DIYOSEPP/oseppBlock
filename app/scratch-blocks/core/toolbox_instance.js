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
 * @fileoverview Utility functions for handling variables.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Variables
 * @namespace
 **/
goog.provide('Blockly.InstanceToolbox');
goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Workspace');
goog.require('goog.string');

goog.require('Blockly.FieldInstanceGetter');
goog.require('Blockly.FieldInstanceDropdown');
goog.require('Blockly.FieldInstanceInput');

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.InstanceToolbox.flyoutCategoryVariable = function (workspace) {
    var variableList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(workspace, 'NumberInstance');
    variableList.sort(goog.string.caseInsensitiveCompare);

    var xmlList = [];
    //<block type="instance_create_number">
    //</block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'instance_create_number');
    xmlList.push(block);

    for (var i = 0; i < variableList.length; i++) {
        if (Blockly.Blocks['instance_number_getter']) {
            // <block type="instance_number_getter">
            //    <field name="NAME">variablename</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_number_getter');

            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);
            xmlList.push(block);
        }
//    }

//    if (variableList.length > 0) {
        if (Blockly.Blocks['instance_set_number']) {
            // <block type="instance_set_number">
            //   <field name="instance_name">variableList[i]</field>
            //   <value name="VALUE">
            //     <shadow type="math_number">
            //       <field name="NUM">0</field>
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_set_number');
            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'instance_name');
            block.appendChild(field);

            var fieldNum = goog.dom.createDom('field', null, "0");
            fieldNum.setAttribute('name', "NUM");

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'math_number');
            shadow.appendChild(fieldNum);

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'VALUE');
            value.appendChild(shadow);
            block.appendChild(value);
            xmlList.push(block);
        }
    }



    //boolean
    var variableList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(workspace, 'BooleanInstance');
    variableList.sort(goog.string.caseInsensitiveCompare);

    //<block type="instance_create_boolean">
    //</block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'instance_create_boolean');
    xmlList.push(block);

    for (var i = 0; i < variableList.length; i++) {
        if (Blockly.Blocks['instance_boolean_getter']) {
            // <block type="instance_boolean_getter">
            //    <field name="NAME">variablename</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_boolean_getter');

            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);
            xmlList.push(block);
        }
//    }

//    if (variableList.length > 0) {
        if (Blockly.Blocks['instance_set_boolean']) {
            // <block type="instance_set_boolean">
            //   <field name="instance_name">variableList[0]</field>
            //   <value name="VALUE">
            //     <shadow type="math_boolean_menu">
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_set_boolean');
            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'instance_name');
            block.appendChild(field);

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'math_boolean_menu');

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'VALUE');
            value.appendChild(shadow);
            block.appendChild(value);
            xmlList.push(block);
        }
    }


    //string

    var variableList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(workspace, 'StringInstance');
    variableList.sort(goog.string.caseInsensitiveCompare);

    //<block type="instance_create_string">
    //</block>
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'instance_create_string');
    xmlList.push(block);

    for (var i = 0; i < variableList.length; i++) {
        if (Blockly.Blocks['instance_string_getter']) {
            // <block type="instance_string_getter">
            //    <field name="NAME">variablename</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_string_getter');

            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);
            xmlList.push(block);
        }
//    }

//    if (variableList.length > 0) {
        if (Blockly.Blocks['instance_set_string']) {
            // <block type="instance_set_string">
            //   <field name="instance_name">variableList[0]</field>
            //   <value name="VALUE">
            //     <shadow type="text">
            //          <field name="TEXT">osepp</field>
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_set_string');
            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'instance_name');
            block.appendChild(field);

            var fieldNum = goog.dom.createDom('field', null, "osepp");
            fieldNum.setAttribute('name', "TEXT");

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'text');
            shadow.appendChild(fieldNum);

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'VALUE');
            value.appendChild(shadow);
            block.appendChild(value);
            xmlList.push(block);
        }
    }
    //array
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'instance_create_array');
    xmlList.push(block);

    var variableList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(workspace, 'ArrayInstance');
    variableList.sort(goog.string.caseInsensitiveCompare);

    for (var i = 0; i < variableList.length; i++) {
        if (Blockly.Blocks['instance_array_getter']) {
            // <block type="instance_array_getter">
            //   <field name="NAME">variablename</field>
            //   <value name="INDEX">
            //     <shadow type="math_number">
            //       <field name="NUM">0</field>
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_array_getter');

            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);

            var fieldNum = goog.dom.createDom('field', null, "0");
            fieldNum.setAttribute('name', "NUM");

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'math_number');
            shadow.appendChild(fieldNum);

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'INDEX');
            value.appendChild(shadow);
            block.appendChild(value);
            xmlList.push(block);
        }
        if (Blockly.Blocks['instance_set_array']) {
            // <block type="instance_set_array">
            //   <field name="NAME">variablename</field>
            //   <value name="INDEX">
            //     <shadow type="math_number">
            //       <field name="NUM">0</field>
            //     </shadow>
            //   </value>
            //   <value name="VALUE">
            //     <shadow type="math_number">
            //       <field name="NUM">0</field>
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_set_array');

            var field = goog.dom.createDom('field', null, variableList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);

            var fieldNum = goog.dom.createDom('field', null, "0");
            fieldNum.setAttribute('name', "NUM");

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'math_number');
            shadow.appendChild(fieldNum);

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'INDEX');
            value.appendChild(shadow);
            block.appendChild(value);

            var fieldNum = goog.dom.createDom('field', null, "0");
            fieldNum.setAttribute('name', "NUM");

            var shadow = goog.dom.createDom('shadow');
            shadow.setAttribute('type', 'math_number');
            shadow.appendChild(fieldNum);

            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'VALUE');
            value.appendChild(shadow);
            block.appendChild(value);

            xmlList.push(block);
        }
    }
    return xmlList;
};

Blockly.InstanceToolbox.flyoutCategoryProcedure = function (workspace) {
    var xmlList = [];
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'instance_procedure');
    xmlList.push(block);

    var procedureList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(workspace, 'ProcedureInstance');
    procedureList.sort(goog.string.caseInsensitiveCompare);

    for (var i = 0; i < procedureList.length; i++) {
        if (Blockly.Blocks['instance_procedure_call']) {
            // <block type="instance_procedure_call">
            //    <field name="NAME">procedurename</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'instance_procedure_call');

            var field = goog.dom.createDom('field', null, procedureList[i]);
            field.setAttribute('name', 'NAME');
            block.appendChild(field);
            xmlList.push(block);
        }
    }
    var block = goog.dom.createDom('block');
    block.setAttribute('type', 'procedure_return');
    xmlList.push(block);
    return xmlList;
};



Blockly.InstanceToolbox.modBlocks_cache = Blockly.InstanceToolbox.modBlocks_cache || null;


Blockly.InstanceToolbox.createMod_cache = function () {
    var subBlocks = [];
    var dom = Blockly.Xml.textToDom(ModuleToolboxXml);
    var chields = dom.childNodes;
    for (var i = 0, xml; xml = chields[i]; i++) {
        if (xml.tagName && xml.tagName.toLocaleLowerCase() == 'block') {
            subBlocks[xml.getAttribute('type')] = xml;
        }
    }

    Blockly.InstanceToolbox.modBlocks_cache = [];

    var modules = Blockly.Xml.textToDom(blockToolboxXml).childNodes;

    for (var i = 0, xml; xml = modules[i]; i++) {
        if (xml.tagName == null) continue;
        if (xml.tagName.toLocaleLowerCase() != 'category') continue;
        if (xml.getAttribute('custom') == null) continue;
        if (xml.getAttribute('custom').length <= 0) continue;

        Blockly.InstanceToolbox.modBlocks_cache[xml.getAttribute('custom')] = [];
        for (var k = 0, block; block = xml.childNodes[k]; k++) {
            if (block.tagName==null|| block.tagName.toLocaleLowerCase() != 'block') continue;
            var node = [];
            node.xml = block.cloneNode(true);
            node.subBlocks = [];
            var blk = Blockly.Blocks[block.getAttribute('type')];
            if (blk.provideBlocks) {
                for (var j = 0, sb; sb = blk.provideBlocks[j]; j++) {
                    var sbxml = subBlocks[sb];
                    node.subBlocks.push(sbxml.cloneNode(true));
                }
            }
            Blockly.InstanceToolbox.modBlocks_cache[xml.getAttribute('custom')].push(node);
        }
    }
    return Blockly.InstanceToolbox.modBlocks_cache;
}

Blockly.InstanceToolbox.flyoutCategoryModule = function (workspace, categoryName) {
    var result = [];
    var provideBlocks = [];

    if (workspace.isFlyout) workspace = workspace.targetWorkspace;
    var allblocks = workspace.getAllBlocks();
    for (var x = 0, block; block = allblocks[x]; x++) {
        if (block.rendered !== true) continue;
        if (block.provideBlocks) {
            provideBlocks = provideBlocks.concat(block.provideBlocks);
        }
    }

    var categorys = Blockly.InstanceToolbox.modBlocks_cache || Blockly.InstanceToolbox.createMod_cache();
    var modules = categorys[categoryName];
    for (var i = 0, mod; mod = modules[i]; i++) {
        result.push(mod.xml);
        for (var x = 0, block; block = mod.subBlocks[x]; x++) {
            if (provideBlocks.lastIndexOf(block.getAttribute('type')) >= 0) result.push(block);
        }
    }
    return result;
};


Blockly.InstanceToolbox.flyoutCategoryModuleDisplay = function (workspace) {
    return Blockly.InstanceToolbox.flyoutCategoryModule(workspace, "ModuleDisplay");
};

Blockly.InstanceToolbox.flyoutCategoryModuleInput = function (workspace) {
    return Blockly.InstanceToolbox.flyoutCategoryModule(workspace, "ModuleINPUT");
};
Blockly.InstanceToolbox.flyoutCategoryModuleOutput = function (workspace) {
    return Blockly.InstanceToolbox.flyoutCategoryModule(workspace, "ModuleOUTPUT");
};

Blockly.InstanceToolbox.flyoutCategoryModuleRobot = function (workspace) {
    return Blockly.InstanceToolbox.flyoutCategoryModule(workspace, "ModuleROBOT");
};