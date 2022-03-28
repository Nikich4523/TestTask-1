// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract DonationsContract
{
    address owner; // deployer's address
    address[] public donaters; // list of unique donaters
    mapping(address => uint) public Donations; // dict: donater's adrs - sum of donations

    constructor()
    {
        owner = msg.sender;
    }

    modifier isOwner()
    {
        require(msg.sender == owner, "You are not the owner of the contract");
        _;
    }

    function Donate()
    external payable
    {
        require(msg.value > 0, "The sum of donation must be greater than 0");

        if (Donations[msg.sender] == 0)
        {
            donaters.push(msg.sender);
        }

        Donations[msg.sender] += msg.value;
    }

    function GetDonaters()
    external view
    returns (address[] memory)
    {
        return donaters;
    }

    function GetSumOfDonates(address _addr)
    external view
    returns (uint)
    {
        return Donations[_addr];
    }

    function WithdrawDonations(uint _sum, address _addr)
    external payable isOwner
    {
        require(_sum <= address(this).balance, "Not enough money");
        payable(_addr).transfer(_sum);
    }
}