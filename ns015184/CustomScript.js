// Call this script by placing the below line in bottom branding
//<script id="custom-eds" src="MY.SERVER.COM/customScript.js"></script>

//(function(){
    var trackCall = setInterval(function() {
        if (window.jQuery) {
            clearInterval(trackCall);
            CustomEDS();
        }
    }
    , 10); 

    // Add Customisations here. Break out to functions where possible.
    function CustomEDS() {
        if(QueryString('sdb')=='edspub')return; // stop custom application if this is ftf
        // used to ensure the code is run only once.
        if (jQuery('body').data('customeds') == 1) { return; }
        else { jQuery('body').attr('data-customeds', '1'); }

        //if()

        // Execute code only in the results or results advanced or detailed record page 
        if ((document.location.pathname == "/eds/results") || (document.location.pathname == "/eds/resultsadvanced") || (document.location.pathname == "/eds/detail/detail")) {
      // insert code here
      //logic here
            
        }

       
    }


// Used to control the display of content in specific pages.
    function DisplayMe(blocks, id) {
        if(QueryString('sdb')=='edspub')return; // stop custom application if this is ftf
        //basic,advanced,detail,results,resultsadvanced
        var displayBlocks = blocks.split(",")
        for (i = 0; i < displayBlocks.length; i++) {
            if (document.URL.indexOf("/" + displayBlocks[i] + "?") > -1) {
                document.getElementById(id).style.display = "block";
            }
        }
    }
/* EXAMPLE - ensure DisplayMe loads first.
    <span id="linklist" style="display:none;">
        <script>DisplayMe('basic',"linklist")</script>
    <!â€”INSERT CONTENT HERE -->
    </span>
*/


   

function QueryString(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}

//})();
