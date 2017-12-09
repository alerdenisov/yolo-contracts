pragma solidity ^0.4.18;

import '../interfaces/IOwnership.sol';

contract Ownable is IOwnership {
  address public owner;

  function Ownable() public {
    owner = msg.sender;
  }

  modifier _isOwner() {
    require(msg.sender == owner);
    _;
  }

  function addOwner(address _owner) public _isOwner returns (bool) {
    require(_owner != address(0x0));

    RemoveOwner(msg.sender, owner);
    AddOwner(msg.sender, _owner);
    owner = _owner;

    return true;
  }

  function removeOwner(address _owner) public _isOwner returns (bool) {
    require(owner == _owner);

    RemoveOwner(msg.sender, owner);
    owner = address(0x0);

    return true;
  }

}
