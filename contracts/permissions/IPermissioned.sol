pragma solidity ^0.4.18;

contract IPermissioned {
  modifier _hasPermissions(uint _what) {
    require(hasPermissionsTo(msg.sender, _what));
    _;
  }

  function hasPermissionsTo(address _who, uint _flags) public constant returns (bool has) {
    uint perms = permissionOf(_who);
    has = perms & _flags == _flags;
  }

  function permissionOf(address _who) public constant returns (uint);
}