// Web Audio API Ambient Celestial Sound Engine
let audioCtx: AudioContext | null = null;

export function playHarmonicChime(freq: number = 528) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1.2);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 4.0);
  } catch (e) {
    console.error("Audio WebAPI exception", e);
  }
}

