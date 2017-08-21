'use strict';

goog.require('Blockly.Arduino');


function addCommandTextToSetup(block, field) {
    var fieldValue = block.getFieldValue(field)
    var commandText = block.getCommentText();
    if (!commandText) {
        commandText = '//' + fieldValue;
    } else {
        commandText = Blockly.Arduino.prefixLines(commandText, '// ');
    }
    Blockly.Arduino.addSetup(fieldValue + '_command', commandText, false);
}
function onePinInstanceDefine(block, pinState) {
    var text_name = block.getFieldValue('NAME');
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_ATOMIC);
    if (!Blockly.Arduino.isUnoPin(value_pin)) return;
    addCommandTextToSetup(block, 'NAME');
    Blockly.Arduino.addSetup(text_name + '_Pin', 'pinMode(' + value_pin + ',' + pinState + ');', true);
    Blockly.Arduino.reservePin(block, value_pin, pinState, text_name);
}

Blockly.Arduino['instance_rgb'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC);
    var value_g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_ATOMIC);
    var value_b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC);

    if (Blockly.Arduino.isPWMPin(value_r) ||
        Blockly.Arduino.isPWMPin(value_g) ||
        Blockly.Arduino.isPWMPin(value_b)
    ) addCommandTextToSetup(block, 'NAME');

    if (Blockly.Arduino.isPWMPin(value_r)) {
        Blockly.Arduino.addSetup(dropdown_name + '_RPin', 'pinMode(' + value_r + ',OUTPUT);', true);
        Blockly.Arduino.reservePin(block, value_r, 'PWM', dropdown_name + '-R');
    }
    if (Blockly.Arduino.isPWMPin(value_g)) {
        Blockly.Arduino.addSetup(dropdown_name + '_GPin', 'pinMode(' + value_g + ',OUTPUT);', true);
        Blockly.Arduino.reservePin(block, value_g, 'PWM', dropdown_name + '-G');
    }
    if (Blockly.Arduino.isPWMPin(value_b)) {
        Blockly.Arduino.addSetup(dropdown_name + '_BPin', 'pinMode(' + value_b + ',OUTPUT);', true);
        Blockly.Arduino.reservePin(block, value_b, 'PWM', dropdown_name + '-B');
    }
    return '';
};

Blockly.Arduino['module_set_rgb'] = function (block) {
    var dropdown_rgb = block.getFieldValue('rgb');

    var rgb = requireInstance(block, dropdown_rgb);
    if (!rgb) return '\n';
    var pin_r = Blockly.Arduino.valueToCode(rgb, 'R', Blockly.Arduino.ORDER_ATOMIC);
    var pin_g = Blockly.Arduino.valueToCode(rgb, 'G', Blockly.Arduino.ORDER_ATOMIC);
    var pin_b = Blockly.Arduino.valueToCode(rgb, 'B', Blockly.Arduino.ORDER_ATOMIC);


    var r = 0, g = 0, b = 0;
    var target = block.getInputTargetBlock('colour');
    if (target.type == "rgbtocolor") {
        r = Blockly.Arduino.valueToCode(target, 'r', Blockly.Arduino.ORDER_NONE) || '0';
        g = Blockly.Arduino.valueToCode(target, 'g', Blockly.Arduino.ORDER_NONE) || '0';
        b = Blockly.Arduino.valueToCode(target, 'b', Blockly.Arduino.ORDER_NONE) || '0';
    } else {
        var value_colour = Blockly.Arduino.valueToCode(block, 'colour', Blockly.Arduino.ORDER_ATOMIC);
        if (value_colour) {
            try {
                if (value_colour instanceof Array) {
                    r = value_colour[0];
                    g = value_colour[1];
                    b = value_colour[2];
                } else if (value_colour.match(/^#[0-9a-fA-F]{6}$/)) {
                    r = parseInt(value_colour.substr(1, 2), 16);
                    g = parseInt(value_colour.substr(3, 2), 16);
                    b = parseInt(value_colour.substr(5, 2), 16);
                } else {
                    var c = value_colour.split(',', 3);
                    if (c.length) r = c[0];
                    if (c.length > 1) g = c[1];
                    if (c.length > 2) b = c[2];
                }
            } catch (e) {
            }
        }
    }


    var code = '';
    if (Blockly.Arduino.isPWMPin(pin_r))
        code += 'analogWrite(' + pin_r + ',' + r + ');\n';
    if (Blockly.Arduino.isPWMPin(pin_g))
        code += 'analogWrite(' + pin_g + ',' + g + ');\n';
    if (Blockly.Arduino.isPWMPin(pin_b))
        code += 'analogWrite(' + pin_b + ',' + b + ');\n';
    return code;
};

Blockly.Arduino['rgbtocolor'] = function (block) {
    var value_r = Blockly.Arduino.valueToCode(block, 'r', Blockly.Arduino.ORDER_ATOMIC);
    var value_g = Blockly.Arduino.valueToCode(block, 'g', Blockly.Arduino.ORDER_ATOMIC);
    var value_b = Blockly.Arduino.valueToCode(block, 'b', Blockly.Arduino.ORDER_ATOMIC);
    var code = [];
    code.push(value_r);
    code.push(value_g);
    code.push(value_b);
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_led'] = function (block) {
    onePinInstanceDefine(block, 'OUTPUT');
    return '';
};

Blockly.Arduino['module_set_led'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_state = Blockly.Arduino.valueToCode(block, 'state', Blockly.Arduino.ORDER_NONE);

    var valueNumber = false;

    var targetConnection = block.getInput('state').connection.targetConnection;
    if (targetConnection) {
        if (targetConnection.check_.indexOf('Number') >= 0) {
            valueNumber = true;
        }
    }
    var led = requireInstance(block, dropdown_name);
    if (!led) return '\n';
    var pin = Blockly.Arduino.valueToCode(led, 'Pin', Blockly.Arduino.ORDER_NONE);
    //if (!Blockly.Arduino.isDigitalPin(pin)) return '\n';---Users should see the errors
    if (valueNumber && Blockly.Arduino.isPWMPin(pin)) {
        var code = 'analogWrite(' + pin + ',' + value_state + ');\n';
    } else {
        var code = 'digitalWrite(' + pin + ',' + value_state + ');\n';
    }
    return code;
};

Blockly.Arduino['instance_button'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_read_button'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'digitalRead(' + pin + ')==LOW';
    return [code, Blockly.Arduino.ORDER_EQUALITY];
};

Blockly.Arduino['instance_lcd1602'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var value_rs = Blockly.Arduino.valueToCode(block, 'RS', Blockly.Arduino.ORDER_NONE);
    var value_en = Blockly.Arduino.valueToCode(block, 'EN', Blockly.Arduino.ORDER_NONE);
    var value_d4 = Blockly.Arduino.valueToCode(block, 'D4', Blockly.Arduino.ORDER_NONE);
    var value_d5 = Blockly.Arduino.valueToCode(block, 'D5', Blockly.Arduino.ORDER_NONE);
    var value_d6 = Blockly.Arduino.valueToCode(block, 'D6', Blockly.Arduino.ORDER_NONE);
    var value_d7 = Blockly.Arduino.valueToCode(block, 'D7', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    if ((Blockly.Arduino.isDigitalPin(value_rs) &&
        Blockly.Arduino.isDigitalPin(value_en) &&
        Blockly.Arduino.isDigitalPin(value_d4) &&
        Blockly.Arduino.isDigitalPin(value_d5) &&
        Blockly.Arduino.isDigitalPin(value_d6) &&
        Blockly.Arduino.isDigitalPin(value_d7)
    ) != true) return '';

    Blockly.Arduino.addInclude('LiquidCrystal', '#include <LiquidCrystal.h>');
    Blockly.Arduino.addDeclaration(text_name, 'LiquidCrystal ' + text_name + '(' +
        value_rs + ',' +
        value_en + ',' +
        value_d4 + ',' +
        value_d5 + ',' +
        value_d6 + ',' +
        value_d7 + ');');
    Blockly.Arduino.addSetup(text_name, text_name + '.begin(16,2);', true);
    Blockly.Arduino.reservePin(block, value_rs, 'OUTPUT', text_name + '-RS');
    Blockly.Arduino.reservePin(block, value_en, 'OUTPUT', text_name + '-EN');
    Blockly.Arduino.reservePin(block, value_d4, 'OUTPUT', text_name + '-D4');
    Blockly.Arduino.reservePin(block, value_d5, 'OUTPUT', text_name + '-D5');
    Blockly.Arduino.reservePin(block, value_d6, 'OUTPUT', text_name + '-D6');
    Blockly.Arduino.reservePin(block, value_d7, 'OUTPUT', text_name + '-D7');
    return '';
};

Blockly.Arduino['module_lcd_print'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    if (!requireInstance(block, dropdown_name)) return '\n';
    var value_value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    var code = dropdown_name + '.print(' + value_value + ');\n';
    return code;
};

Blockly.Arduino['module_lcd_clear'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble Arduino into code variable.
    if (!requireInstance(block, dropdown_name)) return '\n';
    var code = dropdown_name + '.clear();\n';
    return code;
};

Blockly.Arduino['module_lcd_goto'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    if (!requireInstance(block, dropdown_name)) return '\n';
    var value_column = Blockly.Arduino.valueToCode(block, 'column', Blockly.Arduino.ORDER_NONE) || 0;
    var value_line = Blockly.Arduino.valueToCode(block, 'line', Blockly.Arduino.ORDER_NONE) || 0;
    // TODO: Assemble Arduino into code variable.

    var code = dropdown_name + '.setCursor(' + value_column + ',' + value_line + ');\n';
    return code;
};

Blockly.Arduino['instance_buzzer'] = function (block) {
    onePinInstanceDefine(block, 'OUTPUT');
    return '';
};

Blockly.Arduino['module_set_buzzer'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_state = Blockly.Arduino.valueToCode(block, 'state', Blockly.Arduino.ORDER_NONE);

    var buzzer = requireInstance(block, dropdown_name);
    if (!buzzer) return '\n';
    var pin = Blockly.Arduino.valueToCode(buzzer, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'digitalWrite(' + pin + ',' + value_state + ');\n';

    return code;
};

Blockly.Arduino['instance_speaker'] = function (block) {
    onePinInstanceDefine(block, 'OUTPUT');
    return '';
};

Blockly.Arduino['module_buzzer_playtone'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_frequency = Blockly.Arduino.valueToCode(block, 'frequency', Blockly.Arduino.ORDER_NONE);

    var speaker = requireInstance(block, dropdown_name);
    if (!speaker) return '\n';
    var pin = Blockly.Arduino.valueToCode(speaker, 'Pin', Blockly.Arduino.ORDER_NONE);

    var code = 'tone(' + pin + ',' + value_frequency + ');\n';
    return code;
};

Blockly.Arduino['module_buzzer_notone'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');

    var speaker = requireInstance(block, dropdown_name);
    if (!speaker) return '\n';
    var pin = Blockly.Arduino.valueToCode(speaker, 'Pin', Blockly.Arduino.ORDER_NONE);

    var code = 'noTone(' + pin + ');\n';
    return code;
};

Blockly.Arduino['instance_fanmotor'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var value_ina = Blockly.Arduino.valueToCode(block, 'INA', Blockly.Arduino.ORDER_ATOMIC);
    var value_inb = Blockly.Arduino.valueToCode(block, 'INB', Blockly.Arduino.ORDER_ATOMIC);
    // TODO: Assemble Arduino into code variable.

    if (Blockly.Arduino.isDigitalPin(value_ina) || Blockly.Arduino.isDigitalPin(value_inb)) {
        addCommandTextToSetup(block, 'NAME');
    }
    if (Blockly.Arduino.isDigitalPin(value_ina)) {
        Blockly.Arduino.addSetup(text_name + '_INA', 'pinMode(' + value_ina + ',OUTPUT);', true);
        Blockly.Arduino.reservePin(block, value_ina, 'PWM', text_name + '-INA');
    }
    if (Blockly.Arduino.isDigitalPin(value_inb)) {
        Blockly.Arduino.addSetup(text_name + '_INB', 'pinMode(' + value_inb + ',OUTPUT);', true);
        Blockly.Arduino.reservePin(block, value_inb, 'PWM', text_name + '-INB');
    }

    return '';
};

Blockly.Arduino['module_set_fanmotor'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var dropdown_dir = block.getFieldValue('dir');
    var value_pwm = Blockly.Arduino.valueToCode(block, 'pwm', Blockly.Arduino.ORDER_ATOMIC) || 0;

    var fan = requireInstance(block, dropdown_name);
    if (!fan) return '\n';
    var pin_ina = Blockly.Arduino.valueToCode(fan, 'INA', Blockly.Arduino.ORDER_NONE);
    var pin_inb = Blockly.Arduino.valueToCode(fan, 'INB', Blockly.Arduino.ORDER_NONE);

    var code = 'analogWrite(' + pin_ina + ',' + (dropdown_dir == 'f' ? value_pwm : 0) + ');\n';
    code += 'analogWrite(' + pin_inb + ',' + (dropdown_dir == 'b' ? value_pwm : 0) + ');\n';
    return code;
};

Blockly.Arduino['instance_servo'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var value_pin = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.
    // TODO: Assemble Arduino into code variable.
    Blockly.Arduino.addInclude('Servo', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration(text_name, 'Servo ' + text_name + ';');
    Blockly.Arduino.addSetup(text_name, text_name + '.attach(' + value_pin + ');', true);
    Blockly.Arduino.reservePin(block, value_pin, 'PWM', text_name);
    return '';
};

Blockly.Arduino['angle_picker'] = function (block) {
    var angle_angle = block.getFieldValue('ANGLE');

    var code = angle_angle;

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['module_servo_write'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_angle = Blockly.Arduino.valueToCode(block, 'angle', Blockly.Arduino.ORDER_NONE) || 0;

    var servo = requireInstance(block, dropdown_name);
    if (!servo) return '\n';

    var code = dropdown_name + '.write(' + value_angle + ');\n';
    return code;
};

Blockly.Arduino['instance_stepper'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var dropdown_pinnumber = block.getFieldValue('pinNumber');
    var value_pin1 = Blockly.Arduino.valueToCode(block, 'Pin1', Blockly.Arduino.ORDER_NONE);
    var value_pin2 = Blockly.Arduino.valueToCode(block, 'Pin2', Blockly.Arduino.ORDER_NONE);
    var value_pin3 = Blockly.Arduino.valueToCode(block, 'Pin3', Blockly.Arduino.ORDER_NONE);
    var value_pin4 = Blockly.Arduino.valueToCode(block, 'Pin4', Blockly.Arduino.ORDER_NONE);
    var number_spv = block.getFieldValue('spv');
    var number_rpm = block.getFieldValue('rpm');

    Blockly.Arduino.addInclude('Stepper', '#include <Stepper.h>');
    Blockly.Arduino.reservePin(block, value_pin1, 'OUTPUT', text_name + '-Pin1');
    Blockly.Arduino.reservePin(block, value_pin2, 'OUTPUT', text_name + '-Pin2');

    if (dropdown_pinnumber == 'F') {
        var declText = 'Stepper ' + text_name + '(' +
            number_spv + ',' +
            value_pin1 + ',' + value_pin3 + ',' +
            value_pin2 + ',' + value_pin4 + ');';
        Blockly.Arduino.reservePin(block, value_pin3, 'OUTPUT', text_name + '-Pin3');
        Blockly.Arduino.reservePin(block, value_pin4, 'OUTPUT', text_name + '-Pin4');
    } else {
        var declText = 'Stepper ' + text_name + '(' +
            number_spv + ',' +
            value_pin1 + ',' +
            value_pin2 + ');';
    }

    Blockly.Arduino.addDeclaration(text_name, declText);

    Blockly.Arduino.addSetup(text_name, text_name + '.setSpeed(' + number_rpm + ');', true);

    return '';
};

Blockly.Arduino['module_stepper_move'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    if (!requireInstance(block, dropdown_name)) return '\n';
    var value_step = Blockly.Arduino.valueToCode(block, 'step', Blockly.Arduino.ORDER_NONE) || 0;

    var code = dropdown_name + '.step(' + value_step + ');\n';
    return code;
};

Blockly.Arduino['module_stepper_speed'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    if (!requireInstance(block, dropdown_name)) return '\n';
    var value_speed = Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_NONE) || 0;

    var code = dropdown_name + '.setSpeed(' + value_speed + ');\n';
    return code;
};

Blockly.Arduino['instance_pir'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_pir_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_potentiometer'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_potentiometer_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_slider'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_slider_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_lightsensor'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_lightsensor_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_lm35'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_lm35_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')*0.48828125';
    return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

Blockly.Arduino['instance_soundsensor'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_soundsensor_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_ultrasonic'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var value_trigpin = Blockly.Arduino.valueToCode(block, 'trigPin', Blockly.Arduino.ORDER_ATOMIC);
    var value_echopin = Blockly.Arduino.valueToCode(block, 'echoPin', Blockly.Arduino.ORDER_ATOMIC);

    var funcode = [];
    funcode.push('pinMode(trig,OUTPUT);');
    funcode.push('pinMode(echo,INPUT);');
    funcode.push('digitalWrite(trig,LOW);');
    funcode.push('delayMicroseconds(2);');
    funcode.push('digitalWrite(trig, HIGH);');
    funcode.push('delayMicroseconds(10);');
    funcode.push('delayMicroseconds(2);');
    funcode.push('float dist= pulseIn(echo, HIGH) / 5.8;');
    funcode.push('if (dist == 0)dist = 4000;');
    funcode.push('return dist;');
    Blockly.Arduino.addFunction('ULTRASONIC',
        'float get_distance_mm_of_ultrasonic(int trig,int echo){\n' +
        Blockly.Arduino.prefixLines((funcode.join('\n')), Blockly.Arduino.INDENT) +
        '\n}\n'
    );

    return '';
};

Blockly.Arduino['module_ultrasonic_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var trig = Blockly.Arduino.valueToCode(defineBlock, 'trigPin', Blockly.Arduino.ORDER_NONE);
    var echo = Blockly.Arduino.valueToCode(defineBlock, 'echoPin', Blockly.Arduino.ORDER_NONE);

    var code = 'get_distance_mm_of_ultrasonic(' + trig + ',' + echo + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_4dtouch'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var value_out1 = Blockly.Arduino.valueToCode(block, 'OUT1', Blockly.Arduino.ORDER_NONE);
    var value_out2 = Blockly.Arduino.valueToCode(block, 'OUT2', Blockly.Arduino.ORDER_NONE);
    var value_out3 = Blockly.Arduino.valueToCode(block, 'OUT3', Blockly.Arduino.ORDER_NONE);
    var value_out4 = Blockly.Arduino.valueToCode(block, 'OUT4', Blockly.Arduino.ORDER_NONE);
    // TODO: Assemble Arduino into code variable.

    if (Blockly.Arduino.isDigitalPin(value_out1) ||
        Blockly.Arduino.isDigitalPin(value_out2) ||
        Blockly.Arduino.isDigitalPin(value_out3) ||
        Blockly.Arduino.isDigitalPin(value_out4)) {
        addCommandTextToSetup(block, 'NAME');
    }
    if (Blockly.Arduino.isDigitalPin(value_out1)) {
        Blockly.Arduino.addSetup(text_name + '_OUT1', 'pinMode(' + value_out1 + ',INPUT);', true);
        Blockly.Arduino.reservePin(block, value_out1, 'INPUT', text_name + '-OUT1');
    }
    if (Blockly.Arduino.isDigitalPin(value_out2)) {
        Blockly.Arduino.addSetup(text_name + '_OUT2', 'pinMode(' + value_out2 + ',INPUT);', true);
        Blockly.Arduino.reservePin(block, value_out2, 'INPUT', text_name + '-OUT2');
    }
    if (Blockly.Arduino.isDigitalPin(value_out3)) {
        Blockly.Arduino.addSetup(text_name + '_OUT3', 'pinMode(' + value_out3 + ',INPUT);', true);
        Blockly.Arduino.reservePin(block, value_out3, 'INPUT', text_name + '-OUT3');
    }
    if (Blockly.Arduino.isDigitalPin(value_out4)) {
        Blockly.Arduino.addSetup(text_name + '_OUT4', 'pinMode(' + value_out4 + ',INPUT);', true);
        Blockly.Arduino.reservePin(block, value_out4, 'INPUT', text_name + '-OUT4');
    }

    return '';
};

Blockly.Arduino['module_4dtouch_get'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');

    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';

    var dropdown_channel = block.getFieldValue('CHANNEL');

    var pin = Blockly.Arduino.valueToCode(defineBlock, dropdown_channel, Blockly.Arduino.ORDER_NONE);
    var code = 'digitalRead(' + pin + ')';

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_flame'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_read_flame'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'analogRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['instance_irdetector'] = function (block) {
    onePinInstanceDefine(block, 'INPUT');
    return '';
};

Blockly.Arduino['module_read_irdetector'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var defineBlock = requireInstance(block, dropdown_name);
    if (!defineBlock) return '\n';
    var pin = Blockly.Arduino.valueToCode(defineBlock, 'Pin', Blockly.Arduino.ORDER_NONE);
    var code = 'digitalRead(' + pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};