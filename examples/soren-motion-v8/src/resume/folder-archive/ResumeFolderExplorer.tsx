import { useEffect, useId, useRef, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { ResumeSection } from '../resumeData';
import { Folder } from '../react-bits';
import { sectionThemes, type SectionFolderTheme } from './sectionTheme';
import { paperManifest, type PaperManifestItem } from './paperManifest';
import { ResumePaperDetail } from './ResumePaperDetail';
import './folderArchive.css';

interface Props {
  section: ResumeSection;
  reduced: boolean;
  initialProject?: string;
  onNavigate: (sectionId: string, projectId?: string) => void;
  onClose: () => void;
  onPrevSection?: () => void;
  onNextSection?: () => void;
}

export function ResumeFolderExplorer({
  section,
  reduced,
  initialProject,
  onNavigate,
  onClose,
  onPrevSection,
  onNextSection
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme: SectionFolderTheme = sectionThemes[section.id] || sectionThemes.about;
  const papers: PaperManifestItem[] = paperManifest[section.id] || [];

  // State machine: folderOpen controls folder flap; activePaper holds currently reading paper
  const [folderOpen, setFolderOpen] = useState(false);
  const [activePaperIndex, setActivePaperIndex] = useState<number | null>(() => {
    if (section.id === 'projects' && initialProject) {
      const idx = papers.findIndex(p => p.initialProject === initialProject);
      return idx >= 0 ? idx : null;
    }
    return null;
  });

  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  const lastFocusedPaperRef = useRef<number | null>(null);

  // Responsive folder scaling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const folderScale = useMemo(() => {
    if (windowWidth < 420) return 0.64;
    if (windowWidth < 600) return 0.78;
    if (windowWidth < 900) return 1.05;
    if (windowWidth < 1280) return 1.30;
    return 1.55;
  }, [windowWidth]);

  // Stage 1 -> 2: Reveal & automatically open folder after section modal opens
  useEffect(() => {
    if (reduced) {
      setFolderOpen(true);
      return;
    }
    // Controlled flap open after flight / handoff settles
    const timer = setTimeout(() => {
      setFolderOpen(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [reduced, section.id]);

  // Handle keyboard Escape unwind: paper -> folder -> gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePaperIndex !== null) {
          e.preventDefault();
          e.stopPropagation();
          handleBackToPapers();
        } else {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [activePaperIndex, onClose]);

  const handlePaperSelect = useCallback((index: number) => {
    lastFocusedPaperRef.current = index;
    setActivePaperIndex(index);
  }, []);

  const handleBackToPapers = useCallback(() => {
    setActivePaperIndex(null);
    // Restore focus to the last selected paper inside the folder
    setTimeout(() => {
      if (lastFocusedPaperRef.current !== null && containerRef.current) {
        const itemBtn = containerRef.current.querySelector<HTMLElement>(
          `[data-folder-item="${lastFocusedPaperRef.current}"]`
        );
        itemBtn?.focus();
      }
    }, 120);
  }, []);

  // Format tactile porcelain paper sheets matching reference screenshot 01
  const folderItems = useMemo(() => {
    return papers.map((paper, idx) => ({
      title: paper.title,
      description: paper.excerpt,
      content: (
        <article
          className="rf-paper-sheet"
          data-paper-id={paper.id}
          data-paper-index={idx}
          tabIndex={0}
          role="button"
          aria-label={`Read paper ${paper.number}: ${paper.title}`}
          onClick={e => {
            e.stopPropagation();
            handlePaperSelect(idx);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              handlePaperSelect(idx);
            }
          }}
        >
          <div className="rf-paper-sheet-header">
            <span className="rf-paper-tag">{paper.docTag}</span>
            <span
              className="rf-paper-dot"
              style={{ backgroundColor: theme.folderColor }}
              aria-hidden="true"
            />
          </div>

          <h3 className="rf-paper-heading">{paper.title}</h3>
          <p className="rf-paper-subtitle-label">{paper.subtitle}</p>

          <div className="rf-paper-excerpt-box">
            <p className="rf-paper-excerpt">{paper.excerpt}</p>
          </div>

          <div className="rf-paper-lines" aria-hidden="true">
            <span className="rf-paper-rule" style={{ width: '92%' }} />
            <span className="rf-paper-rule" style={{ width: '84%' }} />
            <span className="rf-paper-rule" style={{ width: '70%' }} />
          </div>

          <footer className="rf-paper-sheet-footer">
            <span className="rf-paper-cta">Click to inspect ↗</span>
            <span className="rf-paper-num">{paper.number}</span>
          </footer>
        </article>
      )
    }));
  }, [papers, theme.folderColor, handlePaperSelect]);

  const activePaper = activePaperIndex !== null ? papers[activePaperIndex] : null;

  return (
    <div
      ref={containerRef}
      className={`rf-archive-root rf-section-${section.id}`}
      style={
        {
          '--rf-accent': theme.folderColor,
          '--rf-glow': theme.glowColor
        } as React.CSSProperties
      }
    >
      {/* Editorial Header */}
      <header className="rf-archive-header">
        <div className="rf-header-meta">
          <span className="rf-section-badge">{theme.badgeText}</span>
          <span className="rf-section-caption">{theme.caption}</span>
        </div>

        <div className="rf-header-title-row">
          <h1 className="rf-archive-title">{section.title}</h1>
          <button
            type="button"
            className="rf-gallery-return-btn"
            onClick={onClose}
            aria-label="Back to gallery"
          >
            Back to gallery ✕
          </button>
        </div>

        <p className="rf-archive-lead">{section.lead}</p>
      </header>

      {/* Main Interactive Stage */}
      <div className="rf-archive-stage">
        {/* Background Folder Stage */}
        <div
          className={`rf-folder-viewport${activePaper ? ' is-dimmed' : ''}`}
          aria-hidden={activePaper !== null}
        >
          <div className="rf-folder-mount">
            <Folder
              label={section.title}
              mode="flap"
              variant="solid"
              layout="spread"
              theme="dark"
              color={theme.folderColor}
              paperColor="#f5f6f8"
              items={folderItems}
              size={folderScale}
              open={folderOpen}
              onOpenChange={setFolderOpen}
              onItemClick={(_item, idx) => handlePaperSelect(idx)}
              peek={true}
              zoomOnClick={true}
              speed={1}
              bounce={0.4}
              tilt={0.5}
              intro={!reduced}
              closeOnOutsideClick={false}
            />
          </div>

          <div className="rf-folder-hint" aria-hidden="true">
            <span>Click any document to inspect details · or toggle folder flap</span>
          </div>
        </div>

        {/* Paper Detail MagicBento Overlay */}
        {activePaper && (
          <div className="rf-detail-overlay" role="region" aria-label={`${activePaper.title} details`}>
            <ResumePaperDetail
              paper={activePaper}
              theme={theme}
              reduced={reduced}
              onBack={handleBackToPapers}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>

      {/* Section Footer / Paging */}
      <footer className="rf-archive-footer">
        <div className="rf-footer-left">
          <span>SOREN / A LIVING RÉSUMÉ ARCHIVE</span>
          <span className="rf-footer-dot">·</span>
          <span>Tactile Document Explorers</span>
        </div>

        <div className="rf-footer-nav" aria-label="Section navigation">
          {onPrevSection && (
            <button
              type="button"
              className="rf-nav-btn"
              onClick={onPrevSection}
              aria-label="Previous section"
            >
              ← Previous section
            </button>
          )}
          {onNextSection && (
            <button
              type="button"
              className="rf-nav-btn"
              onClick={onNextSection}
              aria-label="Next section"
            >
              Next section →
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
