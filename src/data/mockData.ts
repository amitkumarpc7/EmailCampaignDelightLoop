
import type { EmailCampaign } from "../types";

export const mockCampaigns: EmailCampaign[] = [
  {
    id: "campaign-1",
    name: "Welcome Series",
    description: "A 3-part welcome series for new users",
    entryStepId: "step-1",
    steps: [
      {
        id: "step-1",
        subject: "Welcome to our service!",
        content:
          "<p>Thanks for signing up! Here are some tips to get started...</p>",
        delayDays: 0,
        nextActions: [
          { action: "open", nextStepId: "step-2", additionalDelayDays: 2 },
          { action: "click", nextStepId: "step-3", additionalDelayDays: 1 },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: "step-2", additionalDelayDays: 3 },
        ],
      },
      {
        id: "step-2",
        subject: "Getting the most out of our service",
        content: "<p>Here are some advanced features you might like...</p>",
        delayDays: 2,
        nextActions: [
          { action: "open", nextStepId: "step-3", additionalDelayDays: 3 },
          { action: "click", nextStepId: null },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: "step-3", additionalDelayDays: 5 },
        ],
      },
      {
        id: "step-3",
        subject: "Special offer just for you",
        content: "<p>As a thank you, here's a 10% discount...</p>",
        delayDays: 5,
        nextActions: [
          { action: "open", nextStepId: null },
          { action: "click", nextStepId: null },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: null },
        ],
      },
    ],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: "campaign-2",
    name: "Abandoned Cart",
    description: "Follow-up emails for abandoned carts",
    entryStepId: "step-4",
    steps: [
      {
        id: "step-4",
        subject: "Forgot something?",
        content: "<p>Your cart is waiting for you...</p>",
        delayDays: 1,
        nextActions: [
          { action: "open", nextStepId: "step-5", additionalDelayDays: 1 },
          { action: "click", nextStepId: null },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: "step-5", additionalDelayDays: 2 },
        ],
      },
      {
        id: "step-5",
        subject: "Special discount for your cart",
        content: "<p>Here's 15% off to complete your purchase...</p>",
        delayDays: 2,
        nextActions: [
          { action: "open", nextStepId: "step-6", additionalDelayDays: 2 },
          { action: "click", nextStepId: null },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: "step-6", additionalDelayDays: 3 },
        ],
      },
      {
        id: "step-6",
        subject: "Last chance for your items",
        content: "<p>Your cart will expire soon...</p>",
        delayDays: 3,
        nextActions: [
          { action: "open", nextStepId: null },
          { action: "click", nextStepId: null },
          { action: "purchase", nextStepId: null },
          { action: "idle", nextStepId: null },
        ],
      },
    ],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-15"),
  },
];
