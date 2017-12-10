pragma solidity ^0.4.18;

import '../base/DefaultToken.sol';
import './interfaces/IDAO.sol';

contract IdeaToken is DefaultToken {
  IDAO public dao;

  function IdeaToken(address _owner, address _daoAddress, string _name, string _ticker) DefaultToken(_name, _ticker, 18, 100 ether, _owner) public {
    dao = IDAO(_daoAddress);
  }

  function transfer(address _to, uint _amount) public returns (bool) {
    if(dao != address(0x0)) {
      dao.pullRevenue(msg.sender);
      dao.pullRevenue(_to);
    }
    return super.transfer(_to, _amount);
  }

  function transferFrom(address _from, address _to, uint _value) public returns (bool) {
    if(dao != address(0x0)) {
      dao.pullRevenue(_from);
      dao.pullRevenue(_to);
    }
    return super.transferFrom(_from, _to, _value);
  }
}