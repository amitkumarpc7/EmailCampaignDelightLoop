import React, { useState, useEffect } from "react";
import type { EmailCampaign, EmailStep } from "../types";
import StepEditor from "./StepEditor";
import CampaignFlow from "./CampaignFlow";
import "../styles/CampaignBuilder.css";

interface CampaignBuilderProps {
  campaign: EmailCampaign;
  onSave: (campaign: EmailCampaign) => void;
  onCancel: () => void;
}

const CampaignBuilder: React.FC<CampaignBuilderProps> = ({
  campaign,
  onSave,
  onCancel,
}) => {
  const [editedCampaign, setEditedCampaign] = useState<EmailCampaign>({
    ...campaign,
  });
  const [selectedStep, setSelectedStep] = useState<EmailStep | null>(null);
  const [activeTab, setActiveTab] = useState<"flow" | "settings">("flow");

  useEffect(() => {
    setEditedCampaign({ ...campaign });
  }, [campaign]);

  const handleStepUpdate = (updatedStep: EmailStep) => {
    const updatedSteps = editedCampaign.steps.map((step) =>
      step.id === updatedStep.id ? updatedStep : step
    );

    setEditedCampaign({
      ...editedCampaign,
      steps: updatedSteps,
      updatedAt: new Date(),
    });

    setSelectedStep(updatedStep);
  };

  const handleAddStep = () => {
    const newStep: EmailStep = {
      id: `step-${Date.now()}`,
      subject: "New Email",
      content: "<p>Email content goes here</p>",
      delayDays: 0,
      nextActions: [
        { action: "open", nextStepId: null },
        { action: "click", nextStepId: null },
        { action: "purchase", nextStepId: null },
        { action: "idle", nextStepId: null },
      ],
    };

    const updatedSteps = [...editedCampaign.steps, newStep];

    // If this is the first step, set it as entry point
    const entryStepId = editedCampaign.entryStepId || newStep.id;

    setEditedCampaign({
      ...editedCampaign,
      steps: updatedSteps,
      entryStepId,
      updatedAt: new Date(),
    });

    setSelectedStep(newStep);
  };

  const handleDeleteStep = (stepId: string) => {
    const updatedSteps = editedCampaign.steps.filter(
      (step) => step.id !== stepId
    );

    // If we're deleting the entry step, choose a new one if available
    let entryStepId = editedCampaign.entryStepId;
    if (entryStepId === stepId) {
      entryStepId = updatedSteps.length > 0 ? updatedSteps[0].id : "";
    }

    setEditedCampaign({
      ...editedCampaign,
      steps: updatedSteps,
      entryStepId,
      updatedAt: new Date(),
    });

    if (selectedStep?.id === stepId) {
      setSelectedStep(null);
    }
  };

  const handleCampaignSettingChange = (
    field: keyof EmailCampaign,
    value: string
  ) => {
    setEditedCampaign({
      ...editedCampaign,
      [field]: value,
      updatedAt: new Date(),
    });
  };

  return (
    <div className="campaign-builder-container">
      <div className="builder-header">
        <h2>
          <input
            type="text"
            value={editedCampaign.name}
            onChange={(e) =>
              handleCampaignSettingChange("name", e.target.value)
            }
            className="campaign-name-input"
          />
        </h2>
        <div className="builder-actions">
          <button onClick={() => onSave(editedCampaign)} className="save-btn">
            Save Campaign
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "flow" ? "active" : ""}`}
          onClick={() => setActiveTab("flow")}
        >
          Campaign Flow
        </button>
        <button
          className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {activeTab === "flow" ? (
        <div className="flow-container">
          <div className="flow-visualization">
            <CampaignFlow
              campaign={editedCampaign}
              onSelectStep={setSelectedStep}
              selectedStepId={selectedStep?.id || null}
            />
          </div>

          <div className="step-actions">
            <button onClick={handleAddStep} className="add-step-btn">
              + Add Step
            </button>
          </div>

          {selectedStep && (
            <div className="step-editor-container">
              <StepEditor
                step={selectedStep}
                allSteps={editedCampaign.steps}
                onUpdate={handleStepUpdate}
                onDelete={() => handleDeleteStep(selectedStep.id)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="settings-container">
          <div className="setting-field">
            <label>Description</label>
            <textarea
              value={editedCampaign.description}
              onChange={(e) =>
                handleCampaignSettingChange("description", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="setting-field">
            <label>Entry Point</label>
            <select
              value={editedCampaign.entryStepId}
              onChange={(e) =>
                handleCampaignSettingChange("entryStepId", e.target.value)
              }
            >
              {editedCampaign.steps.map((step) => (
                <option key={step.id} value={step.id}>
                  {step.subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignBuilder;
