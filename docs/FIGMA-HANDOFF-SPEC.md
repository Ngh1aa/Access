# ACCESS — Figma System + Handoff Spec

**Status:** source-backed implementation contract derived from the working prototype and design documentation. This does **not** assert that the current Figma file already contains every page/state below.

## 00 — Cover / Prototype Guide

Primary review task:
**employee credential → reader state → denial/recovery → visitor temporary access → lockdown exception → demo failure/retry**.

Link:
- live prototype;
- `demo-state-lab.html`;
- case study;
- evidence status: `PLANNED_VALIDATION` until real sessions exist.

## 01 — Product Context

Frame:
- product model: person → identity → credential → place → permission;
- employee goal: routine access without ceremony;
- security/admin goal: inspectable permission, expiry and revocation;
- enterprise goal: connect identity lifecycle to physical access;
- critical tension: frictionless entry vs explicit security control;
- project reality: simulated hardware/identity/integration behavior.

## 02 — Research / Assumptions

Separate visually:
- domain/product assumptions;
- desk/reference evidence;
- `PLANNED_VALIDATION` Round 01;
- DIRECT_USER / PROXY evidence, empty until sessions exist.

Do not present security/compliance/SLA/conversion claims as measured outcomes unless source-backed.

## 03 — User Flows

Required flows:
1. employee wallet credential → reader → granted entry;
2. denial → inspect reason → safe recovery/escalation;
3. visitor invitation → verification → QR pass → expiry → recovery;
4. offboarding → identity change → credential revocation → denied access;
5. lockdown → device acknowledgments → degraded/unconfirmed device handling;
6. demo request → validation → loading → failure → preserved data → retry → success.

Mark which actions broaden, revoke or preserve permission scope.

## 04 — Information Architecture

Map:
- Overview;
- Access Control;
- Mobile Access;
- Visitor Security;
- Enterprise / multi-site governance;
- Integrations;
- Demo / buyer qualification.

Show object relationships:
`Person / Visitor · Identity · Credential · Site · Zone · Door/Reader · Permission · Event/Audit`.

## 05 — Wireframes

Grayscale only. Include:
- employee routine access;
- denied state + recovery;
- visitor expiry;
- emergency lockdown + unconfirmed device;
- demo form validation/loading/error/retry;
- mobile adaptation.

## 06 — Explorations / Decisions

Document:
- invisible/frictionless access vs explicit permission feedback;
- global access vs scoped zone/time permission;
- automatic revocation vs manual exception;
- hospitality vs visitor security;
- one global emergency state vs per-device acknowledgment;
- failed request: reset form vs preserve values + retry.

Each selected direction should show the downside and at least one rejected alternative.

## 07 — Design System

### Foundations
- typography and mono/system-status roles;
- light/dark surface tokens if both are used;
- semantic granted/denied/expired/warning/lockdown/degraded tokens;
- spacing/grid/breakpoints;
- icon rules;
- focus and keyboard states;
- motion/easing rules.

### Components
- navigation;
- credential card/pass;
- reader/device panel;
- site/zone/door row;
- permission badge;
- status/acknowledgment indicator;
- visitor pass;
- form input/select;
- modal/drawer;
- toast;
- table/list;
- recovery/error banner;
- loading/success confirmation.

### States
Where applicable:
`default · hover · focus · pressed · disabled · loading · granted · denied · expired · revoked · offline · degraded · unconfirmed · lockdown · error · retry · success`.

Every safety-critical state needs text/structure beyond color.

## 08 — Final Screens

Group by task:
- enter;
- administer permission;
- invite temporary access;
- revoke/offboard;
- respond to emergency;
- recover from failure;
- qualify/request demo.

Do not organize final screens as a gallery detached from permission lifecycle.

## 09 — Prototype

Prototype at minimum:
- routine granted entry;
- denied/recovery;
- visitor expiry recovery;
- lockdown with one degraded/unconfirmed device;
- demo request validation/loading/error/retry/success.

The reviewer should be able to intentionally reach non-happy-path states.

## 10 — Handoff / Specs

Document:
- breakpoints and responsive transformations;
- permission inheritance/scope rules represented by the UI;
- long names/site labels and truncation;
- credential expiry/revocation copy;
- reader offline/degraded behavior;
- lockdown acknowledgment semantics;
- form validation and focus management;
- loading/duplicate-submit prevention;
- retry/idempotency concern;
- keyboard/focus behavior;
- reduced-motion handling;
- implementation boundaries: production NFC/BLE, SCIM/IdP, access-control hardware, audit backend, role/permission service, security/compliance review.

## Review gate

Reviewer-ready means the Figma file explains the **permission/state system**, not just polished marketing pages. A reviewer should see how routine, denied, expired, revoked, degraded and emergency states behave and how the design maps to the implemented prototype.
