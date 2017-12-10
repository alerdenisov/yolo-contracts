pragma solidity ^0.4.18;

import '../permissions/PermissionsHelper.sol';
import '../permissions/IPermissioned.sol';

contract IRegistry is IPermissioned {
  using PermissionsHelper for uint;

  enum RegistryPermissions {
    Add,
    Remove
  }

  mapping (address => uint) public index;
  address[] public instances;

  event RemoveInstance(address indexed sender, address indexed instance);
  event AddInstance(address indexed sender, address indexed instance);

  function addInstance(address _registrator, address _instance) _hasPermissions(uint(RegistryPermissions.Add)) public returns(bool) {
    require(index[_instance] == 0);
    instances.push(_instance);
    index[_instance] = instances.length;
    AddInstance(_registrator, _instance);

    return true;
  }

  function removeInstance(address _unregistrator, address _instance) _hasPermissions(uint(RegistryPermissions.Remove)) public returns(bool) {
    require(index[_instance] != 0);
    index[_instance] = 0;

    RemoveInstance(_unregistrator, _instance);
    return true;
  }
}