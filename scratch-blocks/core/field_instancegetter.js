/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
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
 * @fileoverview Variable getter field.  Appears as a label but has a variable
 *     picker in the right-click menu.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.FieldInstanceGetter');

goog.require('Blockly.Field');


/**
 * Class for a variable getter field.
 * @param {string} text The initial content of the field.
 * @param {string} name Optional CSS class for the field's text.
 * @extends {Blockly.FieldLabel}
 * @constructor
 *
 */
Blockly.FieldInstanceGetter = function (text, name) {
    Blockly.FieldInstanceGetter.superClass_.constructor.call(this, text);
    this.name_ = name;
};
goog.inherits(Blockly.FieldInstanceGetter, Blockly.Field);

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldInstanceGetter.prototype.EDITABLE = true;

/**
 * Install this field on a block.
 */
Blockly.FieldInstanceGetter.prototype.init = function () {
    if (this.fieldGroup_) {
        // Field has already been initialized once.
        return;
    }
    Blockly.FieldInstanceGetter.superClass_.init.call(this);
};

/**
 * This field is editable, but only through the right-click menu.
 * @private
 */
Blockly.FieldInstanceGetter.prototype.showEditor_ = function () {
    // nop.
};

Blockly.FieldInstanceGetter.prototype.renameInstance = function (oldName, newName) {
    if (this.getValue() === oldName) this.setValue(newName);
};

/**
 * Add or remove the UI indicating if this field is editable or not.
 * This field is editable, but only through the right-click menu.
 * Suppress default editable behaviour.
 */
Blockly.FieldInstanceGetter.prototype.updateEditable = function () {
    // nop.
};
Blockly.FieldInstanceGetter.fromJson = function (options) {
    var varname = Blockly.utils.replaceMessageReferences(options['text']);
    return new Blockly.FieldInstanceGetter(varname, options['name'],
        options['class'], options['variableType']);
};

Blockly.Field.register('FieldInstanceGetter', Blockly.FieldInstanceGetter);