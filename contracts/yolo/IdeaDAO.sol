pragma solidity ^0.4.18;

import './IdeaToken.sol';
import './interfaces/IDAO.sol';
import '../base/Ownable.sol';

contract IdeaDAO is IDAO, Ownable {
  function IdeaDAO(address _owner, string _name, string _ticker) public {
    token = new IdeaToken(_owner, address(this), _name, _ticker);
  }
}