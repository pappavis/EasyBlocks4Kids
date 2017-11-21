/**
 * EasyLab4Kids
 *
 * Copyright 2017 EasyLab4Kids.
 * http://easylab4kids.io/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Webserver that executes Javascript code.
 * @author thebapodcast@gmail.com  (Michiel Erasmus)
 */

// Author:      Michiel Erasmus (thebapodcast@gmail.com)
// Version:     1.0.2
// Releasedate: 23-6-2017

/*
--CHANGELOG--
versie 1.0.3 2017.06.30;
- toegevoegd: SIGTERM nette server afsluiting.

*/

'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    form = require('express-form'),
    cors = require('cors'),
    sys = require('util'),
    fs1 = require('fs'),
    crypto1 = require('crypto'),
    execFile1 = require('child_process'),
    jsonWebToken1 = require('jsonwebtoken'),
    _ = require('underscore'),
    field = form.field;

var _eval = require('eval');
const spork = require('spork');
var cookieParser = require('cookie-parser');
var teller1 = Math.floor((Math.random() * 100) + 1);

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.text());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.post('/easyblocks_post', function(req, res) {
    'use strict';

    try {
        var code1 = "";
        // Prepare output in JSON format
        var response = {
            licensekey: req.body.jwt_token,
            code: req.body.javascript_code
        };
        console.log("JWT Token licensekey=" + response.licensekey);
        res.emit("response.code=" + response.statusCodeOke1);

        var statusCodeOke1 = "code: oke";
        try {
            require('node-clean-exit')();
            var easyAppNaam1 = "./tmp/tmpEasyApp" + Date.now().toString() + "_" + teller1 + ".js";

            var options1 = { encoding: 'utf8' };
            var wstream1 = fs1.createWriteStream(easyAppNaam1, { options1 });
            wstream1.write(response.code);
            wstream1.end();

            /*
             const spawn = require('child_process');
             const nodeJS1 = spawn(['node', ['', easyAppNaam1]]);

             nodeJS1.stdout.on('data', (data) => {
                 console.log(`stdout: ${data}`);
             });

             nodeJS1.stderr.on('data', (data) => {
                 console.log(`stderr: ${data}`);
             });

            nodeJS1.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
             */

            // var evalResultaat1 = _eval(code1, "easyserver", this, true);
            console.log(eval(response.code));
            // console.log(evalResultaat1);
            console.log("\n=== code Oke");
            res.emit({ status: statusCodeOke1 });
        } catch (error55) {
            console.log("\n=== code failed: " + error55);
        }
        res.end(statusCodeOke1);
    } catch (error9) {
        console.log(error9);
    }
})

app.listen(8081, function(err) {
    console.log("©2017 EasyLab4Kids Server\nOntwikkelaar: Michiel Erasmus\nWebserver aktief op poort :8081");
    console.log('pid is ' + process.pid);
});

process.on('SIGTERM', function() {
    server.close(function() {
        process.exit(0);
    });
});

process.on('SIGINT', function() {
    server.close(function() {
        console.log("Jy wil die app afsluit.");
    });
});