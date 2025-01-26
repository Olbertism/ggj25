export const bubbleData: basicDataObject = {
  title: 'The bubble',
  message: 'What is it?',
  actions: [
    {
      key: 'step-into-bubble',
      label: 'Step into the bubble',
      pointRange: [0, 0],
      effect: 'You boldly step into the bubble...',
      isBubble: true,
    },
    {
      key: 'take-measurements',
      label: 'Take measurements',
      pointRange: [0, 1],
      effect:
        'No interesting readings in temperature, humidity, air pressure, radiation. However, you feel a weird humming buzzing next to the bubble. Is this a real sound, or just in your head?',
      repeatable: true,
    },
    {
      key: 'sample-soil',
      label: 'Take soil sample next to the bubble',
      pointRange: [1, 3],
      effect:
        'You sample the soil from the crater. Nothing unusual in regards to its composition, but the crater seems shaped in a slight circular pattern',
      repeatable: true,
    },
    {
      key: 'throw-rock',
      label: 'Throw a rock into the bubble',
      pointRange: [-2, 0],
      effect:
        "The rock passes through the bubble. You don't observe any special.",
    },
    {
      key: 'heat-bubble',
      label: 'Warm up the air around the bubble',
      pointRange: [2, 3],
      effect:
        'You arrange some heaters, to increase the air temperature around the bubble. The reflective surface shows some very slight movement. You consider that the movements follows a pattern...',
      requires: ['fire-ir'],
    },
  ],
};

export const catData: basicDataObject = {
  title: 'You know you want to!',
  message: "This is Lajos. He's a cat. Better pet the cat.",
  actions: [
    {
      key: 'pet-the-cat',
      label: 'Pet the cat',
      pointRange: [0, 0],
      effect: "Lajos is happy. You're acceptable.",
    },
  ],
};

export const labRatData: basicDataObject = {
  title: 'A cage with a lab rat',
  message:
    'You were provided with a common lab rat. You could put a sensor on it and toss it into the bubble.',
  actions: [
    {
      key: 'toss-rat',
      label: 'Toss the rat into the bubble',
      pointRange: [-2, -1],
      effect:
        'The rat disappears in the bubble. The attached sensors are left behind. They show no change readings. As if nothing happened. But what about the rat?',
    },
    {
      key: 'feed-rat',
      label: 'Feed the rat',
      pointRange: [1, 2],
      effect: 'The rat is very happy about the food.',
    },
  ],
};

export const computerData: basicDataObject = {
  title: 'A computer with internet access',
  message: 'Access or send data. It is up to you.',
  actions: [
    {
      key: 'cat-videos',
      label: 'Watch cat videos. Meow!',
      pointRange: [-2, 1],
      effect: "That wasn't very useful, but a great use of your time!",
      repeatable: true,
    },
    {
      key: 'yt-videos',
      label: 'Try to find witness accounts on the internet',
      pointRange: [-2, -1],
      effect:
        "There were some promising videos, but you can't really rely on this information.",
    },
    {
      key: 'journals',
      label: 'Search through scientific journals',
      pointRange: [0, 0],
      effect:
        'Your interns already provided you with material in your journal. However, you can search for data about this place.',
      repeatable: true,
    },
    {
      key: 'leak-data',
      label: 'Leak confidential research data to the public',
      pointRange: [0, 0],
      effect:
        'You are confident, that only a wide public access of all available data will shed light on the bubble anomalies. It is hard to foresee what consequences this action has, but for now it did not bring you closer to knowledge...',
    },
    {
      key: 'get-recommendation',
      label: 'Hear recommendation of a scientist',
      pointRange: [0, 0],
      effect:
        'After you made the data available, Dr. Daniel Hanser recommends to step into the bubble AFTER you consumed a medium dosage of beta blockers. As it turns out, you do have them in this lab.',
      requires: ['leak-data'],
    },
    {
      key: 'take-beta-blockers',
      label: 'Take beta blockers',
      pointRange: [-3, -1],
      effect: 'Maybe you are now ready to step into the bubble?',
      requires: ['get-recommendation'],
    },
    {
      key: 'historical-documents',
      label: 'Search through historical documents of this place',
      pointRange: [2, 4],
      effect:
        'You hope to find more information in this place. Maybe the placement of the bubble follows a reason? However, it is hard to say what information could be relevant...',
      requires: ['journals'],
    },
  ],
};

export const cameraData: basicDataObject = {
  title: 'A camera installation which monitors the bubble 24/7',
  message:
    'The camera is continuously recording. Not only normal footage, but also infrared and thermal vision are supplied.',
  actions: [
    {
      key: 'analyze-footage',
      label: 'Analyze the footage of the last hours',
      pointRange: [-1, 1],
      effect:
        'A lot of people tried that before and learned nothing from it. You are no exception.',
    },
  ],
};

export const guardData: basicDataObject = {
  title: 'One of the security guards',
  message: 'The premise is guarded around the clock. The guards seem bored.',
  actions: [
    {
      key: 'talk-to-guard',
      label: 'Talk to the guard',
      pointRange: [0, 0],
      effect:
        'You had a nice chat about the weather and the peculiar state of the world, but nothing more.',
    },
    {
      key: 'ask-guard-opinion',
      label: 'Ask the the guard what he thinks the bubble is',
      pointRange: [-2, -1],
      effect:
        '"The devil\'s work, that is for sure. If you ask me, which should seal off these things under a sarcophagus or so. Don\'t go too near there..."',
    },
  ],
};

export const oldManData: basicDataObject = {
  title: 'The elderly man who lives next to the bubble',
  message:
    'The bubble appeared right next to the home of an elderly couple. The couple has since been quarantined to their home. Maybe they have information?',
  actions: [
    {
      key: 'ask-old-man-life',
      label: 'Ask the old man about life next to the bubble',
      pointRange: [-1, 1],
      effect:
        'The old man complains a lot about the quarantine and demands you take action to lift it as soon as possible.',
    },
    {
      key: 'ask-old-man-health',
      label: 'Ask the old man about his current wellbeing',
      pointRange: [0, 1],
      effect:
        "The old man complains that ever since that thing appeared, he is having headaches. Also his back hurts more than usual and he feels a lot more stressed. He demands his doctor, but because of the quarantine, they don't let him visit him.",
    },
    {
      key: 'ask-old-man-opinion',
      label: 'Ask the old man what he thinks the bubble is',
      pointRange: [0, 0],
      effect:
        '"Let me tell you, it is obvious to me that this is of intelligent design! There are a lot of smart people out there, that suggest that within this bubble lies a whole new realm of discovery. But you government scientists just want to keep it closed off and repeat useless measurements. Don\'t tell me you are not hiding something there!"',
    },
  ],
};

export const oldWomanData: basicDataObject = {
  title: 'The elderly woman who lives next to the bubble',
  message:
    'The bubble appeared right next to the home of an elderly couple. The couple has since been quarantined to their home. Maybe they have information?',
  actions: [
    {
      key: 'ask-old-woman-life',
      label: 'Ask the old woman about life next to the bubble',
      pointRange: [0, 0],
      effect:
        'The old woman talks a lot about her current situation. The recent events seem to have excited her.',
    },
    {
      key: 'ask-old-woman-health',
      label: 'Ask the old woman about his current wellbeing',
      pointRange: [1, 2],
      effect:
        'She surely has one or two ailments, but all in all she does not complain. You notice she wears a hearing implant.',
      leadsTo: '',
    },
    {
      key: 'ask-old-woman-opinion',
      label: 'Ask the old woman what she thinks the bubble is',
      pointRange: [1, 2],
      effect:
        'The woman does not say what she believes of the bubble. However, she mentions that ever since it appeared, she hears music in her dreams. Did you not read about this phenomena before?...',
    },
    {
      key: 'ask-old-woman-dreams',
      label: 'Ask the old woman about the dreams',
      pointRange: [2, 3],
      effect:
        'The woman mentioned a distinctive melody, that she hears in all her recent dreams. You try to memorize it as good as you can...',
      requires: ['ask-old-woman-opinion'],
    },
  ],
};

export const rayMachineData: basicDataObject = {
  title: 'A machine that emits various kinds of energy rays',
  message:
    'A particle scientist placed a machine that can shoot a ray of UV, IR or high-powered laser at the bubble. You could do that as well, and observe the outcome',
  actions: [
    {
      key: 'fire-uv',
      label: 'Activate the UV-ray',
      pointRange: [-3, -1],
      effect:
        'You expose the bubble to the UV-ray. Nothing happens and your instruments do not record any change at all.',
    },
    {
      key: 'fire-ir',
      label: 'Activate the IR-ray',
      pointRange: [1, 5],
      effect:
        'You expose the bubble to the IR-ray. The bubble does not seem to show any sign of temperature change, but there are very tiny ripple patterns where the ray hits the surface. An interesting detail...',
    },
    {
      key: 'fire-laser',
      label: 'Activate the laser',
      pointRange: [2, 4],
      effect:
        'You expose the bubble to the laser. Your instruments record a tiny ripple in the surface matter of the bubble, as the laser is turned on. This seems to mean something...',
      leadsTo: '',
    },
    {
      key: 'emit-music',
      label: 'Send music via the laser',
      pointRange: [1, 2],
      effect: '',
      requires: ['fire-laser', 'ask-old-woman-opinion'],
    },
  ],
};

export const unlockableActions = {
  'heat-bubble': {
    key: 'heat-bubble',
    label: 'Warm up the area of the bubble',
    pointRange: [1, 2],
    effect: '',
  },
  'emit-music': {
    key: 'emit-music',
    label: 'Send music via the laser',
    pointRange: [1, 2],
    effect: '',
  },
};

export interface basicDataObject {
  title: string;
  message: string;
  actions: actionObject[];
}

export interface actionObject {
  key: string;
  label: string;
  pointRange: number[];
  effect: string;
  leadsTo?: string;
  repeatable?: boolean;
  requires?: string[];
  locked?: boolean;
  isBubble?: boolean;
}

export interface journalReports {
  title: string;
  author: string;
  text: string;
}

export const journalReports: journalReports[] = [
  {
    title: 'Energy Absorption and Emission Test',
    author: 'Dr. Elias Novak',
    text: 'The anomaly continues to resist all forms of energy-based interaction. Lasers, electromagnetic pulses, and particle beams pass through the surface without effect. Inanimate probes have been sent through while emitting active energy fields, but no disruptions or measurable changes occur inside. Despite extensive testing, living organisms entering the anomaly exhibit a unique phenomenon—they disappear entirely. The significance of this selective interaction remains unexplained. It is hypothesized that the anomaly operates on a principle that differentiates between biological and non-biological entities.',
  },
  {
    title: 'Hypotheses on the Anomalies’ Selective Behavior',
    author: 'Prof. Jonathan Keller',
    text: 'The anomaly’s selective behavior towards living organisms is unprecedented. One theory suggests the spheres are designed to gather or transport biological matter while ignoring inanimate objects. This could imply a deliberate function, possibly related to experimentation, containment, or observation. Another hypothesis proposes that the anomaly’s interior exists in a state incompatible with life as we understand it, effectively displacing living matter from our reality. However, the fact that probes exit the sphere unchanged suggests this explanation is incomplete. Further data is essential to refine these theories.',
  },
  {
    title: 'The Definitive Nature of the Anomaly',
    author: 'Dr. Daniel Hanser',
    text: 'After careful reflection, I am confident in declaring the true purpose of the anomalies: they are advanced communication devices sent by an extraterrestrial civilization to establish contact with humanity. The evidence is obvious to anyone willing to look beyond the rigid confines of traditional science. The bubbles’ reflective surfaces are clearly designed to capture and analyze visual data, while their selective absorption of living matter suggests a sophisticated method of gathering biological samples for study. The absence of gravitational or thermal signatures only strengthens this conclusion—it demonstrates their superior understanding of physics and their desire to avoid disrupting Earth’s delicate ecosystems. Claims that these bubbles “defy known science” are laughable at best. They are, without a doubt, the result of intelligent design. In fact, I believe it is only a matter of time before they reveal their purpose by initiating direct communication. It is our responsibility to approach the bubbles not with fear, but with reverence and open arms. ',
  },
];

export const journalNews = [
  {
    title: 'Living in a bubble',
    text: 'A study led by Dr. Sophia Hart has revealed subtle psychological effects in individuals spending extended periods near the anomalies. Participants reported feelings of unease, recurring dreams, and a growing sense of fixation. However, no physical changes or measurable brain activity shifts were detected.',
  },
  {
    title: 'Are the Bubbles Aliens?',
    text: 'Renown theorist Dr. Daniel Hanser has once again stirred the pot with bold claims about the mysterious bubbles. “They’re clearly extraterrestrial communication devices,” he told the Daily Spark in an exclusive interview. “The fact that living beings vanish is proof they are collecting biological samples. They’re watching us—and probably preparing to make contact.” Critics have called Hanser’s theories “baseless and irresponsible,” but his ideas have sparked public fascination. “If it walks like a duck and talks lilke a duck, it is probably a duck” said one fan on social media.',
  },
  {
    title: 'What Are Governments Hiding About the Bubbles?',
    text: '[...] practically all of these bubbles are now placed in seclusion zones, with inhabitants next to them quarantined. The question arises, why governments are so anxious of granting access to the bubbles. And then there is also the involvement of the WHO, which sparks a lot of questions...',
  },
  {
    title: 'Ethics of Animal Trials Questioned: Are We Crossing a Line?',
    text: 'A growing chorus of voices from animal rights groups and ethicists is questioning the morality of sending animals into the mysterious bubbles. Since June, numerous experiments have involved various species—from rodents to larger mammals—entering the anomalies, none of which have returned. “This is reckless experimentation,” said Dr. Andrea Lutz, an animal welfare advocate. “We’re sending living beings into what is essentially a black hole. The lack of oversight is deeply troubling.” Researchers argue that animal trials are a necessary step before considering further human exploration. [..]',
  },
  {
    title: 'Are the Bubbles Multiversal Gateways?',
    text: 'In a recent paper, Dr. Lin Vu posited that the anomalies could be "quantum tears," gateways between parallel universes. “The bubbles may represent points where the quantum states of our universe intersect with others,” she wrote. Vu suggests that the disappearance of living organisms could be the result of their transfer into another dimension. “Biological entities might not survive the transition, or they might be displaced into a universe incompatible with our own laws of physics,” she explained.',
  },
  {
    title: 'Russian Scientist Claims Bubbles Are a U.S. Experiment Gone Wrong',
    text: 'Dr. Vasily Grigoryev, a physicist with ties to Russia’s space program, has made a bold and inflammatory accusation: the bubbles are the result of a classified American experiment that spiraled out of control. “We have intercepted data indicating unusual energy patterns in Nevada just hours before the bubbles appeared,” Grigoryev claimed during a press conference in Moscow. “This proves that the United States government is responsible for unleashing these anomalies on the world.” Dr. Grigoryev alleged that the anomalies were created during a high-energy particle collision experiment at a secretive U.S. military facility. “They were tampering with dimensions they didn’t understand,” he added, “and now the whole world is paying the price.”',
  },
  {
    title: 'Did the U.S. Government Open a Portal to Hell?',
    text: 'Wild theories continue to swirl as conspiracy theorists claim the bubbles are linked to secret government projects. Some allege that the anomalies are “dimensional rifts” caused by covert experiments at Area 51 or other classified locations. “This is what happens when you play God,” said self-proclaimed truth-seeker Alex Carter in a viral video. “The bubbles are portals, but not to another universe—to Hell itself! Look at the timing—natural disasters, wars, and now this. It’s all connected.” Mainstream scientists dismiss these claims as nonsense, but fail to answer the pressing questions around the bubbles.',
  },
  {
    title:
      "The Disco Bubble. Gen-Z Organizes Rave Party's Next To The Bubbles!",
    text: 'The latest hype: Rave parties right next to the bubbles. Just recently, such an event took place in the french city Lyon, where one of these bubbles appeared at a derelict industrial site. People claim that the bubble enhances their perception of music and certain substances. One party-goer even claims, he could "feel a divine presence in the music" when he dances next to the bubble.',
  },
  {
    title: 'A Global Mirror of Fear and Hope',
    text: '“The bubbles reflect our deepest fears and beliefs,” said sociologist Dr. Elena Ramirez. “For scientists, they’re a challenge to our understanding of the universe. For conspiracy theorists, they’re evidence of shadowy agendas. For the devout, they’re a message from God.” While these narratives play out, researchers stress the importance of maintaining focus. “We must approach the bubbles with open minds and a commitment to evidence,” said Dr. Sophia Hart.',
  },
];

export const journalDossiers = [
  {
    name: 'Dr. Sophia Hart',
    field: 'Theoretical Physics',
    affiliation: 'Oxford University, United Kingdom',
    background:
      'A physicist specializing in quantum mechanics and cosmology. Dr. Hart has made significant contributions to the study of high-energy particle physics and multiverse theories.',
    publications:
      'Author of several academic papers on quantum phenomena and multiverse theory.',
  },
  {
    name: 'Dr. Vasily Grigoryev',
    field: 'Experimental Physics',
    affiliation: 'Russian Academy of Sciences, Moscow',
    background:
      "Specializes in high-energy particle physics. Dr. Grigoryev considers himself an outspoken critic of Western scientific community's practices.",
    publications:
      'Known for his work on particle accelerators and energy fields.',
  },
  {
    name: 'Dr. Linh Vu',
    field: 'Quantum Physics',
    affiliation: 'California Institute of Technology, United States',
    background:
      'Known for her research in quantum mechanics and the theoretical aspects of higher-dimensional spaces. Dr. Vu has contributed to studies on the intersection of quantum mechanics and cosmology.',
    publications:
      'Contributor to research on quantum gravity and the multiverse hypothesis.',
  },
  {
    name: 'Dr. Jonathan Keller',
    field: 'Astrobiology',
    affiliation: 'Humboldt University of Berlin, Germany',
    background:
      'Dr. Keller has extensive experience in astrobiology, with a focus on the study of life in extreme environments and the search for extraterrestrial life.',
    publications:
      'Contributor to research on extremophiles and the potential for life in outer space.',
  },
  {
    name: 'Dr. Andrea Lutz',
    field: 'Bioethics',
    affiliation: 'Sorbonne University, France',
    background:
      'Dr. Lutz is a prominent figure in bioethics, particularly in the ethical implications of animal research and biotechnological advancements.',
    publications:
      'Known for work on ethical considerations surrounding animal testing and biomedical ethics.',
  },
  {
    name: 'Dr. Daniel Hanser',
    field: 'Applied Physics',
    affiliation: 'Sorbonne University, France',
    background:
      'Dr. Hanser holds a Ph.D. in Applied Physics. His research has been primarily theoretical, with a focus on unconventional ideas regarding the nature of anomalies and dimensional physics. Hanser has been criticized for disregarding scientific rigor, yet also praised as a disruptor',
    publications: 'Known for self-published works and articles.',
  },
];
