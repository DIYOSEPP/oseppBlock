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
 * @fileoverview Variable input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldInstanceDropdown');

goog.require('Blockly.FieldInstanceInput');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.string');


/**
 * Class for a Instance's dropdown field.
 * @param {?string} varname The default name for the variable.  If null,
 *     a unique variable name will be generated.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldInstanceDropdown = function (instancetype, varname, opt_validator) {
    Blockly.FieldInstanceDropdown.superClass_.constructor.call(this,
        Blockly.FieldInstanceDropdown.dropdownCreate, opt_validator);
    if (varname) this.setValue(varname);
    this.addArgType(instancetype);
    this.instanceType = instancetype;
};
goog.inherits(Blockly.FieldInstanceDropdown, Blockly.FieldDropdown);

/**
 * Install this dropdown on a block.
 */
Blockly.FieldInstanceDropdown.prototype.init = function () {
    if (this.fieldGroup_) {
        // Dropdown has already been initialized once.
        return;
    }
    Blockly.FieldInstanceDropdown.superClass_.init.call(this);
    if (this.sourceBlock_.isInFlyout) {
        var instances = Blockly.FieldInstanceInput.getAllInstancesNameOfType(this.sourceBlock_.workspace, this.instanceType);
        var curName = this.getValue();
        if (instances.indexOf(curName) >= 0) return;
        if (instances.length > 0) {
            this.setValue(instances[0]);
        } else {
            this.setValue('UnDefine');
        }
    }
};





/**
 * Attach this field to a block.
 * @param {!Blockly.Block} block The block containing this field.
 */
Blockly.FieldInstanceDropdown.prototype.setSourceBlock = function (block) {
    goog.asserts.assert(!block.isShadow(),
        'Variable fields are not allowed to exist on shadow blocks.');
    Blockly.FieldInstanceDropdown.superClass_.setSourceBlock.call(this, block);
};

/**
 * Get the variable's name (use a variableDB to convert into a real name).
 * Unline a regular dropdown, variables are literal and have no neutral value.
 * @return {string} Current text.
 */
Blockly.FieldInstanceDropdown.prototype.getValue = function () {
    return this.getText();
};

/**
 * Set the variable name.
 * @param {string} newValue New text.
 */
Blockly.FieldInstanceDropdown.prototype.setValue = function (newValue) {
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.setText(newValue);
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {Blockly.FieldVariable}
 */
Blockly.FieldInstanceDropdown.dropdownCreate = function () {
    var SuggestionName = null;
    if (this.sourceBlock_ && this.sourceBlock_.workspace) {
        var variableList = Blockly.FieldInstanceInput.getAllInstancesNameOfType(this.sourceBlock_.workspace, this.instanceType);
        if (this.sourceBlock_.workspace.isFlyout) SuggestionName = variableList[0];
    } else {
        var variableList = [];
    }
    variableList.sort(goog.string.caseInsensitiveCompare);
    var name = this.getText();
    if (((!name) || (variableList.indexOf(name) == -1)) && (SuggestionName)) {
        this.setText(SuggestionName);
    }
    var options = [];
    for (var i = 0; i < variableList.length; i++) {
        options[i] = [variableList[i], variableList[i]];
    }
    if (options.length === 0) return [['UnDefined', 'UnDefined']];
    return options;
};

Blockly.FieldInstanceDropdown.prototype.renameInstance = function (oldName, newName) {
    if (this.getValue() === oldName) this.setValue(newName);
};

/**
 * Handle the selection of an item in the variable dropdown menu.
 * Special case the 'Rename variable...' and 'Delete variable...' options.
 * In the rename case, prompt the user for a new name.
 * @param {!goog.ui.Menu} menu The Menu component clicked.
 * @param {!goog.ui.MenuItem} menuItem The MenuItem selected within menu.
 */
Blockly.FieldInstanceDropdown.prototype.onItemSelected = function (menu, menuItem) {
    var itemText = menuItem.getValue();
    // Call any validation function, and allow it to override.
    itemText = this.callValidator(itemText);
    if (itemText !== null) {
        this.setValue(itemText);
    }
};
Blockly.FieldInstanceDropdown.fromJson = function (element) {
    var field = new Blockly.FieldTextDropdown(element['instancetype'], element['varname']);
    return field;
};
Blockly.Field.register('FieldInstanceDropdown', Blockly.FieldInstanceDropdown);