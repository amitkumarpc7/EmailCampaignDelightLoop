import React, { useState } from "react";
import type { EmailCampaign} from "./types";
import CampaignBuilder from "./components/CampaignBuilder";
import CampaignList from "./components/CampaignList";
import { mockCampaigns } from "./data/mockData";

const App: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null);
  const [view, setView] = useState<"list" | "builder">("list");

  const handleCreateNew = () => {
    const newCampaign: EmailCampaign = {
      id: `campaign-${Date.now()}`,
      name: "New Campaign",
      description: "",
      entryStepId: "",
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setView("builder");
  };

  const handleSaveCampaign = (updatedCampaign: EmailCampaign) => {
    setCampaigns(
      campaigns.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c))
    );
    setView("list");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Email Campaign Engine</h1>
      </header>

      {view === "list" ? (
        <CampaignList
          campaigns={campaigns}
          onSelect={(campaign) => {
            setSelectedCampaign(campaign);
            setView("builder");
          }}
          onCreateNew={handleCreateNew}
        />
      ) : (
        selectedCampaign && (
          <CampaignBuilder
            campaign={selectedCampaign}
            onSave={handleSaveCampaign}
            onCancel={() => setView("list")}
          />
        )
      )}
    </div>
  );
};

export default App;
