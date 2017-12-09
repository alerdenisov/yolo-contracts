pragma solidity ^0.4.18;

import './IRights.sol';

contract IRegistry is IRights {
  address[] instances;

  event RemoveInstance(address indexed sender, address indexed instance);
  event AddInstance(address indexed sender, address indexed instance);

  function addInstance(address _instance) _hasRights public returns(bool);
  function removeInstance(address _instance) _hasRights public returns(bool);
}