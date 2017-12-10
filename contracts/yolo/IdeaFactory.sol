pragma solidity ^0.4.18;

import '../interfaces/IRegistry.sol';
import './IdeaDAO.sol';

contract IdeaFactory is IRegistry {
  address public creator;

  event NewIdea(address indexed creator, address indexed idea);

  function IdeaFactory() public {
    creator = msg.sender;
  }

  function createIdea(string name, string ticker, bytes32 meta) public returns (address) {
    IdeaDAO idea = new IdeaDAO(msg.sender, name, ticker, meta);
    idea.addOwner(msg.sender);
    addInstance(msg.sender, idea);
    NewIdea(msg.sender, idea);
  }  

  function permissionOf(address _who) public constant returns (uint) {
    // allow anyone to ad
    uint perms = uint(RegistryPermissions.Add);
    if (_who == creator) {
      perms = perms | uint(RegistryPermissions.Remove);
    }

    return perms;
  }
}
