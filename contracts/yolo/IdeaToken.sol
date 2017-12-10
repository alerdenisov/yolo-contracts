pragma solidity ^0.4.18;

import '../base/DefaultToken.sol';
import './interfaces/IDAO.sol';

contract IdeaToken is DefaultToken {
  IDAO public dao;

  function IdeaToken(address _owner, address _daoAddress, string _name, string _ticker) DefaultToken(_name, _ticker, 18, 100 ether) public {
    if(msg.sender != _owner) {
      transfer(_owner, 100 ether);
    }

    dao = IDAO(_daoAddress);
  }

  function transfer(address _to, uint _amount) public returns (bool) {
    dao.pullRevenue(msg.sender);
    dao.pullRevenue(_to);
    return super.transfer(_to, _amount);
  }

  function transferFrom(address _from, address _to, uint _value) public returns (bool) {
    dao.pullRevenue(_from);
    dao.pullRevenue(_to);
    return super.transferFrom(_from, _to, _value);
  }
}