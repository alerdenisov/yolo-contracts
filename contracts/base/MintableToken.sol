pragma solidity ^0.4.18;

import './DefaultToken.sol';
import '../interfaces/IMintableToken.sol';

contract MintableToken is DefaultToken, Multiowner, IMintableToken {
  function mint(address _beneficiary, uint _amount) _canMint _hasRights public returns (bool);
  function finishMinting() _canMint _hasRights public returns (bool);
}