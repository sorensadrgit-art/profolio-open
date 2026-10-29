import { resumeSections } from '../resumeData.ts';
import { projects, skillLinks, githubUrl, splineUrl } from '../explorerData.ts';

export interface BentoItemConfig {
  id: string;
  colSpan?: number;
  rowSpan?: number;
  visual?: string;
  title?: string;
  description?: string;
  label?: string;
  tag?: string;
  badge?: string;
  contentKind?: string;
  href?: string;
  actionText?: string;
}

export interface PaperManifestItem {
  id: string;
  sectionId: string;
  number: string;
  title: string;
  subtitle: string;
  excerpt: string;
  docTag: string;
  href?: string;
  isPending?: boolean;
  hasInteractiveAnatomy?: boolean;
  hasMotionDemo?: boolean;
  hasSystemStudy?: boolean;
  hasStepprStudy?: boolean;
  hasResumeStudy?: boolean;
  hasBiomechLab?: boolean;
  hasSkillsWorkbench?: boolean;
  initialProject?: string;
  bentoItems: BentoItemConfig[];
}

export const paperManifest: Record<string, PaperManifestItem[]> = {
  about: [
    {
      id: 'background',
      sectionId: 'about',
      number: '01',
      title: 'Background',
      subtitle: 'Physical Therapy & Digital Craft',
      excerpt: resumeSections[0].blocks[0].value,
      docTag: 'DOC 01-A',
      bentoItems: [
        {
          id: 'bg-kicker',
          colSpan: 1,
          rowSpan: 1,
          label: '01 / IDENTITY',
          title: 'Student PT & Developer',
          description: 'Arcadia University DPT student bridging human movement analysis with tactile software.',
          tag: 'PROFILE'
        },
        {
          id: 'bg-discipline',
          colSpan: 1,
          rowSpan: 1,
          label: 'HYBRID FORMAT',
          title: 'Two Disciplines',
          description: 'Rigorous clinical coursework informed by continuous creative engineering.',
          tag: 'ACADEMIC'
        },
        {
          id: 'bg-film',
          colSpan: 2,
          rowSpan: 2,
          label: 'STUDIO TELEMETRY',
          title: 'Human Behind The Systems',
          description: 'Exploring human movement, kinetic systems, and immersive web design.',
          contentKind: 'about-film'
        },
        {
          id: 'bg-story',
          colSpan: 2,
          rowSpan: 2,
          label: 'PRIMARY NARRATIVE',
          title: 'My Background',
          description: resumeSections[0].blocks[0].value,
          contentKind: 'quote'
        },
        {
          id: 'bg-link-edu',
          colSpan: 1,
          rowSpan: 1,
          label: 'NAVIGATION',
          title: 'Clinical Education',
          description: 'See coursework in movement assessment and anatomy.',
          actionText: 'Explore education ↗'
        },
        {
          id: 'bg-credit',
          colSpan: 1,
          rowSpan: 1,
          label: 'STUDY ATTRIBUTION',
          title: 'BodyParts3D Data',
          description: 'Simplified study geometry under CC BY 4.0; not an anatomical atlas.',
          tag: 'LEGAL'
        }
      ]
    },
    {
      id: 'values',
      sectionId: 'about',
      number: '02',
      title: 'Values',
      subtitle: 'Human Movement & Purposeful Design',
      excerpt: resumeSections[0].blocks[1].value,
      docTag: 'DOC 01-B',
      bentoItems: [
        {
          id: 'val-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CORE PRINCIPLE',
          title: 'What I Value',
          description: resumeSections[0].blocks[1].value
        },
        {
          id: 'val-clarity',
          colSpan: 2,
          rowSpan: 2,
          label: 'CLARITY FIRST',
          title: 'Clear Thinking & Restraint',
          description: 'Every interaction must serve human comprehension before decorative novelty.',
          contentKind: 'callout'
        },
        {
          id: 'val-motion',
          colSpan: 2,
          rowSpan: 1,
          label: 'PURPOSEFUL MOTION',
          title: 'Physics That Orient',
          description: 'Using inertia, momentum, and tactile resistance to communicate state changes honestly.'
        },
        {
          id: 'val-link-work',
          colSpan: 2,
          rowSpan: 2,
          label: 'EVIDENCE',
          title: 'Applied to Real Builds',
          description: 'See these values reflected across motion studies and biomechanical tools.',
          actionText: 'See the work ↗'
        },
        {
          id: 'val-human',
          colSpan: 2,
          rowSpan: 1,
          label: 'HUMAN CENTRIC',
          title: 'Empathy in Engineering',
          description: 'Designing accessible, inclusive interfaces that never trap or overwhelm visitors.'
        }
      ]
    },
    {
      id: 'focus',
      sectionId: 'about',
      number: '03',
      title: 'Focus',
      subtitle: 'Biomechanics & Intelligent Systems',
      excerpt: resumeSections[0].blocks[2].value,
      docTag: 'DOC 01-C',
      bentoItems: [
        {
          id: 'foc-kicker',
          colSpan: 1,
          rowSpan: 1,
          label: 'INTERSECTION',
          title: 'Movement & Code',
          description: 'Where physical rehabilitation science meets GPU rendering.'
        },
        {
          id: 'foc-areas',
          colSpan: 1,
          rowSpan: 1,
          label: 'SYSTEM DOMAINS',
          title: 'Core Disciplines',
          description: 'Kinematics, WebGL, pose analysis, and source-grounded agents.'
        },
        {
          id: 'foc-story',
          colSpan: 2,
          rowSpan: 2,
          label: 'WHERE I FOCUS',
          title: 'Active Research Areas',
          description: resumeSections[0].blocks[2].value,
          contentKind: 'quote'
        },
        {
          id: 'foc-film',
          colSpan: 2,
          rowSpan: 2,
          label: 'STUDIO PREVIEW',
          title: 'Biomechanical Studies',
          description: 'Real-time kinematic cybernetics and pose estimation demos.',
          contentKind: 'about-film'
        },
        {
          id: 'foc-link-projects',
          colSpan: 2,
          rowSpan: 1,
          label: 'DEEP DIVE',
          title: 'Inspect Selected Projects',
          description: 'Review KineLab PT, SOREN MCP, Steppr, and the Biomechanical Lab.',
          actionText: 'Open projects ↗'
        }
      ]
    },
    {
      id: 'current-direction',
      sectionId: 'about',
      number: '04',
      title: 'Current Direction',
      subtitle: 'Prototypes & DPT Education',
      excerpt: resumeSections[0].blocks[3].value,
      docTag: 'DOC 01-D',
      bentoItems: [
        {
          id: 'cur-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CURRENT STATUS',
          title: 'Current Direction',
          description: resumeSections[0].blocks[3].value
        },
        {
          id: 'cur-dpt',
          colSpan: 2,
          rowSpan: 2,
          label: 'CLINICAL HORIZON',
          title: 'DPT Class of 2028',
          description: 'Progressing through doctoral clinical reasoning, patient evaluation, and movement analysis.',
          contentKind: 'callout'
        },
        {
          id: 'cur-tools',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROTOTYPING',
          title: 'Movement Tools',
          description: 'Building tactile movement software that clinicians and patients can trust.',
          contentKind: 'quote'
        },
        {
          id: 'cur-collab',
          colSpan: 2,
          rowSpan: 1,
          label: 'COLLABORATION',
          title: 'Open Inquiries',
          description: 'Open to discussions around movement analysis, creative tech, and clinical UI.'
        }
      ]
    }
  ],

  experience: [
    {
      id: 'arcadia-hybrid-lab',
      sectionId: 'experience',
      number: '01',
      title: 'Arcadia Hybrid Lab',
      subtitle: 'Graduate Assistant',
      excerpt: resumeSections[1].blocks[0].value,
      docTag: 'EXP 02-A',
      bentoItems: [
        {
          id: 'exp-arc-role',
          colSpan: 2,
          rowSpan: 1,
          label: 'ROLE & INSTITUTION',
          title: 'Graduate Assistant',
          description: 'Arcadia University Hybrid Doctor of Physical Therapy Program.'
        },
        {
          id: 'exp-arc-film',
          colSpan: 2,
          rowSpan: 2,
          label: 'LAB SEQUENCE',
          title: 'Immersive Environment',
          description: 'Supporting high-touch on-campus immersion laboratories.',
          contentKind: 'experience-film'
        },
        {
          id: 'exp-arc-overview',
          colSpan: 2,
          rowSpan: 2,
          label: 'RESPONSIBILITIES',
          title: 'Arcadia Hybrid Lab',
          description: resumeSections[1].blocks[0].value,
          contentKind: 'quote'
        },
        {
          id: 'exp-arc-scope',
          colSpan: 2,
          rowSpan: 1,
          label: 'KEY ACTIVITIES',
          title: 'Immersion & Orientation',
          description: 'Facilitating student readiness, clinical lab stations, and educational continuity.'
        }
      ]
    },
    {
      id: 'creative-development',
      sectionId: 'experience',
      number: '02',
      title: 'Creative Development',
      subtitle: 'Interface & Motion Engineering',
      excerpt: resumeSections[1].blocks[1].value,
      docTag: 'EXP 02-B',
      bentoItems: [
        {
          id: 'exp-cd-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'DISCIPLINE',
          title: 'Creative Development',
          description: resumeSections[1].blocks[1].value
        },
        {
          id: 'exp-cd-stack',
          colSpan: 2,
          rowSpan: 2,
          label: 'CORE TECH STACK',
          title: 'Modern Web & 3D Engineering',
          description: 'TypeScript, React 19, Three.js, GSAP 3.12, Vite 6, and Tailwind CSS.',
          contentKind: 'callout'
        },
        {
          id: 'exp-cd-motion',
          colSpan: 2,
          rowSpan: 2,
          label: 'MOTION SYSTEMS',
          title: 'Cinematic Precision',
          description: 'Designing bespoke spring dynamics, matrix3d folding transitions, and GPU-accelerated shaders.',
          contentKind: 'quote'
        },
        {
          id: 'exp-cd-practice',
          colSpan: 2,
          rowSpan: 1,
          label: 'STANDARDS',
          title: 'Accessible Performance',
          description: 'Zero layout thrashing, strict WCAG keyboard accessibility, and reduced-motion modes.'
        }
      ]
    },
    {
      id: 'us-army',
      sectionId: 'experience',
      number: '03',
      title: 'U.S. Army',
      subtitle: 'Military Service Background',
      excerpt: resumeSections[1].blocks[2].value,
      docTag: 'EXP 02-C',
      bentoItems: [
        {
          id: 'exp-army-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'SERVICE BACKGROUND',
          title: 'U.S. Army',
          description: 'Service background grounding discipline, team coordination, and mission execution.'
        },
        {
          id: 'exp-army-notice',
          colSpan: 2,
          rowSpan: 2,
          label: 'RECORD NOTICE',
          title: 'Service Dates Pending Review',
          description: 'Specific assignments, responsibilities, and service dates will be added after résumé review.',
          contentKind: 'callout'
        },
        {
          id: 'exp-army-summary',
          colSpan: 2,
          rowSpan: 2,
          label: 'FOUNDATION',
          title: 'Leadership & Adaptability',
          description: resumeSections[1].blocks[2].value,
          contentKind: 'quote'
        },
        {
          id: 'exp-army-status',
          colSpan: 2,
          rowSpan: 1,
          label: 'VERIFICATION STATUS',
          title: 'Explicit Limitation',
          description: 'Service dates and assignments remain pending résumé review.'
        }
      ]
    },
    {
      id: 'clinical-education',
      sectionId: 'experience',
      number: '04',
      title: 'Clinical Education',
      subtitle: 'Doctoral Studies in Movement Science',
      excerpt: resumeSections[1].blocks[3].value,
      docTag: 'EXP 02-D',
      bentoItems: [
        {
          id: 'exp-clin-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'DOCTORAL LEVEL',
          title: 'Clinical Education',
          description: resumeSections[1].blocks[3].value
        },
        {
          id: 'exp-clin-competencies',
          colSpan: 2,
          rowSpan: 2,
          label: 'CLINICAL COMPETENCIES',
          title: 'Core Curriculum',
          description: 'Movement assessment, clinical reasoning, therapeutic exercise, and systems review at student level.',
          contentKind: 'callout'
        },
        {
          id: 'exp-clin-reflection',
          colSpan: 2,
          rowSpan: 2,
          label: 'PERSPECTIVE',
          title: 'Evidence-Informed Care',
          description: 'Bridging biomechanical literature with hands-on palpation and movement analysis.',
          contentKind: 'quote'
        },
        {
          id: 'exp-clin-link',
          colSpan: 2,
          rowSpan: 1,
          label: 'CONTINUITY',
          title: 'Connected to Education',
          description: 'See the academic curriculum and interactive 3D musculoskeletal anatomy.',
          actionText: 'Explore education ↗'
        }
      ]
    }
  ],

  education: [
    {
      id: 'dpt-program',
      sectionId: 'education',
      number: '01',
      title: 'DPT Program',
      subtitle: 'Doctor of Physical Therapy',
      excerpt: resumeSections[2].blocks[0].value,
      docTag: 'EDU 03-A',
      bentoItems: [
        {
          id: 'edu-dpt-cred',
          colSpan: 2,
          rowSpan: 1,
          label: 'DEGREE IN PROGRESS',
          title: 'Doctor of Physical Therapy',
          description: resumeSections[2].blocks[0].value
        },
        {
          id: 'edu-dpt-curriculum',
          colSpan: 2,
          rowSpan: 2,
          label: 'STUDY STRUCTURE',
          title: 'Class of 2028',
          description: 'Rigorous hybrid coursework blending online asynchronous learning with intensive clinical immersion labs.',
          contentKind: 'callout'
        },
        {
          id: 'edu-dpt-film',
          colSpan: 2,
          rowSpan: 2,
          label: 'CLINICAL PERSPECTIVE',
          title: 'Understand What Moves Us',
          description: 'A study of structure, motion mechanics, and neuromuscular rehabilitation.',
          contentKind: 'education-film'
        },
        {
          id: 'edu-dpt-summary',
          colSpan: 2,
          rowSpan: 1,
          label: 'FOUNDATION',
          title: 'Clinical Reasoning',
          description: 'Developing diagnostic reasoning and therapeutic intervention skills.'
        }
      ]
    },
    {
      id: 'arcadia-university',
      sectionId: 'education',
      number: '02',
      title: 'Arcadia University',
      subtitle: 'Hybrid Learning Format',
      excerpt: resumeSections[2].blocks[1].value,
      docTag: 'EDU 03-B',
      bentoItems: [
        {
          id: 'edu-arc-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'INSTITUTION',
          title: 'Arcadia University',
          description: resumeSections[2].blocks[1].value
        },
        {
          id: 'edu-arc-format',
          colSpan: 2,
          rowSpan: 2,
          label: 'INNOVATIVE FORMAT',
          title: 'Hybrid DPT Delivery',
          description: 'Combines digital mastery with on-campus high-fidelity practical exams and laboratory sessions.',
          contentKind: 'callout'
        },
        {
          id: 'edu-arc-details',
          colSpan: 2,
          rowSpan: 2,
          label: 'GRADUATE REPUTATION',
          title: 'Pioneering PT Education',
          description: 'Arcadia University has long been recognized for excellence in physical therapy and movement analysis.',
          contentKind: 'quote'
        },
        {
          id: 'edu-arc-location',
          colSpan: 2,
          rowSpan: 1,
          label: 'CAMPUS LABS',
          title: 'Glenside, Pennsylvania',
          description: 'On-site immersion labs for musculoskeletal palpation, gait assessment, and manual therapy.'
        }
      ]
    },
    {
      id: 'academic-interests',
      sectionId: 'education',
      number: '03',
      title: 'Academic Interests',
      subtitle: 'Biomechanics & Musculoskeletal Anatomy',
      excerpt: resumeSections[2].blocks[2].value,
      docTag: 'EDU 03-C',
      hasInteractiveAnatomy: true,
      bentoItems: [
        {
          id: 'edu-int-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'RESEARCH SCOPE',
          title: 'Academic Interests',
          description: resumeSections[2].blocks[2].value
        },
        {
          id: 'edu-int-live-anatomy',
          colSpan: 4,
          rowSpan: 3,
          label: '3D ANATOMY ATLAS // INTERACTIVE',
          title: 'Musculoskeletal Study',
          description: 'Isolate bone, muscle, and tendon meshes. Orbit, zoom, and separate layers.',
          contentKind: 'interactive-anatomy'
        },
        {
          id: 'edu-int-biomech',
          colSpan: 2,
          rowSpan: 1,
          label: 'BIOMECHANICAL INQUIRY',
          title: 'Kinetic Chain Analysis',
          description: 'Investigating joint moment arms, ground reaction forces, and movement quality.'
        },
        {
          id: 'edu-int-cardio',
          colSpan: 2,
          rowSpan: 1,
          label: 'SYSTEMS PHYSIOLOGY',
          title: 'Cardiopulmonary Integration',
          description: 'Exercise physiology, gas exchange dynamics, and aerobic workload capacity.'
        }
      ]
    },
    {
      id: 'independent-learning',
      sectionId: 'education',
      number: '04',
      title: 'Independent Learning',
      subtitle: 'Creative Technology & AI Systems',
      excerpt: resumeSections[2].blocks[3].value,
      docTag: 'EDU 03-D',
      bentoItems: [
        {
          id: 'edu-ind-title',
          colSpan: 2,
          rowSpan: 1,
          label: 'SELF-DIRECTED',
          title: 'Independent Learning',
          description: resumeSections[2].blocks[3].value
        },
        {
          id: 'edu-ind-topics',
          colSpan: 2,
          rowSpan: 2,
          label: 'EXPEDITION AREAS',
          title: '3D & Intelligence',
          description: 'Three.js, Spline, GSAP, creative coding, and AI-agent engineering alongside DPT coursework.',
          contentKind: 'callout'
        },
        {
          id: 'edu-ind-methods',
          colSpan: 2,
          rowSpan: 2,
          label: 'METHODOLOGY',
          title: 'Building to Understand',
          description: 'Synthesizing anatomy and kinematic data through real-time interactive prototypes.',
          contentKind: 'quote'
        },
        {
          id: 'edu-ind-link-projects',
          colSpan: 2,
          rowSpan: 1,
          label: 'OUTCOMES',
          title: 'Explore the Projects',
          description: 'See the software experiments created through independent research.',
          actionText: 'Open projects ↗'
        }
      ]
    }
  ],

  projects: [
    {
      id: 'kinelab-pt',
      sectionId: 'projects',
      number: '01',
      title: 'KineLab PT',
      subtitle: 'Movement Analysis Prototype',
      excerpt: projects[0].overview,
      docTag: 'PRJ 04-A',
      hasMotionDemo: true,
      initialProject: 'kinelab',
      bentoItems: [
        {
          id: 'prj-kl-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: '01 / PROTOTYPE',
          title: 'KineLab PT',
          description: projects[0].overview
        },
        {
          id: 'prj-kl-viewer',
          colSpan: 4,
          rowSpan: 3,
          label: 'MOTION VIEWER // 97 FRAMES',
          title: 'Dual-Camera Pose Export',
          description: 'Scrub frames, toggle front and side views, or run continuous playback.',
          contentKind: 'motion-demo'
        },
        {
          id: 'prj-kl-problem',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROBLEM & BUILD',
          title: 'Accessible Clinical Video',
          description: `${projects[0].problem} Built with ${projects[0].build}`,
          contentKind: 'quote'
        },
        {
          id: 'prj-kl-limits',
          colSpan: 2,
          rowSpan: 2,
          label: 'LIMITATIONS & STATUS',
          title: 'Accuracy Unverified',
          description: `${projects[0].limits} Stack: ${projects[0].stack.join(', ')}.`,
          contentKind: 'callout'
        }
      ]
    },
    {
      id: 'soren-mcp-v3',
      sectionId: 'projects',
      number: '02',
      title: 'SOREN MCP V3',
      subtitle: 'Agent Workflow Study',
      excerpt: projects[1].overview,
      docTag: 'PRJ 04-B',
      hasSystemStudy: true,
      initialProject: 'soren-mcp',
      bentoItems: [
        {
          id: 'prj-mcp-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: '02 / STUDY',
          title: 'SOREN MCP V3',
          description: projects[1].overview
        },
        {
          id: 'prj-mcp-workflow',
          colSpan: 4,
          rowSpan: 3,
          label: 'AGENT WORKFLOW PIPELINE',
          title: 'From Source to Something Worth Reviewing',
          description: 'Step through Source, Plan, Tools, and Review stages.',
          contentKind: 'system-study'
        },
        {
          id: 'prj-mcp-problem',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROBLEM & ARCHITECTURE',
          title: 'Source-Grounded Agents',
          description: `${projects[1].problem} ${projects[1].build}`,
          contentKind: 'quote'
        },
        {
          id: 'prj-mcp-limits',
          colSpan: 2,
          rowSpan: 2,
          label: 'EVIDENCE & LIMITS',
          title: 'Demonstration Model',
          description: `${projects[1].evidence} ${projects[1].limits} Stack: ${projects[1].stack.join(', ')}.`,
          contentKind: 'callout'
        }
      ]
    },
    {
      id: 'steppr-spline',
      sectionId: 'projects',
      number: '03',
      title: 'Steppr / Spline',
      subtitle: '3D Room Environment Study',
      excerpt: projects[2].overview,
      docTag: 'PRJ 04-C',
      href: splineUrl,
      hasStepprStudy: true,
      initialProject: 'steppr',
      bentoItems: [
        {
          id: 'prj-stp-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: '03 / STUDY',
          title: 'Steppr / Spline',
          description: projects[2].overview
        },
        {
          id: 'prj-stp-interactive',
          colSpan: 4,
          rowSpan: 3,
          label: 'LIGHTING STUDY // SPLINE SCENE',
          title: 'Same Space. Different Light.',
          description: 'Toggle day and night palettes, inspect atmosphere, and jump to the Spline project.',
          contentKind: 'steppr-study'
        },
        {
          id: 'prj-stp-problem',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROBLEM & BUILD',
          title: 'Spatial Atmosphere',
          description: `${projects[2].problem} ${projects[2].build}`,
          contentKind: 'quote'
        },
        {
          id: 'prj-stp-limits',
          colSpan: 2,
          rowSpan: 2,
          label: 'EXTERNAL SCENE LINK',
          title: 'Open Spline Project',
          description: `${projects[2].evidence} ${projects[2].limits}`,
          actionText: 'Open Spline project ↗',
          href: splineUrl
        }
      ]
    },
    {
      id: 'living-resume',
      sectionId: 'projects',
      number: '04',
      title: 'Living Résumé',
      subtitle: 'Curved Kinetic Interface',
      excerpt: projects[3].overview,
      docTag: 'PRJ 04-D',
      hasResumeStudy: true,
      initialProject: 'living-resume',
      bentoItems: [
        {
          id: 'prj-lr-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: '04 / PROTOTYPE',
          title: 'Living Résumé',
          description: projects[3].overview
        },
        {
          id: 'prj-lr-film-lib',
          colSpan: 4,
          rowSpan: 3,
          label: 'MOTION LIBRARY // SIX FILMS',
          title: 'Six Topics. One Living System.',
          description: 'Browse the video studies that anchor all six portfolio sections.',
          contentKind: 'resume-study'
        },
        {
          id: 'prj-lr-problem',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROBLEM & BUILD',
          title: 'Engaging & Accessible',
          description: `${projects[3].problem} ${projects[3].build}`,
          contentKind: 'quote'
        },
        {
          id: 'prj-lr-limits',
          colSpan: 2,
          rowSpan: 2,
          label: 'PERFORMANCE DESIGN',
          title: 'Working Prototype',
          description: `${projects[3].evidence} ${projects[3].limits} Stack: ${projects[3].stack.join(', ')}.`,
          contentKind: 'callout'
        }
      ]
    },
    {
      id: 'biomech-lab',
      sectionId: 'projects',
      number: '05',
      title: 'Biomechanical Lab',
      subtitle: 'Kinematic Cybernetics Study',
      excerpt: projects[4].overview,
      docTag: 'PRJ 04-E',
      hasBiomechLab: true,
      initialProject: 'biomech-lab',
      bentoItems: [
        {
          id: 'prj-bl-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: '05 / STUDY',
          title: 'Biomechanical Lab',
          description: projects[4].overview
        },
        {
          id: 'prj-bl-interactive',
          colSpan: 4,
          rowSpan: 3,
          label: '3D CYBERNETIC LABORATORY',
          title: 'NVIDIA SimReady & Human Biomechanics',
          description: 'Launch the full interactive 3D laboratory with real-time kinematic telemetry shaders.',
          contentKind: 'biomech-lab-stage'
        },
        {
          id: 'prj-bl-problem',
          colSpan: 2,
          rowSpan: 2,
          label: 'PROBLEM & ARTICULATION',
          title: 'Robotics & Human Kinematics',
          description: `${projects[4].problem} ${projects[4].build}`,
          contentKind: 'quote'
        },
        {
          id: 'prj-bl-evidence',
          colSpan: 2,
          rowSpan: 2,
          label: 'EVIDENCE & LIMITATIONS',
          title: 'Real-Time Shader Pipeline',
          description: `${projects[4].evidence} ${projects[4].limits} Stack: ${projects[4].stack.join(', ')}.`,
          contentKind: 'callout'
        }
      ]
    }
  ],

  skills: [
    {
      id: 'web-engineering',
      sectionId: 'skills',
      number: '01',
      title: 'Web Engineering',
      subtitle: 'Modern Frontend Architecture',
      excerpt: resumeSections[4].blocks[0].value,
      docTag: 'SKL 05-A',
      hasSkillsWorkbench: true,
      bentoItems: [
        {
          id: 'skl-we-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'TOOLKIT / 01',
          title: 'Web Engineering',
          description: resumeSections[4].blocks[0].value
        },
        {
          id: 'skl-we-workbench',
          colSpan: 4,
          rowSpan: 3,
          label: 'INTERACTIVE TOOL BENCH',
          title: 'Pick a tool. Follow the work.',
          description: 'Drag tools, trace connections to projects, and inspect rationale.',
          contentKind: 'skills-workbench'
        },
        {
          id: 'skl-we-stack',
          colSpan: 2,
          rowSpan: 2,
          label: 'TECHNOLOGIES',
          title: 'Core Stack',
          description: 'React 19, Next.js, Vite 6, TypeScript 5.7, Tailwind CSS, semantic HTML5, and strict WCAG accessibility.',
          contentKind: 'callout'
        },
        {
          id: 'skl-we-principles',
          colSpan: 2,
          rowSpan: 2,
          label: 'DISCIPLINE',
          title: 'Maintainable Systems',
          description: 'Clean state machines, zero-allocation RAF loops, and bulletproof responsive layouts.',
          contentKind: 'quote'
        }
      ]
    },
    {
      id: 'motion-design',
      sectionId: 'skills',
      number: '02',
      title: 'Motion Design',
      subtitle: 'Choreography & Microinteractions',
      excerpt: resumeSections[4].blocks[1].value,
      docTag: 'SKL 05-B',
      hasSkillsWorkbench: true,
      bentoItems: [
        {
          id: 'skl-md-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'TOOLKIT / 02',
          title: 'Motion Design',
          description: resumeSections[4].blocks[1].value
        },
        {
          id: 'skl-md-tech',
          colSpan: 2,
          rowSpan: 2,
          label: 'ENGINES & LIBRARIES',
          title: 'GSAP & Framer Motion',
          description: 'GSAP 3.12, ScrollTrigger, Motion 12, bespoke spring physics, and FLIP-like shared layout transitions.',
          contentKind: 'callout'
        },
        {
          id: 'skl-md-craft',
          colSpan: 2,
          rowSpan: 2,
          label: 'CRAFT FLOOR',
          title: 'Tactile Dynamics',
          description: 'Bottom-hinged flap matrices, 3D tilt perspective, hover peeks, and responsive page spreads.',
          contentKind: 'quote'
        },
        {
          id: 'skl-md-a11y',
          colSpan: 2,
          rowSpan: 1,
          label: 'ACCESSIBILITY',
          title: 'Reduced Motion First',
          description: 'Full instant-switch support for prefers-reduced-motion: reduce without visual degradation.'
        }
      ]
    },
    {
      id: '3d-creative-tech',
      sectionId: 'skills',
      number: '03',
      title: '3D & Creative Tech',
      subtitle: 'Real-Time WebGL & Shaders',
      excerpt: resumeSections[4].blocks[2].value,
      docTag: 'SKL 05-C',
      hasSkillsWorkbench: true,
      bentoItems: [
        {
          id: 'skl-3d-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'TOOLKIT / 03',
          title: '3D & Creative Tech',
          description: resumeSections[4].blocks[2].value
        },
        {
          id: 'skl-3d-pipeline',
          colSpan: 2,
          rowSpan: 2,
          label: 'PIPELINE',
          title: 'Three.js, Spline & Blender',
          description: 'GLTF mesh optimization, SimReady asset integration, GPU buffer management, and GLSL shaders.',
          contentKind: 'callout'
        },
        {
          id: 'skl-3d-webgl',
          colSpan: 2,
          rowSpan: 2,
          label: 'PERFORMANCE',
          title: 'Zero Leak Lifecycle',
          description: 'Explicit WebGL context disposal, resource cleanup on unmount, and graceful context loss recovery.',
          contentKind: 'quote'
        },
        {
          id: 'skl-3d-link-projects',
          colSpan: 2,
          rowSpan: 1,
          label: 'APPLIED BUILDS',
          title: 'Explore 3D Implementations',
          description: 'Inspect the curved gallery ribbon, anatomy viewer, and cybernetic lab.',
          actionText: 'Open projects ↗'
        }
      ]
    },
    {
      id: 'movement-ai',
      sectionId: 'skills',
      number: '04',
      title: 'Movement & AI',
      subtitle: 'Physical & Computational Intelligence',
      excerpt: resumeSections[4].blocks[3].value,
      docTag: 'SKL 05-D',
      hasSkillsWorkbench: true,
      bentoItems: [
        {
          id: 'skl-mai-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'TOOLKIT / 04',
          title: 'Movement & AI',
          description: resumeSections[4].blocks[3].value
        },
        {
          id: 'skl-mai-bio',
          colSpan: 2,
          rowSpan: 2,
          label: 'CLINICAL SCIENCE',
          title: 'Student Biomechanics',
          description: 'Kinematic tracking, joint moment analysis, gait cycles, and cardiopulmonary systems review.',
          contentKind: 'callout'
        },
        {
          id: 'skl-mai-agents',
          colSpan: 2,
          rowSpan: 2,
          label: 'ENGINEERING',
          title: 'Agentic Workflows',
          description: 'Model Context Protocol (MCP) servers, source-grounded agents, and computer vision pose analysis.',
          contentKind: 'quote'
        },
        {
          id: 'skl-mai-link-kl',
          colSpan: 2,
          rowSpan: 1,
          label: 'APPLIED CASE',
          title: 'KineLab PT Study',
          description: 'See practical pose analysis experiments in KineLab PT.',
          actionText: 'Open KineLab PT ↗'
        }
      ]
    }
  ],

  contact: [
    {
      id: 'github',
      sectionId: 'contact',
      number: '01',
      title: 'GitHub',
      subtitle: 'Public Code & Repositories',
      excerpt: resumeSections[5].blocks[0].value,
      docTag: 'CON 06-A',
      href: githubUrl,
      bentoItems: [
        {
          id: 'con-gh-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CHANNEL 01 / CODE',
          title: 'GitHub Profile',
          description: 'Explore code, prototypes, and ongoing agent-system experiments.',
          href: githubUrl
        },
        {
          id: 'con-gh-film',
          colSpan: 2,
          rowSpan: 2,
          label: 'POSTCARD // STUDIO',
          title: 'Open Invitation',
          description: 'Let us follow the curiosity: movement, making, and what comes next.',
          contentKind: 'contact-film'
        },
        {
          id: 'con-gh-url',
          colSpan: 2,
          rowSpan: 2,
          label: 'VERIFIED DESTINATION',
          title: 'sorensadrgit-art',
          description: githubUrl,
          contentKind: 'copy-link',
          href: githubUrl
        },
        {
          id: 'con-gh-action',
          colSpan: 2,
          rowSpan: 1,
          label: 'EXTERNAL LINK',
          title: 'Visit GitHub Repository',
          description: 'Open the source repositories and prototypes directly.',
          actionText: 'Visit GitHub ↗',
          href: githubUrl
        }
      ]
    },
    {
      id: 'spline-project',
      sectionId: 'contact',
      number: '02',
      title: 'Spline Project',
      subtitle: 'Interactive 3D Room Environment',
      excerpt: resumeSections[5].blocks[1].value,
      docTag: 'CON 06-B',
      href: splineUrl,
      bentoItems: [
        {
          id: 'con-sp-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CHANNEL 02 / SPACES',
          title: 'Spline Project',
          description: 'Explore the Steppr room, a 3D environment and interaction study.',
          href: splineUrl
        },
        {
          id: 'con-sp-copy',
          colSpan: 2,
          rowSpan: 2,
          label: 'VERIFIED LINK',
          title: 'Steppr Room Environment',
          description: splineUrl,
          contentKind: 'copy-link',
          href: splineUrl
        },
        {
          id: 'con-sp-details',
          colSpan: 2,
          rowSpan: 2,
          label: 'ATMOSPHERE & EXPLORATION',
          title: 'First-Person 3D Space',
          description: 'Configured Day and Night lighting schemes with interactive first-person spatial navigation.',
          contentKind: 'quote'
        },
        {
          id: 'con-sp-action',
          colSpan: 2,
          rowSpan: 1,
          label: 'EXTERNAL LINK',
          title: 'Launch Spline Scene',
          description: 'Open the live Steppr 3D room on Spline.',
          actionText: 'Launch Spline scene ↗',
          href: splineUrl
        }
      ]
    },
    {
      id: 'email-add-later',
      sectionId: 'contact',
      number: '03',
      title: 'Email — Add Later',
      subtitle: 'Pending Verification',
      excerpt: resumeSections[5].blocks[2].value,
      docTag: 'CON 06-C',
      isPending: true,
      bentoItems: [
        {
          id: 'con-em-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CHANNEL 03 / DIRECT',
          title: 'Email — Add Later',
          description: 'A public professional email has not been added to this draft.'
        },
        {
          id: 'con-em-notice',
          colSpan: 4,
          rowSpan: 2,
          label: 'EDITORIAL NOTICE // PENDING',
          title: 'Confirm Before Publishing',
          description: 'A public professional email has not been added to this draft. Confirm an address before publishing.',
          contentKind: 'callout'
        },
        {
          id: 'con-em-honest',
          colSpan: 2,
          rowSpan: 1,
          label: 'NO FABRICATIONS',
          title: 'Honest Communications',
          description: 'No placeholder or guessed email addresses are used in this portfolio.'
        }
      ]
    },
    {
      id: 'linkedin-add-later',
      sectionId: 'contact',
      number: '04',
      title: 'LinkedIn — Add Later',
      subtitle: 'Pending Verification',
      excerpt: resumeSections[5].blocks[3].value,
      docTag: 'CON 06-D',
      isPending: true,
      bentoItems: [
        {
          id: 'con-li-kicker',
          colSpan: 2,
          rowSpan: 1,
          label: 'CHANNEL 04 / NETWORK',
          title: 'LinkedIn — Add Later',
          description: 'Confirm the correct LinkedIn profile and add its link when ready.'
        },
        {
          id: 'con-li-notice',
          colSpan: 4,
          rowSpan: 2,
          label: 'EDITORIAL NOTICE // PENDING',
          title: 'Profile Under Review',
          description: 'Confirm the correct LinkedIn profile and add its link when ready to share this résumé.',
          contentKind: 'callout'
        },
        {
          id: 'con-li-honest',
          colSpan: 2,
          rowSpan: 1,
          label: 'AUTHENTIC PORTFOLIO',
          title: 'Professional Verification',
          description: 'Public social networks will be attached following final review.'
        }
      ]
    }
  ]
};
