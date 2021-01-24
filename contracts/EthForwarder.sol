// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract EthForwarder is Ownable {

  address payable public destinationAddress;

  event Forwarded(address indexed _from, address indexed _to, uint _amount);
  event Flushed(address indexed _from, address indexed _to, uint _amount);

  constructor() {
    destinationAddress = msg.sender;
  }

  function pay() external payable {
    emit Forwarded(msg.sender, destinationAddress, msg.value);
    _send(destinationAddress, msg.value);
  }

  function flush() external {
    emit Flushed(msg.sender, destinationAddress, address(this).balance);
    _send(destinationAddress, address(this).balance);
  }

  function setDestinationAddress(address payable _destination) external onlyOwner {
    destinationAddress = _destination;
  }

  function _send(address payable _to, uint _amount) internal {
    (bool sent,) = _to.call{value: _amount}("");
    require(sent, "Failed to send Ether");
  }
}
