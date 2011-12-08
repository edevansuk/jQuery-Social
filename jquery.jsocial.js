/************************************** Splendid ******************************
 * 
 * Created By:		Ed Hasting-Evans, Copyright (c) 2011
 * 
 * Websites:		http://www.apple-marketing.co.uk
 * 					http://www.notebookonline.co.uk/
 * 
 * License: 		This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * 					To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ 
 * 					or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
 * 
 * Creation Date:	16th November 2011
 * 
 ******************************************************************************/

(function($){
	// Default settings that can be overwritten
	var settings = {
		debug: false,
		insert: 'bottom',
		showTwitter: true,
		showDigg: true,
		showGooglePlus: true,
		showLinkedIn: true,
		showFacebook: true,
		showAddThis: true,
		buttonLayout: 'vertical',  // horizontal, vertical, nocounter
		addThisLayout: 'addthis_counter',
		twitterLayout: 'vertical',
		googlePlusLayout: 'tall',
		diggLayout: 'DiggMedium',
		linkedinLayout: 'top',
		facebookLayout: 'box_count',
		faceBookSend: true,
		facebookShowFaces: false
	};
	
	var privateSettings = {
		socialContent: '',
		targetDiv: ''
	};
	
	var methods = {
		init: function(options){
			return this.each(function(){
				privateSettings.targetDiv = $(this);
				
				// Overwrites the default settings with those defined in the function call (options object)
				if (options) { 
					$.extend(settings, options);
			    }
				
				// Translates the buttonLayout setting so it's correct for the different buttons
				if(settings.buttonLayout == 'horizontal') {
					settings.addThisLayout = 'addthis_pill_style';
					settings.twitterLayout = 'horizontal';
					settings.googlePlusLayout = 'medium';
					settings.diggLayout = 'DiggCompact';
					settings.linkedinLayout = 'right';
					settings.facebookLayout = 'button_count';
				} else if(settings.buttonLayout == 'nocounter') {
					settings.addThisLayout = 'addthis_button_compact';
					settings.stumbleLayout = '1';
					settings.twitterLayout = 'none';
					settings.diggLayout = 'DiggIcon';
					settings.googlePlusLayout = 'medium';
					settings.linkedinLayout = 'none';
					settings.facebookLayout = 'button_count';
				}
				
				if(settings.debug) {
					methods.debugInfo('Layout setting: ' + settings.buttonLayout);
				}
				
				// What buttons should be shown?
				
				
				if (settings.showStumble) { 
					methods.buildStumble();
				}

				if (settings.showTwitter) {
					methods.buildTwitter();
				}
				
				if (settings.showDigg) {
					methods.buildDigg();
				}
				
				if (settings.showLinkedIn) {
					methods.buildLinkedIn();
				}
				
				if (settings.showGooglePlus) {
					methods.buildGoogle();
				}
				
				if (settings.showFacebook) {
					methods.buildFacebook();
				}
				
				if (settings.showAddThis) {
					methods.buildAddThis();
				}
				
				// Outputs the buttons to the page
				if(privateSettings.socialContent) {
					methods.writeToPage();	
				}
			});
		},
		
		createJSinDOM: function(jsSource){
			// Creates the JavaScript using the DOM method
			var createJS = document.createElement('script');
			createJS.type = 'text/javascript';
			createJS.async = true;
			createJS.src = jsSource;
			
			var script = document.getElementsByTagName('script')[0];
			script.parentNode.insertBefore(createJS, script);
		},
		
		writeToPage: function(){			
			// Builds up classes so each layout type can be styled individually
			var classes = 'jSocial-options';
			if(settings.buttonLayout == 'horizontal') {
				classes += ' jSocial-horizontal';
			} else if (settings.buttonLayout == 'vertical') {
				classes += ' jSocial-vertical';
			} else if (settings.buttonLayout == 'nocounter') {
				classes += ' jSocial-nocounter';
			}
			
			// Builds the content dependent on what Social options were chosen
			contentToDisplay = '<ul class="' + classes + '">\n';
			contentToDisplay += privateSettings.socialContent;
			contentToDisplay += '</ul>';
			
			if(settings.debug) {
				methods.debugInfo(contentToDisplay);
			}
			
			// Actually outputs to the page
			if(settings.insert == 'top') {
				$(privateSettings.targetDiv).prepend(contentToDisplay);
			} else {
				$(privateSettings.targetDiv).append(contentToDisplay);
			}
		},
		
		buildTwitter: function(){
			privateSettings.socialContent += '<li class="jSocial-twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-count="' + settings.twitterLayout + '">Tweet</a></li> \n';
			methods.createJSinDOM('http://platform.twitter.com/widgets.js');
		},
		
		buildGoogle: function(){
			if (settings.buttonLayout == 'nocounter') {
				privateSettings.socialContent += '<li class="jSocial-googlePlusOne"><div class="g-plusone" data-width="100" data-size="' + settings.googlePlusLayout + '" data-annotation="none"></g:plusone></li> \n';
			}
			else {
				privateSettings.socialContent += '<li class="jSocial-googlePlusOne"><div class="g-plusone" width="50" data-size="' + settings.googlePlusLayout + '"></div></li> \n';
			}
			methods.createJSinDOM('https://apis.google.com/js/plusone.js');
		},
		
		buildDigg: function() {
			privateSettings.socialContent += '<li class="jSocial-digg"><a class="DiggThisButton ' + settings.diggLayout + '"></a></li> \n';
			methods.createJSinDOM('http://widgets.digg.com/buttons.js');
		},
		
		buildLinkedIn: function() {
			privateSettings.socialContent += '<li class="jSocial-linkedin"><script src="http://platform.linkedin.com/in.js" type="text/javascript"></script><script type="IN/Share" data-counter="' + settings.linkedinLayout + '"></script></li> \n';
		},
		
		buildFacebook: function(){
			privateSettings.socialContent += '<li class="jSocial-facebook"><div class="fb-like" data-send="' + settings.faceBookSend + '" data-layout="' + settings.facebookLayout + '" data-show-faces="' + settings.facebookShowFaces +'"></div></li> \n';
			methods.createJSinDOM('https://connect.facebook.net/en_GB/all.js#xfbml=1');
		},
		
		buildAddThis: function(){
			privateSettings.socialContent += '<li class="jSocial-addThis"><div class="addthis_toolbox addthis_default_style"><a class="addthis_counter ' + settings.addThisLayout + '"></a></div></li> \n';
			methods.createJSinDOM('http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4ed2adf67de49058');
		},
		
		debugInfo: function(theInfo) {
			if (typeof console != "undefined") {
				console.log(theInfo);
			}
		}
	};
	
	$.fn.jsocial = function(method){
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else 
			if (typeof method === 'object' || !method) {
				return methods.init.apply(this, arguments);
			}
			else {
				method.debugInfo('Method ' + method + ' does not exist in jQuery.jsocial');
			}
	};
})(jQuery);



