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
 * @fileoverview IO-blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */

goog.provide('Blockly.Blocks.inputoutput');

goog.require('Blockly.Blocks');


Blockly.Blocks['ArduinoReadCommands'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["IO poort INPUT DigitalRead", "IO_digitalRead"],
                ["IO poort INPUT AnalogRead", "IO_analogRead"],
                ["IO poort INPUT i2c Read", "IO_i2cRead"]
            ]), 'ARDUINO_READ_COMMANDS_INPUT')
        this.setOutput(true, 'String');
        this.setTooltip('direk apparatuur poorte uitlees');
    }
};

Blockly.Blocks['ArduinoReadCommands_OUTPUT'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["IO poort DigitalWrite", "IO_digitalWrite"],
                ["IO poort AnalogWrite", "IO_analogWrite"],
                ["IO poort i2c Write", "IO_i2cWrite"],
                ["IO poort servoWrite", "IO_servoWrite"],
                ["IO poort wachten (millisecond) ", "IO_wait"]
            ]), 'ARDUINO_READ_COMMANDS_OUTPUT')
        this.setOutput(true, 'String');
        this.setTooltip('direk apparatuur poorte uitlees');
    }
};

Blockly.Blocks['ArduinoPinMode'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(125);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["PinMode INPUT", "BOARD_INPUT"],
                ["PinMode OUTPUT", "BOARD_OUTPUT"],
                ["PinMode ANALOG", "BOARD_ANALOG"],
                ["PinMode PWM   ", "BOARD_PWM"],
                ["PinMode SERVO", "BOARD_SERVO"]
            ]), 'BOARD_PINMODE')
        this.setOutput(true, 'String');
        this.setTooltip('Arduino pinmode');
    }
};

// cmd_digitalReadWrite pins, https://github.com/rwaldron/johnny-five/wiki/board
Blockly.Blocks['cmd_digitalReadWrite'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var afstandSensor" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(154);
        this.appendDummyInput('CMD_DIGITALREAD_DO')
            .appendField(" ");
        this.appendValueInput("CMD_DIGITALREAD1_DOEN", "String")
            .appendField("IO Digital of AnalogWrite ")
            .setCheck("String");

        this.appendValueInput("CMD_DIGITALREAD1_VALUE", "Number")
            .appendField("waarde (numeriek):")
            .setCheck("Number");

        this.appendValueInput("CMD_DIGITALREAD1_IO_POORT", "String")
            .appendField("Op welke IO Poort?")
            .setCheck("String");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde cmd_digitalReadWrite


// event_board pins, https://github.com/rwaldron/johnny-five/wiki/board
Blockly.Blocks['event_board'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        var veranderlike1 = Math.floor((Math.random() * 100) + 1);
        var globalVar1 = "var EVENT_EASYLABIO_DO" + veranderlike1 + ";\n";

        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(158);

        this.appendValueInput("EVENT_EASYLABIO_DOEN", "String")
            .appendField("EasyLab IO Event ")
            .setCheck("String");

        this.appendValueInput("EVENT_EASYLABIO_VALUE", "Number")
            .appendField("waarde (milliseconden):")
            .setCheck("Number");

        this.appendStatementInput('EVENT_EASYLABIO_DO')
            .appendField(" ")
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab0", "board0"],
                ["EasyLab1", "board1"],
                ["EasyLab2", "board2"],
                ["EasyLab3", "board3"],
                ["EasyLab4", "board4"],
                ["EasyLab5", "board5"],
                ["EasyLab6", "board6"]
            ]), "EVENT_EASYLABIO_NAME");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        // this.setStatements_(true);
        // this.statementConnection_ = null;

        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('EVENT_EASYLABIO_DO')
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
            if (this.getInput('EVENT_EASYLABIO_RETURN')) {
                this.moveInputBefore('EVENT_EASYLABIO_STACK', 'EVENT_EASYLABIO_RETURN');
            }
        } else {
            this.removeInput('EVENT_EASYLABIO_STACK', true);
        }
        this.hasStatements_ = hasStatements;
    }

}; // einde event_board


Blockly.Blocks['event_board_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(128);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab code herhalen     ", "board_loop"],
                ["EasyLab code stoppen en wachten", "board_wait"]
            ]), 'EVENT_BOARD_LIJST')
        this.setOutput(true, 'String');
        this.setTooltip('direk apparatuur poorte uitlees');
    }
};

Blockly.Blocks['IO_poorten'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField("generieke IO-poort lijst")
            .appendField(new Blockly.FieldDropdown([
                ["EasyLab4Kids Arduino LED 13", "13"],
                ["A0 EasyLab4Kids LED Blou", "\"A0\""],
                ["A1 EasyLab4Kids LED Groen", "\"A1\""],
                ["A2 EasyLab4Kids LED Rooi", "\"A2\""],
                ["A3 Analoog | BBC Microbit", "\"A3\""],
                ["A4 Analoog | BBC Microbit", "\"A4\""],
                ["A5 Analoog | BBC Microbit", "\"A5\""],
                ["A6 Analoog", "\"A6\""],
                ["A7 Analoog EasyLab4Kids", "\"A7\""],
                [" 0 EasyLab | Arduino", "0"],
                [" 1 EasyLab | Arduino", "1"],
                [" 2 EasyLab | Arduino|EasyLabs knopje", "2"],
                [" 3 EasyLab | Arduino", "3"],
                [" 4 EasyLab Lijn sensor Links | Arduino", "4"],
                [" 5 EasyLab | Arduino", "5"],
                [" 6 EasyLab | Arduino", "6"],
                [" 7 EasyLab Lijn sensor Rechts | Arduino", "7"],
                [" 8 EasyLab | Arduino", "8"],
                [" 9 EasyLab | Arduino", "9"],
                ["10 EasyLab4Kids Servo | Arduino PWM", "10"],
                ["11 EasyLab | Arduino", "11"],
                ["12 EasyLab | Arduino", "12"],
                ["BBC Microbit Button A", "\"A\""],
                ["BBC Microbit Button B", "\"B\""],
                ["Lego EVS_EV3 afstandsensor", "\"EVS_EV3_US\""],
                ["LEGO_EVS_EV3 aan-uit-knop", "\"BAS1\""]
            ]), 'IO_POORTEN_ARDUINO');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};


Blockly.Blocks['IO_poorten_GPIO_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(200);
        this.appendDummyInput()
            .appendField("Raspberry Pi | Linux GPIO")
            .appendField(new Blockly.FieldDropdown([
                ["Linux met GPIO-poorten | I2C SDA1", "GPIO2"],
                ["Linux met GPIO-poorten | I2C SCL1", "GPIO3"],
                ["Linux met GPIO-poorten |GPIO4", "GPIO4"],
                ["Linux met GPIO-poorten |GPIO5", "GPIO5"],
                ["Linux met GPIO-poorten |GPIO6", "GPIO6"],
                ["Linux met GPIO-poorten |GPIO7", "GPIO7"],
                ["Linux met GPIO-poorten |GPIO8", "GPIO8"],
                ["Linux met GPIO-poorten |GPIO9", "GPIO9"],
                ["Linux met GPIO-poorten |GPIO10", "GPIO10"],
                ["Linux met GPIO-poorten |GPIO11", "GPIO11"],
                ["Linux met GPIO-poorten |GPIO12", "GPIO12"],
                ["Linux met GPIO-poorten |GPIO13", "GPIO13"],
                ["Linux met GPIO-poorten |GPIO14", "GPIO14"],
                ["Linux met GPIO-poorten |GPIO15", "GPIO15"],
                ["Linux met GPIO-poorten |GPIO16", "GPIO16"],
                ["Linux met GPIO-poorten |GPIO17", "GPIO17"],
                ["Linux met GPIO-poorten |GPIO18", "GPIO18"],
                ["Linux met GPIO-poorten |GPIO19", "GPIO19"],
                ["Linux met GPIO-poorten |GPIO20", "GPIO4"],
                ["Linux met GPIO-poorten |GPIO21", "GPIO4"],
                ["Raspberry Pi | Interne LED", "LED0"]
            ]), 'IO_POORTEN_GPIO');
        this.setOutput(true, 'String');
        this.setTooltip('Linux IO poorten voor bijvoorbeeld Raspberry Pi en C.H.I.P.');
    }
};

Blockly.Blocks['IO_poorten_easylab_nano_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField("EasyLab Digitaal/analoog pinnetje")
            .appendField(new Blockly.FieldDropdown([
                ["**geen io-poort geselecteerd", ""],
                ["EasyLab Arduino LED 13 | Grove", "13"],
                ["EasyLab LED Blou", "\"A0\""],
                ["EasyLab LED Groen", "\"A1\""],
                ["EasyLab LED Rooi", "\"A2\""],
                ["EasyLab knijper A3      ", "\"A3\""],
                ["EasyLab knijper A6      ", "\"A6\""],
                ["EasyLab knijper A7      ", "\"A7\""],
                ["EasyLab headerpin D0 (TX)", "0"],
                ["EasyLab headerpin D1 (RX)", "1"],
                ["EasyLab knijper D8      ", "8"],
                ["EasyLab knopje", "2"],
                ["EasyLab Lijn sensor Links", "\"A1\""],
                ["EasyLab Lijn sensor Rechts", "8"],
                ["EasyLab Servo | Arduino PWM", "10"],
                ["EasyLab Servo | TX Wifi", "11"],
                ["EasyLab Servo | RX Wifi", "12"]
            ]), 'IO_POORTEN_EASYLAB_NANO1');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};

Blockly.Blocks['IO_poorten_easylab_nano_v2_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField("EasyLab V2 Digitaal/analoog pinnetje")
            .appendField(new Blockly.FieldDropdown([
                ["**geen io-poort geselecteerd", ""],
                ["EasyLab Arduino LED 13 | Grove", "13"],
                ["EasyLab LED Blou", "4"],
                ["EasyLab LED Groen", "7"],
                ["EasyLab LED Rooi", "\"A0\""],
                ["EasyLab knijper A2        ", "\"A2\""],
                ["EasyLab knijper A3        ", "\"A3\""],
                ["EasyLab knijper A4 i2c SDA", "\"A4\""],
                ["EasyLab knijper A5 i2c SCL", "\"A5\""],
                ["EasyLab knijper A6        ", "\"A6\""],
                ["EasyLab knijper A7        ", "\"A7\""],
                ["EasyLab headerpin D0 (TX) ", "0"],
                ["EasyLab headerpin D1 (RX) ", "1"],
                ["EasyLab knopje", "2"],
                ["EasyLab Lijn sensor Links  A0", "\"A0\""],
                ["EasyLab Lijn sensor Rechts D7", "7"],
                ["EasyLab Servo | Arduino PWM", "10"],
                ["EasyLab TX Wifi            D11", "11"],
                ["EasyLab RX Wifi            D12", "12"]
            ]), 'IO_POORTEN_EASYLAB_NANO_V2');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};

Blockly.Blocks['IO_poorten_bbc_microbit_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField("BBC Microbit")
            .appendField(new Blockly.FieldDropdown([
                ["0 Analoog P0", "\"A3\""],
                ["1 Analoog P1", "\"A3\""],
                ["2 Analoog P2", "\"A4\""],
                ["3 Analoog P3", "\"A5\""],
                ["Button A P05", "\"A\""],
                ["Button B P11", "\"B\""],
                ["P20 I2C-SDA ", "\"P20\""],
                ["P21 I2C-SCL ", "\"P20\""],
                ["P16         ", "\"P16\""],
                ["P15 SPI-MOSI", "\"P15\""],
                ["P14 SPI-MISO", "\"P14\""],
                ["P13 SPI-SCK ", "\"P13\""],
                ["P12         ", "\"P12\""],
            ]), 'IO_POORTEN_BBC_MICROBIT1');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};

Blockly.Blocks['IO_poorten_NodeMCU_lijst'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function() {
        this.setColour(195);
        this.appendDummyInput()
            .appendField("Node MCU")
            .appendField(new Blockly.FieldDropdown([
                ["D0", "0"],
                ["D1", "1"],
                ["D2", "2"],
                ["D3", "3"],
                ["D4", "4"],
                ["D5", "5"],
                ["D6", "6"],
                ["D7", "7"],
                ["D8", "8"],
                ["RX D0", "0"],
                ["TX D1", "1"],
                ["A0 Analoog", "\"A0\""]
            ]), 'IO_POORTEN_NODEMCU1');
        this.setOutput(true, 'String');
        this.setTooltip('Welke IO poort');
    }
};