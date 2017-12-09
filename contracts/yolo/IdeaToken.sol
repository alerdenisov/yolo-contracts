pragma solidity ^0.4.18;

import '../base/DefaultToken.sol';

contract IdeaToken is DefaultToken {
  function IdeaToken(string _name, string _ticker) DefaultToken(_name, _ticker, 18, 100 ether) public {    
  }
}