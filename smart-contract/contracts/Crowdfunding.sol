// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract Crowdfunding {
    address public owner;
    IERC20 public idrxToken;
    uint public campaignCount = 0;

    constructor(address _idrxTokenAddress) {
        owner = msg.sender;
        idrxToken = IERC20(_idrxTokenAddress);
    }

    struct Campaign {
        address creator;
        string title;
        string description;
        string category;
        string image;
        uint goal;
        uint fundsRaised;
        bool completed;
    }

    mapping(uint => Campaign) public campaigns;

    event CampaignCreated(uint indexed campaignId, address indexed creator);
    event Donated(uint indexed campaignId, address indexed donor, uint amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _image,
        uint _goal
    ) public {
        campaigns[campaignCount] = Campaign(
            msg.sender,
            _title,
            _description,
            _category,
            _image,
            _goal,
            0,
            false
        );

        emit CampaignCreated(campaignCount, msg.sender);
        campaignCount++;
    }

    function donate(uint _campaignId, uint _amount) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(!campaign.completed, "Campaign has ended");

        require(
            idrxToken.transferFrom(msg.sender, campaign.creator, _amount),
            "Token transfer failed"
        );

        campaign.fundsRaised += _amount;

        if (campaign.fundsRaised >= campaign.goal) {
            campaign.completed = true;
        }

        emit Donated(_campaignId, msg.sender, _amount);
    }

    function getCampaign(uint _id) public view returns (Campaign memory) {
        return campaigns[_id];
    }
}
