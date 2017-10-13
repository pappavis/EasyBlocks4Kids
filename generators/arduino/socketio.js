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
 * @fileoverview socketio generator blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */

goog.provide('Blockly.Arduino.socketio');

goog.require('Blockly.Arduino');

// toegevoegd 2017.10.10
Blockly.Arduino.declare_socketio = function() {
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_SOCKETIO_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var sensor_naam1 = this.getFieldValue('DECLARE_SOCKETIO_NAAM1') + veranderlike1;
        var globalVar1 = "var AanUit" + 123 + ";\n";

        // Blockly.Arduino.definitions_["declare_define_socketio" + sensor_naam1] = globalVar1;
        Blockly.Arduino.definitions_['define_socketio'] = "var " + sensor_naam1 + " = require(\"socketio.io\");";
        // Blockly.Arduino.setups_['declare_setup_socketio' + sensor_naam1] = "   " + sensor_naam1 + " = new five.Switch(" + switch_poortNr1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        // console.log(" declare_spdt_skakelaar.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT declare_spdt_skakelaar:\n" + error4);
    }
    return code + '\n';
}; // einde declare_spdt_skakelaar