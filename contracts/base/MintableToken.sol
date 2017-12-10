pragma solidity ^0.4.18;

import './DefaultToken.sol';
import '../interfaces/IMintableToken.sol';

contract MintableToken is DefaultToken, IMintableToken {
  function mint(address _beneficiary, uint _amount) _canMint _isOwner public returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_beneficiary] = balances[_beneficiary].add(_amount);
    Mint(msg.sender, _beneficiary, _amount);
    Transfer(address(0), _beneficiary, _amount);
    return true;
  }

  function finishMinting() _canMint _isOwner public returns (bool) {
    mintingFinished = true;
    MintFinished();
    return true;
  }
}