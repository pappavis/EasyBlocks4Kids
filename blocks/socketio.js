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
 * @fileoverview SocketIO blocks for EasyLab4Kids.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)  https://www.facebook.com/EasyBlocks4Kids/
 */

goog.provide('Blockly.Blocks.socketio');

goog.require('Blockly.Blocks');


Blockly.Blocks['declare_socketio'] = {
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
        this.setColour(71);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://joscor.com/wp-content/uploads/2014/10/SOCKETIOICON.gif", 32, 32))
            .appendField(" Gebruik socket.IO: ")
            .appendField(new Blockly.FieldDropdown([
                ["SocketIO1", "SocketIO1_1"],
                ["SocketIO12", "SocketIO1_2"]
            ]), "DECLARE_SOCKETIO_NAAM1");

        this.appendDummyInput()
            .appendField(" ");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    }
}; // einde declare_socketio