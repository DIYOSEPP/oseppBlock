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

/**
 * @fileoverview Field for numbers. Includes validator and numpad on touch.
 * @author tmickel@mit.edu (Tim Mickel)
 */



'use strict';

goog.provide('Blockly.FieldInstanceInput');

goog.require('Blockly.FieldTextInput');
goog.require('Blockly.Toolbox');
goog.require('Blockly.Workspace');

Blockly.instances_cache = Blockly.instances_cache || null;
Blockly.instances_cache_ws = Blockly.instances_cache_ws || null;

Blockly.FieldInstanceInput = function (instanceType, instanceName, instancePrefix, opt_validator) {
    var instanceNameRestrictor = /[\a-z0-9_]/i;
    if (instancePrefix) {
        instancePrefix = instancePrefix.replace(/(^[^a-z]*[^_+a-z])|([^a-z0-9_])/ig, '_');
    }
    if (!opt_validator) {
        var opt_validator = function (text) {
            return text.replace(/(^[^a-z]*[^_+a-z])|([^a-z0-9_])/ig, '_');
        };
    }
    this.instanceType = instanceType;
    this.instancePrefix = instancePrefix;
    Blockly.FieldNumber.superClass_.constructor.call(
        this, instanceName, opt_validator, instanceNameRestrictor);
    this.addArgType('Variable');
    this.refWorkspace = null;
};
goog.inherits(Blockly.FieldInstanceInput, Blockly.FieldTextInput);

Blockly.FieldInstanceInput.prototype.init = function () {
    Blockly.FieldInstanceInput.superClass_.init.call(this);
    if (!this.getValue()) {
        this.setValue(null);
    } else {
        if (this.sourceBlock_ === null) return;
        if (this.sourceBlock_.workspace === null) return;
        var workspace = this.sourceBlock_.workspace;
        if (workspace.isFlyout) workspace = workspace.targetWorkspace;
        var oldName = this.getValue();
        this.value_ = null;
        if (Blockly.FieldInstanceInput.getAllInstancesName(workspace).indexOf(oldName) >= 0) {
            this.setValue(null);
        } else {
            this.value_ = oldName;
            Blockly.instances_cache = null;
        }
    }
};


Blockly.FieldInstanceInput.prototype.widgetDispose_ = function () {
    var thisField = this;
    return function () {
        var f = Blockly.FieldInstanceInput.superClass_.widgetDispose_.call(thisField);
        f.call();
        thisField.setValue(thisField.getText());
    };
};


Blockly.FieldInstanceInput.prototype.getValue = function () {
    return this.value_;
};
Blockly.FieldInstanceInput.prototype.setValue = function (newValue) {
    if (!this.sourceBlock_) return;
    if (!newValue) {
        var namedb = [];
        if (this.sourceBlock_) namedb = Blockly.FieldInstanceInput.getAllInstancesName(this.sourceBlock_.workspace);
        newValue = Blockly.FieldInstanceInput.generateUniqueName(namedb, this.instancePrefix);
    }
    var oldValue = this.getValue();
    if (newValue === oldValue) {
        return;
    }
    this.doRenameInstance(oldValue, newValue);

    if (this.getValue() != oldValue) {
        if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
            Blockly.Events.fire(new Blockly.Events.Change(
                this.sourceBlock_, 'field', this.name, oldValue, newValue));
        }
    }
};

Blockly.FieldInstanceInput.refWorkspaceToolbox = function (workspace) {
    if (!workspace) return;
    if (!workspace.toolbox_) return;
    if (!workspace.toolbox_.selectedItem_) return;
    var refid = Blockly.FieldInstanceInput.refwt_ID || 0;
    refid += 1;
    Blockly.FieldInstanceInput.refwt_ID = refid;
    function refFlyout() {
        if (Blockly.FieldInstanceInput.refwt_ID !== refid) return;
        if (workspace.isDragging()) {
            refToolbox_timmer = setTimeout(refFlyout, 50);
        } else {
            workspace.toolbox_.refreshSelection();
        }

    }
    setTimeout(refFlyout, 50);
};

Blockly.FieldInstanceInput.prototype.dispose = function () {
    Blockly.FieldInstanceInput.superClass_.dispose.call(this);
    if (!this.refWorkspace) return;
    var workspace = this.refWorkspace;
    if (workspace.isFlyout) return;
    Blockly.instances_cache = null;
    Blockly.FieldInstanceInput.refWorkspaceToolbox(workspace);
};


Blockly.FieldInstanceInput.prototype.getInstanceDefined = function () {
    if (this.sourceBlock_ === null) return null;
    if (this.sourceBlock_.isInFlyout) return null;
    name = this.getValue();
    if (!name) return null;
    return [this.instanceType.toLocaleLowerCase(), name];
};

Blockly.FieldInstanceInput.getAllInstanceDefined = function (workspace) {
    if (workspace == null) return [];
    if (workspace.isFlyout) workspace = workspace.targetWorkspace;
    if ((workspace === Blockly.instances_cache_ws) && (Blockly.instances_cache != null)) return Blockly.instances_cache;
    Blockly.instances_cache = [];
    Blockly.instances_cache_ws = workspace;
    var topBlocks = workspace.getAllBlocks(false);
    for (var x = 0, tb; tb = topBlocks[x]; x++) {
        if (tb.rendered !== true) continue;
        for (var i = 0, input; input = tb.inputList[i]; i++) {
            for (var j = 0, field; field = input.fieldRow[j]; j++) {
                if (field instanceof Blockly.FieldInstanceInput) {
                    var ins_def = field.getInstanceDefined();
                    if (ins_def != null) Blockly.instances_cache.push(ins_def);
                }
            }
        }
    }
    return Blockly.instances_cache;
};
Blockly.FieldInstanceInput.getAllInstancesName = function (workspace) {
    var instances = Blockly.FieldInstanceInput.getAllInstanceDefined(workspace);
    var names = [];
    for (var x = 0, instence; instence = instances[x]; x++) {
        names.push(instence[1]);
    }
    return names;
};

Blockly.FieldInstanceInput.getAllInstancesNameOfType = function (workspace, type) {
    var instances = Blockly.FieldInstanceInput.getAllInstanceDefined(workspace);
    if (type) type = type.toLocaleLowerCase();
    var names = [];
    for (var x = 0, instance; instance = instances[x]; x++) {
        if (instance[0] === type) names.push(instance[1]);
    }
    return names;
};

Blockly.FieldInstanceInput.renameBlockInstance = function (block, oldName, newName) {
    for (var i = 0, input; input = block.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
            if (field.renameInstance) field.renameInstance(oldName, newName);
        }
    }
};

var refToolbox_timmer = null;


Blockly.FieldInstanceInput.prototype.doRenameInstance = function (oldName, newName) {
    if (this.sourceBlock_ === null) return;
    if (this.sourceBlock_.workspace === null) return;
    if (this.sourceBlock_.workspace.isFlyout) {
        this.setText(newName);
        this.value_ = newName;
        return;
    }
    var workspace = this.sourceBlock_.workspace;
    Blockly.Events.setGroup(true);

    var allName = Blockly.FieldInstanceInput.getAllInstancesName(workspace);

    if (allName.indexOf(newName) >= 0) {
        if (oldName) {
            function showAlert() {
                Blockly.alert('"' + newName + '" already exist !');
            }
            this.setText(oldName);
            setTimeout(showAlert, 0);
            return;
        }
    }

    this.refWorkspace = workspace;

    var blocks = workspace.getAllBlocks(false);
    for (var x = 0, block; block = blocks[x]; x++) {
        Blockly.FieldInstanceInput.renameBlockInstance(block, oldName, newName);
    }
    this.value_ = newName;
    this.setText(newName);
    Blockly.Events.setGroup(false);
    Blockly.instances_cache = null;
    Blockly.FieldInstanceInput.refWorkspaceToolbox(workspace);
};


Blockly.FieldInstanceInput.generateUniqueName = function (instanceList, prefix) {
    instanceList = instanceList || [];
    var newName = '';
    var nameSuffix = 1;
    if (prefix && prefix.length > 0) {
        do {
            newName = prefix + nameSuffix;
            nameSuffix++;
        } while (instanceList.indexOf(newName) >= 0);
    } else if (instanceList.length) {
        var letters = 'ijkmnopqrstuvwxyzabcdefgh';
        var letterIndex = 0;
        var potName = letters.charAt(letterIndex);
        while (!newName) {
            var inUse = false;
            for (var i = 0; i < instanceList.length; i++) {
                if (instanceList[i] == potName) {
                    inUse = true;
                    break;
                }
            }
            if (inUse) {
                letterIndex++;
                if (letterIndex == letters.length) {
                    letterIndex = 0;
                    nameSuffix++;
                }
                potName = letters.charAt(letterIndex);
                if (nameSuffix > 1) {
                    potName += nameSuffix;
                }
            } else {
                newName = potName;
            }
        }
    } else {
        newName = 'i';
    }
    return newName;
};

Blockly.FieldInstanceInput.fromJson = function (options) {
    return new Blockly.FieldInstanceInput(options['instanceType'], options['instanceName'], options['instancePrefix']);
};

Blockly.Field.register('FieldInstanceInput', Blockly.FieldInstanceInput);
