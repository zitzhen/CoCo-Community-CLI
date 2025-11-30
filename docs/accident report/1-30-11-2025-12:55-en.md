# 1-30-11-2025-12:55 Incident Report
Time: November 30, 2025 12:55 (UTC+8)

This report also has: [简体中文](1-30-11-2025-12:55-zh-cn.md) [繁體中文](1-30-11-2025-12:55-zh-Hant.md) [廣東話（粵語）](1-30-11-2025-12:55-zh-hk.md)

> [!WARNING]
>This version contains an AI-translated version, which may not have been rigorously reviewed by humans.
## Event Overview

Starting from 12:55 on November 30, 2025, CoCo-Community-CLI began to be affected. After updating the CLI, users found that the new features did not work properly.

## Troubleshooting results

- The version numbers released are all correct

- Users can pull updates normally

- The published source code itself is correct

## Cause of the problem:
When testing locally, we only executed:

```bash
tsc index.ts
node index.js
```

Doing a quick test without executing the full build process. Therefore, the package published to npm still contains the old version of the build file, resulting in users unable to get the latest features when installing.

## Measures taken

In version 0.1.1, the full build process has been re-executed and released

Fixed the entry and dist file of the CLI package to ensure that users can obtain updates correctly.

Affected versions

- 0.0.2

- 0.0.3

- 0.1.0