pragma solidity ^0.4.18;

contract IOwnership {
  // @dev Modifier to prevent call function without ownership rights
  // @dev should be overrided with a child contracts
  modifier _isOwner() {
    require(false);
    _;
  }

  event AddOwner(address indexed provider, address indexed owner);
  event RemoveOwner(address indexed provider, address indexed owner);

  // @dev Add\Replace owner with a providen address
  function addOwner(address _owner) public returns(bool);

  // @dev Remove providen owner 
  function removeOwner(address _owner) public returns(bool);
}