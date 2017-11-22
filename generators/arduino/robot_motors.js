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
 * @fileoverview Robot motors generator blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */

goog.provide('Blockly.Arduino.motors');

goog.require('Blockly.Arduino');

Blockly.Arduino.event_motor_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('MOTOR_EVENTS_LIJST1');
    } catch (error4) {
        console.log("FOUT inputoutput.ArduinoPinMode:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.event_motor = function() {
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = Blockly.Arduino.valueToCode(this, 'EVENT_MOTOR_DOEN1', Blockly.Arduino.ORDER_ATOMIC) || "stop";
        var sensor_naam1 = Blockly.Arduino.valueToCode(this, 'EVENT_MOTOR_NAAM1', Blockly.Arduino.ORDER_ATOMIC);
        var globalVar1 = "var " + sensor_naam1 + ";\n";
        Blockly.Arduino.definitions_["setup_event_motor" + sensor_naam1] = globalVar1;

        apparaat_state1 = apparaat_state1.substr("motor_".length);

        //Blockly.Variables.predefinedVars = [];
        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_waarde");
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_staat");

        var branch = Blockly.Arduino.statementToCode(this, 'EVENT_MOTOR_DO');
        var code = sensor_naam1 + ".on(\"" + apparaat_state1 + "\", function() {\n";
        code += "  " + branch + "\n";
        code += "});\n";

        // console.log(" event_motor code:\n" + code);
    } catch (error4) {
        console.log("FOUT event_motor:\n" + error4);
    }
    return code + '\n';
}; // eind event_motor


Blockly.Arduino.declare_motorshield = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('DECLARE_MOTORSHIELD1_STATE') || "START";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_MOTORSHIELD1_IO_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('DECLARE_MOTORSHIELD1_CONTROLLER1');
        var sensor_naam1 = Blockly.Arduino.valueToCode(this, 'DECLARE_MOTORSHIELD1_NAAM1', Blockly.Arduino.ORDER_ATOMIC) || "motor_l";
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'DECLARE_MOTORSHIELD1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 50;
        var globalVar1 = "var " + sensor_naam1 + ";\n";

        var motorshield1_opdracht = Blockly.Arduino.valueToCode(this, "DECLARE_MOTORSHIELD1_DOEN", Blockly.Arduino.ORDER_ATOMIC) || "VORENTOE_VOLGAS";
        veranderlike1 = sensor_naam1;
        Blockly.Arduino.definitions_["DECLARE_MOTORSHIELD1_data" + veranderlike1] = globalVar1;

        var init_component = "";
        var pwm_poortNr1 = -1;
        var dir_poortNr1 = -1;

        switch (apparaat_type1) {
            case "DEFAULT": //easylab4kids
                if (sensor_naam1 == "L923motorshield_l_voor" || sensor_naam1 == "L923motorshield_l_achter") {
                    pwm_poortNr1 = 3;
                    dir_poortNr1 = 5
                }
                if (sensor_naam1 == "L923motorshield_r_voor" || sensor_naam1 == "L923motorshield_r_achter") {
                    pwm_poortNr1 = 6;
                    dir_poortNr1 = 9
                }
                Blockly.Arduino.setups_['DECLARE_motorshield' + veranderlike1] = "  " + sensor_naam1 + " = new five.Motor({pins: {pwm: " + pwm_poortNr1 + ", dir: " + dir_poortNr1 + "}, invertPWM: true});";
                break;
            case "ARDUINO_MOTOR_SHIELD_R3_1":
                break;
            default:
                if (apparaat_poortNr1 == "L923wiel_voor_R1") { pwm_poortNr1 = 3; }
                Blockly.Arduino.setups_['DECLARE_motorshield' + veranderlike1] = "  " + sensor_naam1 + " = new five.Motor({pwm: " + apparaat_poortNr1 + ", CONTROLLER: \"" + apparaat_type1 + "\", freq: " + sensor_freq1 + ", threshold: 5, invertPWM: true});";
                break;
        }

        // Blockly.Arduino.setups_['DECLARE_motorshield_stop' + veranderlike1] = sensor_naam1 + ".stop();  //voorkom dat jou robot op hol slaan.";

        Blockly.Variables.predefinedVars.push(sensor_naam1);
        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_opdracht");

        // console.log(" motorshield:\n" + branch);
    } catch (error4) {
        console.log("FOUT motorshield:\n" + error4);
    }
    return code + '\n';
}; // einde declare_motorshield


Blockly.Arduino.cmd_motorshield = function() {
    // If/elseif/else condition.
    var n = 0;
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var ErrNr1 = Math.floor((Math.random() * 100) + 1);
        var switch_state1 = this.getFieldValue('CMD_MOTORSHIELD1_STATE') || "START";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'CMD_MOTORSHIELD1_IO_POORTNUMMER', Blockly.Arduino.ORDER_ATOMIC) || 8;
        var apparaat_type1 = this.getFieldValue('CMD_MOTORSHIELD1_CONTROLLER1');
        var sensor_naam1 = Blockly.Arduino.valueToCode(this, 'CMD_MOTORSHIELD1_NAAM1', Blockly.Arduino.ORDER_ATOMIC) || "motor_l";
        var sensor_freq1 = Blockly.Arduino.valueToCode(this, 'CMD_MOTORSHIELD1_FREQ', Blockly.Arduino.ORDER_ATOMIC) || 50;
        var sensor_waarde1 = Blockly.Arduino.valueToCode(this, 'CMD_MOTORSHIELD1_WAARDE', Blockly.Arduino.ORDER_ATOMIC) || 0;

        var motorshield1_opdracht = Blockly.Arduino.valueToCode(this, "CMD_MOTORSHIELD1_DOEN", Blockly.Arduino.ORDER_ATOMIC) || "VORENTOE_VOLGAS";
        veranderlike1 = sensor_naam1;

        var init_component = "";
        var pwm_poortNr1 = -1;
        var dir_poortNr1 = -1;

        Blockly.Variables.predefinedVars.push(sensor_naam1 + "_opdracht");

        var branch = Blockly.Arduino.statementToCode(this, 'CMD_MOTORSHIELD1_DO' + n);

        code += "   " + sensor_naam1 + "_opdracht = '" + motorshield1_opdracht.substr("motor_".length) + "';\n";
        code += "   " + sensor_naam1 + "_waarde = " + sensor_waarde1 + ";\n";

        switch (motorshield1_opdracht) {
            case "motor_start":
                code += "     " + sensor_naam1 + ".start();\n";
                break;
            case "motor_stop":
                code += "     " + sensor_naam1 + ".stop();\n";
                break;
            case "motor_forward_full":
                code += "     " + sensor_naam1 + ".forward(255);\n";
                break;
            case "motor_forward":
                code += "     " + sensor_naam1 + ".forward(" + sensor_waarde1 + ");\n";
                break;
            case "motor_brake_release":
                code += "     " + sensor_naam1 + ".release();\n";
                break;
            case "motor_brake":
                code += "     " + sensor_naam1 + ".brake(" + sensor_waarde1 + ");\n";
                break;
            case "motor_brake_full":
                code += "     " + sensor_naam1 + ".brake(255);\n";
                break;
            case "VORENTOE_SNELHEID":
                code += "     " + sensor_naam1 + ".forward(" + sensor_waarde1 + ");\n";
                break;
            case "motor_reverse":
                code += "     " + sensor_naam1 + ".reverse(" + sensor_waarde1 + ");\n";
                break;
            case "motor_reverse_full":
                code += "     " + sensor_naam1 + ".reverse(255);\n";
                break;
            default:
                break;
        }

        // console.log(" cmd_motorshield:\n" + branch);
    } catch (error4) {
        console.log("FOUT cmd_motorshield:\n" + error4);
    }
    return code + '\n';
}; // einde cmd_motorshield


Blockly.Arduino.cmd_motor_lijst = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('CMD_MOTORSHIELD1_LIJST');
    } catch (error4) {
        console.log("FOUT robotmotors.cmd_motor_lijst:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.motorshield_opdracht = function() {
    // datum en tyd
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('MOTORSHIELD1_OPDRACHT');
    } catch (error4) {
        console.log("FOUT inputoutput.motorshield_opdracht:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


// servo
Blockly.Arduino.declare_servo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    var debugStap1 = 0
    var code = "";
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var debugStap1 = -1;
        var servo_invert = Blockly.Arduino.valueToCode(this, 'DECLARE_SERVO1_CENTER_ON_START', Blockly.Arduino.ORDER_ATOMIC) || false;
        var apparaat_Actie1 = Blockly.Arduino.valueToCode(this, 'DECLARE_SERVO1_OPDRACHT_ACTIE', Blockly.Arduino.ORDER_ATOMIC) || "stop";
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'DECLARE_SERVO1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 10;
        var sensor_naam1 = this.getFieldValue('DECLARE_ServoSG90_NAAM1');
        var servo1_range_start = 0;

        var apparaat_type1 = "DEFAULT"; //this.getFieldValue('SERVO1_SENSOR');

        var controller1 = apparaat_type1 == "DEFAULT" ? "" : "controller: \"" + apparaat_type1 + "\", ";
        var globalVar1 = "var " + sensor_naam1 + " = '';";
        veranderlike1 = sensor_naam1;

        Blockly.Arduino.definitions_["DECLARE_SERVO1_sensor_data" + veranderlike1] = globalVar1;
        Blockly.Arduino.setups_['DECLARE_setup_servo' + veranderlike1] = sensor_naam1 + " = new five.Servo({" + controller1 + "pin: " + apparaat_poortNr1 + ", startAt: " + servo1_range_start + ", invert: " + servo_invert + ", center: true});";

        // console.log(" servo1 code:\n" + code);
    } catch (error4) {
        console.log("FOUT servo1, stap=" + debugStap1 + ",\nfout=" + error4);
    }
    return code;
}; // eind declare_servo1


// servo
Blockly.Arduino.cmd_servo1 = function() {
    // If/elseif/else condition.
    var n = 0;
    var debugStap1 = 0
    try {
        var veranderlike1 = ""; // Math.floor((Math.random() * 100) + 1);
        var apparaat_state1 = this.getFieldValue('SERVO1_STAAT') || "ready";
        var debugStap1 = -1;
        var servo_invert = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_CENTER_ON_START', Blockly.Arduino.ORDER_ATOMIC) || false;
        var apparaat_poortNr1 = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_IO_POORT', Blockly.Arduino.ORDER_ATOMIC) || 10;
        var apparaat_Actie1 = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_OPDRACHT_ACTIE', Blockly.Arduino.ORDER_ATOMIC) || "stop";

        var apparaat_type1 = "DEFAULT"; //this.getFieldValue('SERVO1_SENSOR');
        var sensor_naam1 = this.getFieldValue('CMD_ServoSG90_NAAM1') + veranderlike1;

        var servo1_range_start = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_RANGE_START', Blockly.Arduino.ORDER_ATOMIC) || 0;
        var servo1_range_end = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_RANGE_END', Blockly.Arduino.ORDER_ATOMIC) || 255;
        var controller1 = apparaat_type1 == "DEFAULT" ? "" : "controller: \"" + apparaat_type1 + "\", ";
        var globalVar1 = "var " + sensor_naam1 + " = '';";
        servo1_range_start = servo1_range_start == null ? servo1_range_start : 0;
        veranderlike1 = sensor_naam1;

        var servo1_moveto_start = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_OPDRACHT_ACTIE_WAARDE', Blockly.Arduino.ORDER_ATOMIC) || -1;
        var servo1_moveto_end = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_MOVETO_END', Blockly.Arduino.ORDER_ATOMIC) || -1;


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

        var argument = Blockly.Arduino.valueToCode(this, 'CMD_SERVO1_IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';
        var branch = Blockly.Arduino.statementToCode(this, 'CMD_SERVO1_DO' + n);
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

        // console.log(" servo1 code:\n" + code);
    } catch (error4) {
        console.log("FOUT servo1, stap=" + debugStap1 + ",\nfout=" + error4);
    }
    return code;
};

Blockly.Arduino.servo1_actie_opdracht = function() {
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        code = this.getFieldValue('SERVO1_OPDRACHT');
    } catch (error4) {
        console.log("FOUT robotmotor.servo1_actie_opdracht:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.get_servo1_values = function() {
    var veranderlike1 = Math.floor((Math.random() * 5) + 1);
    var code = "";

    try {
        var servo1_actie_opdracht = this.getFieldValue('GET_SERVO1_OPDRACHT_VALUE');
        var sensor_naam1 = this.getFieldValue('GET_ServoSG90_VALUES_NAAM1') + veranderlike1;

        servo1_actie_opdracht = code.substr("servo_".length) > 0;
        if (servo1_actie_opdracht) {
            code = sensor_naam1 + "." + servo1_actie_opdracht;
        }
    } catch (error4) {
        console.log("FOUT robotmotor.get_servo1_values:\n" + error4);
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};