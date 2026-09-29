# ACCESS Round 01 — Decision Log

## D-01 — Permission model must stay legible across employee, visitor and admin journeys

- **Current decision:** Represent access as `person → identity → credential → place → permission`, with lifecycle states visible across product pages.
- **Evidence state:** `WORKING_PROTOTYPE + HYPOTHESIS`
- **Risk:** The conceptual model may be internally coherent but not obvious to first-time users.
- **Evidence that could change it:** Participants repeatedly misattribute denial/expiry to the wrong layer or cannot identify where to recover access.
- **Next evidence:** Tasks 1–2.

## D-02 — Status meaning cannot depend on color

- **Current decision:** Granted, denied, expired, lockdown and degraded states use text/structure in addition to semantic color.
- **Evidence state:** `WORKING_PROTOTYPE + ACCESSIBILITY_TARGET`
- **Risk:** Labels may still be too technical or visually secondary.
- **Evidence that could change it:** Participants fail to distinguish states without relying on hue or misread severity/consequence.
- **Next evidence:** Tasks 1–3.

## D-03 — Recovery should preserve least privilege

- **Current decision:** Expired/denied/unconfirmed states should offer a recovery path without silently broadening permission scope.
- **Evidence state:** `HYPOTHESIS + WORKING_STATE_SET`
- **Risk:** Recovery may feel slower than broad re-granting, especially under visitor/emergency pressure.
- **Evidence that could change it:** Participants consistently choose broader access because the intended recovery path is unclear or unavailable.
- **Next evidence:** Tasks 1–3.

## D-04 — Failed demo request preserves user input and blocks duplicate submission

- **Current decision:** Validation is inline; loading disables duplicate submit; a simulated network error preserves fields; retry completes with the same values.
- **Evidence state:** `WORKING_PROTOTYPE` via `demo-state-lab.html`; comprehension remains unvalidated.
- **Risk:** Users may still assume the first request succeeded or may not understand whether retry duplicates a request.
- **Evidence that could change it:** Participants re-enter data unnecessarily, abandon because state is ambiguous, or interpret error as a completed booking.
- **Next evidence:** Task 4.

## Update rule

Only promote evidence state when session/evidence IDs exist. Any changed interaction is an iteration until the same task is retested.
