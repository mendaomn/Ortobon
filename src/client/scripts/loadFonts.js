import polyfillFontFaceObserver from './FontFaceObserver';

export default function loadFonts() {
  if ( sessionStorage.fontsLoaded ) {
    addFontsReadyClass();
    return;
  }

  polyfillFontFaceObserver();

  var robotoRegular = new FontFaceObserver( "caviar_dreamsregular", {
    weight: 400
  } );

  robotoRegular.load()
    .then( addFontsReadyClass )
    .then( setFontsLoadedInSessionStorage );

  function addFontsReadyClass() {
    document.documentElement.className += " fonts-ready";
  }

  function setFontsLoadedInSessionStorage() {
    sessionStorage.fontsLoaded = true
  }

}
