// Enum for incident status, equivalent to the C# enum
export const IncidentStatus = {
  ACTIVE: 'Active',
  CONFIRMED: 'Confirmed',
  FALSE: 'False',
  PENDING: 'Pending',
  UNKNOWN: 'Unknown',
} as const;

export type IncidentStatusType = typeof IncidentStatus[keyof typeof IncidentStatus];
