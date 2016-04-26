// Call this script by placing the below line in bottom branding
//<script id="custom-eds" src="http://gss.ebscohost.com/kcyew/ntu/ntu_custom.js"></script>

/*
*Check to see if jQuery is loaded every 10ms
*Stop checking after jQuery is loaded and run CustomEDS() and CustomPFI
*/
var trackCall = setInterval(function () {
    if (window.jQuery) {
        clearInterval(trackCall);
        //CustomEDS();
        CustomPFI();
    }
}
, 10);

/*
*Place an app from customScript
*Can be called from global as Apps will check for jQuery too.
*/

//if (bDataCheck.indexOf("edspub") != -1) // uncomment and delete below line to run App in pfi only
//if (bDataCheck.indexOf("edspub") == -1) // uncomment to run App in eds only
//AppNameofApp();

/*
*Function to load custom eds code
*/
function CustomEDS() {
    if (bDataCheck.indexOf("edspub") != -1) return; // stop - this is not eds
    // used to ensure the code is run only once.
    if (jQuery('body').data('customeds') == 1) { return; }
    else { jQuery('body').attr('data-customeds', '1'); }

    // Execute code only in the results or resultsadvanced page 
    if ((document.location.pathname == "/eds/results") || (document.location.pathname == "/eds/resultsadvanced")) {
        // insert code here
        console.log('I am running from results');
    }

    // Execute code only in the basic page
    if (document.location.pathname == "/eds/search/basic") {
        //insert code here
        console.log('I am running from basic');
    }

    // Execute code only in the detailed record.
    if (document.location.pathname == "/eds/detail/detail") {
        //insert code here
        console.log('I am running from detail');
    }

    // Execute code only in the advanced record.
    if (document.location.pathname == "/eds/search/advanced") {
        //insert code here
        console.log('I am running from advanced search');
    }

    //ApplyCustomCSS();
}

function CustomPFI() {
    if (bDataCheck.indexOf("edspub") == -1) return; // stop - this is not pfi
    // used to ensure the code is run only once.
    if (jQuery('body').data('custompfi') == 1) { return; }
    else { jQuery('body').attr('data-custompfi', '1'); }

	console.log('I am running from Custom PFI');
	//Code to insert PFI pubfinder.html text after id="toolbarControl"
	//jQuery('#toolbarControl').after('<div><h2>NTU Library Subscribed E-Journals list</h2></div>');
	jQuery('.find-field-wrapper').before('<div><h2>NTU Library Subscribed E-Journals list</h2></div><p>Please note: This list does not cover all NTU library\'s holdings. To view our holdings for each title, you will need to search within the sources indicated. Please also explore our print journals and databases for a comprehensive search.</p>');
	}

/*
* Add App via JavaScript.
*/
function AppNameofApp() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://AppURL';
    script.setAttribute('id', 'idof-app');
    script.setAttribute('data-p', '2');
    document.body.appendChild(script);
}

/*
*Apply Custom CSS to page via JavaScript
*Split this function to apply different styles for eds and pfi
*/
function ApplyCustomCSS() {

    jQuery('body').append('\
		<style>\
			.ui-icon-closethick,.ui-icon{\
				background-color: rgb(255, 255, 255);\
				background-image:none;\
			}\
		</style>\
	');
}


/*
*Used to control the display of content in specific pages.
*basic,advanced,detail,results,resultsadvanced
*/
/* EXAMPLE - ensure customScript.js with DisplayMe loads first.
    <span id="linklist" style="display:none;">
	    <script>DisplayMe('basic',"linklist")</script>
    <!-- INSERT CONTENT HERE -->
    </span>
*/
function DisplayMe(blocks, id, displayIn) {

    displayIn = typeof displayIn !== 'undefined' ? displayIn : 'both';

    if (displayIn === 'eds') {
        if (bDataCheck.indexOf("edspub") != -1) return; // stop - this is not eds
    }

    if (displayIn === 'pfi') {
        if (bDataCheck.indexOf("edspub") == -1) return; // stop - this is not pfi
    }

    var displayBlocks = blocks.split(",")
    for (i = 0; i < displayBlocks.length; i++) {
        if (document.URL.indexOf("/" + displayBlocks[i] + "?") > -1) {
            document.getElementById(id).style.display = "block";
        }
    }
}



/*
* Call if Apps on widget server require document.domain to be set.
*/
function SetDocumentDomain() {
    var shortHost = window.location.hostname.split('.')
    try {
        document.domain = shortHost[shortHost.length - 2] + '.' + shortHost[shortHost.length - 1];
    } catch (err) {
        if (err.toString().indexOf('top-level domain') > -1) {
            document.domain = shortHost[shortHost.length - 3] + '.' + shortHost[shortHost.length - 2] + '.' + shortHost[shortHost.length - 1];
        }
    }
}

/*
* Fetch querystring value from URL e.g. sid, vid etc.
*/
function QueryString(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    var r = [], m;
    while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
    return r;
}


/*
*Remove invalid tokens from search term.
*ignoreTokens: Add comma seperated token to ignore
*addTokens: Add comma seperated token to remove
*/
function CleanEPSearchTerm(searchTerm, ignoreTokens, addTokens) {
    var invalidTokens = ['AU ', 'TI ', 'TX ', 'SU ', 'SO ', 'AB ', 'IS ', 'IB ', 'JN ', 'DOI ', 'AN ', 'MH ', '"', 'DE '];

    ignoreTokens = typeof ignoreTokens !== 'undefined' ? ignoreTokens : '';
    addTokens = typeof addTokens !== 'undefined' ? addTokens : '';

    addTokens = addTokens.split(',');
    if (addTokens != '') {
        jQuery.merge(invalidTokens, addTokens)
    }
    ignoreTokens = ignoreTokens.split(',');

    jQuery(invalidTokens).each(function () {
        var invalidToken = this;
        var ignoreCheck = 0;
        jQuery(ignoreTokens).each(function () {
            var ignoreToken = this;
            if (jQuery.trim(ignoreToken) == jQuery.trim(invalidToken)) { ignoreCheck = 1; }
        });
        if (ignoreCheck == 0) {
            var re = new RegExp(invalidToken, 'g');
            searchTerm = searchTerm.replace(re, '');
            searchTerm = searchTerm.replace(/\./g, '');
        }
    });
    return jQuery.trim(searchTerm);
}

/*
*Function to decode base64
*Required to determine if the page is eds or pfi
*/ 
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

var bDataCheck = Base64.decode(QueryString('bdata').toString());
bDataCheck = document.location.href.replace(QueryString('bdata').toString(), bDataCheck);
