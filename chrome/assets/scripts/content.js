//dom node > xpath function captured from: https://stackoverflow.com/a/30227178
function getPathTo(element) {
    if (element.tagName == 'HTML')
        return '/HTML[1]';
    if (element===document.body)
        return '/HTML[1]/BODY[1]';

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}
//xpath > dom node plugin function captured from https://stackoverflow.com/a/20495940
$.fn.xpathEvaluate = function (xpathExpression) {
   // NOTE: vars not declared local for debug purposes
   $this = this.first(); // Don't make me deal with multiples before coffee

   // Evaluate xpath and retrieve matching nodes
   xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

   result = [];
   while (elem = xpathResult.iterateNext()) {
      result.push(elem);
   }

   $result = jQuery([]).pushStack( result );
   return $result;
}

$( document ).ready(function() {
  chrome.runtime.onMessage.addListener(
    function(requrest, sender, sendResponse) {
      if (sender.tab) sendResponse({complete: "true"})
      if (request.type == "activateSelectionMode") {
        console.log('activate selection mode');
      }
    });
  //TODO: consult what we should accept
  const acceptableElements = "h1, h2, h3, h4, h5, h6, div, span, label, p";
  $(acceptableElements).hover(
    function() {
      if ($(this).find("*").length <= 1) {
        $( this ).addClass('hover');
      }
    }, function() {
      $( this ).removeClass('hover');
    }
  );
  $(acceptableElements).click(function(e) {
    const formatTypes = ['B', 'STRONG', 'I', 'EM', 'MARK', 'SMALL', 'DEL', 'INS', 'SUB', 'SUP'];
    const val = $(this)
      .contents()
      .filter(function() {
        return this.nodeType === 3 || formatTypes.indexOf(this.tagName) != -1;
      })
      .text()
      .trim();
    if ($(this).find("*").length <= 1) {
      if (val.length > 0) {
        $(this).removeClass('hover');
        console.log('dude i should totally log this', this, val);
        console.log(getPathTo(this));
        console.log($(document).xpathEvaluate(getPathTo(this)).get(0));
      }
      e.stopPropagation();
    }
  });
});
