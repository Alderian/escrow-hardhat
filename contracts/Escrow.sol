// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

//Console functions to help debug the smart contract just like in Javascript
// import "hardhat/console.sol";

contract Escrow {
    address public arbiter;
    address public beneficiary;
    address public depositor;

    address public owner;
    string public name;

    bool public isApproved;

    constructor(
        string memory _name,
        address _arbiter,
        address _beneficiary,
        address _owner
    ) payable {
        name = _name;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
        owner = _owner;
    }

    event Approved(uint);

    function approve() external {
        require(msg.sender == arbiter);
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }
}
