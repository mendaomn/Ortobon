import DOMHelpers from '../libs/dom-helpers';
import StateManager from '../libs/state-manager';

export default class FbButtonController {
  constructor() {
    this._loadSdk();

    window.onFacebookLogin = this._onLogin.bind( this );
  }

  _loadSdk() {
    var self = this;
    window.fbAsyncInit = function() {
      FB.init( {
        appId: '305242686588418',
        xfbml: true,
        version: 'v2.9'
      } );
      FB.AppEvents.logPageView();
      self._getCurrentStatus();
    };

    ( function( d, s, id ) {
      var js, fjs = d.getElementsByTagName( s )[ 0 ];
      if ( d.getElementById( id ) ) {
        return;
      }
      js = d.createElement( s );
      js.id = id;
      js.src = "//connect.facebook.net/it_IT/sdk.js";
      fjs.parentNode.insertBefore( js, fjs );
    }( document, 'script', 'facebook-jssdk' ) );
  }

  _onLogin( res ) {
    if ( !res.authResponse )
      return;

    this._setLoggedAndFetchName();
  }

  _getCurrentStatus() {
    var self = this;

    FB.getLoginStatus( function( response ) {
      if ( response.authResponse ) {
        self._setLoggedAndFetchName();
      }
    } );
  }

  _setLoggedAndFetchName() {
    const state = StateManager.getState()
    state.logged = true;
    StateManager.setState( state );

    FB.api( '/me', function( response ) {
      state.name = response.name;
      state.id = response.id;
      StateManager.setState( state );
    } );
  }
}
