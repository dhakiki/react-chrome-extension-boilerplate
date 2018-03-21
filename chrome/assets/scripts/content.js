$( document ).ready(function() {
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
        console.log('dude i should totally log this', val);
      }
      e.stopPropagation();
    }
  });
});
