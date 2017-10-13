/**
 * Execute the user's code.
 * Just a quick and dirty eval.  No checks for infinite loops, etc.
 */
function runJS() {
    console.log("RUNJs(): Program Start");
    var code;
    try {
        var code = new Blob([Blockly.Arduino.workspaceToCode()], { type: 'text/plain;charset=utf-8' });
        var target = document.getElementById('content_arduino');
        var spinner = new Spinner().spin(target);

        eval(code);
        console.log("RunJS(): Program Einde -- Oke");
        alert("Codetest: Oke");
        // document.getElementById("spanText").innerHTML = "codeTest: Oke";
    } catch (e) {
        var fout1 = 'Program error:\n' + e;
        console.log("RunJS: Program Einde -- FOUT: " + fout1);
        alert("RunJS: Program Einde -- FOUT: " + fout1);
        // document.getElementById("spanText").innerHTML = "codeTest: FAIL";
    }
}

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
    if ('localStorage' in window) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        window.localStorage.setItem('arduino', Blockly.Xml.domToText(xml));
    }
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
    if ('localStorage' in window && window.localStorage.arduino) {
        var xml = Blockly.Xml.textToDom(window.localStorage.arduino);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
}

/**
 * Save Arduino generated code to local file.
 */
function saveCode() {
    var fileName = window.prompt('What would you like to name your file?', 'EasyBlocks')
        //doesn't save if the user quits the save prompt
    if (fileName) {
        var blob = new Blob([Blockly.Arduino.workspaceToCode()], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, fileName + '.js');
    }
}

/**
 * Save blocks to local file.
 * better include Blob and FileSaver for browser compatibility
 */
function save() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var data = Blockly.Xml.domToText(xml);
    var fileName = window.prompt('What would you like to name your file?', 'EasyBlocks');
    // Store data in blob.
    // var builder = new BlobBuilder();
    // builder.append(data);
    // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
    if (fileName) {
        var blob = new Blob([data], { type: 'text/xml' });
        saveAs(blob, fileName + ".xml");
    }
}

/**
 * Load blocks from local file.
 */
function load(event) {
    var files = event.target.files;
    // Only allow uploading one file.
    if (files.length != 1) {
        return;
    }

    // FileReader
    var reader = new FileReader();
    reader.onloadend = function(event) {
        var target = event.target;
        // 2 == FileReader.DONE
        if (target.readyState == 2) {
            try {
                var xml = Blockly.Xml.textToDom(target.result);
            } catch (e) {
                alert('Error parsing XML:\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
                Blockly.mainWorkspace.clear();
            }
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        }
        // Reset value of input after loading because Chrome will not fire
        // a 'change' event if the same file is loaded again.
        document.getElementById('load').value = '';
    };
    reader.readAsText(files[0]);
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
    var count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count < 2 || window.confirm('Delete all ' + count + ' blocks?')) {
        Blockly.mainWorkspace.clear();
        renderContent();
    }

    location.reload();
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(restore_blocks, 0);
    // Hook a save function onto unload.
    bindEvent(window, 'unload', backup_blocks);
    tabClick(selected);

    // Init load event.
    var loadInput = document.getElementById('load');
    loadInput.addEventListener('change', load, false);
    document.getElementById('fakeload').onclick = function() {
        loadInput.click();
    };
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
    if (element.addEventListener) { // W3C
        element.addEventListener(name, func, false);
    } else if (element.attachEvent) { // IE
        element.attachEvent('on' + name, func);
    }
}

//loading examples via ajax
var ajax;

function createAJAX() {
    if (window.ActiveXObject) { //IE
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

function onSuccess() {
    if (ajax.readyState == 4) {
        if (ajax.status == 200) {
            try {
                var xml = Blockly.Xml.textToDom(ajax.responseText);
            } catch (e) {
                alert('Error parsing XML:\n' + e);
                return;
            }
            var count = Blockly.mainWorkspace.getAllBlocks().length;
            if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
                Blockly.mainWorkspace.clear();
            }
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
        } else {
            alert("Server error");
        }
    }
}

function load_by_url(uri) {
    ajax = createAJAX();
    if (!ajax) {　　 alert('Not compatible with XMLHttpRequest');　　 return 0;　 }
    if (ajax.overrideMimeType) {
        ajax.overrideMimeType('text/xml');
    }

    　　
    ajax.onreadystatechange = onSuccess;　　
    ajax.open("GET", uri, true);　　
    ajax.send("");
}

function uploadCode(code, callback) {
    try {
        var blob = new Blob([Blockly.Arduino.workspaceToCode()], { type: 'application/plain-text' });
        var url1 = document.getElementById('RobotAdres1').value;

        if (url1 == "") {
            alert("EasyServer adres onbekend, bijvoorbeeld http://10.0.0.9:8081/easyblocks_post");
        }

        var url_met_get = url1 + "?data=" + encodeURIComponent(JSON.stringify({ "jwt_token": "hey@mail.com", "javascript_code": JSON.stringify(Blockly.Arduino.workspaceToCode()) }));
        var encoding1 = 'application/json;charset=UTF-8';
        var jsonCode1 = JSON.stringify(blob);
        var isAsync1 = true;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(readBody(xhr));
            }
        }
        var data = {
            jwt_token: 'value1',
            javascript_code: Blockly.Arduino.workspaceToCode()
        };

        xhr.open('POST', url1, isAsync1);
        xhr.onload = function(data) {
            console.log('loaded', this.responseText);
        };
        xhr.setRequestHeader('Content-Type', encoding1);
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.send(JSON.stringify(data));
        // alert("data:\n" + JSON.stringify(data));

    } catch (error) {
        alert(error);
    }
}

function readBody(xhr) {
    var data;
    if (!xhr.responseType || xhr.responseType === "text") {
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }
    return data;
}

function uploadCode1(code, callback) {

    /*

        // You REALLY want async = true.
        // Otherwise, it'll block ALL execution waiting for server response.
        var async = true;

        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/text");
        spinner.stop();
    */

    try {
        var blob = new Blob([Blockly.Arduino.workspaceToCode()], { type: 'application/plain-text' });

        var target = document.getElementById('content_arduino');
        var spinner = new Spinner().spin(target);
        var url1 = document.getElementById('RobotAdres1').value;
        // var url = "http://127.0.0.1:8080/";
        var method1 = "POST";

        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        xmlhttp.open(method1, "/easyblocks_post");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ email: "hello@user.com", response: { name: "Tester" } }));

    } catch (error41) {
        alert("FOUTmelding uploadCode:\n\n" + error41);
    }
}


function uploadClick() {
    var code = Blockly.Arduino.workspaceToCode();

    alert("Gereed om te uploaden naar het microcontroller");

    uploadCode(code, function(status, errorInfo) {
        if (status == 200) {
            alert("Program uploaded ok");
        } else {
            alert("Error uploading program: " + errorInfo);
        }
    });
}

function resetClick() {
    var code = "void setup() {} void loop() {}";

    uploadCode(code, function(status, errorInfo) {
        if (status != 200) {
            alert("Error resetting program: " + errorInfo);
        }
    });
}

function setCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays == null || nDays == 0) nDays = 1;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie = cookieName + "=" + escape(cookieValue) +
        ";expires=" + expire.toGMTString();
}

function getCookie(cookieName) {
    var theCookie = " " + document.cookie;
    var ind = theCookie.indexOf(" " + cookieName + "=");
    if (ind == -1) ind = theCookie.indexOf(";" + cookieName + "=");
    if (ind == -1 || cookieName == "") return "";
    var ind1 = theCookie.indexOf(";", ind + 1);
    if (ind1 == -1) ind1 = theCookie.length;
    return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
}

cookie = {

    set: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else
            var expires = "";
        document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
    },

    get: function(name) {
        var nameEQ = name + "=",
            ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return JSON.parse(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }
}

function checkCookie(cookieName) {
    var url1 = cookie.get(cookieName);

    try {
        if (url1 != "" && url1 != null) {
            // alert("Welcome again " + url1);
        } else {
            url1 = "http://10.0.0.8:8081/easyblocks_post";
            cookie.set(cookieName, url1, 365);
        }

    } catch (error) {
        alert("checkCookie fout: " + error);
    }
    return url1;
}

function getEasyServerURL() {
    try {
        var url1 = checkCookie("easyserverURL");
    } catch (error) {
        alert("getEasyServerURL fout: " + error);
    }

    return url1;
}

// zie https://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource
// The easy way is to just add the extension in google chrome to allow access using CORS. (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)
function loadFile(filePath) {
    var result;

    $.ajax({
        type: 'get',
        url: filePath,
        beforeSend: function() {
            // before send the request, displays a "Loading..." messaj in the element where the response will be placed
            $('#resp').html('Loading...');
        },
        timeout: 10000, // sets timeout for the request (10 seconds)
        error: function(xhr, status, error) {
            alert('fout Error: ' + xhr.status + ' - ' + error);
        }, // alert a message in case of error
        dataType: 'xml',
        success: function(response) {
            $('#resp').html(''); // removes the "loading..." notification from "#resp"

            // gets and parse each child element in <webpages>
            $(response).find('webpages').children().each(function() {
                // gets the "id", "title", and "url" of current child element
                result = $(this);
                var elm = $(this);
                var id = elm.attr('id');
                var title = elm.find('title').text();
                var url = elm.find('url').text();

                // displays data
                $('#resp').append(id + ') Title: <b>' + title + '</b> -- URL: <b><i>' + url + '</i></b><br />');
            });
        }
    });

    /*
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    */
    return result;
};

function loadFromWeb(fullURL) {
    var resultaat2;
    if (fullURL == null) {
        fullURL = window.prompt('Bestand laden van URL', 'http://');
    }
    if (fullURL) {
        resultaat2 = loadFile(fullURL);
        // alert("resultaat2=" + resultaat2);

        //save
        if (resultaat2) {
            window.localStorage.setItem('arduino', resultaat2);
        }

        discard();
        restore_blocks();


    }
    return resultaat2;
};