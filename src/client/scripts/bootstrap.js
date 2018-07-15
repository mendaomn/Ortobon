import loadFonts from './loadFonts';
import toggleNav from './navigationToggle';

loadFonts();

document.addEventListener("DOMContentLoaded", function onDocumentReady() {
  toggleNav.init();
});
