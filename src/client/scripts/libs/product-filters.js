const Filters = {
  byType( type = 'all', currentType ) {
    var _type = type.toUpperCase();
    var _currentType = currentType.toUpperCase();

    return _currentType === 'ALL' ? true : _type === _currentType;
  },

  byName( name = '', searchString ) {
    var _name = name.toUpperCase();
    var _searchString = searchString.toUpperCase();

    return _name.indexOf( _searchString ) !== -1;
  },

  isProductVisible( product, state ) {
    var currentType = state.currentType;
    var currentSearchString = state.currentSearchString;

    return product.active && Filters.byType( product.type, currentType ) &&
      Filters.byName( product.name, currentSearchString );
  }
}

export default Filters;
