export const NETWORKS = {
  1: 'Main Net',
  2: 'Deprecated Morden test network',
  3: 'Ropsten test network',
  4: 'Rinkeby test network',
  42: 'Kovan test network',
  4447: 'Truffle Develop Network',
  0xC0FFEE2: 'PoA Parity (0xe)'
}

export const APPROVED_NETWORK_ID = 0xC0FFEE2

export const MUTATION_TYPES = {
  CHANGE_CURRENT_ROUTE_TO: 'changeCurrentRouteTo',
  REGISTER_WEB3_INSTANCE: 'registerWeb3Instance',
  UPDATE_USER_BLOCKCHAIN_STATUS: 'updateUserBlockchainStatus',
  UPDATE_WEB3_PROPERTIES: 'updateWeb3Properties',
  LOGIN: 'login',
  LOGOUT: 'logout',

  // Assets
  ASSETS__UPDATE_LIST: 'assetsList',
  ASSETS__HAS_RIGHTS: 'assetsRights',
  ASSETS__UPDATE_ASSET: 'assetUpdate',

  SHIPMENTS__UPDATE_LIST: 'shipList',
  SHIPMENTS__UPDATE_SHIP: 'shipUpdate',

  // Constructor
  CONSTRUCTOR__RESET: 'constructorReset',
  CONSTRUCTOR__SET_STEP: 'constructorStep',
  CONSTRUCTOR__SELECT_SALE: 'constructorSale',
  CONSTRUCTOR__SELECT_ASSET: 'constructorAsset',
  CONSTRUCTOR__SELECT_PRICING: 'constructorPricing',
  CONSTRUCTOR__SELECT_SHIPMENT: 'constructorShipment',
  CONSTRUCTOR__ADD_RULE: 'constructorAddRule',
  CONSTRUCTOR__REMOVE_RULE: 'constructorRemoveRule'
}

export const ACTION_TYPES = MUTATION_TYPES
