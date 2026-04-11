# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| Latest (`main`) | ✅ |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

If you discover a security issue, email **hello@artisancafe.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

You will receive a response within 48 hours. Please give us reasonable time to patch the issue before any public disclosure.

## Security Scope

Items in scope:
- Authentication bypass on `/admin`
- SQL injection via Supabase queries
- Cross-site scripting (XSS) in user inputs
- Exposed secrets or API keys
- Rate-limiting bypasses

Items out of scope:
- Denial of service attacks
- Issues only reproducible in non-production environments
- Missing security best practices without a demonstrated exploit
