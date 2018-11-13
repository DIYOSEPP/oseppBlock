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
* @fileoverview Icon button field.
* This is primarily for use in oseppBlock
* the icon (image field) in the original block.
* @author zhsvector@hotmail.com (way)
*/

'use strict';

goog.provide('Blockly.FieldIconButton');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('Blockly.Field');


/**
 * Class for an image on a block.
 * @param {string} src The URL of the image.
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @param {boolean} flip_rtl Whether to flip the icon in RTL
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldIconButton = function (feedback, src, width, height, opt_alt, flip_rtl) {
    //Blockly.FieldIconButton.superClass_.constructor.call(this, src);
    // Ensure height and width are numbers.  Strings are bad at math.
    this.height_ = Number(height);
    this.width_ = Number(width);
    this.size_ = new goog.math.Size(this.width_, this.height_);
    this.text_ = opt_alt || '';
    this.flipRTL_ = flip_rtl;
    this.feedback_ = feedback;
    this.src_ = src;
    this.addArgType('iconbutton');
};


goog.inherits(Blockly.FieldIconButton, Blockly.Field);

/**
 * Install this image on a block.
 */
Blockly.FieldIconButton.prototype.init = function () {
    if (this.fieldGroup_) {
        // Image has already been initialized once.
        return;
    }
    this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
    if (!this.visible_) {
        this.fieldGroup_.style.display = 'none';
    }
    /** @type {SVGElement} */
    this.imageElement_ = Blockly.utils.createSvgElement(
        'image',
        {
            'height': this.height_ + 'px',
            'width': this.width_ + 'px'
        },
        this.fieldGroup_);
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', this.src_ || '');
    this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    this.render_();
    this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(
        this.getClickTarget_(), 'mousedown', this, this.onMouseDown_);
    this.imageElement_.style.cursor = 'pointer';
    // Configure the field to be transparent with respect to tooltips.
    //this.setTooltip(this.sourceBlock_);
    //Blockly.Tooltip.bindMouseEvents(this.imageElement_);
};
/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldImage.prototype.setTooltip = function (newTip) {
    this.imageElement_.tooltip = newTip;
};

/**
 * Construct a FieldIconButton from a JSON arg object.
 * @param {!Object} element A JSON object with options.
 * @returns {!Blockly.FieldIconButton} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldIconButton.fromJson = function (element) {
    var src = Blockly.utils.replaceMessageReferences(options['src']);
    var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
    var height =
        Number(Blockly.utils.replaceMessageReferences(options['height']));
    var alt = Blockly.utils.replaceMessageReferences(options['alt']);
    var flip_rtl = !!options['flip_rtl'] || !!options['flipRtl'];
    return new Blockly.FieldIconButton(src, width, height, alt, flip_rtl);
};

/**
 * @private
 */
Blockly.FieldIconButton.prototype.showEditor_ = function () {
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.BlockChange(
            this.sourceBlock_, 'field', this.name, this.feedback_));
    }
};

Blockly.Field.register('field_iconbutton', Blockly.FieldIconButton);
