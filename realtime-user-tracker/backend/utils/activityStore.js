const activities = [];

const VALID_ACTIONS = ["login", "logout", "page_view", "click"];

export function storeActivity({ userId, action, device, screen }) {
  const entry = {
    id: activities.length + 1,
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

export { VALID_ACTIONS };
