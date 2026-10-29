export interface SectionFolderTheme {
  id: string;
  folderColor: string;
  glowColor: string;
  accentRgb: [number, number, number];
  badgeText: string;
  caption: string;
  label: string;
}

export const sectionThemes: Record<string, SectionFolderTheme> = {
  about: {
    id: 'about',
    folderColor: '#00F5A0',
    glowColor: '#00F5A0',
    accentRgb: [0, 245, 160],
    badgeText: '01 / ABOUT ME',
    caption: 'THE HUMAN BEHIND THE SYSTEMS',
    label: 'ABOUT ME'
  },
  experience: {
    id: 'experience',
    folderColor: '#FF9F43',
    glowColor: '#FF9F43',
    accentRgb: [255, 159, 67],
    badgeText: '02 / EXPERIENCE',
    caption: 'SERVICE / EDUCATION / MAKING',
    label: 'EXPERIENCE'
  },
  education: {
    id: 'education',
    folderColor: '#00D2D3',
    glowColor: '#00D2D3',
    accentRgb: [0, 210, 211],
    badgeText: '03 / EDUCATION',
    caption: 'LEARNING THROUGH MOVEMENT',
    label: 'EDUCATION'
  },
  projects: {
    id: 'projects',
    folderColor: '#3867D6',
    glowColor: '#3867D6',
    accentRgb: [56, 103, 214],
    badgeText: '04 / PROJECTS',
    caption: 'SELECTED WORK / OPEN EXPLORATIONS',
    label: 'PROJECTS'
  },
  skills: {
    id: 'skills',
    folderColor: '#A55EEA',
    glowColor: '#A55EEA',
    accentRgb: [165, 94, 234],
    badgeText: '05 / SKILLS',
    caption: 'TOOLS, CONNECTED TO PRACTICE',
    label: 'SKILLS'
  },
  contact: {
    id: 'contact',
    folderColor: '#B9C4D0',
    glowColor: '#F5F6FA',
    accentRgb: [245, 246, 250],
    badgeText: '06 / CONTACT',
    caption: 'THE NEXT CONVERSATION',
    label: 'CONTACT'
  }
};
