import { AudioContext } from "react-native-audio-api";

const context = new AudioContext();

const decodeAudioData = async (context:any, arrayBuffer:any) => {
  return await context.decodeAudioData(arrayBuffer);
};

const fetchAudioData = async (url:any) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
};

const play = (context:any, audioBuffer:any) => {
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);

  source.start();
};

export const playSound = async (url: any) => {
  try {
    const arrayBuffer = await fetchAudioData(url);
    const audioBuffer = await decodeAudioData(context, arrayBuffer);
    play(context, audioBuffer);
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};