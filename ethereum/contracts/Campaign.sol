// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract CampaignFactory {
    string public campaignName;
    address[] public deployedCampaignAddresses;
    mapping(address => string) public deployedCampaigns;

    function createCampaign(uint minimum, string memory name) public {
        campaignName = name;
        address newCampaign = address(new Campaign(minimum, msg.sender, name));
        deployedCampaignAddresses.push(newCampaign);
        deployedCampaigns[newCampaign] = name;
    }

     function getDeployedCampaigns () public view returns (address[] memory) {
        return deployedCampaignAddresses;
    }

}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address receiver;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    string public campaignName;
    uint public contributorsCount;
    uint public numberofRequests;
    uint public completedRequests;
    mapping(uint => Request) public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
  

    constructor (uint minimum, address creator, string memory name) {
        manager = creator;
        minimumContribution = minimum;
        campaignName = name;
    }

    modifier restricted() {
          require(msg.sender == manager, "Only the Manager can perform this action");
          _;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Your contribution is below the minimum amount");
        require(contributors[msg.sender] == false, "You have already contributed");
        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string memory description, uint value, address receiver) 
    public restricted {

         Request storage newRequest = requests[numberofRequests++];
         newRequest.description = description;
         newRequest.value = value;
         newRequest.receiver = receiver;
         newRequest.complete = false;
         newRequest.approvalCount = 0;
         newRequest.approvals[msg.sender] = false;
         
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(contributors[msg.sender] == true, "Only Contributors can approve this Request");
        require(!request.approvals[msg.sender], "You have already approved this Request");
        request.approvals[msg.sender] = true;
        request.approvalCount++;
         if(request.approvalCount > (contributorsCount/2) && !request.complete){
            request.complete = true;
             completedRequests++;
            payable(request.receiver).transfer(request.value);
        }
    }

     function getCampaignSummary () public view returns (uint, uint, uint, uint, address, uint){
        return (
            minimumContribution,
            address(this).balance,
            contributorsCount,
            numberofRequests,
            manager,
            completedRequests
        );
    }


}

