import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChapterTabs, CopyButton, Film } from '../ExplorerControls';
import { frameFromTime, githubUrl, splineUrl, skillLinks, projectTitle } from '../explorerData';

const LiveStudy = lazy(() => import('../LiveStudy'));
const BiomechanicalLabProject = lazy(() => import('../projects/biomechanical-lab/BiomechanicalLabProject'));

export function AnatomyStudyModule({ reduced }: { reduced: boolean }) {
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [separation, setSeparation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [reset, setReset] = useState(0);

  const layers = ['all', 'bone', 'muscle', 'tendon'] as const;
  const layerLabels = ['All layers', 'Bone', 'Muscle', 'Tendon'] as const;

  return (
    <div className="rf-visual-anatomy" data-local-keys>
      <div className="rf-visual-stage">
        <div className="rf-hud-overlay" aria-hidden="true">
          <span className="rf-hud-tag">+ 3D ANATOMY ATLAS</span>
          <span className="rf-hud-coords">LAYER: {layers[active].toUpperCase()}</span>
        </div>

        {live && !failed ? (
          <>
            <Suspense fallback={<Film id="education" reduced={reduced} />}>
              <LiveStudy
                kind="anatomy"
                layer={layers[active]}
                separation={separation}
                rotation={rotation}
                zoom={zoom}
                reset={reset}
                onReady={() => setReady(true)}
                onFailure={() => {
                  setFailed(true);
                  setLive(false);
                }}
              />
            </Suspense>
            <div className="rf-stage-stamp">
              <span>ANATOMY STUDY</span>
              <strong>{ready ? layerLabels[active] : 'Loading study…'}</strong>
            </div>
          </>
        ) : (
          <Film id="education" reduced={reduced} />
        )}

        <button
          type="button"
          className="rf-explore-button"
          onClick={() => {
            setFailed(false);
            setLive(!live);
            setReady(false);
          }}
        >
          {live ? 'Return to film' : 'Explore in 3D'} <span aria-hidden="true">↗</span>
        </button>

        <div className="rf-stage-caption">
          {live ? 'Drag to orbit · wheel to zoom · controls below' : 'Anatomy in motion · activate the live 3D study'}
        </div>
      </div>

      <div className="rf-anatomy-controls">
        <ChapterTabs
          labels={['Overview', 'Bone', 'Muscle', 'Tendon']}
          active={active}
          onChange={i => {
            setActive(i);
            if (!failed) setLive(true);
          }}
          label="Anatomy layers"
        />

        <div className="rf-slider-group">
          <label className="rf-slider-label">
            Layer separation <output>{Math.round(separation * 100)}%</output>
            <input
              type="range"
              aria-label="Layer separation"
              min="0"
              max="1"
              step="0.01"
              value={separation}
              disabled={!live || active !== 0}
              onChange={e => setSeparation(Number(e.target.value))}
            />
          </label>

          <label className="rf-slider-label">
            Study zoom <output>{Math.round(zoom * 100)}%</output>
            <input
              type="range"
              aria-label="Study zoom"
              min="0.7"
              max="1.5"
              step="0.05"
              value={zoom}
              disabled={!live}
              onChange={e => setZoom(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="rf-control-row">
          <button
            type="button"
            className="rf-btn-sm"
            disabled={!live}
            onClick={() => setRotation(v => v - 30)}
            aria-label="Rotate anatomy left"
          >
            Rotate left
          </button>
          <button
            type="button"
            className="rf-btn-sm"
            disabled={!live}
            onClick={() => setRotation(v => v + 30)}
            aria-label="Rotate anatomy right"
          >
            Rotate right
          </button>
          <button
            type="button"
            className="rf-btn-sm"
            onClick={() => {
              setRotation(0);
              setSeparation(0);
              setZoom(1);
              setActive(0);
              setReset(v => v + 1);
            }}
          >
            Reset
          </button>
        </div>

        <span role="status" className="rf-status-text">
          {failed
            ? '3D unavailable. The film and education details remain available.'
            : live && !ready
            ? 'Loading the existing anatomy asset…'
            : ''}
        </span>
      </div>
    </div>
  );
}

export function MotionDemoModule({ reduced }: { reduced: boolean }) {
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [info, setInfo] = useState({ count: 0, fps: 60 });
  const [frame, setFrame] = useState(0);
  const [view, setView] = useState<'front' | 'side'>('front');
  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    if (!playing || !info.count) return;
    let raf = 0;
    let last = 0;
    let time = frame / info.fps;
    const tick = (now: number) => {
      if (!document.hidden) {
        if (last) time = (time + Math.min((now - last) / 1000, 0.1)) % (info.count / info.fps);
        setFrame(frameFromTime(time, info.fps, info.count));
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const visible = () => {
      last = 0;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', visible);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', visible);
    };
  }, [playing, info]);

  return (
    <div className="rf-visual-demo" data-local-keys>
      <div className="rf-demo-stage">
        <div className="rf-hud-overlay" aria-hidden="true">
          <span className="rf-hud-tag">+ MOTION VIEWER</span>
          <span className="rf-hud-coords">FRAME: {frame + 1}</span>
        </div>

        {live && !failed ? (
          <Suspense fallback={<Film id="projects" reduced={reduced} />}>
            <LiveStudy
              kind="motion"
              frame={frame}
              view={view}
              reset={reset}
              onReady={(count, fps) => setInfo({ count, fps })}
              onFailure={() => {
                setFailed(true);
                setLive(false);
                setPlaying(false);
              }}
            />
          </Suspense>
        ) : (
          <Film id="biomech" reduced={reduced} />
        )}

        {!live && (
          <button
            type="button"
            className="rf-explore-button"
            onClick={() => {
              setFailed(false);
              setLive(true);
            }}
          >
            Open motion viewer <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      <span className="rf-demo-badge">DEMO EXPORT / ACCURACY UNVERIFIED</span>

      {live && (
        <div className="rf-demo-controls">
          <div className="rf-control-row">
            <button
              type="button"
              className="rf-btn-sm"
              disabled={!info.count}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? 'Pause' : 'Play'} motion
            </button>
            <button
              type="button"
              className="rf-btn-sm"
              aria-pressed={view === 'front'}
              onClick={() => setView('front')}
            >
              Front
            </button>
            <button
              type="button"
              className="rf-btn-sm"
              aria-pressed={view === 'side'}
              onClick={() => setView('side')}
            >
              Side
            </button>
            <button
              type="button"
              className="rf-btn-sm"
              onClick={() => {
                setPlaying(false);
                setFrame(0);
                setView('front');
                setReset(v => v + 1);
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="rf-btn-sm"
              onClick={() => {
                setLive(false);
                setPlaying(false);
              }}
            >
              Film
            </button>
          </div>

          <label className="rf-slider-label">
            Motion frame <output>{frame + 1} / {info.count || '—'}</output>
            <input
              type="range"
              aria-label="Motion frame"
              min="0"
              max={Math.max(0, info.count - 1)}
              disabled={!info.count}
              value={frame}
              onChange={e => {
                setPlaying(false);
                setFrame(Number(e.target.value));
              }}
            />
          </label>
        </div>
      )}

      {failed && <p role="status" className="rf-status-text">3D unavailable. The project film remains available.</p>}
    </div>
  );
}

export function SystemStudyModule({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState(0);
  const labels = ['Source', 'Plan', 'Tools', 'Review'];
  const notes = [
    'Start with the supplied material and verified context.',
    'Make the intended work and its limits clear.',
    'Connect appropriate tools to the task.',
    'Inspect the result and record what remains unverified.'
  ];

  return (
    <div className="rf-system-study" data-local-keys>
      <div className="rf-system-chain" aria-label="Illustrative workflow">
        {labels.map((name, i) => (
          <button
            key={name}
            type="button"
            className={'rf-chain-btn' + (active === i ? ' is-active' : '')}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span> {name}
          </button>
        ))}
      </div>

      <div className="rf-system-card">
        <p className="rf-system-desc">{notes[active]}</p>
      </div>
      <span className="rf-status-text">Illustrative diagram · no background agent is running</span>
    </div>
  );
}

export function StepprStudyModule() {
  const [night, setNight] = useState(false);
  return (
    <div className={'rf-steppr-study' + (night ? ' is-night' : '')} data-local-keys>
      <div className="rf-steppr-header">
        <p className="rf-kicker">STEPPR / ENVIRONMENT STUDY</p>
        <button
          className="rf-light-switch"
          type="button"
          role="switch"
          aria-checked={night}
          onClick={() => setNight(!night)}
        >
          <span className="rf-switch-indicator" aria-hidden="true" />
          {night ? 'Night palette' : 'Day palette'}
        </button>
      </div>

      <p className="rf-steppr-desc">
        A study of atmosphere, lighting, and first-person spatial navigation in Spline.
      </p>

      <div className="rf-steppr-actions">
        <a className="rf-btn-primary" href={splineUrl} target="_blank" rel="noopener noreferrer">
          Open Spline study <span aria-hidden="true">↗</span>
        </a>
      </div>
      <span className="rf-status-text">Palette preview only. Open Spline for the actual 3D room.</span>
    </div>
  );
}

export function ResumeStudyModule({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState(0);
  const ids = ['about', 'experience', 'education', 'projects', 'skills', 'contact'];

  return (
    <div className="rf-resume-study" data-local-keys>
      <div className="rf-resume-film-holder">
        <Film key={ids[active]} id={ids[active]} reduced={reduced} />
      </div>
      <div className="rf-resume-controls" aria-label="Résumé film previews">
        {ids.map((id, i) => (
          <button
            key={id}
            type="button"
            className={'rf-tag-btn' + (active === i ? ' is-active' : '')}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BiomechanicalLabModule({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rf-biomech-stage" data-local-keys>
      <div className="rf-hud-overlay" aria-hidden="true">
        <span className="rf-hud-tag">+ CYBERNETIC LAB</span>
        <span className="rf-hud-coords">TELEMETRY MATRIX</span>
      </div>
      <Film id="projects" reduced={reduced} />
      <div className="rf-stage-stamp">
        <span>PROJECT 05 · biomech-lab</span>
        <strong>Biomechanical Cybernetic Lab</strong>
      </div>
      <button type="button" className="rf-explore-button" onClick={() => setOpen(true)}>
        Open 3D laboratory <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <BiomechanicalLabProject isOpen={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

export function SkillsWorkbenchModule({
  reduced,
  onNavigate
}: {
  reduced: boolean;
  onNavigate?: (sectionId: string, projectId?: string) => void;
}) {
  const [active, setActive] = useState(0);
  const [reset, setReset] = useState(0);
  const bounds = useRef<HTMLDivElement>(null);
  const skill = skillLinks[active];

  return (
    <div className="rf-skills-workbench" ref={bounds} data-local-keys>
      <div className="rf-tool-grid" key={reset}>
        {skillLinks.map((tool, i) => (
          <motion.button
            key={tool.name}
            type="button"
            drag={!reduced}
            dragConstraints={bounds}
            dragMomentum={false}
            dragElastic={0.08}
            whileDrag={{ scale: 1.06, zIndex: 3 }}
            className={'rf-tool-card' + (active === i ? ' is-active' : '')}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span className="rf-tool-cat">{tool.category}</span>
            <strong className="rf-tool-title">{tool.name}</strong>
            <span className="rf-tool-num">0{i + 1}</span>
          </motion.button>
        ))}
      </div>

      <div className="rf-workbench-footer">
        <span className="rf-status-text">Click or tap to inspect. Drag to arrange.</span>
        <button type="button" className="rf-link-btn" onClick={() => setReset(v => v + 1)}>
          Reset positions
        </button>
      </div>

      <div className="rf-skill-detail-card">
        <span className="rf-kicker">SELECTED TOOL CONNECTION</span>
        <h3 className="rf-skill-name">{skill.name}</h3>
        <p className="rf-skill-note">{skill.note}</p>
        <div className="rf-connected-projects">
          {skill.projects.map(id => (
            <button
              type="button"
              className="rf-proj-chip"
              key={id}
              onClick={() => onNavigate?.('projects', id)}
            >
              {projectTitle(id)} <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CopyLinkModule({ href }: { href: string }) {
  return (
    <div className="rf-copy-module" data-local-keys>
      <CopyButton text={href} />
      <a className="rf-copy-direct" href={href} target="_blank" rel="noopener noreferrer">
        {href}
      </a>
    </div>
  );
}
