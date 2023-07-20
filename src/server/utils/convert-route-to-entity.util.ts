const mapping: Record<string, string> = {
  answers: 'answer',
  organizations: 'organization',
  problems: 'problem',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
