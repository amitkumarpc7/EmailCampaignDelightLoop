import React, { useState } from "react";
import type { EmailStep, UserAction } from "../types";
import "../styles/StepEditor.css";

interface StepEditorProps {
  step: EmailStep;
  allSteps: EmailStep[];
  onUpdate: (updatedStep: EmailStep) => void;
  onDelete: () => void;
}

const StepEditor: React.FC<StepEditorProps> = ({
  step,
  allSteps,
  onUpdate,
  onDelete,
}) => {
  const [editedStep, setEditedStep] = useState<EmailStep>({ ...step });

  const handleFieldChange = (
    field: keyof EmailStep,
    value: string | number
  ) => {
    setEditedStep({
      ...editedStep,
      [field]: value,
    });
  };

  const handleActionChange = (
    action: UserAction,
    field: "nextStepId" | "additionalDelayDays",
    value: string | number | null
  ) => {
    const updatedActions = editedStep.nextActions.map((a) =>
      a.action === action ? { ...a, [field]: value } : a
    );

    setEditedStep({
      ...editedStep,
      nextActions: updatedActions,
    });
  };

  const handleSave = () => {
    onUpdate(editedStep);
  };

  return (
    <div className="step-editor">
      <div className="editor-header">
        <h3>Edit Step</h3>
        <div className="editor-actions">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={onDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>

      <div className="editor-field">
        <label>Subject</label>
        <input
          type="text"
          value={editedStep.subject}
          onChange={(e) => handleFieldChange("subject", e.target.value)}
        />
      </div>

      <div className="editor-field">
        <label>Initial Delay (days)</label>
        <input
          type="number"
          min="0"
          value={editedStep.delayDays}
          onChange={(e) =>
            handleFieldChange("delayDays", parseInt(e.target.value) || 0)
          }
        />
      </div>

      <div className="editor-field">
        <label>Email Content</label>
        <textarea
          value={editedStep.content}
          onChange={(e) => handleFieldChange("content", e.target.value)}
          rows={6}
        />
      </div>

      <div className="action-rules">
        <h4>Action Rules</h4>
        {editedStep.nextActions.map((actionRule) => (
          <div key={actionRule.action} className="action-rule">
            <div className="action-label">
              If user <strong>{actionRule.action}</strong>:
            </div>

            <div className="action-controls">
              <label>Next Step</label>
              <select
                value={actionRule.nextStepId || ""}
                onChange={(e) =>
                  handleActionChange(
                    actionRule.action,
                    "nextStepId",
                    e.target.value || null
                  )
                }
              >
                <option value="">End Sequence</option>
                {allSteps
                  .filter((s) => s.id !== editedStep.id) // Can't point to self
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.subject}
                    </option>
                  ))}
              </select>

              <label>Additional Delay (days)</label>
              <input
                type="number"
                min="0"
                value={actionRule.additionalDelayDays || 0}
                onChange={(e) =>
                  handleActionChange(
                    actionRule.action,
                    "additionalDelayDays",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepEditor;
