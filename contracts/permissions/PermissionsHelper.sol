pragma solidity ^0.4.15;

library PermissionsHelper {
  function toPermission(uint a) public pure returns (uint) {
    return 1 * 2 ** a;
  }

  function and(uint a, uint b) public pure returns (uint) {
    return a | toPermission(b);
  }
}