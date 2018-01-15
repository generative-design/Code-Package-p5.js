;(function($, window, document, undefined) {

  $.get('sketch.js', function(data) {
    var helpText = getCommentBlock(data);
    if (helpText) createHelp(helpText);
  }, 'text');

  function getCommentBlock(data) {
    // RegEx from https://github.com/yavorskiy/comment-parser/blob/master/parser.js
    var RE_COMMENT_START = /^\s*\/\*\*\s*$/m;
    var RE_COMMENT_END = /^\s*\*\/\s*$/m;
    var commentStart = data.match(RE_COMMENT_START);
    var commentEnd = data.match(RE_COMMENT_END);
    if (commentStart && commentEnd) {
      var commentBlock = data.substring(commentStart['index'] + 4, commentEnd['index']);
      commentBlock = commentBlock.replace(/\*/g, '');
      commentBlock = commentBlock.trim();
      return commentBlock;
    } else {
      return null;
    }
  }

  function getSketchName() {
    var loc = window.location.pathname;
    var dir = loc.split('/');
    return dir[dir.length-2];
  }

  function linkMarkdown2Html(text) {
    // replace [link text](http://example.com) with ahref link
    return String(text).replace(/\[([^\]]*)\]\(([^(]*)\)/, '<a target="_blank" href="$2">$1</a>');
  }

  function createHelp(helpText) {
    var text = helpText.split('\n');
    var lines = text.map(function (l) {
      return linkMarkdown2Html(l).trim();
    });

    var htmlString = [
      '<div style="display: none;">',
          '<div id="help-content">',
            getSketchName(),
            lines.join('\n'),
            '\n',
          '</div>',
      ' </div>',
    ].join('\n');

    document.title = getSketchName();
    $('body').append($.parseHTML(htmlString));
    $('#help').tooltipster({
      theme: 'tooltipster-noir',
      animation: 'fade',
      animationDuration: 100,
      distance: '10',
      trigger: 'click',
      interactive: true
    });
  }

})($, window, document);
