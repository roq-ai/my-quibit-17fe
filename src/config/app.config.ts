interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Student'],
  tenantRoles: ['Administrator', 'Teacher'],
  tenantName: 'Organization',
  applicationName: 'My Quibit',
  addOns: ['chat', 'notifications', 'file'],
};
