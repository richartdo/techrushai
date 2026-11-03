export function canAccessUserRecord(actorId, recordOwnerId) { return Boolean(actorId) && actorId === recordOwnerId; }
