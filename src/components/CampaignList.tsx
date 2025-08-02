import React from "react";
import  type { EmailCampaign } from "../types";
import "../styles/CampaignList.css";

interface CampaignListProps {
  campaigns: EmailCampaign[];
  onSelect: (campaign: EmailCampaign) => void;
  onCreateNew: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onSelect,
  onCreateNew,
}) => {
  return (
    <div className="campaign-list-container">
      <div className="campaign-list-header">
        <h2>Your Campaigns</h2>
        <button onClick={onCreateNew} className="create-new-btn">
          + Create New Campaign
        </button>
      </div>

      <div className="campaigns-grid">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="campaign-card"
            onClick={() => onSelect(campaign)}
          >
            <h3>{campaign.name}</h3>
            <p>{campaign.description || "No description"}</p>
            <div className="campaign-meta">
              <span>Steps: {campaign.steps.length}</span>
              <span>
                Created: {new Date(campaign.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
