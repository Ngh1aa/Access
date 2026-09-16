/**
 * ACCESS — Smart Hardware Reader & Credential Simulator
 * Signature Micro-Interaction: Digital Credential Crossing Physical Space
 */

(function () {
  'use strict';

  // --- 1. Personas & State Definitions ---
  const PERSONAS = {
    nghia: {
      id: 'nghia',
      name: 'Đỗ Anh Nghĩa',
      role: 'Product Designer',
      type: 'FULL-TIME EMPLOYEE',
      org: 'ACCESS HQ — Ho Chi Minh City',
      permissions: 'Floors 01–04 (All Workspaces)',
      schedule: 'Mon–Fri · 08:00–20:00',
      credentialType: 'Apple Wallet Pass (NFC + BLE)',
      tokenHex: '0x7F9A..C4E1',
      isValid: true
    },
    marcus: {
      id: 'marcus',
      name: 'Marcus Chen',
      role: 'Design Director',
      type: 'VERIFIED VISITOR',
      org: 'Figma APAC (Host: Đỗ Anh Nghĩa)',
      permissions: 'Floor 03 (Design Wing & Boardroom)',
      schedule: 'Today · 10:00–12:00',
      credentialType: 'Dynamic Browser QR Pass',
      tokenHex: '0x3E8B..9902',
      isValid: true
    },
    sarah: {
      id: 'sarah',
      name: 'Sarah Jenkins',
      role: 'Lead Network Engineer',
      type: 'CERTIFIED CONTRACTOR',
      org: 'Apex Network Infrastructure',
      permissions: 'Server Room 4B (Escorted)',
      schedule: 'Today · 13:00–15:00 (2h Window)',
      credentialType: 'High-Security Temp Token',
      tokenHex: '0xA104..5D3F',
      isValid: true
    },
    alex: {
      id: 'alex',
      name: 'Alex Rivera',
      role: 'Former Account Exec',
      type: 'OFFBOARDED / DE-PROVISIONED',
      org: 'Workday SCIM Sync Revoked',
      permissions: 'REVOKED (No Active Access)',
      schedule: 'Expired yesterday at 17:00',
      credentialType: 'Revoked Mobile Keycard',
      tokenHex: '0x0000..DEAD',
      isValid: false
    }
  };

  let activePersona = PERSONAS.nghia;
  let isSimulating = false;
  let isLockdown = false;
  let soundEnabled = true;

  // --- 2. Web Audio API Synthetic Chimes ---
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(type) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      if (type === 'granted') {
        // Dual harmonic pleasant chime
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now + 0.08);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.55);
      } else if (type === 'denied') {
        // Double low buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'lockdown') {
        // Warble alarm siren
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(400, now + 0.25);
        osc.frequency.linearRampToValueAtTime(800, now + 0.5);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  // --- 3. DOM Elements ---
  const readerUnit = document.getElementById('smartReaderUnit');
  const doorStrikeDisplay = document.getElementById('doorStrikeDisplay');
  const doorStrikeDot = document.getElementById('doorStrikeDot');
  const doorStrikeStatus = document.getElementById('doorStrikeStatus');
  const terminalLog = document.getElementById('simTerminalLog');
  const personaTabs = document.querySelectorAll('[data-persona]');

  // Credential View Elements
  const credName = document.getElementById('credUserName');
  const credRole = document.getElementById('credUserRole');
  const credType = document.getElementById('credChipType');
  const credFloor = document.getElementById('credDetailFloor');
  const credSchedule = document.getElementById('credDetailSchedule');
  const credToken = document.getElementById('credDetailToken');

  function appendLog(msg, type = 'info') {
    if (!terminalLog) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = `[${timeStr}] ${msg}`;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }

  function updateCredentialView() {
    if (!credName) return;
    credName.textContent = activePersona.name;
    if (credRole) credRole.textContent = `${activePersona.role} · ${activePersona.org}`;
    if (credType) {
      credType.textContent = activePersona.type;
      credType.style.color = activePersona.isValid ? 'var(--ice-400)' : 'var(--signal-denied)';
    }
    if (credFloor) credFloor.textContent = activePersona.permissions;
    if (credSchedule) credSchedule.textContent = activePersona.schedule;
    if (credToken) credToken.textContent = activePersona.tokenHex;
  }

  function setReaderState(stateClass) {
    if (!readerUnit) return;
    readerUnit.classList.remove('state-idle', 'state-detecting', 'state-granted', 'state-denied', 'state-lockdown');
    readerUnit.classList.add(stateClass);
  }

  function setDoorStrike(status) {
    if (!doorStrikeDisplay || !doorStrikeDot || !doorStrikeStatus) return;
    doorStrikeDot.className = 'door-strike-indicator';
    if (status === 'UNLOCKED') {
      doorStrikeDot.classList.add('unlocked');
      doorStrikeStatus.textContent = 'LATCH RELEASED · 5 SEC';
      doorStrikeStatus.style.color = 'var(--signal-granted)';
    } else if (status === 'LOCKDOWN') {
      doorStrikeDot.classList.add('lockdown');
      doorStrikeStatus.textContent = 'EMERGENCY SEALED';
      doorStrikeStatus.style.color = 'var(--signal-denied)';
    } else {
      doorStrikeDot.classList.add('locked');
      doorStrikeStatus.textContent = 'SECURED & ARMED';
      doorStrikeStatus.style.color = 'var(--text-dark-secondary)';
    }
  }

  // --- 4. Simulation Engine ---
  function runUnlockSequence(method = 'TAP') {
    if (isSimulating) return;
    if (isLockdown) {
      appendLog(`ACCESS_BLOCKED: Site in Emergency Lockdown state. All unlocks rejected.`, 'denied');
      setReaderState('state-lockdown');
      playTone('denied');
      return;
    }

    isSimulating = true;
    appendLog(`SIGNAL_DETECT: ${method} from '${activePersona.name}' (${activePersona.credentialType})`);
    setReaderState('state-detecting');

    // Step 1: Crypto handshake
    setTimeout(() => {
      appendLog(`CRYPTO_EXCHANGE: Validating token ${activePersona.tokenHex} with local controller mesh...`);

      // Step 2: Validation result
      setTimeout(() => {
        if (activePersona.isValid) {
          setReaderState('state-granted');
          setDoorStrike('UNLOCKED');
          playTone('granted');
          appendLog(`ACCESS_GRANTED: ID verified. Permission: ${activePersona.permissions}. Door relay triggered.`, 'success');

          // Auto-reset after 4.5 seconds
          setTimeout(() => {
            setReaderState('state-idle');
            setDoorStrike('LOCKED');
            appendLog(`RELAY_LATCH: Magnetic lock re-engaged. System armed.`);
            isSimulating = false;
          }, 4500);
        } else {
          setReaderState('state-denied');
          setDoorStrike('LOCKED');
          playTone('denied');
          appendLog(`ACCESS_DENIED: Policy check failed! Status: ${activePersona.type}. Security event logged.`, 'denied');

          setTimeout(() => {
            setReaderState('state-idle');
            isSimulating = false;
          }, 2500);
        }
      }, 450);
    }, 400);
  }

  function triggerEmergencyLockdown() {
    isLockdown = !isLockdown;
    const btn = document.getElementById('btnTriggerLockdown');

    if (isLockdown) {
      setReaderState('state-lockdown');
      setDoorStrike('LOCKDOWN');
      playTone('lockdown');
      appendLog(`CRITICAL_ALERT: Site-wide Emergency Lockdown initiated by Security Admin.`, 'denied');
      appendLog(`LOCKDOWN_ACTIVE: All 48 readers switched to SECURED_ISOLATION.`, 'denied');
      if (btn) btn.innerHTML = `<span>Release Site Lockdown</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    } else {
      setReaderState('state-idle');
      setDoorStrike('LOCKED');
      appendLog(`LOCKDOWN_CLEARED: Lockdown released. All perimeter and floor readers restored to ARMED.`, 'success');
      if (btn) btn.innerHTML = `<span>Simulate Site Lockdown</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    }
  }

  // --- 5. Event Listeners ---
  personaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const personaKey = tab.getAttribute('data-persona');
      if (PERSONAS[personaKey]) {
        personaTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activePersona = PERSONAS[personaKey];
        updateCredentialView();
        appendLog(`PERSONA_SWITCH: Active credential set to '${activePersona.name}' (${activePersona.type})`);
      }
    });
  });

  const btnTap = document.getElementById('btnTriggerTap');
  if (btnTap) btnTap.addEventListener('click', () => runUnlockSequence('NFC_TAP'));

  const btnWave = document.getElementById('btnTriggerWave');
  if (btnWave) btnWave.addEventListener('click', () => runUnlockSequence('BLE_WAVE_INTENT'));

  const btnRemote = document.getElementById('btnTriggerRemote');
  if (btnRemote) btnRemote.addEventListener('click', () => runUnlockSequence('CLOUD_REMOTE_UNLOCK'));

  const btnLockdown = document.getElementById('btnTriggerLockdown');
  if (btnLockdown) btnLockdown.addEventListener('click', triggerEmergencyLockdown);

  const btnSoundToggle = document.getElementById('btnSoundToggle');
  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSoundToggle.textContent = soundEnabled ? 'Sound: ON' : 'Sound: MUTE';
      btnSoundToggle.classList.toggle('muted', !soundEnabled);
    });
  }

  // Initialize
  updateCredentialView();
  setReaderState('state-idle');
  setDoorStrike('LOCKED');
  appendLog(`SYSTEM_INITIALIZED: ACCESS Cloud Controller Online (Firmware v4.8.2-prod).`);
  appendLog(`READY: Approach with mobile credential or click triggers below.`);

  // Expose on window for external triggers
  window.AccessSimulator = {
    runUnlockSequence,
    triggerEmergencyLockdown,
    setPersona: (key) => {
      if (PERSONAS[key]) {
        activePersona = PERSONAS[key];
        updateCredentialView();
      }
    }
  };

})();
