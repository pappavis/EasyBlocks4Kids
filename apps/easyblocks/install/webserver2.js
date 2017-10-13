/**
 * EasyLab4Kids
 *
 * Copyright 2017 EasyLab4Kids.
 * http://easylab4kids.nl/
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

'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    form = require('express-form'),
    cors = require('cors'),
    sys = require('util'),
    field = form.field;

var _eval = require('eval');
const spork = require('spork');
var cookieParser = require('cookie-parser');

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
            var evalResultaat1 = _eval(code1, "easyserver", this, true);
            console.log(eval(response.code));
            // console.log(evalResultaat1);
            console.log("\n=== code Oke");
            res.emit({ status: statusCodeOke1 });
        } catch (error55) {
            console.log("\n=== code failed: " + error55);
        }
        res.end(statusCodeOke1);

    } catch (error) {
        console.log(error);
    }
})

app.listen(8081);
console.log("©2017 EasyLab4Kids Webserver op poort :8081");