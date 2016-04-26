// Call this script by placing the below line in bottom branding
//<script id="custom-eds" src="http://gss.ebscohost.com/kcyew/nlb/nlb_custom.js"></script>

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

        // Execute code only in the results or resultsadvanced page 
        if ((document.location.pathname == "/eds/results") || (document.location.pathname == "/eds/resultsadvanced")) {
            // insert code here
			jQuery('#outerContainer').before("<nlb-notice data-appcode='ONESEARCH.EDS'></nlb-notice><h1>National Library Board</h1>" );
        }

        // Execute code only in the basic page
        if (document.location.pathname == "/eds/search/basic") {
            //insert code here
			jQuery('#outerContainer').before("<nlb-notice data-appcode='ONESEARCH.EDS'></nlb-notice><h1><a href='http://eservice-stg.nlb.gov.sg/components/js/bundle.js?key=QT0mFDTADwbx'>National Library Board Notices</a></h1>" );
        }

        // Execute code only in the detailed record.
        if (document.location.pathname == "/eds/detail/detail") {
            //insert code here
			jQuery('body').append('\
			<style>\
				#column2.collapsible{\
					display:none;\
				}\
			</style>\
			');			
        }

        // Execute code only in the advanced record.
        if (document.location.pathname == "/eds/search/advanced") {
            //insert code here
        }

        // Add CSS
        jQuery('body').append('\
		<style>\
			.collapsible-toggle{\
				display:none;\
			}\
			.bg-p1{\
				display:none;\
			}\
		</style>\
	');
	
    }
