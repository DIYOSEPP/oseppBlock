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
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["%", "%"]]), "Operators");
        this.appendValueInput("NUM2")
            .setCheck("Number")
            .appendField(" ");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = {
                '+': 'These operators return the sum of the two operands',
                '-': 'These operators return the difference of the two operands',
                '*': 'These operators return the product of the two operands',
                '/': 'These operators return the quotient (respectively) of the two operands',
                '%': 'Calculates the remainder when one integer is divided by another.'
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            if (op == '%') return 'https://www.arduino.cc/en/Reference/Modulo';
            return 'https://www.arduino.cc/en/Reference/Arithmetic'
        });
    }
};

Blockly.Blocks['comparisonoperators'] = {
    init: function () {
        this.appendValueInput("NUM1")
            .setCheck(["Boolean", "Number"]);
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([["==", "=="], ["!=", "!="], ["<", "<"], [">", ">"], ["<=", "<="], [">=", ">="]]), "Operators");
        this.appendValueInput("NUM2")
            .setCheck(["Boolean", "Number"])
            .appendField(" ");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = {
                '==': 'x == y (x is equal to y)?',
                '!=': 'x != y (x is not equal to y)?',
                '<': 'x <  y (x is less than y)?',
                '>': 'x >  y (x is greater than y)?',
                '<=': 'x <= y (x is less than or equal to y)?',
                '>=': 'x >= y (x is greater than or equal to y)?'
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            if (op == '%') return 'https://www.arduino.cc/en/Reference/Modulo';
            return 'https://www.arduino.cc/en/Reference/Arithmetic'
        });
    }
};


Blockly.Blocks['booleanoperators'] = {
    init: function () {
        this.appendValueInput("NUM1")
            .setCheck("Boolean");
        this.appendDummyInput()
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([["AND", "&&"], ["OR", "||"]]), "Operators");
        this.appendValueInput("NUM2")
            .setCheck("Boolean")
            .appendField(" ");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = {
                '&&': 'True only if both operands are true',
                '||': 'True if either operand is true',
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Boolean');
    }
};



Blockly.Blocks['notoperators'] = {
    init: function () {
        this.appendValueInput("NUM2")
            .setCheck("Boolean")
            .appendField("NOT");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('True if the operand is false');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Boolean');
    }
};
Blockly.Blocks['mathminmax'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["min", "min"], ["max", "max"]]), "OPERATOR");
        this.appendValueInput("NUM1")
            .setCheck("Number")
            .appendField("of");
        this.appendValueInput("NUM2")
            .setCheck("Number")
            .appendField("or");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('Operators');
            var TOOLTIPS = {
                'min': 'Calculates the minimum of two numbers',
                'max': 'Calculates the maximum of two numbers',
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('Operators');
            if (op == 'min') return 'https://www.arduino.cc/en/Reference/Min';
            return 'https://www.arduino.cc/en/Reference/Max'
        });
    }
};

Blockly.Blocks['mathoperators'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["abs", "abs"], ["sqrt", "sqrt"], ["sin", "sin"], ["cos", "cos"], ["tan", "tan"]]), "OPERATOR");
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("of");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);

        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var TOOLTIPS = {
                'abs': 'Computes the absolute value of a number',
                'sqrt': 'Calculates the square root of a number',
                'sin': 'Calculates the sine of an angle (in radians). The result will be between -1 and 1.',
                'cos': 'Calculates the cos of an angle (in radians). The result will be between -1 and 1.',
                'tan': 'Calculates the tangent of an angle (in radians). The result will be between negative infinity and infinity.'
            };
            return TOOLTIPS[op];
        });
        this.setHelpUrl(function () {
            var op = thisBlock.getFieldValue('OPERATOR');
            var url = {
                'abs': 'https://www.arduino.cc/en/Reference/Abs',
                'sqrt': 'https://www.arduino.cc/en/Reference/Sqrt',
                'sin': 'https://www.arduino.cc/en/Reference/Sin',
                'cos': 'https://www.arduino.cc/en/Reference/Cos',
                'tan': 'https://www.arduino.cc/en/Reference/Tan'
            };
            return url[op];
        });
    }
};

Blockly.Blocks['mathconstrain'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("constrain");
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("range");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("to");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Constrains a number to be within a range');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Constrain');
    }
};

Blockly.Blocks['mathmap'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("map");
        this.appendValueInput("FL")
            .setCheck("Number")
            .appendField("from");
        this.appendValueInput("FH")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("TL")
            .setCheck("Number")
            .appendField("to");
        this.appendValueInput("TH")
            .setCheck("Number")
            .appendField(",");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('Re-maps a number from one range to another');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Map');
    }
};


Blockly.Blocks['mathrandom'] = {
    init: function () {
        this.appendValueInput("L")
            .setCheck("Number")
            .appendField("random from");
        this.appendValueInput("H")
            .setCheck("Number")
            .appendField("to");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Colours.cMathOperation.primary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
        this.setTooltip('generates pseudo-random numbers');
        this.setHelpUrl('https://www.arduino.cc/en/Reference/Random');
    }
};

Blockly.Blocks['math_boolean_menu'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["True", "true"], ["False", "false"]]), "state");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.secondary, Blockly.Colours.cMathOperation.tertiary);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

