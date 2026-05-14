---
# ============================================================
# EVIDENCE LOCKER — PROJECT ENTRY TEMPLATE
# Copy this file to: src/content/projects/your-project-name.md
# ============================================================
title: "Project Title (e.g., HTB: Forest — Active Directory Exploitation)"
date: 2024-01-15
platform: "HackTheBox"          # HackTheBox | TryHackMe | Home Lab | CTF | Client Engagement
difficulty: "Medium"            # Easy | Medium | Hard | Insane | N/A
status: "Complete"              # Complete | In Progress | Redacted
category: ["Active Directory", "Privilege Escalation"]  # Add relevant tags
cvss_score: 8.8                 # Overall/highest CVSS score encountered (omit if N/A)
tools: ["Nmap", "BloodHound", "Impacket", "Evil-WinRM"]
thumbnail: "/images/projects/forest-thumbnail.png"   # Optional cover image
featured: false                 # Set true to pin to top of Evidence Locker
---

<!--
  WRITING GUIDE
  ─────────────
  Lead every section with the business context FIRST, technical detail second.
  A recruiter who isn't technical should understand the risk.
  A technical reviewer should be impressed by the methodology.
  Write for both audiences simultaneously.
-->

## The Challenge

<!-- 
  Describe the target environment and what real-world threat scenario this simulates.
  Answer: What would happen if this were a real organisation?
-->

**Environment:** Windows Server 2019 — Active Directory domain controller with 500 simulated user accounts.

**Scenario:** This machine simulates a mid-size enterprise environment where a misconfigured service account provides an initial foothold. The threat scenario mirrors a business email compromise (BEC) attack where an external actor gains authenticated access to the internal network.

**Objective:** Obtain Domain Admin privileges and document the complete attack path, from unauthenticated external access to full domain compromise.

**Vulnerability Class:** AS-REP Roasting (CWE-522) → Kerberoasting → ACL Abuse

---

## Tools Used

| Tool | Purpose | Phase |
|---|---|---|
| `nmap` | Port scanning, service fingerprinting | Reconnaissance |
| `enum4linux-ng` | SMB/LDAP enumeration | Enumeration |
| `BloodHound + SharpHound` | AD attack path visualisation | Enumeration |
| `Impacket (GetNPUsers.py)` | AS-REP Roasting | Exploitation |
| `Hashcat` | Offline password cracking | Exploitation |
| `Evil-WinRM` | Remote shell via WinRM | Post-Exploitation |
| Custom Python script | Automated ACL abuse chain | Post-Exploitation |

> **GitHub:** All custom scripts used in this engagement are available at [`github.com/thabosibanda/scripts/forest-lab`](#) with documented usage and safety notes.

---

## Methodology

### Phase 1 — Reconnaissance

```bash
# Full port scan with service version detection
nmap -sV -sC -p- --min-rate 5000 -oN nmap/forest_full.txt 10.10.10.161
```

*Finding:* Ports 88 (Kerberos), 389 (LDAP), 445 (SMB), and 5985 (WinRM) confirmed an Active Directory environment. The open WinRM port indicated remote management was enabled — a significant attack surface if credentials could be obtained.

### Phase 2 — Enumeration

```bash
# LDAP anonymous bind — enumerate users without credentials
ldapsearch -x -H ldap://10.10.10.161 -b "DC=htb,DC=local" "(objectClass=user)"
```

*Finding:* Anonymous LDAP bind was permitted, returning a list of 30 domain user accounts. This is a misconfiguration that should never exist in a production environment. The `svc-alfresco` service account was identified with the `UF_DONT_REQUIRE_PREAUTH` flag set — making it vulnerable to AS-REP Roasting.

### Phase 3 — Exploitation

```bash
# AS-REP Roasting: request TGT without pre-authentication
python3 GetNPUsers.py htb.local/svc-alfresco -no-pass -dc-ip 10.10.10.161
```

The returned AS-REP hash was cracked offline with Hashcat in under 4 minutes using a common wordlist, yielding plaintext credentials. From there, BloodHound mapped a DCSync privilege escalation path via nested group membership and WriteDACL permissions.

### Phase 4 — Privilege Escalation to Domain Admin

The BloodHound graph revealed: `svc-alfresco` → Member of `Account Operators` → `WriteDACL` on `Exchange Windows Permissions` → **DCSync rights** on the domain.

This three-hop privilege escalation path was exploited using PowerView to grant DCSync rights, then `secretsdump.py` to extract all domain credential hashes.

### Phase 5 — Post-Exploitation & Evidence Collection

```bash
# DCSync — extract all domain hashes
python3 secretsdump.py htb.local/thabo@10.10.10.161 -just-dc
```

Domain Admin hash captured. Full domain compromise achieved. All evidence (logs, screenshots, hash files) retained for documentation.

---

## Key Findings & Business Impact

> This is the most important section. Translate technical findings into organisational risk that a non-technical executive can act on.

### Finding 1 — AS-REP Roasting via Pre-Authentication Disabled
**CVSS Score:** 7.5 (High) · **CWE-522:** Insufficiently Protected Credentials

**Technical detail:** The `svc-alfresco` service account had Kerberos pre-authentication disabled, allowing any unauthenticated user to request an encrypted ticket and crack it offline.

**Business Impact:** In a real organisation, this single misconfiguration would allow a threat actor with no credentials and no prior access to begin harvesting crackable hashes within minutes of network access. If the cracked password is reused elsewhere (common for service accounts), the blast radius expands immediately.

**Remediation:** Enable Kerberos pre-authentication on all accounts. Enforce a service account password rotation policy (90 days maximum). Monitor for AS-REP Roasting attempts via Windows Event ID 4768 with `Pre-Authentication Type: 0`.

---

### Finding 2 — Anonymous LDAP Bind Permitted
**CVSS Score:** 5.3 (Medium) · **CWE-284:** Improper Access Control

**Business Impact:** An unauthenticated attacker can enumerate all domain users, groups, and organisational units. This reconnaissance data directly enables targeted phishing campaigns and reduces attacker effort significantly — no credentials required to map the organisation's structure.

**Remediation:** Disable anonymous LDAP bind in Active Directory. Restrict LDAP queries to authenticated domain users only.

---

### Finding 3 — Privilege Escalation via ACL Abuse (DCSync)
**CVSS Score:** 8.8 (High) · **CWE-269:** Improper Privilege Management

**Business Impact:** Full domain compromise. All user credentials (including executives, IT admins, and privileged service accounts) exposed as crackable NTLM hashes. Attacker achieves persistence that survives password resets unless the AD ACL chain is remediated at the source. This is a **complete organisational security failure** scenario — equivalent to handing a threat actor the master key to every system on the network.

**Remediation:** Audit and remove unnecessary `WriteDACL`/`WriteOwner` permissions from service accounts. Implement a tiered AD administration model (Tier 0/1/2). Enable Protected Users security group for all privileged accounts. Deploy Defender for Identity to alert on DCSync activity.

---

## Lessons Learned

<!-- Reflect honestly. What did you try that didn't work? What would you do differently? -->

- BloodHound's attack path visualisation dramatically reduced the manual analysis time for the privilege escalation phase — I would deploy this in every AD engagement
- The DCSync path was non-obvious without graph analysis; manual enumeration alone might have missed it
- Next time: automate the AS-REP Roasting check as part of initial enumeration script to save time

---

## References & Further Reading

- [AS-REP Roasting — HackTricks](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/asreproast)
- [BloodHound Documentation](https://bloodhound.readthedocs.io/)
- [Microsoft: Protected Users Security Group](https://docs.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group)
- [MITRE ATT&CK: T1558.004 — AS-REP Roasting](https://attack.mitre.org/techniques/T1558/004/)
