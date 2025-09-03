import type { ConsentType } from "../@types/data-subject.interface.js";

const consentDisplayName: Record<ConsentType, string> = {
  "MARKETING": "Marketing Communications",
  "SERVICE": "Service Improvement",
  "LEGAL": "Legal Compliance",
  "CONTRACT": "Contract Fulfillment",
  "ANALYTICS": "Analytics and Research"
};

export const getConsentDisplayName = (consentType: ConsentType) => {
  return consentDisplayName[consentType];
};
