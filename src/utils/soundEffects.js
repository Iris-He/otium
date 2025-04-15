export const createTickSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.1
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const createCompletionSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create oscillators for rich bell harmonics
  const fundamental = audioContext.createOscillator();
  const harmonic1 = audioContext.createOscillator();
  const harmonic2 = audioContext.createOscillator();

  // Create gain nodes for envelope control
  const masterGain = audioContext.createGain();
  const fundamentalGain = audioContext.createGain();
  const harmonic1Gain = audioContext.createGain();
  const harmonic2Gain = audioContext.createGain();

  // Set frequencies for bell-like sound (using temple bell harmonics)
  fundamental.frequency.value = 220; // A3
  harmonic1.frequency.value = 440; // A4 (first harmonic)
  harmonic2.frequency.value = 880; // A5 (second harmonic)

  // Use sine waves for pure tones
  fundamental.type = "sine";
  harmonic1.type = "sine";
  harmonic2.type = "sine";

  // Connect oscillators to their gain nodes
  fundamental.connect(fundamentalGain);
  harmonic1.connect(harmonic1Gain);
  harmonic2.connect(harmonic2Gain);

  // Connect all gains to master gain
  fundamentalGain.connect(masterGain);
  harmonic1Gain.connect(masterGain);
  harmonic2Gain.connect(masterGain);

  // Connect master gain to output
  masterGain.connect(audioContext.destination);

  // Set initial gains
  masterGain.gain.setValueAtTime(0, audioContext.currentTime);
  fundamentalGain.gain.setValueAtTime(0.5, audioContext.currentTime);
  harmonic1Gain.gain.setValueAtTime(0.25, audioContext.currentTime);
  harmonic2Gain.gain.setValueAtTime(0.15, audioContext.currentTime);

  // Create bell envelope
  masterGain.gain.setValueAtTime(0, audioContext.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.02);
  masterGain.gain.exponentialRampToValueAtTime(
    0.3,
    audioContext.currentTime + 0.5
  );
  masterGain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 3
  );

  // Start and stop all oscillators
  const startTime = audioContext.currentTime;
  const duration = 3;

  [fundamental, harmonic1, harmonic2].forEach((osc) => {
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};
