/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Robot motor blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
goog.provide('Blockly.Blocks.motors');

goog.require('Blockly.Blocks');

Blockly.Blocks['event_motor'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = "";
        var globalVar1 = "var motor2" + veranderlike1 + ";\n";
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(44);

        this.appendValueInput("EVENT_MOTOR_NAAM1", "String")
            .appendField(" Welke motortje? ")
            .setCheck("String");


        this.appendValueInput("EVENT_MOTOR_DOEN1", "String")
            .appendField(" Doen Wanneer..")
            .setCheck("String");

        this.appendStatementInput('EVENT_MOTOR_DO')
            .appendField(new Blockly.FieldImage("http://www.nyplatform.com/image/cache/data/Robot/Motor%20Servo/Gear%20Motor%20x2%20+%20PLASTIC%20TIRES%20x2/LT-8-700x700.jpg", 32, 32));

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde event_motor


Blockly.Blocks['event_motor_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(42);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["motor Stop", "motor_stop"],
                ["motor Starten", "motor_start"],
                ["motor Voorwaarts", "motor_forward"],
                ["motor Achteruit", "motor_reverse"],
                ["motor Remmen gebruiken", "motor_brake"],
                ["motor Remmen loslaten", "motor_release"]
            ]), 'MOTOR_EVENTS_LIJST1')
        this.setOutput(true, 'String');
        this.setTooltip('robot motor events');
    }
};

Blockly.Blocks['declare_motorshield'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var motorDriver" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(40); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput('DECLARE_MOTORSHIELD1_DO0')
            .appendField(new Blockly.FieldImage("http://www.nyplatform.com/image/cache/data/Robot/Motor%20Servo/Gear%20Motor%20x2%20+%20PLASTIC%20TIRES%20x2/LT-8-700x700.jpg", 32, 32))
            .appendField("Robotmotor L293D");

        this.appendValueInput("DECLARE_MOTORSHIELD1_NAAM1", "String")
            .appendField(" Welke motortje? ")
            .setCheck("String");

        this.appendDummyInput()
            .appendField(" Soort motorshield: ")
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab4Kids Arduino ", "DEFAULT"],
                ["Arduino DF Robot - MPR121", "DF_Robot"],
                ["Arduino Dual H-Bridge", "H_BRIDGE"],
                ["Arduino Freetronics H-bridge", "FREETRONICS_HBRIDGE"],
                ["Arduino Micro magician V2 Shield", "MICRO_MAGICIAN_V2"],
                ["Arduino Motor PCA9685 via I2C", "PCA9685"],
                ["Arduino Motor Shield R3.1", "ARDUINO_MOTOR_SHIELD_R3_1"],
                ["Arduino Motor Shield R3.2", "ARDUINO_MOTOR_SHIELD_R3_2"],
                ["Arduino Motor Shield R3.3", "ARDUINO_MOTOR_SHIELD_R3_3"],
                ["Arduino NKC Electronics kit", "NKC_ELECTRONICS_KIT"],
                ["Arduino Pololu DRV8835 Shield", "POLOLU_DRV8835_SHIELD"],
                ["Arduino Pololu DRV8835 Shield", "POLOLU_VNH5019_SHIELD"],
                ["Arduino Rugged Circuits Rugged Motor Driver", "RUGGED_CIRCUITS"],
                ["Arduino SeeedStudio H-bridge", "SEEED_STUDIO"],
                ["Arduino Sparkfun Ardumoto", "SPARKFUN_ARDUMOTO"],
                ["Arduino Sparkfun Dual H-bridge Edison", "SPARKFUN_DUAL_HBRIDGE_EDISON_BLOCK"],
                ["Arduino Sparkfun Ludus", "SPARKFUN_LUDUS"],
                ["Arduino Uno Adafruit Motor/Stepper/Servo Shield V1", "ADAFRUIT_V1"],
                ["Arduino Uno Adafruit Motor/Stepper/Servo Shield V2", "ADAFRUIT_V2"]
            ]), "DECLARE_MOTORSHIELD1_CONTROLLER1");
        this.setInputsInline(true);

        this.setTooltip("default Arduino D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}; // einde declare_motorshield


// kode vir L923D motordiver --> https://github.com/rwaldron/johnny-five/wiki/motor
Blockly.Blocks['cmd_motorshield'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var cmd_motorDriver" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(35); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput('CMD_MOTORSHIELD1_DO0')
            .appendField(new Blockly.FieldImage("http://www.nyplatform.com/image/cache/data/Robot/Motor%20Servo/Gear%20Motor%20x2%20+%20PLASTIC%20TIRES%20x2/LT-8-700x700.jpg", 32, 32))
            .appendField("Robotmotor L293D doen");

        this.appendValueInput("CMD_MOTORSHIELD1_NAAM1", "String")
            .appendField(" Welke motortje? ")
            .setCheck("String");

        this.appendValueInput("CMD_MOTORSHIELD1_DOEN", "String")
            .appendField(" Wat moet ik doen? ")
            .setCheck("String");

        this.appendValueInput("CMD_MOTORSHIELD1_WAARDE", "Number")
            .appendField(" Snelheid? [0-255] ")
            .setCheck("Number");

        this.setTooltip("default Arduino D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}; // einde cmd_motorshield


Blockly.Blocks['cmd_motor_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(49);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab4Kids Motor links", "L923motorshield_l_voor"],
                ["EasyLab4Kids Motor rechts", "L923motorshield_r_voor"]
            ]), "CMD_MOTORSHIELD1_LIJST");
        this.setOutput(true, 'String');
        this.setTooltip('robot motor events');
        // ["EasyLab4Kids Motor links achter", "L923motorshield_l_achter"],
        // ["EasyLab4Kids Motor rechts achter", "L923motorshield_r_achter"]

    }
};

Blockly.Blocks['motorshield_opdracht'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(42);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Motortje moet stoppen", "STOP"],
                ["Motortje naar voren 255", "VORENTOE_VOLGAS"],
                ["Motortje naar voren 100", "_VORENTOE_HALF"],
                ["Motortje naar achteren 255", "AGTERTOE_VOLGAS"],
                ["Motortje naar achteren 100", "AGTERTOE_HALF"],
                ["Motortje starten", "START"],
                ["Motortje remmen halfgas", "REM_HALF"]
            ]), 'MOTORSHIELD1_OPDRACHT')
        this.setOutput(true, 'String');
        this.setTooltip('motorshield opdrag');
    }
};


Blockly.Blocks['declare_servo1'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(130); // this.setColour(Blockly.Blocks.procedures.HUE);
        //        this.appendStatementInput('SERVO1_DO0')
        this.appendDummyInput('DECLARE_SERVO1_DO0')
            .appendField("Servo")
            .appendField(new Blockly.FieldImage("https://img.banggood.com/thumb/view/oaupload/banggood/images/C1/C3/26e1a05f-e751-4549-b657-ada33629223b.jpg", 32, 32))
            .appendField("Soort Servo")
            .appendField(new Blockly.FieldDropdown([
                ["SG90 Servo", "DEFAULT"],
                ["HSR-1425CR Deadbang", "HSR-1425CR"],
                ["\"Adafruit PCA9685 I2C address: 0x40\"", "PCA9685"]
            ]), "DECLARE_SERVO1_SENSOR");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "ServoSG90_1"],
                ["Servo2", "ServoSG90_2"],
                ["Servo3", "ServoSG90_3"],
                ["Servo4", "ServoSG90_4"]
            ]), "DECLARE_ServoSG90_NAAM1");


        this.appendValueInput("SERVO1_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D10");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
};


Blockly.Blocks['cmd_servo1'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(130); // this.setColour(Blockly.Blocks.procedures.HUE);
        //        this.appendStatementInput('SERVO1_DO0')
        this.appendDummyInput('CMD_SERVO1_DO0')
            .appendField("Servo")
            .appendField(new Blockly.FieldImage("https://img.banggood.com/thumb/view/oaupload/banggood/images/C1/C3/26e1a05f-e751-4549-b657-ada33629223b.jpg", 32, 32))
            .appendField(" welke servo: ")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "ServoSG90_1"],
                ["Servo2", "ServoSG90_2"],
                ["Servo3", "ServoSG90_3"],
                ["Servo4", "ServoSG90_4"]
            ]), "CMD_ServoSG90_NAAM1");

        this.appendValueInput("CMD_SERVO1_OPDRACHT_ACTIE", "String")
            .appendField("Servo moeten..")
            .setCheck("String");

        this.appendValueInput("CMD_OPDRACHT_ACTIE_WAARDE", "Number")
            .appendField("hoeveel stappen [0-255]")
            .setCheck("Number");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
};


Blockly.Blocks['servo1_actie_opdracht'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Servo moet stoppen        ", "servo_stop"],
                ["Servo kijkrichting [0-180]", "servo_to"],
                ["Servo naar startrichting  ", "servo_home"],
                ["Servo testje (sweep)      ", "servo_sweep"]
            ]), 'SERVO1_OPDRACHT')
        this.setOutput(true, 'String');
        this.setTooltip('Servo opdrag');
    }
};


Blockly.Blocks['get_servo1_values'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Servo waarde: Pin aangesloten", "servo_pin"],
                ["Servo waarde: type", "servo_type"],
                ["Servo waarde: startAt", "servo_startAt"],
                ["Servo waarde: offset", "servo_offset"],
                ["Servo waarde: invert", "servo_invert"],
                ["Servo waarde: center", "servo_center"],
                ["Servo waarde: controller", "servo_controller"]
            ]), 'GET_SERVO1_OPDRACHT_VALUE')
            .appendField(" welke servo: ")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "ServoSG90_1"],
                ["Servo2", "ServoSG90_2"],
                ["Servo3", "ServoSG90_3"],
                ["Servo4", "ServoSG90_4"]
            ]), "CMD_ServoSG90_NAAM1");

        this.setOutput(true, 'String');
        this.setTooltip('opdrachten voor servo');
    }
};