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

'use strict';

goog.provide('Blockly.Blocks.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');

Blockly.Blocks['arithmeticoperators'] = {
    init: function () {
        this.appendValueInput("NUM1")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.ARITHMETICOPERATORS_OPTION_PLUS, "+"],
                [Blockly.Msg.ARITHMETICOPERATORS_OPTION_MINUS, "-"],
                [Blockly.Msg.ARITHMETICOPERATORS_OPTION_MUL, "*"],
                [Blockly.Msg.ARITHMETICOPERATORS_OPTION_DIV, "/"],
                [Blockly.Msg.ARITHMETICOPERATORS_OPTION_MOD, "%"]])
                , "Operators");
        this.appendValueInput("NUM2")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = Blockly.Msg.ARITHMETICOPERATORS_TOOLTIP;
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            var urls = Blockly.Msg.ARITHMETICOPERATORS_HELPURL;
            return urls[op];
        });
    }
};

Blockly.Blocks['negativeoperators'] = {
    init: function () {
        this.appendValueInput("NUM2")
            .setCheck("Number")
            .appendField(Blockly.Msg.NEGATIVEOPERATORS_NUM2NEGATIVE);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.NEGATIVEOPERATORS_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.NEGATIVEOPERATORS_HELPURL);
    }
};



Blockly.Blocks['comparisonoperators'] = {
    init: function () {
        this.appendValueInput("NUM1")
            .setCheck(["Boolean", "Number"]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [[Blockly.Msg.COMPARISONOPERATORS_OPTION_EQ, "=="],
                [Blockly.Msg.COMPARISONOPERATORS_OPTION_NE, "!="],
                [Blockly.Msg.COMPARISONOPERATORS_OPTION_LT, "<"],
                [Blockly.Msg.COMPARISONOPERATORS_OPTION_GT, ">"],
                [Blockly.Msg.COMPARISONOPERATORS_OPTION_LE, "<="],
                [Blockly.Msg.COMPARISONOPERATORS_OPTION_GE, ">="]]),
                "Operators");
        this.appendValueInput("NUM2")
            .setCheck(["Boolean", "Number"]);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = Blockly.Msg.COMPARISONOPERATORS_TOOLTIP;
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            var urls = Blockly.Msg.COMPARISONOPERATORS_HELPURL;
            return urls[op];
        });
    }
};


Blockly.Blocks['booleanoperators'] = {
    init: function () {
        this.appendValueInput("NUM1")
            .setCheck(["Boolean", "Number"]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.BOOLEANOPERATORS_OPTION_AND, "&&"],
                [Blockly.Msg.BOOLEANOPERATORS_OPTION_OR, "||"]]),
                "Operators");
        this.appendValueInput("NUM2")
            .setCheck(["Boolean", "Number"]);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = Blockly.Msg.BOOLEANOPERATORS_TOOLTIP
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            var urls = Blockly.Msg.BOOLEANOPERATORS_HELPURL;
            return urls[op];
        });
    }
};



Blockly.Blocks['notoperators'] = {
    init: function () {
        this.appendValueInput("NUM2")
            .setCheck(["Boolean", "Number"])
            .appendField(Blockly.Msg.NOTOPERATORS_NUM2NOT);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.NOTOPERATORS_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.NOTOPERATORS_HELPURL);
    }
};
Blockly.Blocks['mathminmax'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MATHMINMAX_OPTION_MIN, "min"],
                [Blockly.Msg.MATHMINMAX_OPTION_MAX, "max"]]),
                "OPERATOR");
        this.appendValueInput("NUM1")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMINMAX_NUM1);
        this.appendValueInput("NUM2")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMINMAX_NUM2);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var TOOLTIPS = Blockly.Msg.MATHMINMAX_TOOLTIP;
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var urls = Blockly.Msg.MATHMINMAX_HELPURL;
            return urls[op];
        });
    }
};

Blockly.Blocks['mathoperators'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MATHOPERATORS_OPTION_ABS, "abs"], 
                [Blockly.Msg.MATHOPERATORS_OPTION_SQRT, "sqrt"], 
                [Blockly.Msg.MATHOPERATORS_OPTION_SIN, "sin"], 
                [Blockly.Msg.MATHOPERATORS_OPTION_COS, "cos"], 
                [Blockly.Msg.MATHOPERATORS_OPTION_TAN, "tan"]]), 
                "OPERATOR");
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHOPERATORS_NUMOF);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var TOOLTIPS = Blockly.Msg.MATHOPERATORS_TOOLTIP;
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var url = Blockly.Msg.MATHOPERATORS_HELPURL;
            return url[op];
        });
    }
};

Blockly.Blocks['mathconstrain'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHCONSTRAIN_XCONSTRAIN);
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHCONSTRAIN_ARANGE);
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHCONSTRAIN_BTO);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MATHCONSTRAIN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MATHCONSTRAIN_HELPURL);
    }
};

Blockly.Blocks['mathmap'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMAP_XMAP);
        this.appendValueInput("FL")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMAP_FLFROM);
        this.appendValueInput("FH")
            .setCheck(null)
            .appendField(Blockly.Msg.MATHMAP_FH);
        this.appendValueInput("TL")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMAP_TLTO);
        this.appendValueInput("TH")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHMAP_TH);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MATHMAP_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MATHMAP_HELPURL);
    }
};


Blockly.Blocks['mathrandom'] = {
    init: function () {
        this.appendValueInput("L")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHRANDOM_LRANDOM_FROM);
        this.appendValueInput("H")
            .setCheck("Number")
            .appendField(Blockly.Msg.MATHRANDOM_HTO);
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip(Blockly.Msg.MATHRANDOM_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MATHRANDOM_HELPURL);
    }
};

Blockly.Blocks['math_boolean_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MATH_BOOLEAN_MENU_OPTION_TRUE, "true"], 
                [Blockly.Msg.MATH_BOOLEAN_MENU_OPTION_FALSE, "false"]]),
                 "state");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip(Blockly.Msg.MATH_BOOLEAN_MENU_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.MATH_BOOLEAN_MENU_HELPURL);
    }
};

