function init() {
  var openBtn;
  var closeBtn;
  var nav;

  nav = document.querySelector( '.js-nav' );
  openBtn = document.querySelector( '.js-open-nav' );
  closeBtn = document.querySelector( '.js-close-nav' );

  openBtn.addEventListener( 'click', toggle );
  closeBtn.addEventListener( 'click', toggle );

  function toggle() {
    nav.classList.toggle( 'is-open' );
  }
}


export default {
  init: init
};
