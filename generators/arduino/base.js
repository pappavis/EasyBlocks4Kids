/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview base generator blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
'use strict';

goog.provide('Blockly.Arduino.base');

goog.require('Blockly.Arduino');

Blockly.Arduino.base_delay = function() {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    code += " setTimeout(function() {  }, " + delay_time + ");\n";

    return code;
};

Blockly.Arduino.pauze = function() {
    var delay_time = Blockly.Arduino.valueToCode(this, 'PAUZE', Blockly.Arduino.ORDER_ATOMIC) || '1000';
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    code += "\nfunction Pauze(pauze_doorlooptijd) {\n";
    code += "   var start" + veranderlike1 + " = new Date().getTime();\n";
    code += "   var now1" + veranderlike1 + " = new Date().getTime();\n";
    code += "   var end1" + veranderlike1 + " = start" + veranderlike1 + " + " + delay_time + ";\n";
    code += "   var diff1" + veranderlike1 + " = now1" + veranderlike1 + " - end1" + veranderlike1 + ";\n";
    code += "   while (now1" + veranderlike1 + " <= end1" + veranderlike1 + ") {\n";
    code += "      //DOEN: doen iets\n";
    code += "      diff1" + veranderlike1 + " = now1" + veranderlike1 + " - end1" + veranderlike1 + ";\n";
    code += "      if (diff1" + veranderlike1 + " > 0){\n";
    code += "        break;\n"
    code += "      }\n";
    code += "      now1" + veranderlike1 + " = new Date().getTime();\n";
    code += "   }\n";
    code += "};\n";

    Blockly.Arduino.definitions_["Pauze"] = code;
    var code2 = " Pauze(" + delay_time + ");\n";

    return code2;
};

Blockly.Arduino.ja_nee_null = function() {
    var ja_nee_null_waarde1 = this.getFieldValue('ja_nee_null_waarde');
    var code = "";
    code += ja_nee_null_waarde1;

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.process_exit = function() {
    var delay_time = Blockly.Arduino.valueToCode(this, 'PROCESS_EXIT', Blockly.Arduino.ORDER_ATOMIC) || '0'
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    // code = 'delay(' + delay_time + ');\n';

    code += "  setTimeout(function() { process.exit(0); }, 10)\n";
    return code;
};

Blockly.Arduino.random1 = function() {
    var random1;
    var rand1;
    var code = "";

    try {
        var veranderlike1 = Math.floor((Math.random() * 8) + 1);
        var random1_waarde_len1 = this.getFieldValue('random1_waarde_len') || 4;
        rand1 = " function randomWaarde1() { return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, " + random1_waarde_len1 + ").toUpperCase();};\n";
        Blockly.Arduino.definitions_["randomWaarde_def"] = rand1;
        code = "randomWaarde1()";

    } catch (error4) {
        console.log("random1 FOUT:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.base_map = function() {
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
    var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'map(' + value_num + ', 0, 1024, 0, ' + value_dmax + ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.inout_buildin_led = function() {
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
    var code = 'digitalWrite(13, ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_digital_write = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_digital_read = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_analog_write = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
};

Blockly.Arduino.inout_analog_read = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_tone = function() {
    var dropdown_pin = this.getFieldValue("PIN");
    var value_num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "tone(" + dropdown_pin + ", " + value_num + ");\n";
    return code;
};

Blockly.Arduino.inout_notone = function() {
    var dropdown_pin = this.getFieldValue("PIN");
    Blockly.Arduino.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = "noTone(" + dropdown_pin + ");\n";
    return code;
};

Blockly.Arduino.inout_highlow = function() {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.datum_now = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = (this.getFieldValue('datum_now') == 'date_now_serial') ? "Date.now()" : "Date.now().toLocaleString('en-GB')";
    } catch (error4) {
        alert("FOUT datum_now:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.windows_compoort = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var windows_compoort1 = "";

    try {
        windows_compoort1 = this.getFieldValue('COM_POORT') == "null" ? null : "\"" + (this.getFieldValue('COM_POORT')) + "\"";
        code = windows_compoort1;
    } catch (error4) {
        alert("FOUT windows_compoort1:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
//servo
#include <Servo.h>

Servo servo_11;

void setup() {
  servo_11.attach(11);
}

void loop() {
servo_11.write(0);

servo_11.write(150); //0~180
}
*/
Blockly.Arduino.servo_move = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
    return code;
};

Blockly.Arduino.servo_read_degrees = function() {
    var dropdown_pin = this.getFieldValue('PIN');

    Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

    var code = 'servo_' + dropdown_pin + '.read()';
    return code;
};

Blockly.Arduino.serial_print = function() {
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
        //content = content.replace('(','').replace(')','');

    // Blockly.Arduino.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');\n';

    var code = 'console.log(' + content + ');\n';
    return code;
};