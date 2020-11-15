// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract Inbox {
    string public message;

    constructor(string memory _initialMessage) {
        message = _initialMessage;
    }
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}