pragma solidity ^0.4.18;

import './IOwnership.sol';

contract IRights is IOwnership {
  modifier _hasRights() {
    require(hasRights(msg.sender));
    _;
  }

  function hasRights(address _who) public constant returns(bool);
  function addRights(address _who) _isOwner public returns(bool);
}