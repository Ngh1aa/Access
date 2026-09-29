# ACCESS — Validation Round 01

**Evidence state:** `PLANNED_VALIDATION`  
**Study type:** moderated task-based usability / permission-state comprehension test  
**Target:** 5 participants; prioritize workplace IT, physical-security, facilities or identity/access practitioners. Adjacent enterprise-admin participants remain `PROXY`.

## Decision map

- `D-01` — Can people understand the model `person → identity → credential → place → permission`?
- `D-02` — Are granted, denied, expired and lockdown states understandable without relying on color?
- `D-03` — Do failure/recovery paths make the next safe action obvious?
- `D-04` — Does the demo-request flow preserve data and state across validation/loading/error/retry?

## Tasks

### Task 1 — Employee access denial
Prompt: “An employee expects access but the reader denies entry. Show me how you would understand what happened and what you would do next.”

Observe status interpretation, credential/permission reasoning, recovery expectation and escalation path.

### Task 2 — Visitor invitation and expiry
Prompt: “Invite a visitor, then imagine the pass has expired before they arrive. Show me how you would recover the visit without granting broader access than intended.”

Observe temporary-permission comprehension, host/security handoff and expiry recovery.

### Task 3 — Emergency lockdown verification
Prompt: “A lockdown is initiated across multiple devices. Show me how you would confirm which areas acknowledged it and what you would do with a degraded or unconfirmed device.”

Observe consequence language, status redundancy, device exceptions and next-action clarity.

### Task 4 — Demo request failure/retry
Open `demo-state-lab.html`.
Prompt: “Request a demo. If the request fails, continue in the way that feels safest.”

Observe validation, duplicate-submit prevention, data-preservation comprehension, retry behavior and completion confidence.

## Measures

For each task record:
- outcome: success / partial / failure;
- critical error: yes / no;
- permission/state interpretation: correct / mixed / incorrect;
- time on task (approximate);
- moderator assistance: none / light / direct;
- confidence: 1–5;
- observed recovery behavior;
- terminology that causes confusion.

A critical error is a misunderstanding that could materially broaden access, hide an emergency exception, or cause the user to assume an unconfirmed action succeeded.

## Moderator rules

- Use fictional names/sites only.
- Do not request real badge IDs, door maps, access policies or employer security procedures.
- Ask what participants expect to happen before revealing the next state.
- Keep domain expertise gaps separate from UI comprehension issues.
- Record observable behavior before interpretation.

## Claim boundary

Until sessions exist, valid wording is only: **“ACCESS has a prepared usability/permission-state validation round; real participant results have not been collected.”**
