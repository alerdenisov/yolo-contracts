pragma solidity ^0.4.18;

import '../interfaces/IOwnership.sol';

contract Multiowner is IOwnership {
  mapping (address=>bool) owners;
  address public publisher;

  event TransferPublisher(address indexed previous, address indexed next);

  modifier _isOwner() {
    require(owners[msg.sender]);
    _;
  }

  function Multiowner() public {
    publisher = msg.sender;
  }
  
  // @dev Add\Replace owner with a providen address
  function addOwner(address _owner) public returns(bool) {
    require(msg.sender == publisher);
    AddOwner(msg.sender, _owner);
    owners[_owner] = true;
    return true;
  }

  // @dev Remove providen owner 
  function removeOwner(address _owner) public returns(bool) {
    require(msg.sender == publisher);
    RemoveOwner(msg.sender, _owner);
    owners[_owner] = false;
    return true;
  }

  function transferPublisher(address _nextPublisher) public returns(bool) {
    require(msg.sender == publisher);
    TransferPublisher(msg.sender, _nextPublisher);
    publisher = _nextPublisher;
    return true;
  } 
}