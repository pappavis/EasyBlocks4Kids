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
 * @fileoverview inputoutput generator blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
'use strict';

goog.provide('Blockly.Arduino.inputoutput');

goog.require('Blockly.Arduino');

Blockly.Arduino.ArduinoReadCommands = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('ARDUINO_READ_COMMANDS_INPUT');
        code = code.substr(3);
    } catch (error4) {
        console.log("FOUT inputoutput.ArduinoReadCommands:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ArduinoReadCommands_OUTPUT = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('ARDUINO_READ_COMMANDS_OUTPUT');
        code = code.substr(3);
    } catch (error4) {
        console.log("FOUT inputoutput.ArduinoPinMode:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ArduinoPinMode = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('BOARD_PINMODE');
    } catch (error4) {
        console.log("FOUT inputoutput.ArduinoPinMode:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.cmd_digitalReadWrite = function() {
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'CMD_DIGITALREAD1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_doen1 = Blockly.Arduino.valueToCode(this, 'CMD_DIGITALREAD1_DOEN', Blockly.Arduino.ORDER_ATOMIC) || "IO_digitalWrite";
        var apparaat_poortWaarde1 = Blockly.Arduino.valueToCode(this, 'CMD_DIGITALREAD1_VALUE', Blockly.Arduino.ORDER_ATOMIC) || -1;

        var branch = Blockly.Arduino.statementToCode(this, 'CMD_DIGITALREAD_DO');

        if (apparaat_doen1 == "analogWrite" || apparaat_doen1 == "digitalWrite" || apparaat_doen1 == "servoWrite") {
            code = " var IO_Poort_waarde = " + apparaat_poortWaarde1 + ";\n";
            code += " this." + apparaat_doen1 + "(" + apparaat_poortNr1 + ", IO_Poort_waarde);\n";
        } else {
            console.log(" cmd_digitalReadWrite: '" + apparaat_doen1 + "'. slegs analog-, digital-, en servoWrite toegstaan:\n");
        }
        // console.log("cmd_digitalReadWrite: apparaat_doen1= " + apparaat_doen1);
    } catch (error4) {
        console.log("FOUT event_digitalReadWrite:\n" + error4);
    }
    return code + '\n';
}; // eind cmd_digitalReadWrite


Blockly.Arduino.event_board = function() {
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'EVENT_EASYLABIO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_doen1 = Blockly.Arduino.valueToCode(this, 'EVENT_EASYLABIO_DOEN', Blockly.Arduino.ORDER_ATOMIC) || "board_loop";
        var apparaat_Waarde1 = Blockly.Arduino.valueToCode(this, 'EVENT_EASYLABIO_VALUE', Blockly.Arduino.ORDER_ATOMIC) || -1;
        var apparaat_naam1 = Blockly.Arduino.valueToCode(this, 'EVENT_EASYLABIO_NAME', Blockly.Arduino.ORDER_ATOMIC) || "board0";

        apparaat_doen1 = apparaat_doen1.substr("board_".length);

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_EASYLABIO_DO');

        var code = apparaat_naam1 + "." + apparaat_doen1 + "(" + apparaat_Waarde1 + ", function() {\n";
        code += "      " + branch + "\n";
        code += "});\n";
        // console.log("cmd_digitalReadWrite: apparaat_doen1= " + apparaat_doen1);
    } catch (error4) {
        console.log("FOUT event_digitalReadWrite:\n" + error4);
    }
    return code + '\n';
}; // eind event_board


Blockly.Arduino.event_board_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('EVENT_BOARD_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.ArduinoPinMode:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('IO_POORTEN_ARDUINO');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_ARDUINO:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten_GPIO_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        ander1 = this.getFieldValue('IO_POORTEN_GPIO') == "null" ? null : "\"" + (this.getFieldValue('IO_POORTEN_GPIO')) + "\"";
        code = ander1;
    } catch (error4) {
        console.log("FOUT IO_poorten_GPIO:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten_easylab_nano_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('IO_POORTEN_EASYLAB_NANO1');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_EASYLAB_NANO1:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten_easylab_nano_v2_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('IO_POORTEN_EASYLAB_NANO_V2');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_EASYLAB_NANO_V2:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten_bbc_microbit_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('IO_POORTEN_BBC_MICROBIT1');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_BBC_MICROBIT1:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.IO_poorten_NodeMCU_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var ander1 = "";

    try {
        code = this.getFieldValue('IO_POORTEN_NODEMCU1');
    } catch (error4) {
        console.log("FOUT IO_POORTEN_NODEMCU1:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};