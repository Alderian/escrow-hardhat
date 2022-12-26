// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

//Console functions to help debug the smart contract just like in Javascript
import "hardhat/console.sol";

import "./Escrow.sol";

contract EscrowManager {
    Escrow[] public escrows;

    event Deployed(
        Escrow escrow,
        string name,
        address _arbiter,
        address _beneficiary,
        address owner,
        uint value
    );

    function createEscrow(
        string memory name,
        address _arbiter,
        address _beneficiary
    ) external payable returns (Escrow) {
        Escrow escrow = new Escrow{value: msg.value}(
            name,
            _arbiter,
            _beneficiary,
            msg.sender
        );
        escrows.push(escrow);
        emit Deployed(
            escrow,
            name,
            _arbiter,
            _beneficiary,
            msg.sender,
            msg.value
        );
        return escrow;
    }

    /**
     * Page is 1 based. Page = 0 will fail
     * Size can be any size from 1 to N
     */
    function getEscrows(
        uint _page,
        uint _size
    ) public view returns (Escrow[] memory) {
        // starting point for listing items in array
        uint _startIndex = _size * _page - _size;

        // return emptry array if already empty or _squareIndex is out of bounds
        if (escrows.length == 0 || _startIndex > escrows.length - 1) {
            return new Escrow[](0);
        }

        // need to create fixed length array because we cannot push to array in memory
        Escrow[] memory _escrows = new Escrow[](_size);

        // start starting counter for return array
        uint _returnCounter = 0;

        // loop through array from starting point to end point
        for (_startIndex; _startIndex < _size * _page; _startIndex++) {
            // add array item unless out of bounds
            if (_startIndex < escrows.length) {
                _escrows[_returnCounter] = escrows[_startIndex];
            }
            _returnCounter++;
        }

        return _escrows;
    }

    function getEscrowsLength() external view returns (uint length) {
        return escrows.length;
    }
}
