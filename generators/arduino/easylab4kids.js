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
 * @fileoverview Generating Arduino for variable blocks.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)
 */
'use strict';

goog.provide('Blockly.Arduino.EasyLab4Kids');

goog.require('Blockly.Arduino');

Blockly.Arduino.process_exit = function() {
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    // code += "  require('node-clean-exit')();\n"
    //    code += "  process.exitCode = 1;\n";
    code += "  process.exit(0);\n";

    return code;
};

Blockly.Arduino.procedures_easylab4kids_boards = function() {

    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var dropdown_pin = Math.floor((Math.random() * 100) + 1); //this.getFieldValue('PIN');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
    var board_comport1 = Blockly.Arduino.valueToCode(this, 'BOARD_PORT', Blockly.Arduino.ORDER_ATOMIC) || null;
    var board_comportAlt1 = board_comport1;

    Blockly.Arduino.definitions_['define_johnny'] = "var five = require(\"johnny-five\");";
    // Blockly.Arduino.definitions_['define_underscorejs'] = "var _ = require(\"underscore\");";
    Blockly.Variables.predefinedVars = []; // reset en opruimen alle globale vars.

    var funcName = "";
    try {
        // Define a procedure with a return value.
        // funcName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('BOARD_NAME'), Blockly.Procedures.NAME_TYPE);  //uitgecommentaar 11-7-2017, verwyder strax
        funcName = this.getFieldValue('BOARD_NAME') || ""; // + "_" + veranderlike1; // nuwe versie 11-7-2017
        var branch = Blockly.Arduino.statementToCode(this, 'BOARD_STACK');
        if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
            branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
        }
        var returnValue = Blockly.Arduino.valueToCode(this, 'BOARD_RETURN',
            Blockly.Arduino.ORDER_NONE) || '';
        if (returnValue) {
            returnValue = '  return ' + returnValue + ';';
        }
        var returnType = returnValue ? 'var' : 'void';
        var args = [];
        for (var x = 0; x < this.arguments_.length; x++) {
            args[x] = 'var ' + Blockly.Arduino.variableDB_.getName(this.arguments_[x],
                Blockly.Variables.NAME_TYPE);
        }
    } catch (error) {
        console.log(error);
    }

    /*
        var code = '\n//EasyLab4Kids\n' + returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
            branch + returnValue + '}\n';
        code = Blockly.Arduino.scrub_(this, code);
        Blockly.Arduino.definitions_[funcName] = code;
    */

    try {
        var board_type1 = Blockly.Arduino.variableDB_.getName(this.getFieldValue('BOARD_TYPE'), Blockly.Procedures.NAME_TYPE);
        var board_events1 = Blockly.Arduino.variableDB_.getName(this.getFieldValue('BOARD_EVENTS'), Blockly.Procedures.NAME_TYPE);
        // var funcName = "board_" + board_events1;
        var initBoardIO1 = "   io: new board()\n";
        var initCode = "";
        // initCode += "var five = require(\"johnny-five\");\n";
        board_comport1 = board_comport1 == null || board_comport1 == "" || board_comport1 == "\"\"" ? "" : board_comport1;
        var poortNr = "";
        if (board_type1 == "BOARD_TYPE_MICROBIT") {
            poortNr = board_comport1 == "" ? "id: 1" : " adress: " + board_comport1 + ", id: 1 ";
        } else {
            poortNr = board_comport1 == "" ? "" : "port: " + board_comport1 + " ";
        }

        // Blockly.Arduino.definitions_["USE_STRICT"] = "'use strict';\n";
        var board_def_declare1 = "var " + funcName + " = new five.Board({\n";
        var board_DefNaam1 = "define_board_" + funcName;

        switch (board_type1) {
            case "BOARD_TYPE_BEAGLEBONE":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var BeagleBone = require(\"beaglebone-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new BeagleBone()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_LINUX":
                // zie https://github.com/fivdi/linux-io
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var PiIO = require(\"pi-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new PiIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_RASPI":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var Raspi = require(\"raspi-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new Raspi()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_CHIP":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var CHIPio = require(\"chip-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new CHIPio()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_BLENDMICRO":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var BlendMicroIO = require(\"blend-micro-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new BlendMicroIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_LIGHTBLUEBEAN":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var LightBlueBeanIO = require(\"bean-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new LightBlueBeanIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_ELECTRICIMP":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var ElectricImpIO = require(\"imp-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new ElectricImpIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_TESSEL":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var TesselIO = require(\"tessel-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new TesselIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_LININO":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var NinoIO = require(\"nino-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new NinoIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_ESP8266":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var ESP8266IO = require(\"esp-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new ESP8266IO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_PCDUINO":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var pcDuinoIO = require(\"pcduino-io\");\n"; //  https://punchthrough.com/bean/
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new pcDuinoIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_PLAYGROUND":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var Playground  = require(\"playground-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new Playground()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_MICROBIT":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var microbitio = require(\"bbc-microbit-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new microbitio({" + poortNr + "})\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_INTEL_EDISON":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var Edison = require(\"edison-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new Edison()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_OTHER":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var OtherIO = require(\"other-io\");\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new OtherIO()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_EASYLAB4KIDS":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
            case "BOARD_TYPE_REMOTEIO":
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] = "var Edison = require(\"remote-io\");\n"; // https://github.com/monteslu/remote-io
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += board_def_declare1;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += poortNr != "" ? "   " + poortNr + ",\n" : poortNr;
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "   io: new board0()\n";
                Blockly.Arduino.definitions_[board_DefNaam1 + veranderlike1] += "});\n\n";
                break;
        }

        var setups2 = [];
        if (board_events1 == "ready") {
            // Blockly.Arduino.definitions_["board_ready1"] = "// Deze board on '" + board_events1 + "' is VEREIST! \n";
            for (var name1 in Blockly.Arduino.setups_) {
                setups2.push(Blockly.Arduino.setups_[name1]);
            }
        }

        var leeg1 = "";
        var code = "";

        code += "// ©2017 EasyLab4Kids door Michiel Erasmus  http://erasmus-ict.nl\n";
        code += funcName + ".on(\"" + board_events1 + "\", function() {\n";
        code += " try {\n"
        code += "  " + funcName + ".repl.inject({ " + funcName + ": " + funcName + " });\n";
        code += " " + setups2.join('\n  ') + args.join(', ') + ' \n';
        code += " " + branch + returnValue + ' \n';
        code += " } catch (grootKakspul) {\n"
        code += "   console.log('fout in " + funcName + ":' + grootKakspul);";
        code += ' }\n';
        code += '});  // einde ' + funcName + '\n';
        code = Blockly.Arduino.scrub_(this, code);

        Blockly.Arduino.definitions_[funcName + veranderlike1] = code;
        setups2 = "";

    } catch (err4) {
        console.log("FOUT procedures_easylab4kids_boards: " + err4);
    }

    return null;
};


// PIR motion HC-SR501
Blockly.Arduino.motion_data_change_motionstart = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('PIR_SENSOR_STAAT');
        var sensor_naam1 = this.getFieldValue('PIR_SENSOR_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'PIR_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('PIR_SENSOR_TYPE');
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["setup_motion_data_change_motionstart" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['setup_motion_data_change_motionstart' + sensor_naam1] = " " + sensor_naam1 + " = new five.Motion({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + "});";

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        /*
            var old_vars1 = Blockly.Variables.allVariables; // ref=https://groups.google.com/forum/#!topic/blockly/22B9CMXpJpc
            Blockly.Variables.allVariables = function(root) {
                var vars = old_vars1.call(this, root);
                Blockly.Variables.predefinedVars.forEach(function(x) {
                    if (vars.indexOf(x) < 0)
                        vars.push(x);
                });
                return vars;
            };
        */

        var argument = Blockly.Arduino.valueToCode(this, 'MOTION_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'MOTION_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "        " + sensor_naam1 + "waarde = " + sensor_naam1 + ".value;\n"
        code += "        " + sensor_naam1 + "_staat =  \"" + apparaat_state1 + "\";\n"
        code += "   } catch (fout1) {};\n";
        // code += "  console.log(\"  cm  : \" + distance1);\n";
        code += "    " + branch + "\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'MOTION_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'MOTION_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'MOTION_ELSE');
            code += ' else {\n' + branch + '}';
        }
        // console.log(" motion_data_change_motionstart code:\n" + code);
    } catch (error4) {
        console.log("FOUT motion_data_change_motionstart:\n" + error4);
    }
    return code + '\n';
};


// PIR declare_motion_data_change_motionstart
Blockly.Arduino.declare_motion_data_change_motionstart = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('PIR_SENSOR_STAAT');
        var sensor_naam1 = this.getFieldValue('PIR_SENSOR_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'PIR_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('PIR_SENSOR_TYPE');
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["setup_motion_data_change_motionstart" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['setup_motion_data_change_motionstart' + sensor_naam1] = " " + sensor_naam1 + " = new five.Motion({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + "});";

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
    } catch (error4) {
        console.log("FOUT motion_data_change_motionstart:\n" + error4);
    }
    return code + '\n';
}; // eind declare_motion_data_change_motionstart


// event_motion_data_change_motionstart
Blockly.Arduino.event_motion_data_change_motionstart = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('EVENT_PIR_SENSOR_STAAT');
        var sensor_naam1 = this.getFieldValue('EVENT_PIR_SENSOR_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["setup_motion_data_change_motionstart" + sensor_naam1] = globalVar1;

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_MOTION_DO');
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "        " + sensor_naam1 + "_waarde = " + sensor_naam1 + ".value;\n"
        code += "        " + sensor_naam1 + "_staat =  \"" + apparaat_state1 + "\";\n"
        code += "        " + branch + "\n";
        code += "});\n";

        console.log(" motion_data_change_motionstart code:\n" + code);
    } catch (error4) {
        console.log("FOUT motion_data_change_motionstart:\n" + error4);
    }
    return code + '\n';
}; // eind event_motion_data_change_motionstart


Blockly.Arduino.toggleswitch_close_open = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('SWITCH_OPEN_CLOSED');
        var switch_poortNr1 = Blockly.Arduino.valueToCode(this, 'KROKODIL_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var sensor_naam1 = this.getFieldValue('AAN_UIT_NAAM1') + veranderlike1;
        var globalVar1 = "var AanUit" + 123 + ";\n";
        Blockly.Arduino.definitions_["define_toggleswitch_close_open" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['setup_toggleswitch_close_open' + sensor_naam1] = "var " + sensor_naam1 + " = new five.Switch(" + switch_poortNr1 + ");";

        if (Blockly.Variables.predefinedVars[sensor_naam1] == null) {
            Blockly.Variables.predefinedVars.push(sensor_naam1);
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        }

        var argument = Blockly.Arduino.valueToCode(this, 'TOGGLESWITCH_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'TOGGLESWITCH_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n    " + sensor_naam1 + "_staat = \"" + switch_state1 + "\"\n  } catch (fout1) {};\n";
        code += "  " + branch + "\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'TOGGLESWITCH_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'TOGGLESWITCH_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'TOGGLESWITCH_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" toggleswitch_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT toggleswitch_close_open:\n" + error4);
    }
    return code + '\n';
}; // einde toggleswitch_close_open


// toegevoegd 2017.10.10
Blockly.Arduino.declare_spdt_skakelaar = function() {
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_SPDT_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var sensor_naam1 = this.getFieldValue('DECLARE_SPDT_NAAM1') + veranderlike1;
        var globalVar1 = "var AanUit" + 123 + ";\n";

        Blockly.Arduino.definitions_["declare_define_toggleswitch_close_open" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['declare_setup_toggleswitch_close_open' + sensor_naam1] = "   " + sensor_naam1 + " = new five.Switch(" + switch_poortNr1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        // console.log(" declare_spdt_skakelaar.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT declare_spdt_skakelaar:\n" + error4);
    }
    return code + '\n';
}; // einde declare_spdt_skakelaar


Blockly.Arduino.event_spdt_skakelaar = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('EVENT_SPDT_STATE1');
        var sensor_naam1 = this.getFieldValue('EVENT_SPDT_NAAM1') + veranderlike1;
        var globalVar1 = "var AanUit" + 123 + ";\n";
        Blockly.Arduino.definitions_["declare_define_toggleswitch_close_open" + sensor_naam1] = globalVar1;

        if (Blockly.Variables.predefinedVars[sensor_naam1] == null) {
            Blockly.Variables.predefinedVars.push(sensor_naam1);
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        }

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_SPDT_DO');
        code = "   " + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "   " + sensor_naam1 + "_staat = \"" + switch_state1 + ";\n";
        code += "  " + branch + "\n";
        code += "});\n";

        console.log(" event_spdt_skakelaar.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT event_spdt_skakelaar:\n" + error4);
    }
    return code + '\n';
}; // einde event_spdt_skakelaar

// LEDje
Blockly.Arduino.ledje = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('LEDJE1_STAAT');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'LEDJE1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || "\"A2\"";
        var apparaat_type1 = this.getFieldValue('LEDJE1_SENSOR');
        var sensor_naam1 = this.getFieldValue('LEDJE_NAAM1') + veranderlike1;
        var led1_waarde = Blockly.Arduino.valueToCode(this, 'LEDJE1_WAARDE', Blockly.Arduino.ORDER_ATOMIC) || -1;
        var controller1 = apparaat_type1 == "LED" ? "" : "controller: \"" + apparaat_type1 + "\", ";
        var globalVar1 = "var " + sensor_naam1 + "_helderheid = " + led1_waarde + ";";
        var globalVar2 = "var " + sensor_naam1 + "_staat = '" + apparaat_state1 + "';";
        var globalVar3 = "var " + sensor_naam1 + " = '';";

        veranderlike1 = sensor_naam1;
        led1_waarde = led1_waarde > 255 ? 255 : led1_waarde;
        Blockly.Arduino.definitions_["EASYLED1_sensor_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["EASYLED1_sensor_data2" + veranderlike1] = globalVar2;
        Blockly.Arduino.definitions_["EASYLED1_sensor_data3" + veranderlike1] = globalVar3;
        Blockly.Arduino.setups_['setup_ledje' + veranderlike1] = "  " + veranderlike1 + " = new five.Led({" + controller1 + "pin: " + apparaat_poortNr1 + "});";

        if (led1_waarde >= 0) {
            Blockly.Arduino.setups_['setup_ledje_helderheid' + veranderlike1] = veranderlike1 + ".brightness(" + led1_waarde + ");";
        }

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        if (led1_waarde >= 0) {
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_helderheid");
        }
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        /*
        var old_vars1 = Blockly.Variables.allVariables; // ref=https://groups.google.com/forum/#!topic/blockly/22B9CMXpJpc
        Blockly.Variables.allVariables = function(root) {
            var vars = old_vars1.call(this, root);
            Blockly.Variables.predefinedVars.forEach(function(x) {
                if (vars.indexOf(x) < 0)
                    vars.push(x);
            });
            return vars;
        };
        */

        var argument = Blockly.Arduino.valueToCode(this, 'F_EASYLED1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'F_EASYLED1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = sensor_naam1 + "." + apparaat_state1 + "();\n";
        code += led1_waarde == -1 ? "" : " " + sensor_naam1 + ".brightness(" + led1_waarde + ");\n";;
        code += " " + sensor_naam1 + "_staat = '" + apparaat_state1 + "';\n";
        if (led1_waarde >= 0) {
            code += " " + sensor_naam1 + "_helderheid = '" + led1_waarde + "';\n";
        }

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'F_EASYLED1_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'F_EASYLED1_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'F_EASYLED1_ELSE');
            code += ' else {\n' + branch + '\n}';
        }
        console.log(" EASYLED1_sensor_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT EASYLED1_sensor_data:\n" + error4);
    }
    return code;
};

// Piezo buzzer
Blockly.Arduino.piezo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var piezo1 = ""; // = "var piezo1" + veranderlike1 + ";\n // afstand in centimer";
        var sensor_naam1 = "";
        var apparaat_state1 = this.getFieldValue('F_PIEZO_STAAT');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'PIEZO_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('F_PIEZO_SENSOR');
        var piezo_naam1 = this.getFieldValue('PIEZO_NAAM1') + veranderlike1;
        var piezo_Liedje1 = Blockly.Arduino.valueToCode(this, 'PIEZO_MUZIEK1', Blockly.Arduino.ORDER_ATOMIC) || "''";
        var piezo_Beat1 = this.getFieldValue('PIEZO_BEAT1');
        var piezo_Tempo1 = this.getFieldValue('PIEZO_TEMPO1');
        var globalVar1 = "var " + piezo_naam1 + ";\n";

        sensor_naam1 = piezo_naam1;
        piezo_Liedje1 = piezo_Liedje1 == null || piezo_Liedje1 == "" ? "null" : piezo_Liedje1;
        piezo_Beat1 = piezo_Beat1 == null ? "null" : piezo_Beat1;
        piezo_Tempo1 = piezo_Tempo1 == null ? "null" : piezo_Tempo1;

        Blockly.Arduino.definitions_["piezo_buzzer_data" + piezo_naam1] = globalVar1;
        Blockly.Arduino.setups_['setup_piezo_buzzer_data' + piezo_naam1] = "  " + piezo_naam1 + " = new five.Piezo({controller: " + apparaat_type1 + ", pin: " + apparaat_poortNr1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(piezo_naam1);
        Blockly.Variables.predefinedVars.push(piezo_naam1 + "_playing");

        var argument = Blockly.Arduino.valueToCode(this, 'F_PIEZO_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'F_PIEZO_DO' + n);

        var code = "";
        // code += " " + funcName + ".repl.inject({ piezo: " + piezo_naam1 + "}); // Injects the piezo into the repl.\n"

        code += piezo_naam1 + ".play({\n";
        code += "   song: " + piezo_Liedje1 + ",\n";
        code += "   beats: " + piezo_Beat1 + ",\n";
        code += "   tempo: " + piezo_Tempo1 + "\n";
        code += "  }\n";
        code += "    " + branch + "\n";
        code += " );\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'F_PIEZO_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'F_PIEZO_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'F_PIEZO_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" piezo_buzzer_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT piezo_buzzer_data:\n" + error4);
    }
    return code + '\n';
};


Blockly.Arduino.piezo_muziek = function(block) {
    var code = "";

    try {
        Blockly.Arduino.definitions_['import_microbit'] = 'from microbit import *';
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

// HC-SR401
Blockly.Arduino.proximity_sensor_data = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var distance1 = ""; // = "var distance1" + veranderlike1 + ";\n // afstand in centimer";

        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('PROXIMITY_SENSOR_STAAT');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'PROX_SENSOR_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('F_PROXIMITY_SENSOR');
        var globalVar1 = "var afstandSensor" + 123 + ";\n";
        var sensor_naam1 = this.getFieldValue('SENSOR_NAAM1') + veranderlike1;

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["proximity_sensor_naam" + veranderlike1] = " var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = " var " + sensor_naam1 + "CM = -1;";
        Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = " var " + sensor_naam1 + "IOpoort = " + apparaat_poortNr1 + ";";
        Blockly.Arduino.setups_['setup_proximity_sensor_data' + veranderlike1] = "  " + sensor_naam1 + " = new five.Proximity({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "CM");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "IOpoort");

        var argument = Blockly.Arduino.valueToCode(this, 'F_PROXIMITY_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'F_PROXIMITY_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "   try {\n    " + sensor_naam1 + "CM = " + sensor_naam1 + ".cm\n   } catch (fout1) {};\n";
        // code += "  console.log(\"  cm  : \" + distance1);\n";
        code += "    " + branch + "\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'F_PROXIMITY_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'F_PROXIMITY_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'F_PROXIMITY_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" proximity_sensor_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT proximity_sensor_data:\n" + error4);
    }
    return code + '\n';
};


Blockly.Arduino.declare_proximity_sensor_data = function() {
    var n = 0;
    var code = "";

    try {
        var distance1 = ""; // = "var distance1" + veranderlike1 + ";\n // afstand in centimer";

        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_PROX_SENSOR_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_F_PROXIMITY_SENSOR');
        var globalVar1 = "var afstandSensor" + 123 + ";\n";
        var sensor_naam1 = this.getFieldValue('DECLARE_PROX_SENSOR_NAAM1') + veranderlike1;

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["proximity_sensor_naam" + veranderlike1] = " var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = " var " + sensor_naam1 + "_afstand = -1;";
        Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = " var " + sensor_naam1 + "_IOpoort = " + apparaat_poortNr1 + ";";
        Blockly.Arduino.setups_['setup_proximity_sensor_data' + veranderlike1] = "  " + sensor_naam1 + " = new five.Proximity({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_afstand");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_IOpoort");

        console.log(" proximity_sensor_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT proximity_sensor_data:\n" + error4);
    }
    return code + '\n';
};


Blockly.Arduino.event_proximity_sensor_data = function() {
    var n = 0;
    var code = "";

    try {
        var distance1 = ""; // = "var distance1" + veranderlike1 + ";\n // afstand in centimer";

        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + 123 + ";\n";
        var sensor_naam1 = this.getFieldValue('EVENT_PROXIMITY_SENSOR_NAAM') + veranderlike1;
        var apparaat_state1 = this.getFieldValue('EVENT_PROXIMITY_SENSOR_STAAT') + veranderlike1;

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["proximity_sensor_naam" + veranderlike1] = " var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = " var " + sensor_naam1 + "_afstand = -1;";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_afstand");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_F_PROXIMITY_DO');
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "   " + sensor_naam1 + "_afstand = " + sensor_naam1 + ".cm > 255 ? 255 : " + sensor_naam1 + ".cm ; \n ";
        code += "    " + branch + "\n";
        code += "});\n";

        console.log(" event_proximity_sensor_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_proximity_sensor_data:\n" + error4);
    }
    return code + '\n';
}; // einde event_proximity_sensor_data



Blockly.Arduino.button_Down_hold_up = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('BUTTON_DOWN_HOLD_UP_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'BUTTON_DOWN_HOLD_UP_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 2;
        var apparaat_type1 = this.getFieldValue('BUTTON_DOWN_HOLD_UP_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('BUTTON_DOWN_HOLD_UP_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = "controller: " + apparaat_type1 + ",";
        Blockly.Arduino.definitions_["button_Down_hold_up_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["button_Down_hold_up_data1" + veranderlike1] = " var " + sensor_naam1 + "_holdtime;";
        Blockly.Arduino.definitions_["button_Down_hold_up_data2" + veranderlike1] = " var " + sensor_naam1 + "_staat;";
        Blockly.Arduino.setups_['setup_button_Down_hold_up' + veranderlike1] = "  " + sensor_naam1 + " = new five.Button({" + apparaat_type1 + " pin: " + apparaat_poortNr1 + ", holdtime: 250});";

        //        Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_holdtime");

        var argument = Blockly.Arduino.valueToCode(this, 'BUTTON_ON_OFF_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'BUTTON_ON_OFF_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_holdtime = " + sensor_naam1 + ".holdtime;\n";
        code += "   } catch (fout1) {};\n";
        code += "  " + branch + "\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'BUTTON_ON_OFF_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'BUTTON_ON_OFF_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'BUTTON_ON_OFF_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" BUTTON_ON_OFF_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT BUTTON_ON_OFF_close_open:\n" + error4);
    }
    return code + '\n';
}; // button_Down_hold_up


Blockly.Arduino.declare_button_Down_hold_up = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('DECLARE_BUTTON_DOWN_HOLD_UP_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_BUTTON_DOWN_HOLD_UP_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 2;
        var apparaat_type1 = this.getFieldValue('DECLARE_BUTTON_DOWN_HOLD_UP_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('DECLARE_BUTTON_DOWN_HOLD_UP_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = "controller: " + apparaat_type1 + ",";
        Blockly.Arduino.definitions_["DECLARE_button_Down_hold_up_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["DECLARE_button_Down_hold_up_data1" + veranderlike1] = " var " + sensor_naam1 + "_holdtime;";
        Blockly.Arduino.definitions_["DECLARE_button_Down_hold_up_data2" + veranderlike1] = " var " + sensor_naam1 + "_staat;";
        Blockly.Arduino.setups_['DECLARE_setup_button_Down_hold_up' + veranderlike1] = "  " + sensor_naam1 + " = new five.Button({" + apparaat_type1 + " pin: " + apparaat_poortNr1 + ", holdtime: 250});";

        //        Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_holdtime");

        // console.log(" DECLARE_BUTTON_ON_OFF_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT declare_BUTTON_ON_OFF_close_open:\n" + error4);
    }
    return code + '\n';
}; // declare_button_Down_hold_up



Blockly.Arduino.event_button_Down_hold_up = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('EVENT_BUTTON_DOWN_HOLD_UP_STATE');
        var sensor_naam1 = this.getFieldValue('EVENT_BUTTON_DOWN_HOLD_UP_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_holdtime");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_BUTTON_ON_OFF_DO');

        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_holdtime = " + sensor_naam1 + ".holdtime;\n";
        code += "  " + branch + "\n";
        code += "});\n";

        console.log(" BUTTON_ON_OFF_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT BUTTON_ON_OFF_close_open:\n" + error4);
    }
    return code + '\n';
}; // button_Down_hold_up


// LEDje
Blockly.Arduino.ledje_knipper_fade = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; //Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('LEDJE_KNIPPER_STAAT');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'LEDJE_KNIPPER_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 13;
        var apparaat_type1 = this.getFieldValue('LEDJE_KNIPPER_SENSOR');
        var sensor_naam1 = this.getFieldValue('LEDJE_KNIPPER_NAAM1') + veranderlike1;
        var led1_knipper_ms = Blockly.Arduino.valueToCode(this, 'LEDJE_KNIPPER_MS', Blockly.Arduino.ORDER_ATOMIC);
        var led1_waarde = Blockly.Arduino.valueToCode(this, 'LEDJE1_WAARDE', Blockly.Arduino.ORDER_ATOMIC) || -1;
        var controller1 = apparaat_type1 == "LED" ? "" : "controller: \"" + apparaat_type1 + "\", ";
        var globalVar1 = "var " + sensor_naam1 + "_helderheid = " + led1_waarde;

        veranderlike1 = sensor_naam1;
        led1_waarde = led1_waarde > 255 ? 255 : led1_waarde;
        Blockly.Arduino.definitions_["EASYLEDKnipper1_sensor_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.setups_['setup_EASYLEDKnipper' + veranderlike1] = veranderlike1 + " = new five.Led({" + controller1 + "pin: " + apparaat_poortNr1 + "});";

        if (led1_waarde >= 0) {
            Blockly.Arduino.setups_['setup_ledje_helderheid' + veranderlike1] = veranderlike1 + ".brightness(" + led1_waarde + ");";
        }

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_delay");

        var argument = Blockly.Arduino.valueToCode(this, 'F_EASYLED1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'F_EASYLED1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        led1_knipper_ms = led1_knipper_ms == null ? 10 : led1_knipper_ms;
        led1_knipper_ms = apparaat_state1 == "stop" ? "" : led1_knipper_ms;

        var code = veranderlike1 + "." + apparaat_state1 + "(" + led1_knipper_ms + ");\n";

        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + apparaat_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_delay = " + led1_knipper_ms + ";\n";
        code += "   } catch (fout1) {};\n";

        console.log(" ledje_knipper_fade code:\n" + code);
        console.log("ledje_knipper_fade: led1_knipper_ms=" + led1_knipper_ms);
    } catch (error4) {
        console.log("FOUT ledje_knipper_fade:\n" + error4);
    }
    return code;
};



// start servo1
Blockly.Arduino.servo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    var debugStap1 = 0
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('SERVO1_STAAT') || "ready";
        var debugStap1 = -1;
        var servo_invert = Blockly.Arduino.valueToCode(this, 'SERVO1_CENTER_ON_START', Blockly.Arduino.ORDER_ATOMIC) || false;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'SERVO1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 10;
        var apparaat_Actie1 = Blockly.Arduino.valueToCode(this, 'SERVO1_OPDRACHT_ACTIE', Blockly.Arduino.ORDER_ATOMIC) || "stop";

        var apparaat_type1 = "DEFAULT"; //this.getFieldValue('SERVO1_SENSOR');
        var sensor_naam1 = this.getFieldValue('ServoSG90_NAAM1') + veranderlike1;

        var servo1_range_start = Blockly.Arduino.valueToCode(this, 'SERVO1_RANGE_START', Blockly.Arduino.ORDER_ATOMIC) || 0;
        var servo1_range_end = Blockly.Arduino.valueToCode(this, 'SERVO1_RANGE_END', Blockly.Arduino.ORDER_ATOMIC) || 255;
        var controller1 = apparaat_type1 == "DEFAULT" ? "" : "controller: \"" + apparaat_type1 + "\", ";
        var globalVar1 = "var " + sensor_naam1 + " = '';";
        servo1_range_start = servo1_range_start == null ? servo1_range_start : 0;
        veranderlike1 = sensor_naam1;

        var servo1_moveto_start = Blockly.Arduino.valueToCode(this, 'SERVO1_OPDRACHT_ACTIE_WAARDE', Blockly.Arduino.ORDER_ATOMIC) || -1;
        var servo1_moveto_end = Blockly.Arduino.valueToCode(this, 'SERVO1_MOVETO_END', Blockly.Arduino.ORDER_ATOMIC) || -1;

        Blockly.Arduino.definitions_["SERVO1_sensor_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.setups_['setup_servo' + veranderlike1] = sensor_naam1 + " = new five.Servo({" + controller1 + "pin: " + apparaat_poortNr1 + ", startAt: " + servo1_range_start + ", invert: " + servo_invert + ", center: true});";

        if (Blockly.Variables.predefinedVars[sensor_naam1] == null) {
            Blockly.Variables.predefinedVars.push(sensor_naam1);
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_last");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_invert");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_isMoving");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_position");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_isMoving");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_value");
            Blockly.Variables.predefinedVars.push(sensor_naam1 + "_startAt");
        }

        var argument = Blockly.Arduino.valueToCode(this, 'SERVO1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'SERVO1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';

        var code = "";
        code = "function " + sensor_naam1 + "_setValues() {\n";
        code += "   try {\n";
        code += "        " + sensor_naam1 + "_staat = \"" + apparaat_state1 + "\";\n";
        code += "        " + sensor_naam1 + "_last = " + sensor_naam1 + ".last;\n";
        code += "        " + sensor_naam1 + "_invert = " + sensor_naam1 + ".last;\n";
        code += "        " + sensor_naam1 + "_isMoving = " + sensor_naam1 + ".isMoving;\n";
        code += "        " + sensor_naam1 + "_position = " + sensor_naam1 + ".position;\n";
        code += "        " + sensor_naam1 + "_value = " + sensor_naam1 + ".value;\n";
        code += "        " + sensor_naam1 + "_startAt = " + sensor_naam1 + ".startAt;\n";
        code += "   } catch (fout1) {\n   console.log('servo FOUT' + fout1 )\n };\n";
        code += "};\n";

        Blockly.Arduino.definitions_[sensor_naam1 + "_setValues"] = code;

        console.log("apparaat_Actie1=" + apparaat_Actie1);

        // die code is in een gebeurtenis, daarom helemaal skoon begin.
        code = "   try {\n";
        switch (apparaat_Actie1) {
            case "servo_to":
                code += "        " + sensor_naam1 + ".to(" + servo1_moveto_start + ");\n";
                break;
            case "servo_sweep":
                code += "        " + sensor_naam1 + ".sweep();\n";
                break;
            case "servo_home":
                code += "        " + sensor_naam1 + ".home();\n";
                break;
            case "servo_stop":
                code += "        " + sensor_naam1 + ".stop();\n";
                break;
            default:
                break;
        }

        code += "    " + branch;
        code += "    " + sensor_naam1 + "_setValues();\n";
        code += "   } catch (fout1) {\n    console.log('servo branch FOUT' + fout1 )\n };\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'SERVO1_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'SERVO1_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'SERVO1_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" servo1 code:\n" + code);
    } catch (error4) {
        console.log("FOUT servo1, stap=" + debugStap1 + ",\nfout=" + error4);
    }
    return code;
}; // eind CMD_servo1


Blockly.Arduino.declare_IR_Reflect_Array = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('DECLARE_IR_REFLECT1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_IR_REFLECT1_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_IR_REFLECT1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('DECLARE_IR_REFLECT1_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + " = '';\n";

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["IR_Reflect_Array_data" + veranderlike1] = " var " + sensor_naam1 + "_staat = '';";
        Blockly.Arduino.definitions_["IR_Reflect_Array_data2" + veranderlike1] = " var " + sensor_naam1 + "_line = '';";
        Blockly.Arduino.definitions_["IR_Reflect_Array_data3" + veranderlike1] = " var " + sensor_naam1 + "_raw = '';";
        Blockly.Arduino.definitions_["IR_Reflect_Array_data3" + veranderlike1] = globalVar1;
        Blockly.Arduino.setups_['setup_IR_Reflect_Array' + veranderlike1] = "  " + sensor_naam1 + " = new five.five.IR.Reflect.Array({controller: " + apparaat_type1 + ", pins: [" + apparaat_poortNr1 + "], freq: 25 });";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        console.log(" IR_REFLECT1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT IR_REFLECT1_close_open:\n" + error4);
    }
    return code + '\n';
}; // IR_Reflect_Array


Blockly.Arduino.event_IR_Reflect_Array = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('EVENT_IR_REFLECT1_STATE');
        var sensor_naam1 = this.getFieldValue('EVENT_IR_REFLECT1_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + " = '';\n";

        veranderlike1 = sensor_naam1;

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_IR_REFLECT1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_line = " + sensor_naam1 + ".line;\n";
        code += "     " + sensor_naam1 + "_raw = " + sensor_naam1 + ".raw;\n";
        code += "  " + branch + "\n";
        code += "});\n";

        console.log(" EVENT_IR_REFLECT1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT EVENT_IR_REFLECT1_close_open:\n" + error4);
    }
    return code + '\n';
}; // IR_Reflect_Array


Blockly.Arduino.AlertMelding = function() {
    var code = "";

    try {
        var tekst3 = Blockly.Arduino.valueToCode(this, 'ALERT_MELDING', Blockly.Arduino.ORDER_ATOMIC) || "'Hallo'";
        var veranderlike1 = Math.floor((Math.random() * 5) + 1);

        code += " console.log(" + tekst3 + ");\n";

    } catch (error65) {
        console.log("AlertMelding: " + error65);
    }
    return code;
};

Blockly.Arduino.declare_potentiometer = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('DECLARE_POTMETER1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_POTMETER1_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || "\"A3\"";
        var apparaat_type1 = this.getFieldValue('DECLARE_POTMETER1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('DECLARE_POTMETER1_NAAM1') + veranderlike1;
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_POTMETER1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || '50';
        var sensor_scale_min1 = Blockly.Arduino.valueToCode(this, 'DECLARE_POTMETER1_SCALEMIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
        var sensor_scale_max1 = Blockly.Arduino.valueToCode(this, 'DECLARE_POTMETER1_SCALEMAX', Blockly.Arduino.ORDER_ATOMIC) || '1024';
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = apparaat_type1 == "DIGITAL" ? "digital" : "analog";
        sensor_scale_max1 = sensor_scale_max1 > 180 ? 180 : sensor_scale_max1;
        sensor_scale_min1 = sensor_scale_min1 < 0 || sensor_scale_min1 > 180 ? 0 : sensor_scale_min1;
        Blockly.Arduino.definitions_["potmeter1_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["potmeter1_data4" + veranderlike1] = " var " + sensor_naam1 + "_raw = '';";
        Blockly.Arduino.setups_['potmeter1' + veranderlike1] = "  " + sensor_naam1 + " = new five.Sensor({pin: " + apparaat_poortNr1 + ", type: \"" + apparaat_type1 + "\", freq: " + sensor_freq1 + ", threshold: 5});";
        // Blockly.Arduino.setups_['potmeter1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);

        //console.log(" POTMETER1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT POTMETER1_close_open:\n" + error4);
    }
    return code + '\n';
}; // declare potentiometer

Blockly.Arduino.event_potentiometer = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('EVENT_POTMETER1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'EVENT_POTMETER1_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || "\"A3\"";
        var apparaat_type1 = this.getFieldValue('EVENT_POTMETER1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('EVENT_POTMETER1_NAAM1') + veranderlike1;
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'EVENT_POTMETER1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || '50';
        var sensor_scale_min1 = Blockly.Arduino.valueToCode(this, 'EVENT_POTMETER1_SCALEMIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
        var sensor_scale_max1 = Blockly.Arduino.valueToCode(this, 'EVENT_POTMETER1_SCALEMAX', Blockly.Arduino.ORDER_ATOMIC) || '1024';
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = apparaat_type1 == "DIGITAL" ? "digital" : "analog";
        sensor_scale_max1 = sensor_scale_max1 > 180 ? 180 : sensor_scale_max1;
        sensor_scale_min1 = sensor_scale_min1 < 0 || sensor_scale_min1 > 180 ? 0 : sensor_scale_min1;
        Blockly.Arduino.definitions_["potmeter1_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["potmeter1_data1" + veranderlike1] = " var " + sensor_naam1 + "_staat = '';";
        Blockly.Arduino.definitions_["potmeter1_data2" + veranderlike1] = " var " + sensor_naam1 + "_value = '';";
        Blockly.Arduino.definitions_["potmeter1_data3" + veranderlike1] = " var " + sensor_naam1 + "_scaled = '';";
        Blockly.Arduino.definitions_["potmeter1_data4" + veranderlike1] = " var " + sensor_naam1 + "_raw = '';";
        // Blockly.Arduino.setups_['potmeter1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_value");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_scaled");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_raw");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_POTMETER1_DO');
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".scale(" + sensor_scale_min1 + ", " + sensor_scale_max1 + ").on(\"" + switch_state1 + "\", function() {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_value = " + sensor_naam1 + ".value;\n";
        code += "     " + sensor_naam1 + "_scaled = " + sensor_naam1 + ".scaled;\n";
        code += "     " + sensor_naam1 + "_raw = " + sensor_naam1 + ".raw;\n";
        code += "  " + branch + "\n";
        code += "});\n";

        // console.log(" POTMETER1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT POTMETER1_close_open:\n" + error4);
    }
    return code + '\n';
}; // potentiometer


// LCD toegevoegd: 19-7-2017
Blockly.Arduino.I2C_LCD = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var random1 = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8).toUpperCase();
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = Blockly.Arduino.valueToCode(this, 'I2C_LCD1_STAT', Blockly.Arduino.ORDER_ASSIGNMENT) || "print";
        var apparaat_poortNr1 = this.getFieldValue('I2C_LCD1_POORTNUMMER');
        var apparaat_type1 = this.getFieldValue('I2C_LCD1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('I2C_LCD1_NAAM1') + veranderlike1;
        var i2c_kol1 = Blockly.Arduino.valueToCode(this, 'I2C_LCD1_POSX', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var i2c_ry1 = Blockly.Arduino.valueToCode(this, 'I2C_LCD1_POSY', Blockly.Arduino.ORDER_ASSIGNMENT) || 0;
        var i2c_text1 = this.getFieldValue('I2C_LCD1_TEXT');
        var i2c_adres = Blockly.Arduino.valueToCode(this, 'I2C_LCD1_ADRES', Blockly.Arduino.ORDER_ATOMIC) || "0x27";
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        if (i2c_text1 == null) {
            i2c_text1 = Blockly.Arduino.valueToCode(this, 'I2C_LCD1_TEXT', Blockly.Arduino.ORDER_ASSIGNMENT) || null;
        }

        veranderlike1 = sensor_naam1;
        i2c_kol1 = i2c_kol1 < 0 || i2c_kol1 > 16 ? 0 : i2c_kol1;
        i2c_ry1 = i2c_ry1 < 0 || i2c_ry1 > 2 ? 0 : i2c_ry1;
        Blockly.Arduino.definitions_["I2C_LCD1_naam" + veranderlike1] = "var " + sensor_naam1 + " = '';";
        Blockly.Arduino.definitions_["I2C_LCD1_staat" + veranderlike1] = "var " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        Blockly.Arduino.definitions_["I2C_LCD1_teks" + veranderlike1] = "var " + sensor_naam1 + "_teks = " + i2c_text1 + ";\n";
        Blockly.Arduino.definitions_["I2C_LCD1_kol" + veranderlike1] = "var " + sensor_naam1 + "_kol = " + i2c_kol1 + ";\n";
        Blockly.Arduino.definitions_["I2C_LCD1_ry" + veranderlike1] = "var " + sensor_naam1 + "_ry = " + i2c_ry1 + ";\n";
        Blockly.Arduino.setups_['I2C_' + veranderlike1] = "     " + sensor_naam1 + " = new five.LCD({controller: \"" + apparaat_type1 + "\"});";
        // Blockly.Arduino.setups_['I2C_LCD1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_teks");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_kol");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_ry");

        var argument = "";
        var branch = "";
        var code = "";
        var actie1 = "";

        switch (switch_state1) {
            case "print":
                actie1 += sensor_naam1 + ".print(" + i2c_text1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "printPos":
                actie1 += sensor_naam1 + ".home();\n";
                actie1 += "   " + sensor_naam1 + ".cursor(" + i2c_ry1 + ", " + i2c_kol1 + ").print(" + i2c_text1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "useChar":
                actie1 += sensor_naam1 + ".useChar(\"" + i2c_text1 + "\");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "clear":
                actie1 += sensor_naam1 + ".clear();\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "cursor":
                actie1 += sensor_naam1 + ".cursor(" + i2c_ry1 + ", " + i2c_kol1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "home":
                actie1 += sensor_naam1 + ".home();\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "on":
                actie1 += sensor_naam1 + ".on();\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "off":
                actie1 += sensor_naam1 + ".off();\n";
                actie1 += "     setTimeout(function() {  }, 0);\n";
                break;
            case "blink":
                actie1 += sensor_naam1 + ".blink();\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "noBlink":
                actie1 += sensor_naam1 + ".noBlink();\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "autoscroll":
                actie1 += sensor_naam1 + ".autoscroll().print(" + i2c_text1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "noAutoscroll":
                actie1 += sensor_naam1 + ".noAutoscroll().print(" + i2c_text1 + ");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            case "hallowereld":
                actie1 += sensor_naam1 + ".cursor(0, 0).print(\"" + "hallo wereld:" + random1 + "\");\n";
                actie1 += "     setTimeout(function() {  }, 3000);\n";
                break;
            default:
                break;
        }

        code += "   try {\n";
        code += "     " + actie1;
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_teks = " + i2c_text1 + ";\n";
        code += "     " + sensor_naam1 + "_kol = " + i2c_kol1 + ";\n";
        code += "     " + sensor_naam1 + "_ry = " + i2c_ry1 + ";\n";
        code += "   } catch (fout1) {\n     console.log(fout1);\n  };\n\n";

        code += "   setTimeout(function() {  }, 3000); // verplicht voor LCD, anders intitalisert hij niet.\n";

        console.log(" I2C_LCD.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT I2C_LCD:\n" + error4);
    }
    return code + '\n';
}; // einde I2C_LCD



Blockly.Arduino.kompas = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('KOMPAS1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'KOMPAS1_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('KOMPAS1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('KOMPAS1_NAAM1'); // + veranderlike1;
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'KOMPAS1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || '50';
        var sensor_scale_min1 = Blockly.Arduino.valueToCode(this, 'KOMPAS1_SCALEMIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
        var sensor_scale_max1 = Blockly.Arduino.valueToCode(this, 'KOMPAS1_SCALEMAX', Blockly.Arduino.ORDER_ATOMIC) || '1024';
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = apparaat_type1 == "MICROBIT" ? "" : "\"" + apparaat_type1 + "\"";
        sensor_scale_max1 = sensor_scale_max1 > 1024 ? 1024 : sensor_scale_max1;
        sensor_scale_min1 = sensor_scale_min1 < 0 || sensor_scale_min1 > 1024 ? 0 : sensor_scale_min1;
        Blockly.Arduino.definitions_["KOMPAS1_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["KOMPAS1_data1" + veranderlike1] = " var " + sensor_naam1 + "_richting = -1;";
        Blockly.Arduino.definitions_["KOMPAS1_data2" + veranderlike1] = " var " + sensor_naam1 + "_bearingPoint = -1;";
        Blockly.Arduino.definitions_["KOMPAS1_data3" + veranderlike1] = " var " + sensor_naam1 + "_abbr = '';";
        Blockly.Arduino.setups_['KOMPAS1' + veranderlike1] = " var " + sensor_naam1 + " = new five.Compass({pin: " + apparaat_poortNr1 + ", type: " + apparaat_type1 + ", gauss: 1.3 });";
        // Blockly.Arduino.setups_['KOMPAS1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_richting");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_bearingPoint");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_abbr");

        var argument = Blockly.Arduino.valueToCode(this, 'KOMPAS1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'KOMPAS1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".scale(" + sensor_scale_min1 + ", " + sensor_scale_max1 + ").on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_richting = " + sensor_naam1 + ".heading;\n";
        code += "     " + sensor_naam1 + "_bearingPoint = " + sensor_naam1 + ".bearing.point;\n";
        code += "     " + sensor_naam1 + "_bearingAbbr = " + sensor_naam1 + ".bearing.abbr;\n";
        code += "   } catch (fout1) {};\n";
        code += "   try {\n";
        code += "  " + branch + "\n";
        code += "   } catch (fout" + ErrNr1 + ") { console.log(fout" + ErrNr1 + ") };\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'KOMPAS1_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'KOMPAS1_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'KOMPAS1_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" KOMPAS1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT KOMPAS1_close_open:\n" + error4);
    }
    return code + '\n';
}; // kompas

Blockly.Arduino.test1 = function() {
    var ja_nee_null_waarde1 = this.getFieldValue('ja_nee_null_waarde');
    var code = "";
    code += ja_nee_null_waarde1;

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPS = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('GPS1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'GPS1_RX', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_poortNr2tx = Blockly.Arduino.valueToCode(this, 'GPS1_TX', Blockly.Arduino.ORDER_ATOMIC) || 10;
        var apparaat_type1 = this.getFieldValue('GPS1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('GPS1_NAAM1'); // + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["GPS1_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["GPS1_data1" + veranderlike1] = " var " + sensor_naam1 + "_breedtegraad = -1;";
        Blockly.Arduino.definitions_["GPS1_data2" + veranderlike1] = " var " + sensor_naam1 + "_lengtegraad = -1;";
        Blockly.Arduino.definitions_["GPS1_data3" + veranderlike1] = " var " + sensor_naam1 + "_snelheid = 0;";
        Blockly.Arduino.definitions_["GPS1_data3" + veranderlike1] = " var " + sensor_naam1 + "_rigting = 0;";
        Blockly.Arduino.definitions_["GPS1_data3" + veranderlike1] = " var " + sensor_naam1 + "_hoogte = 0;";
        Blockly.Arduino.definitions_["GPS1_data3" + veranderlike1] = " var " + sensor_naam1 + "_staat = '';";
        apparaat_type1 = ""; // apparaat_type1 != "GPS " ? +", breakout: " + apparaat_type1 : "";

        Blockly.Arduino.setups_['GPS1' + veranderlike1] = " var " + sensor_naam1 + " = new five.GPS({rx: " + apparaat_poortNr1 + ", tx: " + apparaat_poortNr2tx + apparaat_type1 + " });";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_breedtegraad");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_lengtegraad");

        var argument = Blockly.Arduino.valueToCode(this, 'GPS1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'GPS1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_breedtegraad = " + sensor_naam1 + ".latitude;\n";
        code += "     " + sensor_naam1 + "_lengtegraad = " + sensor_naam1 + ".longitude;\n";
        code += "     " + sensor_naam1 + "_snelheid = " + sensor_naam1 + ".speed;\n";
        code += "     " + sensor_naam1 + "_rigting = " + sensor_naam1 + ".course;\n";
        code += "     " + sensor_naam1 + "_hoogte = " + sensor_naam1 + ".height;\n";
        code += "   } catch (fout1) {};\n";
        code += "   try {\n";
        code += "  " + branch + "\n";
        code += "   } catch (fout" + ErrNr1 + ") { console.log(fout" + ErrNr1 + ") };\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'GPS1_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'GPS1_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'GPS1_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" GPS1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT GPS1_close_open:\n" + error4);
    }
    return code + '\n';
}; // gps

Blockly.Arduino.device_state = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";
    var windows_compoort1 = "";

    try {
        windows_compoort1 = this.getFieldValue('DEVICE1_STATE') == "null" ? null : "\"" + (this.getFieldValue('DEVICE1_STATE')) + "\"";
        code = windows_compoort1;
    } catch (error4) {
        console.log("FOUT DEVICE1_STATE:\n" + error4);
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Orientatiemodule = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('BNO055_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'BNO055_IO', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('BNO055_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('BNO055_NAAM1'); // + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["BNO055_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["BNO055_data1" + veranderlike1] = " var " + sensor_naam1 + "_quarternion_w = -1;";
        Blockly.Arduino.definitions_["BNO055_data2" + veranderlike1] = " var " + sensor_naam1 + "quarternion_x = -1;";
        Blockly.Arduino.definitions_["BNO055_data3" + veranderlike1] = " var " + sensor_naam1 + "_quarternion_y = 0;";
        Blockly.Arduino.definitions_["BNO055_data3" + veranderlike1] = " var " + sensor_naam1 + "_quarternion_z = 0;";
        Blockly.Arduino.definitions_["BNO055_data3" + veranderlike1] = " var " + sensor_naam1 + "_heading = 0;";
        Blockly.Arduino.definitions_["BNO055_data3" + veranderlike1] = " var " + sensor_naam1 + "_roll = null;";
        Blockly.Arduino.definitions_["BNO055_data3" + veranderlike1] = " var " + sensor_naam1 + "_pitch = null;";
        apparaat_type1 = ""; // apparaat_type1 != "GPS " ? +", breakout: " + apparaat_type1 : "";

        Blockly.Arduino.setups_['BNO055_' + veranderlike1] = " var " + sensor_naam1 + " = new five.GPS({pin: " + apparaat_poortNr1 + "});";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_quarternion_w");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "quarternion_x");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_quarternion_y");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_quarternion_z");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_heading");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_roll");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_pitch");

        var argument = Blockly.Arduino.valueToCode(this, 'BNO055_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'BNO055_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_quarternion_w = " + sensor_naam1 + ".quarternion.w;\n";
        code += "     " + sensor_naam1 + "_quarternion_x = " + sensor_naam1 + ".quarternion.x;\n";
        code += "     " + sensor_naam1 + "_quarternion_y = " + sensor_naam1 + ".quarternion.y;\n";
        code += "     " + sensor_naam1 + "_quarternion_z = " + sensor_naam1 + ".quarternion.z;\n";
        code += "     " + sensor_naam1 + "_heading = " + sensor_naam1 + ".heading;\n";
        code += "     " + sensor_naam1 + "_roll = " + sensor_naam1 + ".roll;\n";
        code += "     " + sensor_naam1 + "_pitch = " + sensor_naam1 + ".pitch;\n";
        code += "   } catch (fout1) {};\n";
        code += "   try {\n";
        code += "  " + branch + "\n";
        code += "   } catch (fout" + ErrNr1 + ") { console.log(fout" + ErrNr1 + ") };\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'BNO055_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'BNO055_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'BNO055_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" BNO055_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT BNO055_close_open:\n" + error4);
    }
    return code + '\n';
}; // orientatie


Blockly.Arduino.CapacitiveTouch = function() {
    // If/elseif/else condition.
    var n = 0;
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('TOUCH1_STATE');
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'TOUCH1_IO_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_PWMpoortNr1 = Blockly.Arduino.valueToCode(this, 'TOUCH1_IO_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 10;
        var apparaat_type1 = this.getFieldValue('TOUCH1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('TOUCH1_NAAM1') + veranderlike1;
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'TOUCH1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 50;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        veranderlike1 = sensor_naam1;
        apparaat_type1 = apparaat_type1 == "DIGITAL" ? "digital" : "analog";
        var sensor_scale_max1 = sensor_scale_max1 > 180 ? 180 : sensor_scale_max1;
        var sensor_scale_min1 = sensor_scale_min1 < 0 || sensor_scale_min1 > 180 ? 0 : sensor_scale_min1;
        Blockly.Arduino.definitions_["TOUCH1_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.definitions_["TOUCH1_data1" + veranderlike1] = " var " + sensor_naam1 + "_staat = '';";
        Blockly.Arduino.definitions_["TOUCH1_data2" + veranderlike1] = " var " + sensor_naam1 + "_value = '';";
        Blockly.Arduino.definitions_["TOUCH1_data3" + veranderlike1] = " var " + sensor_naam1 + "_scaled = '';";
        Blockly.Arduino.definitions_["TOUCH1_data4" + veranderlike1] = " var " + sensor_naam1 + "_raw = '';";
        Blockly.Arduino.setups_['CapacitiveTouch' + veranderlike1] = " var " + sensor_naam1 + " = new five.Sensor({pin: " + apparaat_poortNr1 + ", type: \"" + apparaat_type1 + "\", freq: " + sensor_freq1 + ", threshold: 5});";
        // Blockly.Arduino.setups_['TOUCH1_scale' + veranderlike1] = sensor_naam1 + ".scaleTo(0, " + sensor_freq1 + ");";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_value");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_scaled");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_raw");

        var argument = Blockly.Arduino.valueToCode(this, 'TOUCH1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'TOUCH1_DO' + n);
        //  var code = 'if (' + argument + ') {\n' + branch + '\n}';
        var code = "\n" + sensor_naam1 + ".scale(" + sensor_scale_min1 + ", " + sensor_scale_max1 + ").on(\"" + switch_state1 + "\", function() {\n";
        code += "   try {\n";
        code += "     " + sensor_naam1 + "_staat = \"" + switch_state1 + "\";\n";
        code += "     " + sensor_naam1 + "_value = " + sensor_naam1 + ".value;\n";
        code += "     " + sensor_naam1 + "_scaled = " + sensor_naam1 + ".scaled;\n";
        code += "     " + sensor_naam1 + "_raw = " + sensor_naam1 + ".raw;\n";
        code += "   } catch (fout1) {};\n";
        code += "   try {\n";
        code += "  " + branch + "\n";
        code += "   } catch (fout" + ErrNr1 + ") { console.log(fout" + ErrNr1 + ") };\n";
        code += "});\n";

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'TOUCH1_IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'TOUCH1_DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'TOUCH1_ELSE');
            code += ' else {\n' + branch + '}';
        }
        console.log(" TOUCH1_close_open.branch:\n" + branch);
    } catch (error4) {
        console.log("FOUT TOUCH1_close_open:\n" + error4);
    }
    return code + '\n';
}; // einde CapacitiveTouch


Blockly.Arduino.motorshield = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('MOTORSHIELD1_STATE') || "START";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'MOTORSHIELD1_IO_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('MOTORSHIELD1_CONTROLLER1');
        var sensor_naam1 = this.getFieldValue('MOTORSHIELD1_NAAM1') + veranderlike1;
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'MOTORSHIELD1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 50;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        var motorshield1_opdracht = Blockly.Arduino.valueToCode(this, "MOTORSHIELD1_DOEN", Blockly.Arduino.ORDER_ATOMIC) || "VORENTOE_VOLGAS";
        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["MOTORSHIELD1_data" + veranderlike1] = globalVar1;

        var init_component = "";
        var pwm_poortNr1 = -1;
        var dir_poortNr1 = -1;

        switch (apparaat_type1) {
            case "DEFAULT": //easylab4kids
                if (sensor_naam1 == "L923motorshield_l_voor" || sensor_naam1 == "L923motorshield_l_achter") {
                    pwm_poortNr1 = 3;
                    dir_poortNr1 = 6
                }
                if (sensor_naam1 == "L923motorshield_r_voor" || sensor_naam1 == "L923motorshield_r_achter") {
                    pwm_poortNr1 = 5;
                    dir_poortNr1 = 9
                }
                Blockly.Arduino.setups_['motorshield' + veranderlike1] = " var " + sensor_naam1 + " = new five.Motor({pins: {pwm: " + pwm_poortNr1 + ", dir: " + dir_poortNr1 + ", }});";
                Blockly.Arduino.setups_['motorshield_init' + veranderlike1] = " var " + sensor_naam1 + " = new five.Motor({pins: {pwm: " + pwm_poortNr1 + ", dir: " + dir_poortNr1 + ", }});";
                break;
            case "ARDUINO_MOTOR_SHIELD_R3_1":
                if (apparaat_poortNr1 == "L923wiel_voor_R1") { pwm_poortNr1 = 3; }
                Blockly.Arduino.setups_['motorshield' + veranderlike1] = " var " + sensor_naam1 + " = new five.Motor({pwm: " + apparaat_poortNr1 + ", CONTROLLER: \"" + apparaat_type1 + "\", freq: " + sensor_freq1 + ", threshold: 5});";
                break;
            default:
                break;
        }

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_opdracht");

        var branch = Blockly.Arduino.statementToCode(this, 'MOTORSHIELD1_DO' + n);

        code += "     " + sensor_naam1 + "_opdracht = \"" + motorshield1_opdracht + "\";\n";
        switch (motorshield1_opdracht) {
            case "START":
                code += "     " + sensor_naam1 + ".start();\n";
                break;
            case "STOP":
                code += "     " + sensor_naam1 + ".stop();\n";
                break;
            case "VORENTOE_VOLGAS":
                code += "     " + sensor_naam1 + ".forward(255);\n";
                break;
            case "VORENTOE_HALF":
                code += "     " + sensor_naam1 + ".forward(120);\n";
                break;
            case "AGTERTOE_VOLGAS":
                code += "     " + sensor_naam1 + ".reverse(255);\n";
                break;
            case "AGTERTOE_HALF":
                code += "     " + sensor_naam1 + ".reverse(120);\n";
                break;
            case "REM_HALF":
                code += "     " + sensor_naam1 + ".brake(120);\n";
                break;
            case "REM_LOSLATEN":
                code += "     " + sensor_naam1 + ".release();\n";
                break;
            default:
                break;
        }

        if (branch != null) {
            code += "  " + branch + "\n";
        }

        // console.log(" motorshield:\n" + branch);
    } catch (error4) {
        console.log("FOUT motorshield:\n" + error4);
    }
    return code + '\n';
}; // einde motorshield


Blockly.Arduino.declare_digitalReadWrite = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('DECLARE_DIGITALREAD1_NAAM1');
        // var sensor_naam1 = this.getFieldValue('DECLARE_DIGITALREAD1_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_DIGITALREAD1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_pinMode1 = Blockly.Arduino.valueToCode(this, 'DECLARE_DIGITALREAD1_IO_PINMODE', Blockly.Arduino.ORDER_ATOMIC) || "BOARD_INPUT";
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        apparaat_pinMode1 = apparaat_pinMode1.substr("BOARD_".length);

        if (apparaat_pinMode1 == "INPUT" || apparaat_pinMode1 == "OUTPUT" || apparaat_pinMode1 == "SERVO" || apparaat_pinMode1 == "PWM" || apparaat_pinMode1 == "ANALOG") {
            code = "this.pinMode(" + apparaat_poortNr1 + ", five.pinMode." + apparaat_pinMode1 + ");\n";
        } else {
            console.log("FOUT declare_digitalReadWrite: ongeldig pinmode " + apparaat_pinMode1);
        }
    } catch (error4) {
        console.log("FOUT motion_data_change_motionstart:\n" + error4);
    }
    return code + '\n';
}; // eind declare_digitalReadWrite


Blockly.Arduino.event_digitalReadWrite = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('EVENT_DIGITALREAD1_STAAT');
        var sensor_naam1 = this.getFieldValue('EVENT_DIGITALREAD1_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'EVENT_DIGITALREAD1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_doen1 = Blockly.Arduino.valueToCode(this, 'EVENT_DIGITALREAD1_DOEN', Blockly.Arduino.ORDER_ATOMIC) || "digitalRead";
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["event_digitalReadWrite" + sensor_naam1] = globalVar1;

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_DIGITALREAD_DO');
        var code = "this." + apparaat_doen1 + "(" + apparaat_poortNr1 + ", function(value) {\n";
        code += " try {\n";
        code += "      " + sensor_naam1 + "_waarde = value;\n"
        code += "      " + sensor_naam1 + "_staat =  \"" + apparaat_state1 + "\";\n"
        code += "      " + branch + "\n";
        code += " } catch (fout1) { console.log(fout1) };\n";
        code += "});\n";

        // console.log(" event_digitalReadWrite code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_digitalReadWrite:\n" + error4);
    }
    return code + '\n';
}; // eind event_digitalReadWrite


// toegevoegd 3-10-2017
Blockly.Arduino.declare_relay = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = this.getFieldValue('DECLARE_RELAY_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_RELAY_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_RELAY_CONTROLLER1');
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["setup_DECLARE_RELAY_" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['setup_DECLARE_RELAY_' + sensor_naam1] = " " + sensor_naam1 + " = new five.Relay({type: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + "});";

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_type");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");
    } catch (error4) {
        console.log("FOUT declare_relay:\n" + error4);
    }
    return code + '\n';
}; // eind declare_relay


Blockly.Arduino.cmd_relay = function() {
    var n = 0;
    var code = "";

    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = this.getFieldValue('CMD_RELAY_NAAM1') + veranderlike1;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'CMD_RELAY_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_doen1 = Blockly.Arduino.valueToCode(this, 'CMD_RELAY_DOEN', Blockly.Arduino.ORDER_ATOMIC) || "RELAY_open";
        var apparaat_poortWaarde1 = Blockly.Arduino.valueToCode(this, 'CMD_RELAY_VALUE', Blockly.Arduino.ORDER_ATOMIC) || -1;

        apparaat_doen1 = apparaat_doen1.substr("RELAY_".length);

        if (apparaat_doen1 == "open" || apparaat_doen1 == "close" || apparaat_doen1 == "toggle") {
            code = " " + sensor_naam1 + "_staat = \"" + apparaat_doen1 + "\";\n";
            code += " " + sensor_naam1 + "." + apparaat_doen1 + "();\n";
        } else {
            console.log(" cmd_relay: '" + apparaat_doen1 + "'. onbekend relay opdrag:" + apparaat_doen1);
        }
        // console.log("cmd_relay: apparaat_doen1= " + apparaat_doen1);
    } catch (error4) {
        console.log("FOUT event_digitalReadWrite:\n" + error4);
    }
    return code + '\n';
}; // eind cmd_relay


Blockly.Arduino.cmd_relay_staat_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_RELAY_STAAT_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_relay_staat_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Piezo buzzer
Blockly.Arduino.declare_piezo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var piezo1 = ""; // = "var piezo1" + veranderlike1 + ";\n // afstand in centimer";
        var sensor_naam1 = "";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_PIEZO_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_F_PIEZO_SENSOR');
        var piezo_naam1 = this.getFieldValue('DECLARE_PIEZO_NAAM1') + veranderlike1;
        var globalVar1 = "var " + piezo_naam1 + ";\n";

        sensor_naam1 = piezo_naam1;

        Blockly.Arduino.definitions_["declare_piezo_buzzer_data" + piezo_naam1] = globalVar1;
        Blockly.Arduino.setups_['declare_setup_piezo_buzzer_data' + piezo_naam1] = "  " + piezo_naam1 + " = new five.Piezo({controller: " + apparaat_type1 + ", pin: " + apparaat_poortNr1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(piezo_naam1);
        Blockly.Variables.predefinedVars.push(piezo_naam1 + "_playing");

        var code = "";

        // console.log(" piezo_buzzer_data code:\n" + code);
    } catch (error4) {
        console.log("FOUT declare_piezo1:\n" + error4);
    }
    return code + '\n';
};

Blockly.Arduino.cmd_piezo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var piezo1 = ""; // = "var piezo1" + veranderlike1 + ";\n // afstand in centimer";
        var sensor_naam1 = "";
        var apparaat_state1 = this.getFieldValue('CMD_F_PIEZO_STAAT');
        var piezo_naam1 = this.getFieldValue('CMD_PIEZO_NAAM1') + veranderlike1;
        var piezo_Liedje1 = Blockly.Arduino.valueToCode(this, 'CMD_PIEZO_MUZIEK1', Blockly.Arduino.ORDER_ATOMIC) || null;
        var piezo_Beat1 = Blockly.Arduino.valueToCode(this, 'CMD_PIEZO_BEAT1', Blockly.Arduino.ORDER_ATOMIC) || null;
        var piezo_Tempo1 = Blockly.Arduino.valueToCode(this, 'CMD_PIEZO_TEMPO1', Blockly.Arduino.ORDER_ATOMIC) || null;
        var globalVar1 = "var " + piezo_naam1 + ";\n";

        sensor_naam1 = piezo_naam1;
        piezo_Liedje1 = piezo_Liedje1 == null || piezo_Liedje1 == "" ? "null" : piezo_Liedje1;
        piezo_Beat1 = piezo_Beat1 == null ? "null" : piezo_Beat1;
        piezo_Tempo1 = piezo_Tempo1 == null ? "null" : piezo_Tempo1;

        Blockly.Arduino.definitions_["CMD_piezo_buzzer_data" + piezo_naam1] = globalVar1;

        Blockly.Variables.predefinedVars.push(piezo_naam1 + "_playing");

        // code += " " + funcName + ".repl.inject({ piezo: " + piezo_naam1 + "}); // Injects the piezo into the repl.\n"

        code = "";
        code += " " + piezo_naam1 + "_playing = true;\n";
        code += " " + piezo_naam1 + ".play({\n";
        code += "   song: " + piezo_Liedje1 + ",\n";
        code += "   beats: " + piezo_Beat1 + ",\n";
        code += "   tempo: " + piezo_Tempo1 + "});\n";
        code += piezo_naam1 + "_playing = false";

        // console.log(" cmd_piezo1 code:\n" + code);
    } catch (error4) {
        console.log("FOUT cmd_piezo1:\n" + error4);
    }
    return code + '\n';
};


Blockly.Arduino.cmd_piezo1_tempo_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_PIEZO_TEMPO1_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_piezo1_tempo_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.cmd_piezo1_beat_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_PIEZO_BEAT1_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_piezo1_beat_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.cmd_piezo1_voorbeeldlied_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_PIEZO_VOORBEELDLIED1_LIJST');
    } catch (error4) {
        console.log("FOUT inputoutput.cmd_piezo1_beat_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.declare_hygrometer = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = "";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_HYGRO_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_HYGRO_SENSOR');
        var sensor_naam1 = this.getFieldValue('DECLARE_HYGRO_NAAM1') + veranderlike1;
        var apparaat_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_HYGRO_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 25;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        Blockly.Arduino.definitions_["declare_HYGRO_" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['declare_setup_HYGRO_' + sensor_naam1] = "  " + sensor_naam1 + " = new five.Hygrometer({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + ", freq: " + apparaat_freq1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_id");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_relativeHumidity");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        var code = "";

        // console.log(" declare_hygrometer code:\n" + code);
    } catch (error4) {
        console.log("FOUT declare_hygrometer:\n" + error4);
    }
    return code + '\n';
};

Blockly.Arduino.event_hygrometer = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('EVENT_HYGRO_SENSOR_STAAT');
        var sensor_naam1 = this.getFieldValue('EVENT_HYGRO_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_HYGRO_DO');
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "        " + sensor_naam1 + "_relativeHumidity = " + sensor_naam1 + ".relativeHumidity;\n"
        code += "        " + sensor_naam1 + "_staat =  \"" + apparaat_state1 + "\";\n"
        code += "        " + branch + "\n";
        code += "});\n";

        // console.log(" event_hygrometer code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_hygrometer:\n" + error4);
    }
    return code + '\n';
}; // eind event_hygrometer

Blockly.Arduino.test_event_header = function() {
    var n = 0;
    var code = "";
    return code + '\n';
}; // eind test_event_header

Blockly.Arduino.declare_barometer = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = "";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_BARO_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_BARO_SENSOR');
        var sensor_naam1 = this.getFieldValue('DECLARE_BARO_NAAM1') + veranderlike1;
        var apparaat_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_BARO_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 25;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        Blockly.Arduino.definitions_["declare_BARO_" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['declare_setup_BARO_' + sensor_naam1] = "  " + sensor_naam1 + " = new five.Barometer({controller: \"" + apparaat_type1 + "\", pin: " + apparaat_poortNr1 + ", freq: " + apparaat_freq1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_id");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_pressure");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        var code = "";

        // console.log(" declare_barometer code:\n" + code);
    } catch (error4) {
        console.log("FOUT declare_barometer:\n" + error4);
    }
    return code + '\n';
};

Blockly.Arduino.event_barometer = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('EVENT_BARO_SENSOR_STAAT');
        var sensor_naam1 = this.getFieldValue('EVENT_BARO_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_BARO_DO');
        code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "        " + sensor_naam1 + "_id = " + sensor_naam1 + ".id;\n"
        code += "        " + sensor_naam1 + "_pressure = " + sensor_naam1 + ".pressure;\n"
        code += "        " + sensor_naam1 + "_staat =  \"" + apparaat_state1 + "\";\n"
        code += "        " + branch + "\n";
        code += "});\n";

        // console.log(" event_barometer code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_barometer:\n" + error4);
    }
    return code + '\n';
}; // eind event_barometer

// photoresistor toegevoegd 13-10-2017
Blockly.Arduino.declare_photoresistor = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var sensor_naam1 = "";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_PHOTORESISTOR_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || "\"A3\"";
        var apparaat_type1 = this.getFieldValue('DECLARE_PHOTORESISTOR_SENSOR') || null;
        var sensor_naam1 = this.getFieldValue('DECLARE_PHOTORESISTOR_NAAM1') + veranderlike1;
        var apparaat_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_PHOTORESISTOR_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 250;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        Blockly.Arduino.definitions_["DECLARE_PHOTORESISTOR_" + sensor_naam1] = globalVar1;
        Blockly.Arduino.setups_['DECLARE_PHOTORESISTOR_setup_' + sensor_naam1] = "  " + sensor_naam1 + " = new five.Sensor({pin: " + apparaat_poortNr1 + ", freq: " + apparaat_freq1 + "});";

        // Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_waarde");

        var code = "";

        // console.log(" declare_barometer code:\n" + code);
    } catch (error4) {
        console.log("FOUT declare_photoresistor:\n" + error4);
    }
    return code + '\n';
};

Blockly.Arduino.event_photoresistor = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('EVENT_PHOTORESISTOR_STAAT');
        var sensor_naam1 = this.getFieldValue('EVENT_PHOTORESISTOR_NAAM1') + veranderlike1;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_PHOTORESISTOR_DO');
        code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "        " + sensor_naam1 + "_waarde = " + sensor_naam1 + ".value;\n"
        code += "        " + branch + "\n";
        code += "});\n";

        // console.log(" event_photoresistor code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_photoresistor:\n" + error4);
    }
    return code + '\n';
}; // eind event_hygrometer