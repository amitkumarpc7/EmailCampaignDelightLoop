// types.ts
export type UserAction = "open" | "click" | "purchase" | "idle" | "none";

export interface EmailStep {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
  nextActions: {
    action: UserAction;
    nextStepId: string | null; // null means end of sequence
    additionalDelayDays?: number;
  }[];
}

export interface EmailCampaign {
  id: string;
  name: string;
  description: string;
  entryStepId: string;
  steps: EmailStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignNode {
  id: string;
  type: "step" | "action";
  data: EmailStep | { action: UserAction };
  position: { x: number; y: number };
  parentId: string | null;
}

export interface CampaignEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}
