import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import type {Node, Edge} from "reactflow";
import "reactflow/dist/style.css";
import type { EmailCampaign, EmailStep, UserAction } from "../types";
import "../styles/CampaignFlow.css";

interface CampaignFlowProps {
  campaign: EmailCampaign;
  onSelectStep: (step: EmailStep) => void;
  selectedStepId: string | null;
}

const CampaignFlow: React.FC<CampaignFlowProps> = ({
  campaign,
  onSelectStep,
  selectedStepId,
}) => {
  const getNodes = (): Node[] => {
    return campaign.steps.map((step) => ({
      id: step.id,
      type: "step",
      data: {
        label: (
          <div
            className={`flow-step ${
              selectedStepId === step.id ? "selected" : ""
            }`}
            onClick={() => onSelectStep(step)}
          >
            <div className="step-subject">{step.subject}</div>
            <div className="step-delay">Delay: {step.delayDays} days</div>
          </div>
        ),
      },
      position: { x: 0, y: 0 }, // Will be calculated by layout
    }));
  };

  const getEdges = (): Edge[] => {
    const edges: Edge[] = [];

    campaign.steps.forEach((step) => {
      step.nextActions.forEach((action) => {
        if (action.nextStepId) {
          edges.push({
            id: `${step.id}-${action.nextStepId}-${action.action}`,
            source: step.id,
            target: action.nextStepId,
            label: action.action.toUpperCase(),
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: {
              stroke: getActionColor(action.action),
            },
            labelStyle: {
              fill: getActionColor(action.action),
              fontWeight: 700,
            },
          });
        }
      });
    });

    return edges;
  };

  const getActionColor = (action: UserAction): string => {
    switch (action) {
      case "open":
        return "#4CAF50";
      case "click":
        return "#2196F3";
      case "purchase":
        return "#9C27B0";
      case "idle":
        return "#FF9800";
      default:
        return "#607D8B";
    }
  };

  return (
    <div className="flow-diagram">
      <ReactFlowProvider>
        <ReactFlow
          nodes={getNodes()}
          edges={getEdges()}
          fitView
          nodesDraggable={true}
          nodesConnectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default CampaignFlow;
