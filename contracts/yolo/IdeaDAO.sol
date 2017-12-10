pragma solidity ^0.4.18;

import './IdeaToken.sol';
import './interfaces/IDAO.sol';
import '../base/Ownable.sol';

contract IdeaDAO is IDAO, Ownable {
  bytes32 public meta;
  event UpdateMeta(address indexed changer, bytes32 indexed meta);

  function IdeaDAO(address _owner, string _name, string _ticker, bytes32 _meta) public {
    token = new IdeaToken(_owner, address(this), _name, _ticker);

    meta = _meta;
    UpdateMeta(_owner, _meta);
  }

  function updateMeta(bytes32 _meta) _isOwner public returns (bool) {
    meta = _meta;
    UpdateMeta(msg.sender, _meta);
  }
}