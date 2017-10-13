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
 * @fileoverview LCD/LED-scherm blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */
'use strict';

goog.provide('Blockly.Blocks.beeldskerm');

goog.require('Blockly.Blocks');


Blockly.Blocks['declare_matrix_led'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var matrixLED" + veranderlike1 + ";\n";
        //Blockly.Arduino.definitions_["proximity_sensor_data" + veranderlike1] = globalVar1;
        // Blockly.Variables.predefinedVars.push(globalVar1);

        this.setColour(205);
        this.appendDummyInput()
            .appendField("8x8 Matrix ")
            .appendField(new Blockly.FieldImage("https://i.ebayimg.com/images/g/x8wAAOSwLqFV7qNF/s-l300.jpg", 32, 32))
            .appendField(" sensornaam: ")
            .appendField(new Blockly.FieldDropdown([
                ["LEDScherm1", "LEDScherm_1"],
                ["LEDScherm2", "LEDScherm_2"],
                ["LEDScherm3", "LEDScherm_3"],
                ["LEDScherm4", "LEDScherm_4"]
            ]), "DECLARE_LEDMATRIX_NAAM1")
            .appendField("Soort meter: ")
            .appendField(new Blockly.FieldDropdown([
                ["Standaard LED Matrix met MAX7219", "MAX7219"],
                ["Adafruit HT16K33 7-segment      ", "HT16K33"],
                ["Adafruit HIH6130 met I2C        ", "HIH6130"]
            ]), "DECLARE_LEDMATRIX_SENSOR");

        this.appendValueInput("DECLARE_LEDMATRIX_FREQ", "Number")
            .appendField("update freq (ms) [0-500]")
            .setCheck("Number");

        this.appendValueInput("DECLARE_LEDMATRIX_IO_POORT_DAT", "Number")
            .appendField("IO: dat")
            .setCheck("Number");

        this.appendValueInput("DECLARE_LEDMATRIX_IO_POORT_CLK", "Number")
            .appendField("IO: clk")
            .setCheck("Number");

        this.appendValueInput("DECLARE_LEDMATRIX_IO_POORT_CS", "Number")
            .appendField("IO: cs")
            .setCheck("Number");

        this.appendDummyInput()
            .appendField(" ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("I2C gebruik geen IO dit is default op I2C-poort");
    }
};

Blockly.Blocks['cmd_matrix_led'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var lcd" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(205);
        this.appendDummyInput()
            .appendField("8x8 Matrix ")
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://i.ebayimg.com/images/g/x8wAAOSwLqFV7qNF/s-l300.jpg", 32, 32))
            .appendField(" welke LED: ")
            .appendField(new Blockly.FieldDropdown([
                ["LEDScherm1", "LEDScherm_1"],
                ["LEDScherm2", "LEDScherm_2"],
                ["LEDScherm3", "LEDScherm_3"],
                ["LEDScherm4", "LEDScherm_4"]
            ]), "CMD_LEDMATRIX_NAAM1");

        this.appendValueInput("CMD_LEDMATRIX_STATE", "String")
            .appendField("Wat moet ik doen? ")
            .setCheck("String");

        this.appendValueInput("CMD_LEDMAXTRIX_TEXT", "String")
            .appendField("Tekstje of aantal")
            .setCheck("String");

        this.appendValueInput("CMD_LEDMAXTRIX_POSX", "Number")
            .appendField("Op kolom [0-16]")
            .setCheck("Number");

        this.appendValueInput("CMD_LEDMAXTRIX_POSY", "Number")
            .appendField("in regeltje [0-16]")
            .setCheck("Number");

        this.setTooltip("LED matrix");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde cmd_I2C_LCD

Blockly.Blocks['cmd_matrix_doen_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(207);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Matrix schrijven tekst", "CHARS"],
                ["Matrix sprite tekenen ", "draw"],
                ["Matrix aan            ", "on"],
                ["Matrix uit            ", "off"],
                ["Matrix leegmaken      ", "clear"],
                ["Matrix helderheid instelling", "brightness"],
                ["Matrix demo          ", "demo"]
            ]), 'DECLARE_LEDMATRIX_DOEN_LIJST');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};

Blockly.Blocks['easylabs_image_create'] = {
    init: function() {
        this.jsonInit({
            "colour": 128,
            "args0": [{ "type": "input_dummy" }, {
                "colour": "#000000",
                "type": "field_dropdown",
                "name": "00",
                "message0": "BPM",
                "options": [
                    ["Tempo150", "PIEZO_TEMPO150"],
                    ["Tempo200", "PIEZO_TEMPO200"]
                ]
            }, { "colour": "#000000", "type": "field_input", "message0": "Muziek note: %1", "name": "01", "text": "A - B - C " }, { "colour": "#000000", "type": "field_colour", "name": "02" }, { "colour": "#000000", "type": "field_colour", "name": "03" }, { "colour": "#000000", "type": "field_colour", "name": "04" }, { "type": "input_dummy" }, { "colour": "#000000", "type": "field_colour", "name": "10" }, { "colour": "#000000", "type": "field_colour", "name": "11" }, { "colour": "#000000", "type": "field_colour", "name": "12" }, { "colour": "#000000", "type": "field_colour", "name": "13" }, { "colour": "#000000", "type": "field_colour", "name": "14" }, { "type": "input_dummy" }, { "colour": "#000000", "type": "field_colour", "name": "20" }, { "colour": "#000000", "type": "field_colour", "name": "21" }, { "colour": "#000000", "type": "field_colour", "name": "22" }, { "colour": "#000000", "type": "field_colour", "name": "23" }, { "colour": "#000000", "type": "field_colour", "name": "24" }, { "type": "input_dummy" }, { "colour": "#000000", "type": "field_colour", "name": "30" }, { "colour": "#000000", "type": "field_colour", "name": "31" }, { "colour": "#000000", "type": "field_colour", "name": "32" }, { "colour": "#000000", "type": "field_colour", "name": "33" }, { "colour": "#000000", "type": "field_colour", "name": "34" }, { "type": "input_dummy" }, { "colour": "#000000", "type": "field_colour", "name": "40" }, { "colour": "#000000", "type": "field_colour", "name": "41" }, { "colour": "#000000", "type": "field_colour", "name": "42" }, { "colour": "#000000", "type": "field_colour", "name": "43" }, { "colour": "#000000", "type": "field_colour", "name": "44" }],
            "output": "LEDMATRIX_PLAATJE",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image",
            "tooltip": "Teken een afbeelding.",
            "message0": "Afbeelding maken %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30"
        });
    }
};

// toegevoegd 5-10-2017
Blockly.Blocks['sprite_build'] = {
    init: function() {
        this.setColour(206);
        this.appendDummyInput().appendField("8x8 matrix: bouw sprite ");
        this.appendDummyInput().appendField("7").appendField(new Blockly.FieldCheckbox("FALSE"), "LED07").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED17").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED27").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED37").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED47");
        this.appendDummyInput().appendField("6").appendField(new Blockly.FieldCheckbox("FALSE"), "LED06").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED16").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED26").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED36").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED46");
        this.appendDummyInput().appendField("5").appendField(new Blockly.FieldCheckbox("FALSE"), "LED05").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED15").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED25").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED35").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED45");
        this.appendDummyInput().appendField("4").appendField(new Blockly.FieldCheckbox("FALSE"), "LED04").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED14").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED24").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED34").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED44");
        this.appendDummyInput().appendField("3").appendField(new Blockly.FieldCheckbox("FALSE"), "LED03").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED13").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED23").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED33").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED43");
        this.appendDummyInput().appendField("2").appendField(new Blockly.FieldCheckbox("FALSE"), "LED02").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED12").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED22").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED32").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED42");
        this.appendDummyInput().appendField("1").appendField(new Blockly.FieldCheckbox("FALSE"), "LED01").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED11").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED21").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED31").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED41");
        this.appendDummyInput().appendField("0").appendField(new Blockly.FieldCheckbox("FALSE"), "LED00").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED10").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED20").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED30").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED40");
        goog.labs.userAgent.browser.isFirefox() ? this.appendDummyInput().appendField("    0    1    2    3    4    5    6    7") : this.appendDummyInput().appendField("    0    1    2    3    4    5    6    7");
        this.setOutput(!0, "Sprite");
        this.setTooltip("Bouw een sprite");
    }
};

Blockly.Blocks['declare_I2C_LCD'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var lcd" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(151);
        this.appendDummyInput()
            .appendField("i2c LCD");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://sc02.alicdn.com/kf/HTB1HtNDKpXXXXa5XFXXq6xXFXXXn/Module-For-Arduino-1602-Blue-Backlight-LCD-Display-16x2-HD44780-Character-LCD-IIC-I2C-W-Serial.jpg_50x50.jpg", 32, 32))
            .appendField("Soort")
            .appendField(new Blockly.FieldDropdown([
                ["standaard", "PCF8574"],
                ["I2C, PCF8574A", "PCF8574A"],
                ["I2C, JHD1313M1 (Grove)", "JHD1313M1"]
            ]), "DECLARE_I2C_LCD1_CONTROLLER1");

        this.appendDummyInput()
            .appendField(" Identificatie: ")
            .appendField(new Blockly.FieldDropdown([
                ["LCD1", "LCD_1"],
                ["LCD2", "LCD_2"],
                ["LCD3", "LCD_3"],
                ["LCD4", "LCD_4"]
            ]), "DECLARE_I2C_LCD1_NAAM1");

        this.appendValueInput("DECLARE_I2C_LCD1_FREQ", "Number")
            .appendField("Scherm bijwerken [0-3000]ms")
            .setCheck("Number");

        this.appendDummyInput()
            .appendField(" I2C adres ")
            .appendField(new Blockly.FieldDropdown([
                ["I2C poort 0x27", "\"0x27\""]
            ]), "DECLARE_I2C_LCD1_POORTNUMMER");

        this.setInputsInline(true);
        this.setTooltip("LCD helderheid");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde declare_I2C_LCD

Blockly.Blocks['cmd_I2C_LCD'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var lcd" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(151);
        this.appendDummyInput()
            .appendField("i2c LCD");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://sc02.alicdn.com/kf/HTB1HtNDKpXXXXa5XFXXq6xXFXXXn/Module-For-Arduino-1602-Blue-Backlight-LCD-Display-16x2-HD44780-Character-LCD-IIC-I2C-W-Serial.jpg_50x50.jpg", 32, 32))
            .appendField(" welke scherm: ")
            .appendField(new Blockly.FieldDropdown([
                ["LCD1", "LCD_1"],
                ["LCD2", "LCD_2"],
                ["LCD3", "LCD_3"],
                ["LCD4", "LCD_4"]
            ]), "CMD_I2C_LCD1_NAAM1");

        this.appendValueInput("CMD_I2C_LCD1_STATE", "String")
            .appendField("Wat moet ik doen? ")
            .setCheck("String");

        this.appendValueInput("CMD_I2C_LCD1_TEXT", "String")
            .appendField("Tekst om te schrijven")
            .setCheck("String");

        this.appendValueInput("CMD_I2C_LCD1_POSX", "Number")
            .appendField("Op kolom [0-16]")
            .setCheck("Number");

        this.appendValueInput("CMD_I2C_LCD1_POSY", "Number")
            .appendField("in regeltje [0-1]")
            .setCheck("Number");

        this.setInputsInline(true);
        this.setTooltip("LCD helderheid");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde cmd_I2C_LCD



Blockly.Blocks['cmd_lcd_text_op_2_regels'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var lcd" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(151);
        this.setOutput(true, 'String');

        this.appendDummyInput()
            .appendField("LCD teks");

        this.appendValueInput("CMD_I2C_TEXT_L1", "String")
            .appendField("Tekst Lijn 1:")
            .setCheck("String");

        this.appendValueInput("CMD_I2C_TEXT_L2", "String")
            .appendField("Tekst Lijn 2:")
            .setCheck("String");

        this.setInputsInline(true);
        this.setTooltip("LCD helderheid");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde cmd_I2C_LCD