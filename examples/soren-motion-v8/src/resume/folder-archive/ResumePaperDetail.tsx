import { useMemo, type ReactNode } from 'react';
import { MagicBento, type BentoItem } from '../react-bits';
import type { PaperManifestItem, BentoItemConfig } from './paperManifest';
import type { SectionFolderTheme } from './sectionTheme';
import {
  AnatomyStudyModule,
  MotionDemoModule,
  SystemStudyModule,
  StepprStudyModule,
  ResumeStudyModule,
  BiomechanicalLabModule,
  SkillsWorkbenchModule,
  CopyLinkModule
} from './ResumePaperVisuals';
import { Film } from '../ExplorerControls';

interface Props {
  paper: PaperManifestItem;
  theme: SectionFolderTheme;
  reduced: boolean;
  onBack: () => void;
  onNavigate: (sectionId: string, projectId?: string) => void;
}

export function ResumePaperDetail({ paper, theme, reduced, onBack, onNavigate }: Props) {
  const bentoItems: BentoItem[] = useMemo(() => {
    return paper.bentoItems.map((item: BentoItemConfig, index: number) => {
      let contentNode: ReactNode = null;

      if (item.contentKind === 'interactive-anatomy') {
        contentNode = <AnatomyStudyModule reduced={reduced} />;
      } else if (item.contentKind === 'motion-demo') {
        contentNode = <MotionDemoModule reduced={reduced} />;
      } else if (item.contentKind === 'system-study') {
        contentNode = <SystemStudyModule reduced={reduced} />;
      } else if (item.contentKind === 'steppr-study') {
        contentNode = <StepprStudyModule />;
      } else if (item.contentKind === 'resume-study') {
        contentNode = <ResumeStudyModule reduced={reduced} />;
      } else if (item.contentKind === 'biomech-lab-stage') {
        contentNode = <BiomechanicalLabModule reduced={reduced} />;
      } else if (item.contentKind === 'skills-workbench') {
        contentNode = <SkillsWorkbenchModule reduced={reduced} onNavigate={onNavigate} />;
      } else if (item.contentKind === 'about-film') {
        contentNode = (
          <div className="rf-bento-film-card">
            <Film id="about" reduced={reduced} />
          </div>
        );
      } else if (item.contentKind === 'experience-film') {
        contentNode = (
          <div className="rf-bento-film-card">
            <Film id="experience" reduced={reduced} />
          </div>
        );
      } else if (item.contentKind === 'education-film') {
        contentNode = (
          <div className="rf-bento-film-card">
            <Film id="education" reduced={reduced} />
          </div>
        );
      } else if (item.contentKind === 'contact-film') {
        contentNode = (
          <div className="rf-bento-film-card">
            <Film id="contact" reduced={reduced} />
          </div>
        );
      } else if (item.contentKind === 'copy-link') {
        contentNode = <CopyLinkModule href={item.href || paper.href || ''} />;
      } else if (item.contentKind === 'quote') {
        contentNode = (
          <div className="rf-bento-editorial">
            <span className="rf-bento-kicker">{item.label}</span>
            <h4 className="rf-bento-heading">{item.title}</h4>
            <p className="rf-bento-body">{item.description}</p>
          </div>
        );
      } else if (item.contentKind === 'callout') {
        contentNode = (
          <div className="rf-bento-callout">
            <span className="rf-bento-kicker">{item.label}</span>
            <h4 className="rf-bento-heading">{item.title}</h4>
            <p className="rf-bento-body">{item.description}</p>
          </div>
        );
      }

      if (contentNode) {
        return {
          id: item.id || index,
          colSpan: item.colSpan ?? 1,
          rowSpan: item.rowSpan ?? 1,
          content: contentNode
        };
      }

      return {
        id: item.id || index,
        colSpan: item.colSpan ?? 1,
        rowSpan: item.rowSpan ?? 1,
        label: item.label,
        title: item.title,
        description: item.description,
        href: item.href,
        target: item.href ? '_blank' : undefined,
        rel: item.href ? 'noopener noreferrer' : undefined,
        onClick: item.actionText
          ? () => {
              if (item.actionText?.includes('education')) onNavigate('education');
              else if (item.actionText?.includes('projects') || item.actionText?.includes('work')) onNavigate('projects');
              else if (item.actionText?.includes('KineLab')) onNavigate('projects', 'kinelab');
            }
          : undefined
      };
    });
  }, [paper, theme, reduced, onNavigate]);

  return (
    <div className="rf-paper-detail-canvas" data-local-keys tabIndex={-1}>
      <header className="rf-paper-detail-header">
        <div className="rf-paper-header-left">
          <button
            type="button"
            className="rf-back-button"
            onClick={onBack}
            aria-label="Back to papers"
          >
            ← Back to papers
          </button>
          <div className="rf-paper-breadcrumbs">
            <span className="rf-crumb-root">SOREN / {theme.badgeText}</span>
            <span className="rf-crumb-sep">/</span>
            <span className="rf-crumb-doc">{paper.docTag}</span>
          </div>
        </div>

        <div className="rf-paper-header-titles">
          <span className="rf-paper-eyebrow">DOCUMENT ARCHIVE · {paper.number}</span>
          <h2 className="rf-paper-main-title">{paper.title}</h2>
          <p className="rf-paper-subtitle">{paper.subtitle}</p>
        </div>
      </header>

      <main className="rf-paper-bento-stage">
        <MagicBento
          items={bentoItems}
          columns={4}
          rowHeight={190}
          gap={12}
          radius={20}
          theme="dark"
          glowColor={theme.glowColor}
          enableBorderGlow={true}
          enableSpotlight={true}
          spotlightRadius={300}
          clickEffect={true}
          intro={!reduced}
          disableAnimations={reduced}
        />
      </main>
    </div>
  );
}
