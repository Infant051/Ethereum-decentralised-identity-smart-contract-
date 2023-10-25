// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identification{
    address public owner;

    struct Identity {
        string identityId;
        string name;
        string email;
        string contactAddress;
        uint256 registrationTimestamp;
    }

    mapping(address => Identity) public identities;
    event IdentityRegistered(
        address indexed owner,
        string identityId,
        string name,
        string email,
        uint256 registrationTimestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this");
        _;
    }

    modifier notRegistered() {
        require(
            bytes(identities[msg.sender].identityId).length == 0,
            "Identity already registered"
        );
        _;
    }

    function registerIdentity(
        string memory identityId,
        string memory name,
        string memory email,
        string memory _address
    ) external notRegistered {
        require(bytes(identityId).length > 0, "Invalid identity ID");
        require(bytes(name).length > 0, "Invalid name");
        require(bytes(email).length > 0, "Invalid email");

        identities[msg.sender] = Identity({
            identityId: identityId,
            name: name,
            email: email,
            contactAddress : _address,
            registrationTimestamp: block.timestamp
        });

        emit IdentityRegistered(
            msg.sender,
            identityId,
            name,
            email,
            block.timestamp
        );
    }

    function getIdentityDetails(
        address userAddress
    )
        external
        view
        returns (string memory, string memory, string memory, string memory,uint256)
    {
        Identity memory identity = identities[userAddress];
        return (
            identity.identityId,
            identity.name,
            identity.email,
            identity.contactAddress,
            identity.registrationTimestamp
        );
    }
}
