export default {
  init( defaultState = { } ) {
    this._listeners = [];
    this._state = defaultState;
  },

  getState() {
    return this._state;
  },

  setState( newState ) {
    if (!newState) return;

    this._state = newState;

    this._listeners.forEach( cb => cb( this._state ) );
  },

  subscribe( cb ) {
    this._listeners = this._listeners ? this._listeners : [];
    this._listeners.push( cb );
  }
}
