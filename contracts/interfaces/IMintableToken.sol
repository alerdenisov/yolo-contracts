pragma solidity ^0.4.18;

import './IToken.sol';
import './IRights.sol';

contract IMintableToken is IToken, IRights {
  bool public mintingFinished;

  modifier _canMint() {
    require(!mintingFinished);
    _;
  }

  event MintFinished();
  event Mint(address indexed minter, address indexed beneficiary, uint amount);

  function mint(address _beneficiary, uint _amount) _canMint _hasRights public returns (bool);
  function finishMinting() _canMint _hasRights public returns (bool);
}