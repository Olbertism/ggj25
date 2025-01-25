export const bubbleData = {
  title: 'The bubble',
  message: 'What is it?',
  actions: [
    { key: 'step-into-bubble', label: 'Step into the bubble', pointRange: [-8, -5], effect: 'You are dead'},
    { key: 'take-measurements', label: 'Take measurements', pointRange: [1, 3], effect: 'The bubble stirs alarmingly' },
  ],
} as const;

