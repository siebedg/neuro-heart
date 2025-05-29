import { AudioContext, OscillatorNode, GainNode } from 'react-native-audio-api';
import { getAudioContext } from './audioContext';

let audioContext: AudioContext | null = null;
let leftOscillator: OscillatorNode | null = null;
let rightOscillator: OscillatorNode | null = null;
let leftGain: GainNode | null = null;
let rightGain: GainNode | null = null;

/**
 * Start binaural beats with specified base frequency and beat frequency.
 * @param baseFrequency - The base frequency in Hz (e.g., 220)
 * @param beatFrequency - The beat frequency in Hz (e.g., 10 for alpha waves)
 */
export function startBinauralBeats(baseFrequency: number, beatFrequency: number) {
  if (!audioContext) {
    audioContext = getAudioContext();
  }

  stopBinauralBeats(); // 🔁 fix: altijd eerst stoppen en resetten

  // Create oscillators for left and right ears
  leftOscillator = audioContext.createOscillator();
  rightOscillator = audioContext.createOscillator();

  // Set frequencies
  leftOscillator.frequency.value = baseFrequency;
  rightOscillator.frequency.value = baseFrequency + beatFrequency;

  // Create gain nodes for volume control
  leftGain = audioContext.createGain();
  rightGain = audioContext.createGain();

  // Set gain values
  leftGain.gain.value = 0.5;
  rightGain.gain.value = 0.5;

  // Connect oscillators to gain nodes
  leftOscillator.connect(leftGain);
  rightOscillator.connect(rightGain);

  // Connect gain nodes to audio context destination
  leftGain.connect(audioContext.destination);
  rightGain.connect(audioContext.destination);

  // Start oscillators
  leftOscillator.start();
  rightOscillator.start();
}

/**
 * Stop the binaural beats.
 */
export function stopBinauralBeats() {
  if (leftOscillator) {
    leftOscillator.stop();
    leftOscillator.disconnect();
    leftOscillator = null;
  }

  if (rightOscillator) {
    rightOscillator.stop();
    rightOscillator.disconnect();
    rightOscillator = null;
  }

  if (leftGain) {
    leftGain.disconnect();
    leftGain = null;
  }

  if (rightGain) {
    rightGain.disconnect();
    rightGain = null;
  }
}