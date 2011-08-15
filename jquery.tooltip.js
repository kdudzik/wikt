/*                    tinyTips Plugin                                   */
/*                      Version: 1.0                                    */
/*                      Mike Merritt                                    */
/*                 Updated: Feb 4th, 2010                               */
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

(function ($) {
    $.fn.tooltip = function () {

        var tooltip = $('<div class="tooltip"/>');
        tooltip.css('position', 'absolute').css('z-index', '1000').appendTo($('body'));

        // When we hover over the element that we want the tooltip applied to
        $(this).hover(function () {
            var yOffset, xOffset, pos, nPos;

            tooltip.html($(this).data('tip'));

            if ($(this).hasClass('tipdown')) {
                yOffset = -$(this).outerHeight() - 3;
            } else {
                yOffset = tooltip.height() + 17;
            }

            xOffset = (((tooltip.width() - 10) / 2)) - ($(this).width() / 2);

            // Grab the coordinates for the element with the tooltip and make a new copy
            // so that we can keep the original un-touched.
            pos = $(this).offset();
            nPos = pos;

            // Add the offsets to the tooltip position
            nPos.top = pos.top - yOffset;
            nPos.left = pos.left - xOffset;

            tooltip.css(nPos).show();

        }, function () {
            tooltip.hide();
        });

    };

}(jQuery));

window.EFilesLoaded++;
window.ETryInit();
