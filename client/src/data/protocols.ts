export interface Protocol {
  name: string;
  displayName: string;
  description: string;
  icon: string;
}

export const protocols: Protocol[] = [
  {
    name: 'smb',
    displayName: 'SMB',
    description: 'Server Message Block protocol for file and printer sharing on Windows networks',
    icon: 'fa-server'
  },
  {
    name: 'ldap',
    displayName: 'LDAP',
    description: 'Lightweight Directory Access Protocol for accessing directory services',
    icon: 'fa-address-book'
  },
  {
    name: 'mssql',
    displayName: 'MSSQL',
    description: 'Microsoft SQL Server database protocol',
    icon: 'fa-database'
  },
  {
    name: 'winrm',
    displayName: 'WinRM',
    description: 'Windows Remote Management protocol for remote administration',
    icon: 'fa-desktop'
  },
  {
    name: 'ssh',
    displayName: 'SSH',
    description: 'Secure Shell protocol for secure remote access',
    icon: 'fa-terminal'
  }
];
