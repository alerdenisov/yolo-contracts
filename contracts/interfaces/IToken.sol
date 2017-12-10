pragma solidity ^0.4.18;


// Combined version of ERC20 with details and approve and call
contract IToken {
  string public name;
  string public ticker;
  uint public decimals;
  uint public totalSupply;
  mapping (address => mapping (address => uint256)) internal allowed;
  mapping(address => uint) internal balances;

  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);

  function balanceOf(address _who) public view returns (uint);
  function transfer(address _to, uint _value) public returns (bool);
  function allowance(address _owner, address spender) public view returns (uint);
  function transferFrom(address _from, address _to, uint _value) public returns (bool);
  function approve(address _spender, uint _value) public returns (bool);
  function approveAndCall(address _spender, uint _value, bytes _data) public returns (bool);
}