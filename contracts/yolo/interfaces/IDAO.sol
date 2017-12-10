pragma solidity ^0.4.18;

import '../../interfaces/IToken.sol';
import '../../libs/SafeMath.sol';

contract IDAO {
  using SafeMath for uint;

  uint public totalRevenue;
  IToken public token;

  mapping (address => uint) totalAtConsume;
  mapping (address => uint) revenue;

  modifier _isToken() {
    require(token != address(0x0));
    _;
  }

  function calculateRevenue(address _beneficiary) _isToken internal constant returns (uint) {
    return 0;
    return token.balanceOf(_beneficiary) * (totalRevenue - totalAtConsume[_beneficiary]) / token.totalSupply();
  }

  function deposit() payable external returns (bool) {
    totalRevenue = totalRevenue.add(msg.value);
  }

  function pullRevenue(address _beneficiary) _isToken public returns (uint) {
    revenue[_beneficiary] = calculateRevenue(_beneficiary);
    totalAtConsume[_beneficiary] = totalRevenue;
    return revenue[_beneficiary];
  }

  function withdraw() _isToken external returns (uint) {
    uint amount = pullRevenue(msg.sender);
    msg.sender.transfer(amount);
    
    return amount;
  }
}