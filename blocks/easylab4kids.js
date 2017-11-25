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

/**
 * @fileoverview EasyLab basics blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
'use strict';

goog.provide('Blockly.Blocks.EasyLab4Kids');

goog.require('Blockly.Blocks');

var mathChangeJson = {
    "message0": "Stop het applicatie",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 242
};

Blockly.Blocks['process_exit'] = {
    init: function() {
        this.jsonInit(mathChangeJson);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            return 'Stop het applicatie "%1".'.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    }
};


// LED
Blockly.Blocks['ledje'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(105);
        this.appendDummyInput()
            .appendField("LED");
        this.appendDummyInput()
            .appendField("Soort LEDje")
            .appendField(new Blockly.FieldImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP5GdKwXzV007Sh-P5j6u6t7e1mkZeaEYVHDrSZURMNNEdU1il", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["LEDje", "LED"],
                ["Adafruit PCA9685 I2C", "PCA9685"]
            ]), "LEDJE1_SENSOR");
        this.appendDummyInput()
            .appendField(" Ledje Naam.: ")
            .appendField(new Blockly.FieldDropdown([
                ["Led1", "LEDJE_1"],
                ["Led2", "LEDJE_2"],
                ["Led3", "LEDJE_3"],
                ["Led4", "LEDJE_5"],
                ["Led5", "LEDJE_6"],
                ["Led6", "LEDJE_7"],
                ["Led7", "LEDJE_7"],
                ["Led8", "LEDJE_8"]
            ]), "LEDJE_NAAM1");

        this.appendDummyInput()
            .appendField("Instelling")
            .appendField(new Blockly.FieldDropdown([
                ["Aan", "on"],
                ["Uit", "off"],
                ["Toggle", "toggle"]
            ]), "LEDJE1_STAAT");

        this.appendValueInput("LEDJE1_WAARDE", "Number")
            .appendField("Helderheid [0-255]")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setTooltip("LED helderheid");

        this.appendValueInput("LEDJE1_IO_POORT", "String")
            .appendField("Ledje: ")
            .setCheck("String");
        this.setTooltip("default: EasyLab4Kids rood");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde ledje

// declare_ledje
Blockly.Blocks['declare_ledje'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(105);
        this.appendDummyInput()
            .appendField("LED");
        this.appendDummyInput()
            .appendField("Soort LEDje")
            .appendField(new Blockly.FieldImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP5GdKwXzV007Sh-P5j6u6t7e1mkZeaEYVHDrSZURMNNEdU1il", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["LEDje", "LED"],
                ["Adafruit PCA9685 I2C", "PCA9685"]
            ]), "DECLARE_LEDJE1_SENSOR");
        this.appendDummyInput()
            .appendField(" Ledje Naam.: ")
            .appendField(new Blockly.FieldDropdown([
                ["Led1", "LEDJE_1"],
                ["Led2", "LEDJE_2"],
                ["Led3", "LEDJE_3"],
                ["Led4", "LEDJE_5"],
                ["Led5", "LEDJE_6"],
                ["Led6", "LEDJE_7"],
                ["Led7", "LEDJE_7"],
                ["Led8", "LEDJE_8"]
            ]), "DECLARE_LEDJE_NAAM1");

        this.appendValueInput("DECLARE_LEDJE1_IO_POORT", "String")
            .appendField("Ledje: ")
            .setCheck("String");
        this.setTooltip("default: EasyLab4Kids rood");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

    }
}; // einde declare_ledje


// cmd_ledje
Blockly.Blocks['cmd_ledje'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(105);
        this.appendDummyInput()
            .appendField("LEDje doen")
            .appendField(new Blockly.FieldImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP5GdKwXzV007Sh-P5j6u6t7e1mkZeaEYVHDrSZURMNNEdU1il", 32, 32));
        this.appendDummyInput()
            .appendField(" Ledje Naam.: ")
            .appendField(new Blockly.FieldDropdown([
                ["Led1", "LEDJE_1"],
                ["Led2", "LEDJE_2"],
                ["Led3", "LEDJE_3"],
                ["Led4", "LEDJE_5"],
                ["Led5", "LEDJE_6"],
                ["Led6", "LEDJE_7"],
                ["Led7", "LEDJE_7"],
                ["Led8", "LEDJE_8"]
            ]), "CMD_LEDJE_NAAM1");

        this.appendDummyInput()
            .appendField("Instelling")
            .appendField(new Blockly.FieldDropdown([
                ["Aan", "on"],
                ["Uit", "off"],
                ["Toggle", "toggle"]
            ]), "CMD_LEDJE1_STAAT");

        //        this.appendValueInput("LEDJE1_WAARDE", "Number")
        //            .appendField("Helderheid [0-255]")
        //            .setCheck("Number");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

    }
}; // einde cmd_ledje


Blockly.Blocks['toggleswitch_close_open'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);


        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(75);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://onlinekabelshop-nl.scdn2.secure.raxcdn.com/media/catalog/product/cache/1/thumbnail/94x94/9df78eab33525d08d6e5fb8d27136e95/t/s/ts-11.jpg", 32, 32))
            .appendField("SPDT Aan/uit")
            .appendField(new Blockly.FieldDropdown([
                ["Open", "open"],
                ["Uitgeschakeld", "close"]
            ]), "SWITCH_OPEN_CLOSED");

        this.appendDummyInput()
            .appendField(" SkakelaarID: ")
            .appendField(new Blockly.FieldDropdown([
                ["Aan uit 1", "Aan_uit_1"],
                ["Aan uit 2", "Aan_uit_2"],
                ["Aan uit 3", "Aan_uit_3"],
                ["Aan uit 4", "Aan_uit_4"]
            ]), "AAN_UIT_NAAM1");

        this.appendValueInput("KROKODIL_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D8");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde toggleswitch_close_open


Blockly.Blocks['piezo_muziek'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput()
            .appendField(" Lyn Nr.: ")
            .appendField(new Blockly.FieldDropdown([
                ["Lyn1", "PIEZO1_LYN_1"],
                ["Lyn2", "PIEZO1_LYN_2"],
                ["Lyn3", "PIEZO1_LYN_3"],
                ["Lyn4", "PIEZO1_LYN_4"]
            ]), "PIEZO_NAAM1")
            .appendField(new Blockly.FieldDropdown([
                ["Tempo100", "100"],
                ["Tempo150", "150"],
                ["Tempo200", "200"],
                ["Tempo250", "250"]
            ]), "PIEZO_TEMPO1")
            .appendField(new Blockly.FieldDropdown([
                ["Beat1", "1"],
                ["Beat2", "1 / 2"],
                ["Beat3", "1 / 3"],
                ["Beat4", "1 / 4"]
            ]), "PIEZO_BEAT1")
            .appendField("Liedje:")
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'PIEZO_MUZIEK1')
            .appendField(this.newQuote_(false));
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    },
    /**
     * Create an image of an open or closed quote.
     * @param {boolean} open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @this Blockly.Block
     * @private
     */
    newQuote_: function(open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }
};


Blockly.Blocks['piezo1'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var piezoBuzzer" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(120);
        this.appendDummyInput()
            .appendField("Piezo luidspreker")
            .appendField(new Blockly.FieldImage("http://shallowsky.com/arduino/class/buzzer.jpg", 32, 32))
            .appendField(" PiezoNaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Buzzer1", "objPiezo_1"],
                ["Buzzer2", "objPiezo_2"],
                ["Buzzer3", "objPiezo_3"],
                ["Buzzer4", "objPiezo_4"]
            ]), "PIEZO_NAAM1")
            .appendField("Controller: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard", "null"],
                ["I2C Backpack", "\"I2C_BACKPACK\""]
            ]), "F_PIEZO_SENSOR");
        this.appendDummyInput()
            .appendField(" Tempo: ")
            .appendField(new Blockly.FieldDropdown([
                ["Tempo100", "100"],
                ["Tempo150", "150"],
                ["Tempo200", "200"],
                ["Tempo250", "250"]
            ]), "PIEZO_TEMPO1");
        this.appendDummyInput()
            .appendField(" Beat: ")
            .appendField(new Blockly.FieldDropdown([
                ["Beat 1 op 4", "1 / 4"],
                ["Beat 2 op 4", "2 / 4"],
                ["Beat 3 op 4", "3 / 4"],
                ["Beat 4 op 4", "4 / 4"]
            ]), "PIEZO_BEAT1");

        this.appendValueInput("PIEZO_MUZIEK1", 'String')
            .appendField("Liedje");

        this.appendValueInput("PIEZO_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D0");

        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('bijvoorbeeld liedje=A B C D C - - A');
    }
};

// HC-SR04 Sonar
Blockly.Blocks['proximity_sensor_data'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        //Blockly.Variables.predefinedVars.push("distance1_blocks");

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(145);
        this.appendDummyInput()
            .appendField("EasyLab-afstand sensor");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Sonar1", "HC_SR401_1"],
                ["Sonar2", "HC_SR401_2"],
                ["Sonar3", "HC_SR401_3"],
                ["Sonar4", "HC_SR401_4"]
            ]), "SENSOR_NAAM1");

        this.appendStatementInput('F_PROXIMITY_DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
            .appendField(new Blockly.FieldImage("http://www.robotop.lv/285-home/ultrazvukovoj-datchik-rasstoyaniya.jpg", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["HC-SR04 Sonar", "HCSR04"],
                ["MB1000 analoog", "MB1000"],
                ["MB1010 analoog", "MB1010"],
                ["MB1003 analoog", "MB1003"],
                ["GP2Y0A21YK IR afstand sensor", "GP2Y0A21YK"],
                ["GP2D120XJ00F IR afstand sensor", "GP2D120XJ00F"],
                ["GP2Y0A02YK0F IR afstand sensor", "GP2Y0A02YK0F"],
                ["HCSR04 (and friends) I2C Backpack sonar", "HCSR04I2CBACKPACK"],
                ["LIDAR-Lite afstand sensor", "LIDARLITE"],
                ["SRF10 sonar afstand sensor", "SRF10"],
                ["Lego EVS_EV3", "EVS_EV3_US"]
            ]), "F_PROXIMITY_SENSOR");


        this.appendValueInput("PROX_SENSOR_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default D8");

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Beweging gedetecteerd", "data"],
                ["Beweging heeft gestopt", "change"]
            ]), "PROXIMITY_SENSOR_STAAT");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde proximity

// HC-SR04 Sonar
Blockly.Blocks['declare_proximity_sensor_data'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        //Blockly.Variables.predefinedVars.push("distance1_blocks");

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(145);
        this.appendDummyInput('F_PROXIMITY_DO0')
            .appendField(new Blockly.FieldImage("http://www.robotop.lv/285-home/ultrazvukovoj-datchik-rasstoyaniya.jpg", 32, 32))
            .appendField("Soort afstandsensor")
            .appendField(new Blockly.FieldDropdown([
                ["HC-SR04 Sonar", "HCSR04"],
                ["MB1000 analoog", "MB1000"],
                ["MB1010 analoog", "MB1010"],
                ["MB1003 analoog", "MB1003"],
                ["GP2Y0A21YK IR afstand sensor", "GP2Y0A21YK"],
                ["GP2D120XJ00F IR afstand sensor", "GP2D120XJ00F"],
                ["GP2Y0A02YK0F IR afstand sensor", "GP2Y0A02YK0F"],
                ["HCSR04 (and friends) I2C Backpack sonar", "HCSR04I2CBACKPACK"],
                ["LIDAR-Lite afstand sensor", "LIDARLITE"],
                ["SRF10 sonar afstand sensor", "SRF10"],
                ["Lego EVS_EV3", "EVS_EV3_US"]
            ]), "DECLARE_F_PROXIMITY_SENSOR");

        this.appendDummyInput()
            .appendField(" Welke sensor: ")
            .appendField(new Blockly.FieldDropdown([
                ["Sonar1", "HC_SR401_1"],
                ["Sonar2", "HC_SR401_2"],
                ["Sonar3", "HC_SR401_3"],
                ["Sonar4", "HC_SR401_4"]
            ]), "DECLARE_PROX_SENSOR_NAAM1");

        this.appendValueInput("DECLARE_PROX_SENSOR_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde declare_proximity_sensor_data


// HC-SR04 Sonar event_proximity_sensor_data
Blockly.Blocks['event_proximity_sensor_data'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = ""; //Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";

        this.setColour(145);

        this.appendDummyInput()
            .appendField(" Wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Beweging gedetecteerd", "data"],
                ["Beweging heeft gestopt", "change"]
            ]), "EVENT_PROXIMITY_SENSOR_STAAT");

        this.appendStatementInput('EVENT_F_PROXIMITY_DO')
            .appendField(new Blockly.FieldImage("http://www.robotop.lv/285-home/ultrazvukovoj-datchik-rasstoyaniya.jpg", 32, 32))
            .appendField(" Sensor naam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Sonar1", "HC_SR401_1"],
                ["Sonar2", "HC_SR401_2"],
                ["Sonar3", "HC_SR401_3"],
                ["Sonar4", "HC_SR401_4"]
            ]), "EVENT_PROXIMITY_SENSOR_NAAM");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde event_proximity_sensor_data



Blockly.Blocks['button_Down_hold_up'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */

    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);


        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(75);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://www.boxelectronica.com/334-thickbox_default/push-button-12x12x8mm.jpg", 32, 32))
            .appendField("Knop Aan/uit/toggle")
            .appendField(new Blockly.FieldDropdown([
                ["Open", "open"],
                ["Uitgeschakeld", "close"]
            ]), "SWITCH_OPEN_CLOSED");

        this.appendDummyInput()
            .appendField(" knop naam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Knop1", "Knop_1"],
                ["Knop2", "Knop_2"],
                ["Knop3", "Knop_3"],
                ["Knop4", "Knop_4"],
                ["Knop5", "Knop_5"],
                ["Knop6", "Knop_6"]
            ]), "BUTTON_DOWN_HOLD_UP_NAAM1");

        this.appendValueInput("BUTTON_DOWN_HOLD_UP_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D10");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde button_Down_hold_up




Blockly.Blocks['declare_button_Down_hold_up'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */

    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);


        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(75);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://www.boxelectronica.com/334-thickbox_default/push-button-12x12x8mm.jpg", 32, 32))
            .appendField(" Gebruik knop: ")
            .appendField(new Blockly.FieldDropdown([
                ["Knop1", "Knop_1"],
                ["Knop2", "Knop_2"],
                ["Knop3", "Knop_3"],
                ["Knop4", "Knop_4"],
                ["Knop5", "Knop_5"],
                ["Knop6", "Knop_6"]
            ]), "DECLARE_BUTTON_DOWN_HOLD_UP_NAAM1");

        this.appendDummyInput()
            .appendField(" Soort knop: ")
            .appendField(new Blockly.FieldDropdown([
                ["Knopje", "null"],
                ["LEGO EVS: EV3", "\"EVS_EV3\""],
                ["LEGO_EVS: NXT", "\"EVS_NXT\""]
            ]), "DECLARE_BUTTON_DOWN_HOLD_UP_CONTROLLER1");

        this.appendValueInput("DECLARE_BUTTON_DOWN_HOLD_UP_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D10");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde declare_button_Down_hold_up


Blockly.Blocks['event_button_Down_hold_up'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */

    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);


        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(75);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://www.boxelectronica.com/334-thickbox_default/push-button-12x12x8mm.jpg", 32, 32))
            .appendField(" wanneer knop: ")
            .appendField(new Blockly.FieldDropdown([
                ["Knop1", "Knop_1"],
                ["Knop2", "Knop_2"],
                ["Knop3", "Knop_3"],
                ["Knop4", "Knop_4"],
                ["Knop5", "Knop_5"],
                ["Knop6", "Knop_6"]
            ]), "EVENT_BUTTON_DOWN_HOLD_UP_NAAM1");

        this.appendStatementInput('EVENT_BUTTON_ON_OFF_DO')
            .appendField("knop")
            .appendField(new Blockly.FieldDropdown([
                ["Knop ingedrukt", "press"],
                ["Knop ingehouden", "hold"],
                ["Knop losgelaat", "release"]
            ]), "EVENT_BUTTON_DOWN_HOLD_UP_STATE");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde declare_button_Down_hold_up

Blockly.Blocks['declare_spdt_skakelaar'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */

    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(78);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://onlinekabelshop-nl.scdn2.secure.raxcdn.com/media/catalog/product/cache/1/thumbnail/94x94/9df78eab33525d08d6e5fb8d27136e95/t/s/ts-11.jpg", 32, 32))
            .appendField(" SkakelaarID: ")
            .appendField(new Blockly.FieldDropdown([
                ["Aan-uit-1", "Aan_uit_1"],
                ["Aan-uit-2", "Aan_uit_2"],
                ["Aan-uit-3", "Aan_uit_3"],
                ["Aan-uit-4", "Aan_uit_4"]
            ]), "DECLARE_SPDT_NAAM1");

        this.appendValueInput("DECLARE_SPDT_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids D8");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde declare_spdt_skakelaar


Blockly.Blocks['event_spdt_skakelaar'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */

    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var toggleSiwtch" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(78);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://onlinekabelshop-nl.scdn2.secure.raxcdn.com/media/catalog/product/cache/1/thumbnail/94x94/9df78eab33525d08d6e5fb8d27136e95/t/s/ts-11.jpg", 32, 32))
            .appendField(" schakelaar: ")
            .appendField(new Blockly.FieldDropdown([
                ["Aan uit 1", "Aan_uit_1"],
                ["Aan uit 2", "Aan_uit_2"],
                ["Aan uit 3", "Aan_uit_3"],
                ["Aan uit 4", "Aan_uit_4"]
            ]), "EVENT_SPDT_NAAM1");


        this.appendStatementInput('EVENT_SPDT_DO')
            .appendField(" Wanneer: ")
            .appendField(new Blockly.FieldDropdown([
                ["Aan", "open"],
                ["Uit", "close"]
            ]), "EVENT_SPDT_STATE1");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }

}; // einde declare_spdt_skakelaar


// easylab4Kids
Blockly.Blocks['procedures_easylab4kids_boards'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 5) + 1);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.setColour(50); // this.setColour(Blockly.Blocks.procedures.HUE);
        // var name = Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        var name = "board" + veranderlike1;
        var nameField = new Blockly.FieldTextInput(name,
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab0", "board0"],
                ["EasyLab1", "board1"],
                ["EasyLab2", "board2"],
                ["EasyLab3", "board3"],
                ["EasyLab4", "board4"],
                ["EasyLab5", "board5"],
                ["EasyLab6", "board6"]
            ]), "BOARD_NAME")
            .appendField("Microcontroller:")
            .appendField('', 'BOARD_PARAMS')
            .appendField(new Blockly.FieldDropdown([
                ["Arduino-EasyLab4Kids", "BOARD_TYPE_EASYLAB4KIDS"],
                ["Raspberry Pi", "BOARD_TYPE_RASPI"],
                ["BBC Microbit", "BOARD_TYPE_MICROBIT"],
                ["Linux met GPIO-poorten", "BOARD_TYPE_LINUX"],
                ["Beaglebone black", "BOARD_TYPE_BEAGLEBONE"],
                ["Intel Edison", "BOARD_TYPE_INTEL_EDISON"],
                ["C.H.I.P", "BOARD_TYPE_CHIP"],
                ["BlendMicro", "BOARD_TYPE_BLENDMICRO"],
                ["LightBlue Bean", "BOARD_TYPE_LIGHTBLUEBEAN"],
                ["Electric Imp", "BOARD_TYPE_ELECTRICIMP"],
                ["Tessel", "BOARD_TYPE_TESSEL"],
                ["Linino One", "BOARD_TYPE_LININO"],
                ["ESP 8266 WiFi", "BOARD_TYPE_ESP8266"],
                ["Adafruit Playground", "BOARD_TYPE_PLAYGROUND"],
                ["pcDuino", "BOARD_TYPE_PCDUINO"],
                ["Alle overige", "BOARD_TYPE_OTHER"]
            ]), "BOARD_TYPE")
            .appendField(new Blockly.FieldDropdown([
                ["Board READY", "ready"],
                ["Board Connect", "connect"],
                ["Board Exit", "exit"],
                ["Board Info", "info"],
                ["Board Fail", "fail"],
                ["Board warn", "warn"],
                ["Board log bericht", "message"]
            ]), "BOARD_EVENTS");


        this.appendValueInput("BOARD_PORT", "String")
            .appendField("USB poort:")
            .setCheck("String");
        this.setInputsInline(true);
        this.setTooltip("Optionele USB aansluiting");

        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.arguments_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('BOARD_STACK')
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
            if (this.getInput('BOARD_RETURN')) {
                this.moveInputBefore('STACK', 'BOARD_RETURN');
            }
        } else {
            this.removeInput('BOARD_STACK', true);
        }
        this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function() {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var i = 0; i < this.arguments_.length; i++) {
            if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[i].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
            paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
                ' ' + this.arguments_.join(', ');
        }
        this.setFieldValue(paramString, 'BOARD_PARAMS');
    },
    /**
     * Create XML to represent the argument inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.arguments_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.updateParams_();

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace,
            'procedures_mutatorcontainer');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('BOARD_RETURN')) {
            containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                'BOARD_STATEMENTS');
        } else {
            containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
        }

        // Parameter list.
        var connection = containerBlock.getInput('BOARD_STACK').connection;
        for (var i = 0; i < this.arguments_.length; i++) {
            var paramBlock = "";
            Blockly.Block.obtain(workspace, 'procedures_mutatorarg'); // uitgecomment versie: 0.3.06009 release: 2017.06.19
            paramBlock.initSvg();
            // paramBlock.setFieldValue(this.arguments_[i], 'BOARD_NAME');
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        /* Blockly.Procedures.mutateCallers(this.getFieldValue('BOARD_NAME'),
            this.workspace, this.arguments_, null); */
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.paramIds_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('BOARD_STACK');
        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('BOARD_NAME'));
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this.getFieldValue('BOARD_NAME'),
            this.workspace, this.arguments_, this.paramIds_);

        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('BOARD_STATEMENTS');
        if (hasStatements !== null) {
            hasStatements = hasStatements == 'TRUE';
            if (this.hasStatements_ != hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true);
                    // Restore the stack, if one was saved.
                    var stackConnection = this.getInput('BOARD_STACK').connection;
                    if (stackConnection.targetConnection ||
                        !this.statementConnection_ ||
                        this.statementConnection_.targetConnection ||
                        this.statementConnection_.sourceBlock_.workspace !=
                        this.workspace) {
                        // Block no longer exists or has been attached elsewhere.
                        this.statementConnection_ = null;
                    } else {
                        stackConnection.connect(this.statementConnection_);
                    }
                } else {
                    // Save the stack, then disconnect it.
                    var stackConnection = this.getInput('BOARD_STACK').connection;
                    this.statementConnection_ = stackConnection.targetConnection;
                    if (this.statementConnection_) {
                        var stackBlock = stackConnection.targetBlock();
                        stackBlock.setParent(null);
                        stackBlock.bumpNeighbours_();
                    }
                    this.setStatements_(false);
                }
            }
        }
    },
    /**
     * Dispose of any callers.
     * @this Blockly.Block
     */
    dispose: function() {
        var name = this.getFieldValue('BOARD_NAME');
        Blockly.Procedures.disposeCallers(name, this.workspace);
        // Call parent's destructor.
        this.constructor.prototype.dispose.apply(this, arguments);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function() {
        return [this.getFieldValue('BOARD_NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function() {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function(oldName, newName) {
        var change = false;
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var i = 0, block; block = blocks[i]; i++) {
                    if (block.type == 'procedures_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('BOARD_NAME'))) {
                        block.setFieldValue(newName, 'BOARD_NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        // Add option to create caller.
        var option = { enabled: true };
        var name = this.getFieldValue('BOARD_NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = goog.dom.createDom('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = goog.dom.createDom('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var option = { enabled: true };
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                var xmlField = goog.dom.createDom('field', null, name);
                xmlField.setAttribute('name', 'VAR');
                var xmlBlock = goog.dom.createDom('block', null, xmlField);
                xmlBlock.setAttribute('type', 'variables_get');
                option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                options.push(option);
            }
        }
    },
    callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['motion_data_change_motionstart'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(135);

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["PIR1", "PIRmotion_1"],
                ["PIR2", "PIRmotion_2"],
                ["PIR3", "PIRmotion_3"],
                ["PIR4", "PIRmotion_4"]
            ]), "PIR_SENSOR_NAAM1");

        this.appendValueInput("PIR_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default A7");

        this.appendDummyInput()
            .appendField(" wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Beweging gedetecteerd", "motionstart"],
                ["Beweging heeft gestopt", "motionend"],
                ["Gekalibreerd gereed voor detectie", "calibrated"],
                ["Wijziging in detectiegebied", "change"],
                ["Data in detectiegebied", "data"]
            ]), "PIR_SENSOR_STAAT");

        this.appendStatementInput('MOTION_DO0')
            .appendField(new Blockly.FieldImage("http://litbimg.rightinthebox.com/images/m/201407/ancbjy1405584274823.jpg", 32, 32))
            .appendField("PIR sensor")
            .appendField(new Blockly.FieldDropdown([
                ["HC-SR501 PIR Infrarooi", "HC-SR501"],
                ["GP2Y0D805Z0F Infrarooi", "GP2Y0D805Z0F"]
            ]), "PIR_SENSOR_TYPE");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde toggleswitch_close_open


Blockly.Blocks['declare_motion_data_change_motionstart'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(135);
        this.appendDummyInput('DECLARE_MOTION_DO0')
            .appendField(new Blockly.FieldImage("http://litbimg.rightinthebox.com/images/m/201407/ancbjy1405584274823.jpg", 32, 32))
            .appendField("PIR sensor")
            .appendField(new Blockly.FieldDropdown([
                ["HC-SR501 PIR Infrarooi", "HC-SR501"],
                ["GP2Y0D805Z0F Infrarooi", "GP2Y0D805Z0F"]
            ]), "PIR_SENSOR_TYPE");

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["PIR1", "PIRmotion_1"],
                ["PIR2", "PIRmotion_2"],
                ["PIR3", "PIRmotion_3"],
                ["PIR4", "PIRmotion_4"]
            ]), "PIR_SENSOR_NAAM1");

        this.appendValueInput("PIR_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default A7");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde toggleswitch_close_open

Blockly.Blocks['event_motion_data_change_motionstart'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = "";
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(135);

        this.appendDummyInput()
            .appendField(" wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Beweging gedetecteerd", "motionstart"],
                ["Beweging heeft gestopt", "motionend"],
                ["Gekalibreerd gereed voor detectie", "calibrated"],
                ["Wijziging in detectiegebied", "change"],
                ["Data in detectiegebied", "data"]
            ]), "EVENT_PIR_SENSOR_STAAT");

        this.appendStatementInput('EVENT_MOTION_DO')
            .appendField(new Blockly.FieldImage("http://litbimg.rightinthebox.com/images/m/201407/ancbjy1405584274823.jpg", 32, 32))
            .appendField(" Welke PIR: ")
            .appendField(new Blockly.FieldDropdown([
                ["PIR1", "PIRmotion_1"],
                ["PIR2", "PIRmotion_2"],
                ["PIR3", "PIRmotion_3"],
                ["PIR4", "PIRmotion_4"]
            ]), "EVENT_PIR_SENSOR_NAAM1");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde toggleswitch_close_open


// LED knipperen en fadein.
Blockly.Blocks['ledje_knipper_fade'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(135); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput()
            .appendField("LED fadein");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP5GdKwXzV007Sh-P5j6u6t7e1mkZeaEYVHDrSZURMNNEdU1il", 32, 32))
            .appendField("Soort LEDje")
            .appendField(new Blockly.FieldDropdown([
                ["LEDje", "LED"],
                ["Adafruit PCA9685 I2C", "PCA9685"]
            ]), "LEDJE_KNIPPER_SENSOR");
        this.appendDummyInput()
            .appendField("Instelling")
            .appendField(new Blockly.FieldDropdown([
                ["Fade in", "fadeIn"],
                ["Fade out", "fadeOut"],
                ["Pulse", "pulse"],
                ["Stop", "stop"]
            ]), "LEDJE_KNIPPER_STAAT");

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Ledje knipper 1", "LEDJE_KNIPPER_1"],
                ["Ledje knipper 2", "PIRmotion_2"],
                ["Ledje knipper 3", "PIRmotion_3"],
                ["Ledje knipper 4", "PIRmotion_4"]
            ]), "LEDJE_KNIPPER_NAAM1");

        this.appendValueInput("LEDJE_KNIPPER_MS", "Number")
            .appendField("Doorlooptijd")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setTooltip("LEDJe laten knipperen of fadeout");

        this.appendValueInput("LEDJE_KNIPPER_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default D13");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde ledje

Blockly.Blocks['ledje_raspi'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField("LED raspi");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP5GdKwXzV007Sh-P5j6u6t7e1mkZeaEYVHDrSZURMNNEdU1il", 32, 32))
            .appendField("Soort LEDje")
            .appendField(new Blockly.FieldDropdown([
                ["LEDje", "LED"],
                ["Adafruit PCA9685 I2C", "PCA9685"]
            ]), "LEDJE1_SENSOR_RASPI");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Knipper LED1", "LEDJE_1"],
                ["Knipper LED2", "LEDJE_2"],
                ["Knipper LED3", "LEDJE_3"],
                ["Knipper LED4", "LEDJE_4"]
            ]), "LEDJE1_NAAM1");

        this.appendValueInput("LEDJE1_IO_POORT_RASPI", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default A3");

        this.appendDummyInput()
            .appendField("Instelling")
            .appendField(new Blockly.FieldDropdown([
                ["Aan", "on"],
                ["Uit", "off"],
                ["Toggle", "toggle"]
            ]), "LEDJE1_STAAT_RASPI");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('EASYLED1_IF' + i)
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('EASYLED1_DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('EASYLED1_ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('EASYLED1_STACK').connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput('EASYLED1_ELSE');
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var i = this.elseifCount_; i > 0; i--) {
            this.removeInput('EASYLED1_IF' + i);
            this.removeInput('EASYLED1_DO' + i);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('EASYLED1_STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    var ifInput = this.appendValueInput('EASYLED1_IF' + this.elseifCount_)
                        .setCheck('Boolean')
                        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
                    var doInput = this.appendStatementInput('EASYLED1_DO' + this.elseifCount_);
                    doInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput('EASYLED1_ELSE');
                    elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
                    // Reconnect any child blocks.
                    if (clauseBlock.statementConnection_) {
                        elseInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('EASYLED1_IF' + i);
                    var inputDo = this.getInput('EASYLED1_DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('EASYLED1_ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    }
}; // einde ledje

// Servo1
Blockly.Blocks['servo1'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(130); // this.setColour(Blockly.Blocks.procedures.HUE);
        //        this.appendStatementInput('SERVO1_DO0')
        this.appendDummyInput('SERVO1_DO0')
            .appendField("Servo")
            .appendField(new Blockly.FieldImage("https://img.banggood.com/thumb/view/oaupload/banggood/images/C1/C3/26e1a05f-e751-4549-b657-ada33629223b.jpg", 32, 32))
            .appendField("Soort Servo")
            .appendField(new Blockly.FieldDropdown([
                ["SG90 Servo", "DEFAULT"],
                ["HSR-1425CR Deadbang", "HSR-1425CR"],
                ["\"Adafruit PCA9685 I2C address: 0x40\"", "PCA9685"]
            ]), "SERVO1_SENSOR");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "ServoSG90_1"],
                ["Servo2", "ServoSG90_2"],
                ["Servo3", "ServoSG90_3"],
                ["Servo4", "ServoSG90_4"]
            ]), "ServoSG90_NAAM1");

        this.appendValueInput("SERVO1_OPDRACHT_ACTIE", "String")
            .appendField("Servo moeten..")
            .setCheck("String");

        this.appendValueInput("SERVO1_OPDRACHT_ACTIE_WAARDE", "Number")
            .appendField("hoeveel stappen [0-255]")
            .setCheck("Number");

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

Blockly.Blocks['declare_IR_Reflect_Array'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var IRreflect" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(107);
        this.appendDummyInput()
            .appendField(" Welke lijnvolger: ")
            .appendField(new Blockly.FieldDropdown([
                ["Reflect1", "IRReflect_1"],
                ["Reflect2", "IRReflect_2"],
                ["Reflect3", "IRReflect_3"],
                ["Reflect4", "IRReflect_4"]
            ]), "DECLARE_IR_REFLECT1_NAAM1")
            .appendField(" Soort volger: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard", "null"],
                ["LEGO_EVS_EV3", "\"EVS_EV3\""],
                ["LEGO_EVS_NXT", "\"EVS_NXT\""]
            ]), "DECLARE_IR_REFLECT1_CONTROLLER1");

        this.appendValueInput("DECLARE_IR_REFLECT1_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");
        this.setTooltip("default A3");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde button_Down_hold_up

Blockly.Blocks['event_IR_Reflect_Array'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var IRreflect" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(103);
        this.appendDummyInput()
            .appendField(" Wanneer lijnvolger: ")
            .appendField(new Blockly.FieldDropdown([
                ["Reflect1", "IRReflect_1"],
                ["Reflect2", "IRReflect_2"],
                ["Reflect3", "IRReflect_3"],
                ["Reflect4", "IRReflect_4"]
            ]), "EVENT_IR_REFLECT1_NAAM1");

        this.appendStatementInput('EVENT_IR_REFLECT1_DO')
            .appendField("Infrarooi lijnvolgen")
            .appendField(new Blockly.FieldImage("http://auseparts.com.au/image/cache//catalog/Arduino/Sensors/KY%20series/TrackDeal-KY-033-Tracing-Black-White-Line-Hunting-Sensor-Module-For-for-arduino.jpg_350x350-700x700.jpg", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["Data", "data"],
                ["Lijn", "line"]
            ]), "EVENT_IR_REFLECT1_STATE");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde button_Down_hold_up


Blockly.Blocks['AlertMelding'] = {
    helpUrl: 'http://www.arduino.cc/en/Serial/Print',
    init: function() {
        this.setColour(230);
        this.appendValueInput("ALERT_MELDING", 'String')
            .appendField("Alert melding");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Toont een popup tekstje');
    }
};


// Potentiometer
Blockly.Blocks['declare_potentiometer'] = {
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var Potmeter" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(78); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput()
            .appendField(" Gebruik potmeter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Potentiometer1", "Potentiometer_1"],
                ["Potentiometer2", "Potentiometer_2"],
                ["Potentiometer3", "Potentiometer_3"],
                ["Potentiometer4", "Potentiometer_4"],
                ["Potentiometer5", "Potentiometer_5"],
                ["Potentiometer6", "Potentiometer_6"],
                ["Potentiometer7", "Potentiometer_7"]
            ]), "DECLARE_POTMETER1_NAAM1");
        this.appendDummyInput()
            .appendField(" soort potmeter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Potentiometer", "DEFAULT"],
                ["Digitaal", "DIGITAL"],
                ["Slide potentiometer", "DEFAULT2"],
                ["Force sensitive resistor", "DEFAULT3"],
                ["Microfoon", "DEFAULT4"],
                ["Photoresistor", "DEFAULT5"],
                ["Servo slider control", "DEFAULT6"],
                ["Microfoon", "DEFAULT7"]
            ]), "DECLARE_POTMETER1_CONTROLLER1");

        this.appendValueInput("DECLARE_POTMETER1_SCALEMIN", "Number")
            .appendField("Scale Min [0]")
            .setCheck("Number");
        this.appendValueInput("DECLARE_POTMETER1_SCALEMAX", "Number")
            .appendField("Scale Max [180]")
            .setCheck("Number");

        this.appendValueInput("DECLARE_POTMETER1_FREQ", "Number")
            .appendField("Freq [0-1000]")
            .setCheck("Number");
        this.setTooltip("Frequency");

        this.appendValueInput("DECLARE_POTMETER1_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");

        this.setTooltip("default A3");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}; // einde potentiometer

// Potentiometer
Blockly.Blocks['event_potentiometer'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var Potmeter" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(78); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput()
            .appendField(" Wanneer potmeter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Potentiometer1", "Potentiometer_1"],
                ["Potentiometer2", "Potentiometer_2"],
                ["Potentiometer3", "Potentiometer_3"],
                ["Potentiometer4", "Potentiometer_4"],
                ["Potentiometer5", "Potentiometer_5"],
                ["Potentiometer6", "Potentiometer_6"],
                ["Potentiometer7", "Potentiometer_7"]
            ]), "EVENT_POTMETER1_NAAM1");

        this.appendStatementInput('EVENT_POTMETER1_DO')
            .appendField("Potentiometer")
            .appendField(new Blockly.FieldImage("http://www.internetdict.com/wp-content/uploads/related_images/2016/01/15/how-does-a-potentiometer-work_1.jpg", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["Data", "data"],
                ["Buiten sensor bereik", "change"],
                ["Slide [slip sensor]", "slide"]
            ]), "EVENT_POTMETER1_STATE");

        this.setTooltip("default A3");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}; // einde potentiometer


Blockly.Blocks['I2C_LCD'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var lcd" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(115);
        this.appendDummyInput()
            .appendField("i2c LCD");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://sc02.alicdn.com/kf/HTB1HtNDKpXXXXa5XFXXq6xXFXXXn/Module-For-Arduino-1602-Blue-Backlight-LCD-Display-16x2-HD44780-Character-LCD-IIC-I2C-W-Serial.jpg_50x50.jpg", 32, 32))
            .appendField("Soort")
            .appendField(new Blockly.FieldDropdown([
                ["standaard", "PCF8574"],
                ["I2C, PCF8574A", "PCF8574A"],
                ["I2C, JHD1313M1 (Grove)", "JHD1313M1"]
            ]), "I2C_LCD1_CONTROLLER1");

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["LCD1", "LCD_1"],
                ["LCD2", "LCD_2"],
                ["LCD3", "LCD_3"],
                ["LCD4", "LCD_4"]
            ]), "I2C_LCD1_NAAM1");

        this.appendValueInput("I2C_LCD1_STATE", "String")
            .appendField("Laat scherm")
            .setCheck("String");

        this.appendValueInput("I2C_LCD1_POSX", "Number")
            .appendField("Kolom [0-16]")
            .setCheck("Number");

        this.appendValueInput("I2C_LCD1_POSY", "Number")
            .appendField("Rij [0-1]")
            .setCheck("Number");

        this.appendValueInput("I2C_LCD1_TEXT", "String")
            .appendField("Tekst")
            .setCheck("String");

        this.appendDummyInput()
            .appendField(" I2C adres ")
            .appendField(new Blockly.FieldDropdown([
                ["I2C poort 0x27", "\"0x27\""]
            ]), "I2C_LCD1_POORTNUMMER");

        this.setInputsInline(true);
        this.setTooltip("LCD helderheid");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde ledje

Blockly.Blocks['cmd_I2C_LCD_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(151);

        this.appendDummyInput()
            .appendField("LCD ")
            .appendField(new Blockly.FieldDropdown([
                ["Tekst schrijven op X/Y", "printPos"],
                ["Tekst schrijven huidige positie", "print"],
                ["Staties cursor", "default"],
                ["Loper laten knipperen", "blink"],
                ["Loper verplaatsen", "cursor"],
                ["Loper naar Home", "home"],
                ["Use Char (:heart:)", "usechar"],
                ["Scherm leegmaken", "clear"],
                ["Scherm aan", "on"],
                ["Scherm uit", "off"],
                ["Automatisch scrollen", "autoscroll"],
                ["Automatisch scrollen uit", "noAutoscroll"],
                ["Kleurenscherm bgColor", "bgColor"],
                ["Hallo Wereld [testje]", "hallowereld"]
            ]), "CMD_I2C_LCD1_STATE_LIJST");

        this.setOutput(true, 'String');
        this.setTooltip('LCD wat moet hy doen');
    }
};


// Kompas1
Blockly.Blocks['kompas'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var kompas" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(85);
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Kompas1", "Kompas_1"],
                ["Kompas2", "Kompas_2"],
                ["Kompas3", "Kompas_3"],
                ["Kompas4", "Kompas_4"],
                ["Kompas5", "Kompas_5"],
                ["Kompas6", "Kompas_6"],
                ["Kompas7", "Kompas_7"]
            ]), "KOMPAS1_NAAM1");

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Standaard 3-assig HMC6352", "HMC6352"],
                ["Sparkfun 3-assig HMC5883L", "HMC5883L"],
                ["Sparkfun 3-assig MAG3110", "MAG3110"],
                ["Adafruit 9-DOF BNO055", "BNO055"],
                ["BBC Microbit kompas", "MICROBIT"]
            ]), "KOMPAS1_CONTROLLER1");

        this.appendValueInput("KOMPAS1_POORTNUMMER", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");

        this.appendStatementInput('KOMPAS1_DO0')
            .appendField("Kompas")
            .appendField(new Blockly.FieldImage("https://static.mijnwebwinkel.nl/winkel/theriverhouse/image/cache/full/4f6e4a82dd446d860acce0ab04120c4fcfdb22e2.jpg", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["Data", "data"],
                ["Verandering", "change"]
            ]), "KOMPAS1_STATE");

        this.setTooltip("default A7");
        this.setInputsInline(true);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde Kompas


// GPS
Blockly.Blocks['GPS'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var kompas" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(85);
        this.appendStatementInput('GPS1_DO0')
            .appendField("GPS")
            .appendField(new Blockly.FieldImage("https://cdn-shop.adafruit.com/145x109/746-11.jpg", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["navigatie", "navigation"],
                ["Verandering", "change"]
            ]), "GPS1_STATE")
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["GPS1", "GPS_1"],
                ["GPS2", "GPS_2"],
                ["GPS3", "GPS_3"],
                ["GPS4", "GPS_4"],
                ["GPS4", "GPS_5"],
                ["GPS5", "GPS_6"],
                ["GPS6", "GPS_7"]
            ]), "GPS1_NAAM1");

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Standaard GPS", "GPS"],
                ["ADAFRUIT_ULTIMATE_GPS", "ADAFRUIT_ULTIMATE_GPS"]
            ]), "GPS1_CONTROLLER1");

        this.appendValueInput("GPS1_TX", "String")
            .appendField("TX aansluiting")
            .setCheck("String");

        this.appendValueInput("GPS1_RX", "String")
            .appendField("RX IO-poort")
            .setCheck("String");

        this.setInputsInline(true);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde GPS


Blockly.Blocks['device_state'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(200);
        this.appendDummyInput()
            .appendField("Device state")
            .appendField(new Blockly.FieldDropdown([
                ["Wijziging ontvangen", "change"],
                ["Ontvangt data ontvangen", "data"],
                ["Slide [slip sensor]", "slide"],
                ["Volgt een lijn", "line"],
                ["GPS navigatie", "navigation"],
                ["SPDT aan", "open"],
                ["SPDT uit", "close"],
                ["Button ingedrukt", "up"],
                ["Button ingehouden", "close"],
                ["Button losgelaat", "hold"],
                ["Servo gereed", "ready"],
                ["PIR beweging start", "motionstart"],
                ["PIR beweging stopt", "motionend"],
                ["PIR gecalibreerd", "calibrated"],
                ["9DOF orientatie", "orientation"]
            ]), 'DEVICE1_STATE');
        this.setOutput(true, 'String');
        this.setTooltip('in welke staat een sensor is');
    }
};

// GPS
Blockly.Blocks['Orientatiemodule'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var kompas" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(85);
        this.appendStatementInput('BNO055_DO0')
            .appendField("9-DOF Oriëntatimodule")
            .appendField(new Blockly.FieldImage("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFxcaGBgXGBcVGhcXGBcXFxcYGBcaHSggGBolHRgVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFS0dHh0tLS0vLS0rLS0tLSstLS0tLS0tLS0tLS0wKy8tLSstKzArLS0tLS0tLS0rLS0tLS0uL//AABEIAMIBAwMBEQACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIFBgQDB//EADQQAAICAQMCBAQGAQQDAQAAAAECABEDBBIhBTEGEyJBMlFhcQcUI0KB8FJykaHRM2KxQ//EABoBAQADAQEBAAAAAAAAAAAAAAABBAUDAgb/xAAyEQACAQIDBQcEAgMBAQAAAAAAAQIDEQQSITFBUWHwBRNxgZGh0SKxweEU8SMyUkIV/9oADAMBAAIRAxEAPwD8+kgkApgCABAEAtwBAJAEApgAQCQBALAJIBRJAgEqAWAKgAwBUAVAFQC1AJAFQBAAEAEQAYBQIBDAJUAogEgFgEgFMAQBAFQBUAtQCCQCwBUkCpAJALUAkAsAEQBUASQIAqAIAEAQBUAQBAAgAj6/8QCVALAIIAgFqASoBagAQBUASABALAEACSCV8pALAEACAWASoAgC4AMAQBUAQBJBRIAqSBUAQCQBf9qAY1ALAIBIBSJIFQCyABAEAQADAEAQBALUACAIAqASAWAIAEAQCgQBAFQARAFQBAEAQBUAlSQUH+3IBjJBbkAVJAkAQCCAWAQwC1ABEAQAYAgFIgCAIAMAAQAIBagCoAgCoAgCAIAqASAUCAAIAgEqSBAMQJALJBRIBDALABgAiABAEAogEIgFgCAZYcTOQqgsxNAKCST8gByTJSuL2NwnhXVkbvKUffJhB/kF+PseZ6ybrq55zcjWazSZMT7MiMjd6YVY9iPmPqJ5cWtpKaew+JkEkEAQCwBAEAQBUACANsAAQCQCwBAEAQC3AMKgCSAZAEAQC1AJUAsAQBAFQBAKosgfWp7hCU5ZYq7PM5xgs0nZH6X+H/TceLTZNU6bnCu1f+qllCD6E42J+dr8p57Qi8NaCeu99eJGDkq/1btxzWt/FLU+YNmTaoI4RFKUOCAGXkH7k/UTO7qb1NDNTWh1XijDj1XT8epICF8a5RQoK5fGpKg9lYObHvanuLmp2U3Un3U1dfbb0vPiZ2P/AMcXUi9UfmOXGVPq7fMdj/1L2K7OnS+qH1R90VcNjoVtHozEiZpeKYBIBagCAIAgEqAWAKgAiAIAMACAKgFgGAEAQBAKYAAgAQBUAQBAEAGAfXTaZ8jBEXcx9uOw5JJPAA9yeBOlOm5uyPM5qKuzLU58eIr5ROQ162PpBPuMa9wBe0k9yLHBEvU8XHDPLCKfF8euuJSq4WWJV5yceC+Tq/CPizyAR8SEkleCy2Ka1JG5TQ7EUeb5IaxiKNHtCN4u0uZWoVKuCeWavHijbfmOjFvN/LLu/wAP1Nt/6Nuw/btMxdi4haZtOuZffatC19/h+j5dQ69j1mVcedzp8C8+ld5auylVJCDk8c0e98VrYXBfxqblTWaXiZuKxffzyVLxj4as6Xxh07RLjzELphqGx2A7BSV92VLreRdccmV8HUruUU3LKnu62HfFU6KjJqylbrzPzDB4Y1OVDk0+Jsig0QPb/Sx4J/8AWyZ77QhhVLWahL287bPEnATxEo6xvHial1IJVgVINEEUQR3BHtMqcHHb+n4PeaSknsMZ4JKRAIYBRABEAsAkAsAlQARALUAQCVAKDAMBAEAQCwBAEAQBAFQBAPvotK2Vwi9z3Jvai3RdjXpUXyZ2o0JVHps608eRyq1Y01dns8RIdNpkTHje8mRlyO2Mo7Be+M8kopJT0i1Oy7uwLWJiqcFGL05Pr9bNhwoSc5ZpI5rT5Vbkf3+8TPZcPuLB3KaI7EWKkxk4u6dmRKKkrNG06V1RUyA5ca5AL4Y0pYC13cH0334/6Or/APQnVhkzZZcePw/bwM9YKFKWbLmXDh8r38T9a0L9O6ti2YlCZEUWu3bkQDiufjXtzfuO0pU6tbDS005Ms1KVLELXXmcVrNH+W1Xl6seY1Cwch7HhWZlBagB8PB44sVe5QxPf0m6f0tcvtuMavhXRqpS+pPZr9z3da0+AabTeYNQ6YnYYvy+RF8zeTk5Fkkgqw3rzx9QTiV+z5168pZ0t7vfQ28LjVTpZVG5qeq4MGatfrNQdOdWWbFjx4zmpEITc5scfD25Pf7dK+Lp4eKwihnybW3bV66cD1Rw067da9r7jS9Y0LabO+nyEFkNWOxBAIIvtYI49pyeGlKkq1NXi/VePz9iO9Sm6ctqPLUrHUQBABgCAIAA/ogCAIAqAIAgEgEEACACIBagCoAEAsAGASAfXT4dzAWAPckgUPerPMt4bCur9T0jxK9fEKnold8Dsjm02nwj8qVLMbVvQz3yNxLA7SDQI4U7jtArdNWjRbeVq0V6fu/rxe4yq1azvtk/Xr2e5aXNdosXONtc+bFpjlXJiy41UKMy2FJNenH7ALwPoJw7QipPLSacktVv69y1gHK15ppP0OR8QdL8vI+XCTlwDIR5/HxE93UElATdMeG9rmT3FSKTmrX66Ro95Bt5Xc8WHV803H19v5+U8NHq50Ph7oOTVv6RtQfE5HA+g+ZhIHa5dImhZRpdQdPmKhbK+YHA3EDINprcbArksFoGqliFS9oSWZe68H+Hp4HNwSbktH7eZyyYM+oZ8io7sCDk3EK5LNttye3Pc9hX2E3auJp4WlFJbdiMSnhp4ipLM722v4Ok6bo0xKfMdMWRSP1cRX9RmoeUq5bNkqqle37rQ7gcKWOqyneWqe57Pbrx2G1DDU4RtFW5mOr12rxhMeLGcbtuK42TE643oElW2ENlvc7OCFUfELsy3CjhMS887Stv1T/rcuO57ivUq16CSjpf0C9NyLhUpp9NqdU2R/wA02qcWnqBQgM61jZDe4WeRx7SpjsRXjVUaV4wVsuW/433LeFhRlBuesuZoepdGOXU5x0/DkzYEagyBnUekFlV/3AG6+lSzOhDuYSrTUKjWqel+bW58Tgqku8ags0TTupBIIIINEEUQfkQeQZQlBxdn14FhNPYYzySUQCQBAFQBUAsAlQBAFQBQgGNQBAKYAqAIAqAIAqAbrpfhbVahQyJSkWC18j2IVQWI781X1nakqSearKy4b2cqjm9ILX7HTdB6K2i3NqtKuoFMaAYnsDex0DNQB7A1dz3jpxxTjGjLRLZdK3ueMPB0bua1e80nROnfmNWzjA7Yd25sa3wo3EAn9oPCi+Tt+hq4pzwWFySl9b2byrlhi6+aK+lbT9B13WsGABX3jG10hQGyoPp2XVAgAntyL+uJQwtWdRqm21t87mrWxFOFO9Sy3HK9M8L6jUtl1OnVcKkt5YLDaUJryyKYOvew3Fiu3w708TClGFKb7zizIhQnOUqkVk4L5OP6/wCFm3MuPC2LODzhCuUyH3OIkXj+e1rWhYYdpVxFKnk7yErx9y1Sqzcsko2fsevo/iDJ0/Hn0+1mCuDhfIu0LuQMQ6A2e42gdyTe26FGEsy0Lco5dp8dPlbE/wCZ1anJmYhkxsfhJ58zNxRb/HHVDiwAApv0Yd1HPLT7+X5ZTqT7yWSOv28/g3fQPGwwtkbNjbIWLHcGUZPVuPxUAx5HBofL5TjJQrNf+X7fo6LPTfGPvf8AKN8fDhy5F1xGFVOMkMW8zDix1YZCAoV6PN0D7FORKssyeRXtfft9DvFprM9po+pdfGXHjw4PTiU+ndlU5crBjsYkcoOeEUfTtQm1hcFTovvKj1XJ6cbmXisRUqf4oJpPa/g+uu1NHHi1j0HC87VZ17DEH3cYyRuKr7jcSDyJ6hiqUpNUtHuvsfG3XgcnhKkIp1Hdb7cuPLw8zYdT0yrpsWN21ONMTZWV9Ps9e7IPVkDuCcg4AyC19fyYXnYnAVMTWzQkk3bR34ct3Lb6M0cPj6eHpWkuuvI5vrz/AJvUZM23yy5Fcg0FUIN57MxoE/U0JtUsFTp4aNKp9VvzroY88fOeIz0lo9xpc+FkNOCPkaIB+1gTHr4RwTlB5o8t3ibFLEKVlJZWYVKZYBgCoAEACAAIAEAXAEAcf2oBjAEAQAIBYAgCAbfwpo1y6rGjgFadiD2OxGcKR7iwLHyudaUU8ze5flL8nOpJq1t7/B2n4i+LcmhcabBa2gYlRbtZIJuxt7V/P0EyW51ZPU0IKEIps+X4Z+KM2tyPp8xyOoxliX5KEMNpV7JF2as8bbFUYtUpyTv4MiThOOisc/1PqGow69/yVef+n6VHLB8SZMnoPD+osK/aLoDuPrkqc8Ou92a+WvXiYSi4Vnk3+7Met+IXyerOMeTOyrQ2Og03qJfHtJpwRQoj5myKvLdbu/potq2+6dy46SnrUV+XAvhHq2uwX5GVCMeLccOZ6Bwp/jZsEbhQHYEdhV8ks8rPe/dnSTUVfgdT4q8XdObBhzszHU16UxMVyYG48ze3BoHuD8Q7CuZ3p4Wtncdi332f3w4HN1oOGZeRwOr8Q5c2Y6nMMGbLtAxZRZOGhXpTdwTZPrUkNyO0sTpUKC0vf7/rwOKnVq6Wsa03uLNdnnn3vmyfeUqlR1JZmWacFCNkRgP7xOZ7Pf0QZMhfArHYR5jIzMMZZK2l1HBPYC+52iXMNVUJLPs470V8RByj9O37m+1PT82BceQZci5Pi2gljjHNO+OiqqeeCD9QAG22v52HqSlTnH6eJU/iV6cVOErvhY9/h3UJqdScepK4kyjc4v8ASymuTT2cZNA8NR9uRcrYrAOnHPTeaP2O2HxsajyyWWXA+/jw4MT+XpnLgFmyKGJRCDSil4sc2vB47gnm72d3rjmls3N7Slj1RzZU3fels8zk8vU8ePOhUBkXk1fc2B3NH00eOwcizU71qNbEYeUJfTJ/by4kUFSo1FOKuuuJ2/U9C/VEQ4NOuBSFIJB9Q7hgoArjgFtoIPBMxMKlgarlVlystevK5p1l/JilFeZpeofh7qcS7gwP0cbP9mDMo+7FR9ZNWrh60v8AH9L4bn6pe1/AmEKtNfVqvfrxOV1GBsbMjqVZTRBFEESu1badk7nykEiAIAEAQCwCQCwDGAKgCAIAgAwAIBcGufBkTMlWh9xYIIogj3BHBHyM9wm4O6PE4qSP0JfG3T9VjUavBZUUC1sQD8si2xH3A9rJPMmPZ6rvNSlZ8Nj660I/lOkrSV1x3ddann1vj3S6fE2LQadV3dyV2rfa2PxZPsQv3I4l7DdjNSzVJXOFXH3Voo0HSehZXc587ZU1Lt5mLerLvPLFySBuN/sBvm6PY6E6lOSyQacVts07dcWVHninJpp+nXVjz9S0DY9Uc1jLibKpyI23HkTew3NQFMpu/MQFfVZUTKqYSUf9VdcutPBlyGKjJXk7Pn19jrfCvh7yOo7VRFYK2QvldczZsOWwuPFTBRQoEkEkhjZsCcJZe52fVs8OuR3SfebdDc+JfC3TdQzIFTFnxoK2nj/HGrYgRvs8UKJqrnihja0W7O9tqfzu60PVTDU8uy1+G0/Muv8ARsuEYzuZ8rYw2TAVK5EIHqKDs6j/ABT4RQI7me6snOUpLVHmEVBKOw02HMGFg/37Twez0aTC2ViqmkWt+Q8ql8Dj9zHsFHJPb3r3CnKbsjxOooK7Oh8QafDgxYDp9QGQneUxMA7ZMZG1smRfUrDcPYUfh5O49qdZUc0alPXmcpwdSzhI83TfEG/UJk1LKm70u+IFCwBqswohht/eo3Chzcl4aFWLlh9u9MlVZRlap6nZeJMWi74F/MMiWUxMoTINpIUHsoAIZnFmhVMfh8UK1bDRetk9zIrUaVdrTVbzi/D2sx538vLsxFgRjaiE3ewc2dgAHy5ruveWV2nVypWu7+3ycH2dSzN668z56XSY21WnRtvltmRe/wAeLcqhjwPSeQCQDXz7zXc5OlKW+3oynGNqlr3R+jeP+u5tJp8HkoxXIrbivpt9ooMR8I5Y7fegOwInw9XNOrJXsfSUssYJ2ucp+G/iLWZNdjxHzCjlt62XXbRtm3dqPv8APj3qeZU3Dfc954zvpY9H4ladE1GPb7ow/hcjBR/A9P2VZpttwg5bf6M+KSlJLYchU8HQQBAEAQABAJALcAxgFgEgFgCABAJUArLcA8OXTFTa8j5f9T3Cbi7o5zgpI2nhTquLT6vDnyqWRGthQJX0kBtp7lSQ38TQqYx1sPKlJ2b37vPxKtLD5Kqa1tuOtx9ROZH0i6zL1DLqcmPYGxlBh2tvZ7cimq+BwKlbB4Gthp9/W+mMddt77rKxaxeIpV4OlTWr068D7DQDGmZmzYM6EgZnxZGyZMV7Vxl74KBgfUosba5F1do9oU69RRhdPdstz2b/AGKFbs+dGi3PXTz0+NOZ6vDmrw6RMy5MJzYwwbz8QG7gbgpG717TQpLq+R3M843COrJTTs3ue7mvHmTg8Uoru9qW/ibzpvR8en8zVZg1tbI5bzQmMgeix8JJFkjg38gJiVvqjkT2e762XNWm7SzNbfY5LqHi3J1DIMOLEGxckvtD5EVPhYWy7GLfUGqqpbp0nh0p1XeW5L8nKc1VcoxWnH4PD4n8Oaffjztnc+dyuRFUZXHc78fpRwboONpBqw3ce6FKVe9o2t6fKfrfkc61WNFXb+f6Pp4bxaZGDPbLhZwNOHFHGQR5t3ed2JNjjj0igCsnF0qlGP0xbXLjzIwtWFa2Z2fPcdX1Xwtp9dpzlQBuWONcRCG+NxW6GNvoRR7EdiKGHnNr/NLR7OS+OW7cWq8Yxf8AjWq9/wB8/U5PRdN0+TTZtDuytqfMZsRGPGocIACMji9oQ7iwY2LarvbNaFOphXGtdOL6/ooqrGtmhZprcZ5NVl03Ts2m023Pje0fKqqGRif1Qu07mXuLIsd/hAJ8qrSxNZSqrL9nwvw+x1yTpwtDU+3UPDmlw6XTZTqsGHIw9Qx435J2ubF7xtH7SF5IFDtPNGjKVZ2g2luv+dh5nUSpr6tWafPoW6hmbLjAxIFAGTLSHM6d2YqAnmEWzBfhC+9WdeNTuIqL15Ld+uFyjJd5K+xHR9K8ebU8rUYznx8DeUHrNAtuxk1us8kNz3qyTKWI7KhWd08r4dfB1p9oOlt1R1PhrqeHIrNptMNPi535NqYroWQKY39TYr5zOq4GGHf1SzS4FqljJV1orLifmvjHrSavU7sPOJBtRqrd82A/x4Ffacr32nZKxpzBIgCoAqAKgCAIAqASAKgEgFgCoAqADAEAkA8+o0oPI4MCxeh9Vy6PUJlWgyk1Y9JsEEEfIgkSzGv/AInSkrxe74OEqb7xTTs+PydT4e6hj1eZdHp8GLSJncecylsjMMd5Ag3n0rYNL9R3nWhh6GHoyxMJObjsT3N6ak16tWtNUaml/c6HQ9SxDFnyYMOpxeQ2MVm2qmYu4QrQQbcnHYfT5zhhcdPE1VCdnf1Wl7/2MTgKeHpuUNLa8n16ny1T5dVhfDhzNgxgD9EbVDbSWqhyi8hfSCCRZHYTVlSp05KUlmfHra9+tvyZlGvUkrf6x8NevC9ydZ6todNphiRGOZAcYxMG428erJQGXGLYe+7kcAtdKlgKlWrmm9Hq3x/f2NGeKjCFkteByTM+dmyW+ZnyJTK4G272BiTeID1fsIoce1adWtDDxslZcOPz6mdToTrSTk9V17nTL0vT+Tmc5H34iod3O/G77eMWNgAQ9gmgDW7kH2zaONrSmko3T3It18HRyauzW89XROqat8B06ZEwYNqnJqCCMqIRYAN0XYcBjyAt2fTc4qnhqUs6V7/+d1+towksRKOWpu377HOdY0zYn/Tx6gr307IvO4A+olGtWPJ5F7fYcid8PjY1foqWT57LcDxPByg81Nu3vc2XhHxRpxrDk1yKGbbWUClugVORF4JF8PVi/wCZ5xXZllmpenwesPjLpKe3iebxfrsGXVpq8OkJwb/UzAhdQQeSbFDsQCRzRu6od8LTnCm6cp6vdwOOIqqUlNR0W/iZvlfWhqrHgVkXsFtFLFUdiWOMANwT+mDfI4E9KKo23vrwv9zlKfeJ7l11wN1oumJmQMzeTocSksWJQPTFjQZmG0e7nk2wuqC8Ktfub75v264dP1To98+EF7+Hz0ub8UeJm1a/l8AOHRrQCiwcoHYsPZL7L79zzwMmUm3du7NWEUkklZGjCgcDieT2DAEAQBAEAQCiAS4BDAJUAsACASoBagCoAIgCoBKgGGXEGFEQDwLifCwdL4N2DRFdiDOkKkof6u3W/keZQUtp0nQfEP5jV4Br8z5cCvZXIzMvYhSV9xdX71feaEKkO4mqMFCo1u3+DKck1UWduUV7eJ1Gu6pm/L5kz59NkyuUXSLoypyKxfnacYBXGRQpiSeR96HZ2HxCrZ6kXGKve+it+emXsZWoOCVPVvZv13Hky9E1LI2TqWFxSBVysykYl7iwrbhkZieWB+JeABtOtHE0XNRoS37LPX1VuvMzp0qijmnH3PT4a6jodC2o0+XDkFKC70c24f4ZkHpUgtXFpZ7+854rC1cRlmpJ32LZ6fvU6Ua0ad422Gm6yHzafGmmXGzZsmw7aAwoz0qY1Pwqxpnyi2BJB2+/CtTlQjlWlt/Hz+yPVKcasrv0/Rr/AAs2s1ObDpfNZBjdlVwELLuIBQt/+icH0kke5ugJUpVYwUlKOZS8uvuWZRbas7WO86T1vRdPy5cOqbflxpy6DcrvzuQKDtxv2sCgTySCSJ1WCqVUpwjZPc93PmjnLERg8snqcuNGmXMNfkZNPgyMxVMZ3Ou07OQ5F0QCdtnkekA2NVOUIdyrya3vZr1v9TPm4uSm9E+HX2PrgDZ0Ba8ejQhtnrC5CGO4qASca8ksqEhOSATJsoOy1k/b55X272cXNyV3pH79cje6DRLlwLl1NYtFgBKFuHyD5FuPQOBwBuodzzKtesqLai7ze3gv39jpRousk5aRWzizlfFPiZ9ewRB5ekSvLx0AXrs7gdgK9K+337ZbdzVjFLcagn5TyezGoBagAiAIAgCAUCASABAMYAqAWAAIAqAIAEAVALUAlQARAMSIB4tRo+dycGTusRbW56vDXW202rx5mQM2NrAP7uCpF/Ymj7H5y4sU5UpUajeVrbvXyV3RyyU4LX2fwdZo9Vhd8un0Q1DZtbWMnUOhTGhYu1bLLHluTyOfe7jCdnqgv5E6icY66bW917nTEY11rUlGz2ano6ZpsOEahMGsXVHCrPqMRwlNyY7xv5eVr3AAla9wTVXc6R7SjiKkYuGW7smnx5adcTxPAujByuebw94oGlyH8pphlyZeWTaaV69C4gvqoAsG4omytCXsThHVSdSdlH7b/Ph73KtLEKLtGN7nv6d4ZyMfzT6YDUqzOoTI/ku7Enc4xhvLIvsjDdVHbyTSc8LTbhGSs9t7X8rtbea8CxatPVrXz/BpU0K4srt1HE36h9LqfQD6t204uA3w0KNVRUXY0VPPBdxLZu/vrmUJLLJ96tp7NFoTl3alsxGMDI6qFIC+WDjxh9o2IfgBUAnaRXeRKWW0Muunvq+f7OVs155tOrdcDeaPCv5dc+t24dJiG5cPJ3sSTYFbgpLcYwTd8cSpXrqk2qbvJ7Xw/fM70KLqpOatHcuL+Dj/ABL1/Jr3BYeXgT/x4vtwHf2LV7dgO3uTltmrGNjXTyegBAFQBAFQARAFQC1AFQCVAEAxMAQCwABAEAEQABALUAkACAWAQiAQiAfDPpg/t/MA8mDUZtNlTIrkFWBDDupHv9Z3hXlGOVbHtW5nJ0U5Xf7R0mt8WZsyOoXDj83/AMrYsao2X39bDki+aFXNDs/DYRSU4Ralwb2eBSxmIr2ySldHbfhZ0vGuDJqWXcTvviyVSqQfQkMSPc7PlOPbWIlFqC2ddep17Oppq5znUfxUznLaO6rfwqFCL8h8JLfzfv24E+eyVXrHT0Nq9KOjVzsxqE6j078w4UFvNViBQby1crkr2ZSoP0px2M0Ozas41UrW5c/38cEUMfTg4N306+xoeg9GxaTD+d15K4hRXGedzfttP3MfZf57TYxuM1cKfm/gyMHhG/rqeSOV8Qdbza/L5uX041J8rF7KO25q+JyPf27D65DZrpHhMg9FqAWoAgCASoAIgFgCoAgCASoBjAEAQCwAIAqAKgFqASoBagFgACAQiAQiAYsgPBgHgyaVk5Tke6/3sfrPcZuLujnOmprU7H8PPGg0rHHkBKE38ypNBuPdTS3XYqD8we+IqxrxXebePz18nCjTlSk8vp8HWZOm9EzHze3PKqxRftRAYD7CZyw0o6KoreKL38jNti7+DNlrvE+h0+nu1XEg248aqaJrhVUgbmPPeuLviye1OKh/q78znO8v9l5H5Z1nq+bXZRlzDaovy8YshB8z/k592/8Ag4nq4SPKZBIAgGVQBAFQBAAgCoAqASAWoAgFAggwEEkgFgCAIAqAIBYAgCAIBYAgEqAQiASoB5c+jDcjgjsRJIaufXDqNUnC5B8rIBIH09vf5SPp/wCURZ/9PryIunYkNlYuw7X7fYe3t/tBKVj0GCQBAMqgEgFMAQBAJAEAogCAIBKgFuAYwBUAkAogCAIBYBIBYAgCAKgFqAQwCwCVAMagFuACYBQIBlAEAkAsAgEAQBUApgEqAUwCQBUAH+8wDGoBYAgAQBALUAVAEAQAYAgCoBYAEAlQCwCVAJUAogFqAKgCAWASAUwBAJUAogEqAUQCQCwCGAYwCwAIAqAIAgFqAKgACAIAgCAIAgFgEgCAIBYAqAIAqAWoBKgCAKgFgEqAIAgCAIAgGIEAtQBAEACAKgFqAIBDALUAGAIAgCAKgCAIAgFgCAKgEqAWoAMAVALUAlQCiASAWoAgCoBiRAIZIAkAqwCQDKARf7/tALAJAKIBDAHtAMhAMR/f+YBTAAgCARoBkIAgEMAsAQBADQAsAQDGAZmAEgEgCABAIYB//9k=", 32, 32))
            .appendField(new Blockly.FieldDropdown([
                ["orientatie", "orientation"],
                ["Verandering", "change"]
            ]), "BNO055_STATE")
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["OriëntatieSensor1", "BNO055_1"],
                ["OriëntatieSensor2", "BNO055_2"],
                ["OriëntatieSensor3", "BNO055_3"],
                ["OriëntatieSensor4", "BNO055_4"],
                ["OriëntatieSensor4", "BNO055_5"],
                ["OriëntatieSensor5", "BNO055_6"],
                ["OriëntatieSensor6", "BNO055_7"]
            ]), "BNO055_NAAM1");

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Adafruit BNO055 I2C orientatiemodule", "BNO055"]
            ]), "BNO055_CONTROLLER1");

        this.appendValueInput("BNO055_IO", "String")
            .appendField("IO-poort")
            .setCheck("String");

        this.setInputsInline(true);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde GPS


// Capacitive touch --> zie   http://johnny-five.io/examples/sensor-fsr/ en http://www.instructables.com/id/Capacitive-Touch-Arduino-Keyboard-Piano/
Blockly.Blocks['CapacitiveTouch'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var Potmeter" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(75); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput('POTMETER1_DO0')
            .appendField(new Blockly.FieldImage("https://cdn.instructables.com/F2X/LMHK/HH11RZS1/F2XLMHKHH11RZS1.SMALL.jpg", 32, 32))
            .appendField("vinger gevoelig sensor")
            .appendField(new Blockly.FieldDropdown([
                ["Data", "data"],
                ["Buiten sensor bereik", "change"],
                ["Slide [slip sensor]", "slide"]
            ]), "TOUCH1_STATE");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["VingerGevoelig1", "VingerGevoelig_1"],
                ["VingerGevoelig2", "VingerGevoelig_2"],
                ["VingerGevoelig3", "VingerGevoelig_3"],
                ["VingerGevoelig4", "VingerGevoelig_4"],
                ["VingerGevoelig5", "VingerGevoelig_5"],
                ["VingerGevoelig6", "VingerGevoelig_6"],
                ["VingerGevoelig7", "VingerGevoelig_7"]
            ]), "TOUCH1_NAAM1");
        this.appendDummyInput()
            .appendField(" Controller: ")
            .appendField(new Blockly.FieldDropdown([
                ["Stukje tin folie ", "DEFAULT"],
                ["Tinkerkit touch", "TINKERKIT"],
                ["Touchpad - MPR121", "MPR121"],
                ["Touchpad - MPR121_SHIELD", "MPR121_SHIELD"],
                ["Touchpad - MPR121_KEYPAD", "MPR121_KEYPAD"],
                ["Touchpad - MPR121, Sensitivity", "MPR121"],
                ["Touchpad - MPR121QR2_SHIELD", "MPR121QR2_SHIELD"],
                ["Touchpad - Grove QTOUCH", "QTOUCH"]
            ]), "TOUCH1_CONTROLLER1");
        this.setInputsInline(true);

        this.appendValueInput("TOUCH1_PWM_POORTNUMMER", "String")
            .appendField("PWM IO Poort")
            .setCheck("String");
        this.setTooltip("default EasyLab4Kids Servo op D10");

        this.appendValueInput("TOUCH1_IO_POORTNUMMER", "String")
            .appendField("Tin folie IO-poort")
            .setCheck("String");
        this.setTooltip("default Arduino D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}; // einde CapacitiveTouch

// Capacitive touch --> zie   http://johnny-five.io/examples/sensor-fsr/ en http://www.instructables.com/id/Capacitive-Touch-Arduino-Keyboard-Piano/
Blockly.Blocks['declare_CapacitiveTouch'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var Potmeter" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(85);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://cdn.instructables.com/F2X/LMHK/HH11RZS1/F2XLMHKHH11RZS1.SMALL.jpg", 32, 32))
            .appendField("vinger gevoelig sensor");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["VingerGevoelig1", "VingerGevoelig_1"],
                ["VingerGevoelig2", "VingerGevoelig_2"],
                ["VingerGevoelig3", "VingerGevoelig_3"],
                ["VingerGevoelig4", "VingerGevoelig_4"],
                ["VingerGevoelig5", "VingerGevoelig_5"],
                ["VingerGevoelig6", "VingerGevoelig_6"],
                ["VingerGevoelig7", "VingerGevoelig_7"]
            ]), "DECLARE_TOUCH1_NAAM1");
        this.appendDummyInput()
            .appendField(" Controller: ")
            .appendField(new Blockly.FieldDropdown([
                ["Stukje tin folie ", "DEFAULT"],
                ["Tinkerkit touch", "TINKERKIT"],
                ["Touchpad - MPR121", "MPR121"],
                ["Touchpad - MPR121_SHIELD", "MPR121_SHIELD"],
                ["Touchpad - MPR121_KEYPAD", "MPR121_KEYPAD"],
                ["Touchpad - MPR121, Sensitivity", "MPR121"],
                ["Touchpad - MPR121QR2_SHIELD", "MPR121QR2_SHIELD"],
                ["Touchpad - Grove QTOUCH", "QTOUCH"]
            ]), "DECLARE_TOUCH1_CONTROLLER1");

        this.appendValueInput("DECLARE_TOUCH1_IO_POORTNUMMER", "String")
            .appendField("Tin folie IO-poort")
            .setCheck("String");
        this.setTooltip("default Arduino D8");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}; // einde declare_CapacitiveTouch

Blockly.Blocks['event_CapacitiveTouch'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var Potmeter" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["globalVar1_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(85); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendStatementInput("EVENT_TOUCH1_DO")
            .appendField(new Blockly.FieldImage("https://cdn.instructables.com/F2X/LMHK/HH11RZS1/F2XLMHKHH11RZS1.SMALL.jpg", 32, 32))
            .appendField("vinger gevoelig sensor")
            .appendField(new Blockly.FieldDropdown([
                ["Data", "data"],
                ["Buiten sensor bereik", "change"],
                ["Slide [slip sensor]", "slide"]
            ]), "EVENT_TOUCH1_STATE");
        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["VingerGevoelig1", "VingerGevoelig_1"],
                ["VingerGevoelig2", "VingerGevoelig_2"],
                ["VingerGevoelig3", "VingerGevoelig_3"],
                ["VingerGevoelig4", "VingerGevoelig_4"],
                ["VingerGevoelig5", "VingerGevoelig_5"],
                ["VingerGevoelig6", "VingerGevoelig_6"],
                ["VingerGevoelig7", "VingerGevoelig_7"]
            ]), "EVENT_TOUCH1_NAAM1");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}; // einde event_CapacitiveTouch


// kode vir L923D motordiver --> https://github.com/rwaldron/johnny-five/wiki/motor
Blockly.Blocks['motorshield'] = {
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
        this.setColour(75); // this.setColour(Blockly.Blocks.procedures.HUE);
        this.appendDummyInput('MOTORSHIELD1_DO0')
            .appendField(new Blockly.FieldImage("http://www.nyplatform.com/image/cache/data/Robot/Motor%20Servo/Gear%20Motor%20x2%20+%20PLASTIC%20TIRES%20x2/LT-8-700x700.jpg", 32, 32))
            .appendField("Robotmotor L293D")
        this.appendDummyInput()
            .appendField(" Wie ben ik: ")
            .appendField(new Blockly.FieldDropdown([
                ["Motor links voor", "L923motorshield_l_voor"],
                ["Motor rechts voor", "L923motorshield_r_voor"],
                ["Motor links achter", "L923motorshield_l_achter"],
                ["Motor rechts achter", "L923motorshield_r_achter"]
            ]), "MOTORSHIELD1_NAAM1");
        this.appendDummyInput()
            .appendField(" Soort motorshield: ")
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab4Kids Arduino ", "DEFAULT"],
                ["Arduino Dual H-Bridge", "H_BRIDGE"],
                ["Arduino Motor Shield R3", "ARDUINO_MOTOR_SHIELD_R3_1"],
                ["Arduino DF Robot - MPR121", "DF Robot"],
                ["Arduino Rugged Circuits Rugged Motor Driver", "RUGGED_CIRCUITS"],
                ["Arduino Sparkfun Ardumoto", "SPARKFUN_ARDUMOTO"],
                ["Arduino Uno Adafruit Motor/Stepper/Servo Shield V1", "ADAFRUIT_V1"],
                ["Arduino Uno Adafruit Motor/Stepper/Servo Shield V2", "ADAFRUIT_V2"],
                ["Arduino Pololu DRV8835 Shield", "POLOLU_DRV8835_SHIELD"],
                ["Motor PCA9685 via I2C", "PCA9685"]
            ]), "MOTORSHIELD1_CONTROLLER1");
        this.setInputsInline(true);

        this.appendValueInput("MOTORSHIELD1_DOEN", "String")
            .appendField(" Wat moet ik doen? ")
            .setCheck("String");

        this.setTooltip("default Arduino D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}; // einde motorshield

// declare_digitalReadWrite pins, https://github.com/rwaldron/johnny-five/wiki/board
Blockly.Blocks['declare_digitalReadWrite'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(150);
        this.appendDummyInput('DECLARE_DIGITALREAD_DO')
            .appendField("Rechtreeks IO Poorten gebruiken -- ");

        this.appendValueInput("DECLARE_DIGITALREAD1_IO_PINMODE", "String")
            .appendField("Welke PinMode?")
            .setCheck("String");

        this.appendValueInput("DECLARE_DIGITALREAD1_IO_POORT", "String")
            .appendField("Op welke IO Poort?")
            .setCheck("String");
        this.setTooltip("default D8");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde declare_digitalReadWrite


// event_digitalReadWrite pins, https://github.com/rwaldron/johnny-five/wiki/board
Blockly.Blocks['event_digitalReadWrite'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(145);
        this.appendDummyInput('EVENT_DIGITALREAD_DO')
            .appendField(" Wanneer: ")
            .appendField(new Blockly.FieldDropdown([
                ["data ontvangen worden", "data"]
            ]), "EVENT_DIGITALREAD1_STAAT");

        this.appendDummyInput('DECLARE_DIGITALREAD_DO')
            .appendField(" IO data uitlezen: ")
            .appendField(new Blockly.FieldDropdown([
                ["DigitalReadWrite1", "DigitalReadWrite_1"],
                ["DigitalReadWrite2", "DigitalReadWrite_2"],
                ["DigitalReadWrite3", "DigitalReadWrite_3"],
                ["DigitalReadWrite4", "DigitalReadWrite_4"],
                ["DigitalReadWrite5", "DigitalReadWrite_5"],
                ["DigitalReadWrite6", "DigitalReadWrite_6"],
                ["DigitalReadWrite7", "DigitalReadWrite_7"],
                ["DigitalReadWrite8", "DigitalReadWrite_8"]
            ]), "EVENT_DIGITALREAD1_NAAM1");

        this.appendValueInput("EVENT_DIGITALREAD1_DOEN", "String")
            .appendField("IO poort aksie ")
            .setCheck("String");

        this.appendValueInput("EVENT_DIGITALREAD1_IO_POORT", "String")
            .appendField("Op welke IO Poort?")
            .setCheck("String");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde event_digitalReadWrite


Blockly.Blocks['declare_relay'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var relay" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(105);
        this.appendDummyInput()
            .appendField("Relay")
            .appendField(new Blockly.FieldImage("http://www.robotop.lv/1245-home/relay-1-ch.jpg", 32, 32))
            .appendField("Type")
            .appendField(new Blockly.FieldDropdown([
                ["standaard open", "default"],
                ["standaard dicht", "NC"]
            ]), "DECLARE_RELAY_CONTROLLER1");

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Relay1", "RELAY_1"],
                ["Relay2", "RELAY_2"],
                ["Relay3", "RELAY_3"],
                ["Relay4", "RELAY_4"]
            ]), "DECLARE_RELAY_NAAM1");

        this.appendValueInput("DECLARE_RELAY_IO_POORT", "String")
            .appendField("IO Poort aansluiting")
            .setCheck("String");

        this.setTooltip("default D8");

        this.setTooltip("Relay gebruiken");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde declare_relay


// cmd_relay pins, http://johnny-five.io/api/relay/
Blockly.Blocks['cmd_relay'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var relay" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(103);
        this.appendDummyInput('CMD_RELAY_DO')
            .appendField(" ");

        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("http://www.robotop.lv/1245-home/relay-1-ch.jpg", 32, 32))
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["Relay1", "RELAY_1"],
                ["Relay2", "RELAY_2"],
                ["Relay3", "RELAY_3"],
                ["Relay4", "RELAY_4"]
            ]), "CMD_RELAY_NAAM1");

        this.appendValueInput("CMD_RELAY_DOEN", "String")
            .appendField("en je wil dat ik ")
            .setCheck("String");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde cmd_digitalReadWrite

Blockly.Blocks['cmd_relay_staat_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(108);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Relay open       ", "RELAY_open"],
                ["Relay dicht      ", "RELAY_close"],
                ["Relay omschakelen", "RELAY_toggle"]
            ]), 'CMD_RELAY_STAAT_LIJST')
        this.setOutput(true, 'String');
        this.setTooltip('Relay wat moet hy doen');
    }
};

Blockly.Blocks['declare_piezo1'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var piezoBuzzer" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(120);
        this.appendDummyInput()
            .appendField("Piezo luidspreker")
            .appendField(new Blockly.FieldImage("http://shallowsky.com/arduino/class/buzzer.jpg", 32, 32))
            .appendField(" PiezoNaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Buzzer1", "objPiezo_1"],
                ["Buzzer2", "objPiezo_2"],
                ["Buzzer3", "objPiezo_3"],
                ["Buzzer4", "objPiezo_4"]
            ]), "DECLARE_PIEZO_NAAM1")
            .appendField("Controller: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard", "null"],
                ["I2C Backpack", "\"I2C_BACKPACK\""]
            ]), "DECLARE_F_PIEZO_SENSOR");

        this.appendValueInput("DECLARE_PIEZO_IO_POORT", "String")
            .appendField("IO Poort aansluiting");


        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("default EasyLab4Kids D8");
    }
};

Blockly.Blocks['cmd_piezo1'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var piezoBuzzer" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(128);
        this.appendDummyInput()
            .appendField("Piezo afspelen")
            .appendField(new Blockly.FieldImage("http://shallowsky.com/arduino/class/buzzer.jpg", 32, 32))
            .appendField(" PiezoNaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Buzzer1", "objPiezo_1"],
                ["Buzzer2", "objPiezo_2"],
                ["Buzzer3", "objPiezo_3"],
                ["Buzzer4", "objPiezo_4"]
            ]), "CMD_PIEZO_NAAM1");

        this.appendValueInput("CMD_PIEZO_MUZIEK1", 'String')
            .appendField("Liedje");

        this.appendValueInput("CMD_PIEZO_TEMPO1", 'String')
            .appendField("Tempo")
            .setCheck("String");

        this.appendValueInput("CMD_PIEZO_BEAT1", 'String')
            .appendField("Beat")
            .setCheck("String");

        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('bijvoorbeeld liedje=A B C D C - - A');
    }
};

Blockly.Blocks['cmd_piezo1_tempo_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Tempo100", "100"],
                ["Tempo150", "150"],
                ["Tempo200", "200"],
                ["Tempo250", "250"]
            ]), 'CMD_PIEZO_TEMPO1_LIJST')
        this.setOutput(true, 'String');
        this.setTooltip('Piezo tempo wat moet hy doen');
    }
};

Blockly.Blocks['cmd_piezo1_beat_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Beat 4 op 4", "4 / 4"],
                ["Beat 1 op 4", "1 / 4"],
                ["Beat 2 op 4", "2 / 4"],
                ["Beat 3 op 4", "3 / 4"],
            ]), 'CMD_PIEZO_BEAT1_LIJST')
        this.setOutput(true, 'String');
        this.setTooltip('Piezo beats wat moet hy doen');
    }
};


Blockly.Blocks['cmd_piezo1_voorbeeldlied_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Voorbeeldlied Mary had a little lamb (lang)", "\"E - D - C - D - - E E E D D D - E - G \""],
                ["Voorbeeldlied Mary had a little lamb (kort)", "\"E - D - C - D \""],
                ["Voorbeeldlied Vader jacob (kort)", "\"F - G - A - F \""],
                ["Voorbeeldlied geluid A - B - C", "\"A - B - C - \""],
                ["Voorbeeldlied geluid C - D - F", "\"C - D - F - \""],
                ["Voorbeeldlied zomaar wat (kort)", "\"A - B - C - D - C - - A \""],
                ["Voorbeeldlied biep hoge toon", "\"A - \""],
                ["Voorbeeldlied biep lage toon", "\"F - \""],
                ["Voorbeeldlied rookmelder", "\"A A# A# A A# A# \""],
                ["Voorbeeldlied takkeherrie!!", "\"AGCDFE - FEDC - AG \""]
            ]), 'CMD_PIEZO_VOORBEELDLIED1_LIJST')
        this.setOutput(true, 'String');
        this.setTooltip('herriemaken wat moet hy doen');
    }
};

Blockly.Blocks['declare_hygrometer'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var hygroBuzzer" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(113);
        this.appendDummyInput()
            .appendField("Hygrometer")
            .appendField(new Blockly.FieldImage("https://cdn.instructables.com/FMR/80K3/IOOM3FBW/FMR80K3IOOM3FBW.MEDIUM.jpg", 32, 32))
            .appendField(" sensornaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Hygrometer1", "Hygrometer_1"],
                ["Hygrometer2", "Hygrometer_2"],
                ["Hygrometer3", "Hygrometer_3"],
                ["Hygrometer4", "Hygrometer_4"]
            ]), "DECLARE_HYGRO_NAAM1")
            .appendField("Soort meter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard TH02", "TH02"],
                ["BME280", "HTU21D"],
                ["HIH6130 Sparkfun", "HIH6130"],
                ["SI7020  Tessel Climate", "HTU21D"],
                ["SI7021  Sparkfun", "SI7021"],
                ["SHT31D  Adafruit", "HTU21D"],
                ["DHT11 nano backpack", "DHT11_I2C_NANO_BACKPACK"],
                ["DHT21           ", "DHT21_I2C_NANO_BACKPACK"],
                ["DHT22           ", "DHT22_I2C_NANO_BACKPACK"]
            ]), "DECLARE_HYGRO_SENSOR");

        this.appendValueInput("DECLARE_HYGRO_FREQ", "Number")
            .appendField("data freq (ms) [0-10000]")
            .setCheck("Number");

        this.appendValueInput("DECLARE_HYGRO_IO_POORT", "String")
            .appendField("IO Poort aansluiting");


        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("default EasyLab4Kids D8");
    }
};

Blockly.Blocks['event_hygrometer'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = ""; //Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var hygroSensor" + veranderlike1 + ";\n";

        this.setColour(113);
        this.appendStatementInput('EVENT_HYGRO_DO')
            .appendField(new Blockly.FieldImage("https://cdn.instructables.com/FMR/80K3/IOOM3FBW/FMR80K3IOOM3FBW.MEDIUM.jpg", 32, 32))
            .appendField("Welke sensor: ")
            .appendField(new Blockly.FieldDropdown([
                ["Hygrometer1", "Hygrometer_1"],
                ["Hygrometer2", "Hygrometer_2"],
                ["Hygrometer3", "Hygrometer_3"],
                ["Hygrometer4", "Hygrometer_4"]
            ]), "EVENT_HYGRO_NAAM1")
            .setAlign(Blockly.ALIGN_RIGHT);


        this.appendDummyInput()
            .appendField(" Wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Data freq uitgelezen", "data"],
                ["Luchtvochtigheid wijziging vastgesteld", "change"]
            ]), "EVENT_HYGRO_SENSOR_STAAT")
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde event_hygrometer


Blockly.Blocks['test_event_header'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.setColour(92); // this.setColour(Blockly.Blocks.procedures.HUE);
        var name = "test_event_header";
        var nameField = new Blockly.FieldTextInput(name,
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.arguments_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('STACK')
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
    }
};


Blockly.Blocks['declare_barometer'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var hygroBuzzer" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(113);
        this.appendDummyInput()
            .appendField("Barometer")
            .appendField(new Blockly.FieldImage("https://cdn.sparkfun.com/images/products/1/1/8/2/4/11824-02.jpg", 32, 32))
            .appendField(" sensornaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Barometer1", "Barometer_1"],
                ["Barometer2", "Barometer_2"],
                ["Barometer3", "Barometer_3"],
                ["Barometer4", "Barometer_4"]
            ]), "DECLARE_BARO_NAAM1")
            .appendField("Soort meter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard BMP180", "BMP180"],
                ["MPL115A2  Sparkfun", "MPL115A2"],
                ["MPL3115A2 Sparkfun", "MPL3115A2"]
            ]), "DECLARE_BARO_SENSOR");

        this.appendValueInput("DECLARE_BARO_FREQ", "Number")
            .appendField("data freq (ms) [0-10000]")
            .setCheck("Number");

        this.appendValueInput("DECLARE_BARO_IO_POORT", "String")
            .appendField("IO Poort aansluiting");


        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("default EasyLab4Kids I2C");
    }
};

Blockly.Blocks['event_barometer'] = {
    init: function() {
        var veranderlike1 = ""; //Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var hygroSensor" + veranderlike1 + ";\n";

        this.setColour(113);
        this.appendStatementInput('EVENT_BARO_DO')
            .appendField(new Blockly.FieldImage("https://cdn.sparkfun.com/images/products/1/1/8/2/4/11824-02.jpg", 32, 32))
            .appendField("Welke sensor: ")
            .appendField(new Blockly.FieldDropdown([
                ["Barometer1", "Barometer_1"],
                ["Barometer2", "Barometer_2"],
                ["Barometer3", "Barometer_3"],
                ["Barometer4", "Barometer_4"]
            ]), "EVENT_BARO_NAAM1")
            .setAlign(Blockly.ALIGN_RIGHT);


        this.appendDummyInput()
            .appendField(" Wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Data freq uitgelezen", "data"],
                ["Luchtdruk wijziging vastgesteld", "change"]
            ]), "EVENT_BARO_SENSOR_STAAT")
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde event_barometer


Blockly.Blocks['declare_photoresistor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var photoresistor2" + veranderlike1 + ";\n";

        this.setColour(119);
        this.appendDummyInput()
            .appendField("Photoresistor")
            .appendField(new Blockly.FieldImage("http://www.resistorguide.com/pictures/photoresistor.png", 32, 32))
            .appendField(" sensornaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["Photoresistor1", "Photoresistor_1"],
                ["Photoresistor2", "Photoresistor_2"],
                ["Photoresistor3", "Photoresistor_3"],
                ["Photoresistor4", "Photoresistor_4"]
            ]), "DECLARE_PHOTORESISTOR_NAAM1");

        this.appendValueInput("DECLARE_PHOTORESISTOR_FREQ", "Number")
            .appendField("data freq (ms) [0-10000]")
            .setCheck("Number");

        this.appendValueInput("DECLARE_PHOTORESISTOR_IO_POORT", "String")
            .appendField("IO Poort aansluiting");


        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("default EasyLab4Kids A3");
    }
};


Blockly.Blocks['event_photoresistor'] = {
    init: function() {
        var veranderlike1 = ""; //Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var photoresistorSensor" + veranderlike1 + ";\n";

        this.setColour(119);
        this.appendStatementInput('EVENT_PHOTORESISTOR_DO')
            .appendField(new Blockly.FieldImage("http://www.resistorguide.com/pictures/photoresistor.png", 32, 32))
            .appendField("Welke fotoweerstand: ")
            .appendField(new Blockly.FieldDropdown([
                ["Photoresistor1", "Photoresistor_1"],
                ["Photoresistor2", "Photoresistor_2"],
                ["Photoresistor3", "Photoresistor_3"],
                ["Photoresistor4", "Photoresistor_4"]
            ]), "EVENT_PHOTORESISTOR_NAAM1")
            .setAlign(Blockly.ALIGN_RIGHT);


        this.appendDummyInput()
            .appendField(" Wanneer ")
            .appendField(new Blockly.FieldDropdown([
                ["Data freq uitgelezen", "data"],
                ["Lichtmeting wijziging vastgesteld", "change"]
            ]), "EVENT_PHOTORESISTOR_STAAT")
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde event_photoresistor