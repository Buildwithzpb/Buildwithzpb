export const Session={started:new Date().toISOString(),calculations:0};
export function incrementCalculations(){Session.calculations++;return Session.calculations;}
