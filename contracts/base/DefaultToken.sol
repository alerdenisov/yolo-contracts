pragma solidity ^0.4.18;

import '../libs/SafeMath.sol';
import '../interfaces/IToken.sol';
import '../interfaces/ITokenRecipient.sol';

contract DefaultToken is IToken {
  using SafeMath for uint;

  function DefaultToken(
    string _name,
    string _ticker,
    uint _decimals,
    uint _initialSupply
  ) public {
    name = _name;
    ticker = _ticker;
    decimals = _decimals;

    if (_initialSupply > 0) {
      totalSupply = _initialSupply;
      balances[msg.sender] = _initialSupply;
      Transfer(address(0x0), msg.sender, _initialSupply);
    }
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }
  function transferFrom(address _from, address _to, uint _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    Transfer(_from, _to, _value);
    return true;
  }
  function approve(address _spender, uint _value) public returns (bool) {
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }
  function allowance(address _owner, address _spender) public view returns (uint) {
    return allowed[_owner][_spender];
  }

  function approveAndCall(address _spender, uint _value, bytes _data) public returns (bool) {
    ITokenRecipient spender = ITokenRecipient(_spender);
    if (approve(_spender, _value)) {
      spender.receiveApproval(msg.sender, _value, address(this), _data);
      return true;
    }
    return false;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}