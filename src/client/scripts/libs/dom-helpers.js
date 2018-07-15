var DOMHelpers = {
  loopNodeList: function ( nodelist, cb ) {
    for ( var i = 0; i < nodelist.length; i++ ) {
      var node = nodelist[ i ];
      cb( node );
    }
  },

  addClass: function ( className ) {
    return function( el ) {
      el.classList.add( className );
    };
  },

  removeClass: function ( className ) {
    return function( el ) {
      el.classList.remove( className );
    };
  },

  stringToDom: function( string ) {
    var template = document.createElement('template');
    template.innerHTML = string;
    return template.content.firstChild;
  }
};

export default DOMHelpers;
