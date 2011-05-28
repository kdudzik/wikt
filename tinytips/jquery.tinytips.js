/************************************************************************/
/*                    tinyTips Plugin                			     	*/
/*                      Version: 1.0                 			   		*/
/*                      Mike Merritt                  					*/
/*                 Updated: Feb 4th, 2010                  				*/
/* Copyright (c) 2009 Mike Merritt

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
**************************************************************************/

(function($){  
	$.fn.tooltip = function (supCont) {
		
		/* User settings
		**********************************/
		
		// Enter the markup for your tooltips here. The wrapping div must have a class of tinyTip and 
		// it must have a div with the class "content" somewhere inside of it.
		var tipFrame = '<div class="tinyTip"><div class="content"></div></div>';
		
		// Speed of the animations in milliseconds - 1000 = 1 second.
		var animSpeed = 200;
		
		/***************************************************************************************************/
		/* End of user settings - Do not edit below this line unless you are trying to edit functionality. */
		/***************************************************************************************************/
		
		// Global tinyTip variable;
		var tinyTip;
		var tText;
		
		// When we hover over the element that we want the tooltip applied to
		$(this).hover(function() {
		
			// Inject the markup for the tooltip into the page and
			// set the tooltip global to the current markup and then hide it.
			$('body').append(tipFrame);
			tinyTip = $('div.tinyTip');
			tinyTip.hide();
			
			// Grab the content for the tooltip from the title attribute (or the supplied content) and
			// inject it into the markup for the current tooltip. NOTE: title attribute is used unless
			// other content is supplied instead.
			if (supCont === 'tip') {
				var tipCont = $(this).data('tip');
			} else if (supCont !== 'tip') {
				var tipCont = supCont;
			}
			$('.tinyTip .content').html(tipCont);
			tText = $(this).data('tip');
			
			// Offsets so that the tooltip is centered over the element it is being applied to but
			// raise it up above the element so it isn't covering it.
			var yOffset = tinyTip.height() + 17;
			var xOffset = (((tinyTip.width() - 10) / 2)) - ($(this).width() / 2);
			
			// Grab the coordinates for the element with the tooltip and make a new copy
			// so that we can keep the original un-touched.
			var pos = $(this).offset();
			var nPos = pos;
			
			// Add the offsets to the tooltip position
			nPos.top = pos.top - yOffset;
			nPos.left = pos.left - xOffset;
			
			// Make sure that the tooltip has absolute positioning and a high z-index, 
			// then place it at the correct spot and fade it in.
			tinyTip.css('position', 'absolute').css('z-index', '1000');
			tinyTip.css(nPos).fadeIn(animSpeed);
			
		}, function() {
			
			$(this).data('tip', tText);
		
			// Fade the tooltip out once the mouse moves away and then remove it from the DOM.
			$('div.tinyTip').fadeOut(animSpeed, function() {
				$(this).remove();
			});
			
		});
		
	};

})(jQuery);

window.EdFilesLoaded++;
window.EdTryInit();