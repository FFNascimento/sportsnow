/**
 * @ngdoc service
 * @name LocalStorageService
 * @description Manage local storage data
 * @author Gabriel Garcia
 */
angular.module('app')
.service('LocalStorageService', function ($window, LocalStorageConstants) {

  var self = this;

  /**
   * @typedef StoreItem
   * @description Structure of the item identifier defined on LocalStoreConstants 
   * @property {String} KEY Identifier of the object storage
   * @property {Boolean} PARSE It says if the item must be parsed when stored or retrieved. It is necessary for JSON objects.
   * @see{@link ./localstorage.constants.js}
   * @author Gabriel Garcia
   */

  /**
   * @type {Object}
   * @description Map of elements stored in LocalStorage
   * @memberof LocalStorageService
   * @author Gabriel Garcia
   */
  self.storeMap = LocalStorageConstants;

  /**
   * Gets the value of the local based on given key
   * @method getData
   * @memberof LocalStorageService
   * @param  {StoreItem} item Item identifier 
   * @return {String|Object} Value of the local
   * @author Gabriel Garcia
   * @example LocalStorageService.getData(LocalStorageService.storeMap.USER);
   */
  self.getData = function(item) {
    if ($window.localStorage[item.KEY]) {
      if(item.PARSED){
        return JSON.parse($window.localStorage[item.KEY]);
      } else {
        return $window.localStorage[item.KEY];
      }
    }
    return null;
  };

  /**
   * Store data into local storage labeled by the given key
   * @method setData
   * @memberof LocalStorageService
   * @param  {StoreItem} item Item identifier 
   * @return {String|Object} Value to be stored
   * @author Gabriel Garcia
   * @example LocalStorageService.setData(LocalStorageService.storeMap.USER, data);
   */
  self.setData = function(item, data) {
      if(item.PARSED){
        $window.localStorage[item.KEY] = JSON.stringify(data);
      } else {
        $window.localStorage[item.KEY] = data;
      }
  };

  /**
   * Remove data from local storage based on given key
   * @method unset
   * @memberof LocalStorageService
   * @param  {StoreItem} item Item identifier 
   * @author Gabriel Garcia
   * @example LocalStorageService.unset(LocalStorageService.storeMap.USER);
   */
  self.unset = function(item) {
      delete $window.localStorage[item.KEY];
  };

  return self;
});
