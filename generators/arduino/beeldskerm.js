/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview beeldskerm generator blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
'use strict';

goog.provide('Blockly.Arduino.beeldskerm');

goog.require('Blockly.Arduino');


Blockly.Arduino.declare_matrix_led = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = "";
        var apparaat_poortNr1_data = Blockly.Arduino.valueToCode(this, 'DECLARE_LEDMATRIX_IO_POORT_DAT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_poortNr1_clock = Blockly.Arduino.valueToCode(this, 'DECLARE_LEDMATRIX_IO_POORT_CLK', Blockly.Arduino.ORDER_ATOMIC) || 11;
        var apparaat_poortNr1_cs = Blockly.Arduino.valueToCode(this, 'DECLARE_LEDMATRIX_IO_POORT_CS', Blockly.Arduino.ORDER_ATOMIC) || 12;
        var apparaat_type1 = this.getFieldValue('DECLARE_LEDMATRIX_SENSOR');
        var sensor_naam1 = this.getFieldValue('DECLARE_LEDMATRIX_NAAM1') + veranderlike1;
        var apparaat_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_LEDMATRIX_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 0;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        Blockly.Arduino.definitions_["declare_LEDMATRIX_" + sensor_naam1] = globalVar1;
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_freq" + veranderlike1] = "var " + sensor_naam1 + "_freq = " + apparaat_freq1 + ";\n";

        var json_controller = apparaat_type1 == "MAX7219" ? "null" : "\"" + apparaat_type1 + "\"";
        var json_pins = "data: " + apparaat_poortNr1_data + " , clock: " + apparaat_poortNr1_clock + ", cs: " + apparaat_poortNr1_cs;

        Blockly.Arduino.setups_['declare_setup_LEDMATRIX_' + sensor_naam1] = "  " + sensor_naam1 + " = new five.Led.Matrix({ pins: {" + json_pins + "}, devices: 1 });";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_json");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_kol");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_ry");

        var code = "";

        // console.log(" declare_matrix_led code:\n" + code);
    } catch (error4) {
        console.log("FOUT declare_matrix_led:\n" + error4);
    }
    return code + '\n';
};

// LCD toegevoegd: 5-10-2017
Blockly.Arduino.cmd_matrix_led = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var random1 = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8).toUpperCase();
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = Blockly.Arduino.valueToCode(this, 'CMD_LEDMATRIX_STATE', Blockly.Arduino.ORDER_ATOMIC) || "CHARS";
        var apparaat_poortNr1 = this.getFieldValue('CMD_LEDMAXTRIX_POORTNUMMER');
        var apparaat_type1 = this.getFieldValue('CMD_LEDMAXTRIX_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('CMD_LEDMATRIX_NAAM1') + veranderlike1;
        var i2c_kol1 = Blockly.Arduino.valueToCode(this, 'CMD_LEDMAXTRIX_POSX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var i2c_ry1 = Blockly.Arduino.valueToCode(this, 'CMD_LEDMAXTRIX_POSY', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var ledmatrix_text1 = Blockly.Arduino.valueToCode(this, 'CMD_LEDMAXTRIX_TEXT', Blockly.Arduino.ORDER_ASSIGNMENT) || "";
        var i2c_adres = Blockly.Arduino.valueToCode(this, 'CMD_LEDMAXTRIX_ADRES', Blockly.Arduino.ORDER_ATOMIC) || "0x27";
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        i2c_kol1 = i2c_kol1 < 0 || i2c_kol1 > 16 ? 0 : i2c_kol1;
        i2c_ry1 = i2c_ry1 < 0 || i2c_ry1 > 2 ? 0 : i2c_ry1;
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_naam" + veranderlike1] = "var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_naam" + veranderlike1] = "var " + sensor_naam1 + "_json = '';";
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_staat" + veranderlike1] = "var " + sensor_naam1 + "_staat;\n";
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_teks" + veranderlike1] = "var " + sensor_naam1 + "_waarde;\n";
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_kol" + veranderlike1] = "var " + sensor_naam1 + "_kol;\n";
        Blockly.Arduino.definitions_["CMD_LEDMAXTRIX_ry" + veranderlike1] = "var " + sensor_naam1 + "_ry;\n";
        // Blockly.Arduino.setups_['I2C_LCD1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        var argument = "";
        var branch = "";
        var code = "";
        var actie1 = "";

        // console.log("CMD_LEDMATRIX_STATE=" + switch_state1);

        switch (switch_state1) {
            case "CHARS":
                actie1 += "    var tekst172 = " + ledmatrix_text1 + ";\n";
                actie1 += "       var geskeidArr1 = tekst172.split('');\n";
                actie1 += "       var shapes87 = Object.keys(five.Led.Matrix.CHARS);\n";
                actie1 += "       for (var teller87 = 0; teller87 < geskeidArr1.lenth; teller87++) {\n";
                actie1 += "          " + sensor_naam1 + ".draw(five.Led.Matrix.CHARS[shapes87[teller87]]);\n";
                actie1 += "       }\n";
                break;
            case "draw":
                actie1 += "   " + sensor_naam1 + ".draw(" + ledmatrix_text1 + ");\n";
                break;
            case "clear":
                actie1 += sensor_naam1 + ".clear();\n";
                break;
            case "brightness":
                actie1 += sensor_naam1 + ".brightness(" + ledmatrix_text1 + ");\n";
                break;
            case "on":
                actie1 += sensor_naam1 + ".on();\n";
                break;
            case "off":
                actie1 += sensor_naam1 + ".off();\n";
                break;
            case "demo":
                actie1 += " // --- LED matrix demo. Gemaak deur Michiel Erasmus -- Afrikaner vryheid voorspoed!\n";
                actie1 += " matrix987.on();\n";
                actie1 += " var shapes = Object.keys(five.Led.Matrix.CHARS);\n";
                actie1 += " var enumerate987 = function() {\n";
                actie1 += " var iDemo2 = 0;\n";
                actie1 += " board0.loop(500, function() {\n";
                actie1 += "  if (iDemo2 < shapes.length) {\n";
                actie1 += "       matrix987.draw(five.Led.Matrix.CHARS[shapes[iDemo2]]);\n";
                actie1 += "       iDemo2++;\n";
                actie1 += "     });\n";
                actie1 += " };\n\n"
                actie1 += " enumerate987();\n\n";

                actie1 += " this.repl.inject({\n";
                actie1 += "    matrix987: matrix987,\n";
                actie1 += "    enumerate987: enumerate987\n";
                actie1 += " });\n";
                actie1 += " // --- EINDE LED matrix demo.\n";
                break;
            default:
                break;
        }

        ledmatrix_text1 = ledmatrix_text1 == "" || ledmatrix_text1 == null ? "''\n" : ledmatrix_text1;

        code += "     " + sensor_naam1 + "_json = { staat: \"" + switch_state1 + "\", waarde: " + ledmatrix_text1 + ", kol: " + i2c_kol1 + ", ry: " + i2c_ry1 + "};\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_waarde = " + ledmatrix_text1 + ";\n";
        code += "     " + sensor_naam1 + "_kol = " + i2c_kol1 + ";\n";
        code += "     " + sensor_naam1 + "_ry = " + i2c_ry1 + ";\n";
        code += "     " + actie1;

        code += "  setTimeout(function() {  }, " + sensor_naam1 + "_freq); // verplicht voor LED matrix, anders intitalisert hij niet.\n";

        // console.log(" cmd_matrix_led:\n" + code);
    } catch (error4) {
        console.log("FOUT cmd_matrix_led:\n" + error4);
    }
    return code + '\n';
}; // einde cmd_matrix_led


Blockly.Arduino.cmd_matrix_doen_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('DECLARE_LEDMATRIX_DOEN_LIJST');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_BBC_MICROBIT1:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.easylabs_image_create = function(block) {
    var code = "";

    try {
        // Blockly.Arduino.definitions_['import_microbit'] = 'from microbit import *';
        var colours = {
            "#000000": "0",
            "#440000": "1",
            "#660000": "2",
            "#880000": "3",
            "#aa0000": "4",
            "#bb0000": "5",
            "#cc0000": "6",
            "#dd0000": "7",
            "#ee0000": "8",
            "#ff0000": "9"
        }
        var colour_00 = colours[block.getFieldValue('00')];
        var colour_01 = colours[block.getFieldValue('01')];
        var colour_02 = colours[block.getFieldValue('02')];
        var colour_03 = colours[block.getFieldValue('03')];
        var colour_04 = colours[block.getFieldValue('04')];
        var colour_10 = colours[block.getFieldValue('10')];
        var colour_11 = colours[block.getFieldValue('11')];
        var colour_12 = colours[block.getFieldValue('12')];
        var colour_13 = colours[block.getFieldValue('13')];
        var colour_14 = colours[block.getFieldValue('14')];
        var colour_20 = colours[block.getFieldValue('20')];
        var colour_21 = colours[block.getFieldValue('21')];
        var colour_22 = colours[block.getFieldValue('22')];
        var colour_23 = colours[block.getFieldValue('23')];
        var colour_24 = colours[block.getFieldValue('24')];
        var colour_30 = colours[block.getFieldValue('30')];
        var colour_31 = colours[block.getFieldValue('31')];
        var colour_32 = colours[block.getFieldValue('32')];
        var colour_33 = colours[block.getFieldValue('33')];
        var colour_34 = colours[block.getFieldValue('34')];
        var colour_40 = colours[block.getFieldValue('40')];
        var colour_41 = colours[block.getFieldValue('41')];
        var colour_42 = colours[block.getFieldValue('42')];
        var colour_43 = colours[block.getFieldValue('43')];
        var colour_44 = colours[block.getFieldValue('44')];
        code = 'Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + '")';
    } catch (error4) {
        console.log("FOUT easylabs_image_create:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_MEMBER];
};

Blockly.Arduino.sprite_build = function(a) {
    var b;
    try {

        /*  // oud code van codebug
    for (var b = "sprite_build(\n[", c = 0; 5 > c; c++) {
        for (var b = b + "\"", d = 0; 5 > d; d++)
            b += "TRUE" == a.getFieldValue("LED" + d + c) ? 1 : 0,
            //            b += 4 > d ? ", " : "";
            b += 4 > d ? "" : "\"";
        b += "]";
        b += 4 > c ? ",\n" : "";
    }
*/

        for (var b = "", c = 0; 8 > c; c++) {
            for (var b = b + "\"", d = 0; 8 > d; d++)
                b += "TRUE" == a.getFieldValue("LED" + d + c) ? 1 : 0,
                //            b += 4 > d ? ", " : "";
                b += "";
            b += 8 > c ? "\",\n" : "";
        }

        b = b.endsWith(",") ? b.substr(b.length - 1) : b;
        console.log("sprite_build:\n" + b);
        b = "[" + b + "]";
        //    return [b + "])", Blockly.Arduino.ORDER_FUNCTION_CALL];
    } catch (error34534) {
        console.log("FOUT sprite_build: " + error34534);
    }

    return [b, Blockly.Arduino.ORDER_ATOMIC];
};

// LCD toegevoegd: 19-7-2017
Blockly.Arduino.declare_I2C_LCD = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var random1 = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8).toUpperCase();
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = Blockly.Arduino.valueToCode(this, 'DECLARE_I2C_LCD1_STATE', Blockly.Arduino.ORDER_ATOMIC) || "print";
        var apparaat_poortNr1 = this.getFieldValue('DECLARE_I2C_LCD1_POORTNUMMER');
        var apparaat_type1 = this.getFieldValue('DECLARE_I2C_LCD1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('DECLARE_I2C_LCD1_NAAM1') + veranderlike1;
        var i2c_adres = Blockly.Arduino.valueToCode(this, 'DECLARE_I2C_LCD1_ADRES', Blockly.Arduino.ORDER_ATOMIC) || "0x27";
        var apparaat_freq = Blockly.Arduino.valueToCode(this, 'DECLARE_I2C_LCD1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 30;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["DECLARE_I2C_LCD1_naam" + veranderlike1] = "var " + sensor_naam1 + " = '';";
        Blockly.Arduino.setups_['DECLARE_I2C_' + veranderlike1] = "     " + sensor_naam1 + " = new five.LCD({controller: \"" + apparaat_type1 + "\"});";
        Blockly.Arduino.setups_['DECLARE_I2C_freq' + veranderlike1] = "     " + sensor_naam1 + "_freq = " + apparaat_freq + ";";
        // Blockly.Arduino.setups_['I2C_LCD1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_teks");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_kol");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_ry");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_freq");

        var argument = "";
        var branch = "";
        var code = "";
        var actie1 = "";

        // code += "   setTimeout(function() {  }, 3000); // verplicht voor LCD, anders intitalisert hij niet.\n";

        // console.log(" declare_I2C_LCD:\n" + branch);
    } catch (error4) {
        console.log("FOUT declare_I2C_LCD:\n" + error4);
    }
    return code + '\n';
}; // einde declare_I2C_LCD


// LCD toegevoegd: 19-7-2017
Blockly.Arduino.cmd_I2C_LCD = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var random1 = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8).toUpperCase();
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = Blockly.Arduino.valueToCode(this, 'CMD_I2C_LCD1_STATE', Blockly.Arduino.ORDER_ATOMIC) || "print";
        var apparaat_poortNr1 = this.getFieldValue('CMD_I2C_LCD1_POORTNUMMER');
        var apparaat_type1 = this.getFieldValue('CMD_I2C_LCD1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('CMD_I2C_LCD1_NAAM1') + veranderlike1;
        var i2c_kol1 = Blockly.Arduino.valueToCode(this, 'CMD_I2C_LCD1_POSX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var i2c_ry1 = Blockly.Arduino.valueToCode(this, 'CMD_I2C_LCD1_POSY', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var i2c_text1 = this.getFieldValue('CMD_I2C_LCD1_TEXT');
        var i2c_adres = Blockly.Arduino.valueToCode(this, 'CMD_I2C_LCD1_ADRES', Blockly.Arduino.ORDER_ATOMIC) || "0x27";
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        if (i2c_text1 == null) {
            i2c_text1 = Blockly.Arduino.valueToCode(this, 'CMD_I2C_LCD1_TEXT', Blockly.Arduino.ORDER_ASSIGNMENT) || null;
        }

        veranderlike1 = sensor_naam1;
        i2c_kol1 = i2c_kol1 < 0 || i2c_kol1 > 16 ? 0 : i2c_kol1;
        i2c_ry1 = i2c_ry1 < 0 || i2c_ry1 > 2 ? 0 : i2c_ry1;
        Blockly.Arduino.definitions_["CMD_I2C_LCD1_naam" + veranderlike1] = "var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["CMD_I2C_LCD1_staat" + veranderlike1] = "var " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        Blockly.Arduino.definitions_["CMD_I2C_LCD1_teks" + veranderlike1] = "var " + sensor_naam1 + "_teks = " + i2c_text1 + ";\n";
        Blockly.Arduino.definitions_["CMD_I2C_LCD1_kol" + veranderlike1] = "var " + sensor_naam1 + "_kol = " + i2c_kol1 + ";\n";
        Blockly.Arduino.definitions_["CMD_I2C_LCD1_ry" + veranderlike1] = "var " + sensor_naam1 + "_ry = " + i2c_ry1 + ";\n";
        // Blockly.Arduino.setups_['I2C_LCD1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        var argument = "";
        var branch = "";
        var code = "";
        var actie1 = "";

        switch (switch_state1) {
            case "print":
                actie1 += sensor_naam1 + ".print(" + i2c_text1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 40);\n";
                break;
            case "printPos":
                actie1 += sensor_naam1 + ".home();\n";
                actie1 += "   " + sensor_naam1 + ".cursor(" + i2c_ry1 + ", " + i2c_kol1 + ").print(" + i2c_text1 + ");\n";
                break;
            case "useChar":
                actie1 += sensor_naam1 + ".useChar(\"" + i2c_text1 + "\");\n";
                break;
            case "clear":
                actie1 += sensor_naam1 + ".clear();\n";
                break;
            case "cursor":
                actie1 += sensor_naam1 + ".cursor(" + i2c_ry1 + ", " + i2c_kol1 + ");\n";
                break;
            case "home":
                actie1 += sensor_naam1 + ".home();\n";
                break;
            case "on":
                actie1 += sensor_naam1 + ".on();\n";
                break;
            case "off":
                actie1 += sensor_naam1 + ".off();\n";
                break;
            case "blink":
                actie1 += sensor_naam1 + ".blink();\n";
                break;
            case "noBlink":
                actie1 += sensor_naam1 + ".noBlink();\n";
                break;
            case "autoscroll":
                actie1 += sensor_naam1 + ".autoscroll().print(" + i2c_text1 + ");\n";
                break;
            case "noAutoscroll":
                actie1 += sensor_naam1 + ".noAutoscroll().print(" + i2c_text1 + ");\n";
                break;
            case "hallowereld":
                actie1 += sensor_naam1 + ".cursor(0, 0).print(\"" + "hallo wereld:" + random1 + "\");\n";
                break;
            default:
                break;
        }

        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_teks = " + i2c_text1 + ";\n";
        code += "     " + sensor_naam1 + "_kol = " + i2c_kol1 + ";\n";
        code += "     " + sensor_naam1 + "_ry = " + i2c_ry1 + ";\n";
        code += "     " + actie1;

        code += "   setTimeout(function() {  }, " + sensor_naam1 + "_freq); // verplicht voor LCD, anders intitalisert hij niet.\n";

        // console.log(" I2C_LCD.branch:\n" + code);
    } catch (error4) {
        console.log("FOUT I2C_LCD:\n" + error4);
    }
    return code + '\n';
}; // einde cmd_I2C_LCD


Blockly.Arduino.cmd_I2C_LCD_lijst = function() {
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_I2C_LCD1_STATE_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_I2C_LCD_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.cmd_lcd_text_op_2_regels = function() {
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = "{lyn1: '" + this.getFieldValue('CMD_I2C_TEXT_L1') + "', lyn2: '" + this.getFieldValue('CMD_I2C_TEXT_L2') + "'}"; // this.getFieldValue('CMD_I2C_TEXT_L1');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_I2C_LCD_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};