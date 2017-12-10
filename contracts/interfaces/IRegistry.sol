pragma solidity ^0.4.18;

import '../permissions/PermissionsHelper.sol';
import '../permissions/IPermissioned.sol';

contract IRegistry is IPermissioned {
  using PermissionsHelper for uint;

  enum RegistryPermissions {
    Add,
    Remove
  }

  address[] instances;

  event RemoveInstance(address indexed sender, address indexed instance);
  event AddInstance(address indexed sender, address indexed instance);

  function addInstance(address _instance) _hasPermissions(uint(RegistryPermissions.Add)) public returns(bool);
  function removeInstance(address _instance) _hasPermissions(uint(RegistryPermissions.Remove)) public returns(bool);
}