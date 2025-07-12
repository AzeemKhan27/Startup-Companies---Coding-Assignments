const activities = [];

export function storeActivity({ userId, action, device, screen }) {
  const entry = {
    userId,
    action,
    device,
    screen,
    timestamp: new Date().toISOString()
  };
  activities.push(entry);
  return entry;
}

export function getAllActivities() {
  return activities;
}
