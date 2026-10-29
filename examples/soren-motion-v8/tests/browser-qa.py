"""Run against a local HTTP preview with the installed agent-browser CLI."""
from pathlib import Path
import argparse, json, shutil, subprocess, sys, time

parser=argparse.ArgumentParser()
parser.add_argument('--url',default='http://127.0.0.1:3049/')
parser.add_argument('--session',default='soren-v8-qa-20261028')
args=parser.parse_args()
ROOT=Path(__file__).resolve().parents[1]
QA=ROOT/'qa';(QA/'screenshots').mkdir(parents=True,exist_ok=True)

# Prefer local native executable if available on Windows
local_native = ROOT / 'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
CLI = shutil.which('agent-browser')
if local_native.exists():
    CLI = str(local_native)
elif CLI:
    native = Path(CLI).parent / 'node_modules/agent-browser/bin/agent-browser-win32-x64.exe'
    if native.exists():
        CLI = str(native)

assert CLI, 'Use the existing agent-browser installation.'
results = []

def run(*parts):
    value = subprocess.run([CLI, '--session', args.session, *parts], capture_output=True, text=True, encoding='utf-8', timeout=45)
    if value.returncode:
        raise AssertionError(' '.join(parts[:5]) + ': ' + value.stdout + value.stderr)
    return value.stdout.strip()

def js(code):
    output = run('eval', '(() => (' + code + '))()')
    value = json.loads(output)
    if isinstance(value, str):
        try:
            return json.loads(value)
        except (ValueError, TypeError):
            return value
    return value

def check(label, code):
    value = js(code)
    results.append({'check': label, 'passed': bool(value)})
    if not value:
        raise AssertionError(label)

def click(name, role='button'):
    run('find', 'role', role, 'click', '--name', name, '--exact')
    run('snapshot', '-i')

def open_section(id):
    run('open', args.url + '#' + id)
    run('wait', f'[data-open-section="{id}"]')
    run('wait', '1200')
    run('snapshot', '-i')

def shot(name):
    js("document.querySelector('.rf-archive-root, .ex-scroll')?.scrollTo(0,0)")
    run('screenshot', str(QA / 'screenshots' / name))

try:
    run('open', args.url)
    run('set', 'viewport', '1440', '900')
    run('wait', '3500')
    run('snapshot', '-i')

    # Gallery -> About Section
    click('Open ABOUT ME')
    run('wait', '1200')
    check('About opens from the gallery', "location.hash==='#about' && !!document.querySelector('[role=dialog]')")
    check('Background outside dialog is inert', "[...document.querySelectorAll('.sr-header,.sr-stage,.sr-timeline')].every(e=>e.inert)")
    check('React Bits Folder is mounted', "!!document.querySelector('.folder-root')")

    js("document.querySelector('.sr-detail').focus()")
    run('press', 'Shift+Tab')
    check('Shift+Tab wraps to last dialog control', "document.activeElement.getAttribute('aria-label')==='Next section'")
    run('press', 'Tab')
    check('Tab wraps to close control', "document.activeElement.getAttribute('aria-label')==='Close section'")

    # Click Values paper inside About folder
    run('wait', '500')
    js("document.querySelector('[data-paper-id=\"values\"]')?.click()")
    run('wait', '800')
    check('Values paper opens Magic Bento with clear thinking copy', "document.querySelector('.rf-paper-detail-canvas')?.textContent.includes('clear thinking')")

    # Back to papers
    click('Back to papers')
    run('wait', '500')
    check('Back to papers restores folder view', "!document.querySelector('.rf-paper-detail-canvas') && !!document.querySelector('.folder-root')")

    check('Ribbon videos pause while section is open', "document.querySelector('[data-resume-ribbon]')?.dataset.playingStudies==='0'")
    run('press', 'Escape')
    run('wait', '1200')
    check('Escape closes and restores opener', "!document.querySelector('.sr-detail') && document.activeElement.getAttribute('aria-label')==='Open ABOUT ME'")

    # Experience Section
    open_section('experience')
    check('Experience folder has correct amber accent', "getComputedStyle(document.querySelector('.rf-archive-root')).getPropertyValue('--rf-accent').trim().toLowerCase()==='#ff9f43'")
    js("document.querySelector('[data-paper-id=\"us-army\"]')?.click()")
    run('wait', '800')
    check('Military copy retains unverified dates limitation', "document.querySelector('.rf-paper-detail-canvas')?.textContent.includes('service dates will be added') || document.querySelector('.rf-paper-detail-canvas')?.textContent.includes('pending résumé review')")
    click('Back to papers')
    run('wait', '500')

    # Education Section & 3D Anatomy Study
    open_section('education')
    check('Education folder has cyan accent', "getComputedStyle(document.querySelector('.rf-archive-root')).getPropertyValue('--rf-accent').trim().toLowerCase()==='#00d2d3'")
    js("document.querySelector('[data-paper-id=\"academic-interests\"]')?.click()")
    run('wait', '800')
    click('Explore in 3D')
    run('wait', "canvas[data-study='anatomy'][data-loaded='true']")
    check('Anatomy mesh loads', "document.querySelector('[data-study=anatomy]').dataset.loaded==='true'")
    click('Bone', 'tab'); run('wait', '500')
    check('Bone isolate state', "document.querySelector('.rf-stage-stamp strong')?.textContent==='Bone'")
    click('Muscle', 'tab'); click('Tendon', 'tab'); click('Overview', 'tab')
    check('All four anatomy states remain in the section', "location.hash==='#education' && document.querySelectorAll('[role=tab]').length===4")
    run('find', 'role', 'slider', 'click', '--name', 'Layer separation', '--exact')
    run('press', 'End')
    check('Separation slider works by keyboard', "document.querySelector('[aria-label=\"Layer separation\"]').value==='1' && location.hash==='#education'")
    run('find', 'role', 'slider', 'click', '--name', 'Study zoom', '--exact')
    run('press', 'End')
    check('Zoom slider works by keyboard', "document.querySelector('[aria-label=\"Study zoom\"]').value==='1.5'")
    click('Rotate anatomy left'); click('Rotate anatomy right'); click('Reset')
    check('Anatomy reset clears separation and zoom', "document.querySelector('[aria-label=\"Layer separation\"]').value==='0' && document.querySelector('[aria-label=\"Study zoom\"]').value==='1'")
    shot('education-live-desktop.png')
    js("document.querySelector('[data-study=anatomy]').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))")
    run('wait', '300')
    check('WebGL context loss returns to film with status', "!document.querySelector('[data-study]') && document.querySelector('[role=status]').textContent.includes('3D unavailable')")
    click('Back to papers')
    run('wait', '500')

    # Projects Section & Studies
    open_section('projects')
    check('Projects folder has cobalt accent', "getComputedStyle(document.querySelector('.rf-archive-root')).getPropertyValue('--rf-accent').trim().toLowerCase()==='#3867d6'")
    js("document.querySelector('[data-paper-id=\"kinelab-pt\"]')?.click()")
    run('wait', '800')
    click('Open motion viewer')
    run('wait', "canvas[data-study='motion'][data-loaded='true']")
    check('Existing 97-frame motion export loads', "document.querySelector('[aria-label=\"Motion frame\"]').max==='96'")
    run('find', 'role', 'slider', 'click', '--name', 'Motion frame', '--exact')
    run('press', 'End')
    check('Motion scrub reaches final frame', "document.querySelector('[data-study=motion]').dataset.frame==='96'")
    click('Play motion'); run('wait', '500')
    check('Motion playback advances', "document.querySelector('[data-study=motion]').dataset.frame!=='96'")
    click('Pause motion'); click('Side')
    check('Side view selectable', "[...document.querySelectorAll('button')].some(e=>e.textContent==='Side'&&e.getAttribute('aria-pressed')==='true')")
    click('Reset')
    check('Motion reset stops on first frame', "document.querySelector('[data-study=motion]').dataset.frame==='0'")
    click('Back to papers')
    run('wait', '500')

    # Project 02: SOREN MCP V3 System Study
    js("document.querySelector('[data-paper-id=\"soren-mcp-v3\"]')?.click()")
    run('wait', '800')
    click('04 Review')
    check('Workflow is labeled illustrative', "document.querySelector('.rf-system-study').textContent.includes('no background agent is running')")
    click('Back to papers')
    run('wait', '500')

    # Project 03: Steppr / Spline Study
    js("document.querySelector('[data-paper-id=\"steppr-spline\"]')?.click()")
    run('wait', '800')
    click('Day palette', 'switch')
    check('Steppr palette switch works', "document.querySelector('[role=switch]').getAttribute('aria-checked')==='true'")
    check('Steppr links to actual approved project', "document.querySelector('.rf-steppr-study a').href==='https://app.spline.design/file/a087c1a8-3639-41cd-bdcd-3da0a3343377'")
    click('Back to papers')
    run('wait', '500')

    # Project 04: Living Résumé Film Library
    js("document.querySelector('[data-paper-id=\"living-resume\"]')?.click()")
    run('wait', '800')
    click('Education')
    check('Resume project previews its six own films', "document.querySelector('.rf-resume-study video')?.src.includes('education-film.mp4') || document.querySelector('.rf-resume-study img')?.src.includes('education-poster.png')")
    click('Back to papers')
    run('wait', '500')

    # Project 05: Biomechanical Lab 3D Stage
    js("document.querySelector('[data-paper-id=\"biomech-lab\"]')?.click()")
    run('wait', '800')
    check('Biomechanical lab stage ready', "!!document.querySelector('.rf-biomech-stage')")
    click('Back to papers')
    run('wait', '500')

    # Skills Section & Drag Workbench
    open_section('skills')
    check('Skills folder has violet accent', "getComputedStyle(document.querySelector('.rf-archive-root')).getPropertyValue('--rf-accent').trim().toLowerCase()==='#a55eea'")
    js("document.querySelector('[data-paper-id=\"web-engineering\"]')?.click()")
    run('wait', '800')
    point = js("(()=>{const r=document.querySelector('.rf-tool-card').getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]})()")
    run('mouse', 'move', str(point[0]), str(point[1]))
    run('mouse', 'down')
    run('mouse', 'move', str(point[0] + 35), str(point[1] + 20))
    run('mouse', 'up')
    run('wait', '300')
    check('Optional tool drag changes its position', "getComputedStyle(document.querySelector('.rf-tool-card')).transform!=='none'")
    click('Reset positions')
    check('Reset restores tool arrangement', "getComputedStyle(document.querySelector('.rf-tool-card')).transform==='none'")
    click('Back to papers')
    run('wait', '500')

    # Contact Section
    open_section('contact')
    check('Contact contains only supplied destinations', "[...document.querySelectorAll('.rf-archive-root a')].every(a=>!a.href.startsWith('http') || ['github.com','app.spline.design'].includes(new URL(a.href).hostname))")
    js("document.querySelector('[data-paper-id=\"github\"]')?.click()")
    run('wait', '800')

    js("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Denied for test')}}})")
    click('Copy GitHub link')
    check('Clipboard denial has visible recovery', "document.querySelector('[role=status]').textContent.includes('Select and copy')")

    js("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__qaCopied=text}}})")
    click('Copy GitHub link')
    check('Clipboard success announces copied URL', "document.querySelector('[role=status]').textContent==='Link copied.' && window.__qaCopied==='https://github.com/sorensadrgit-art'")
    click('Back to papers')
    run('wait', '500')

    # Responsive Viewport Checks
    for width, height in [(390, 844), (768, 1024), (1440, 900), (1920, 1080)]:
        run('set', 'viewport', str(width), str(height))
        for id in ['about', 'experience', 'education', 'projects', 'skills', 'contact']:
            open_section(id)
            check(f'{id} {width}x{height} no horizontal overflow', "(()=>{const d=document.querySelector('.rf-archive-root');return !d || (d.scrollWidth<=d.clientWidth+2&&document.documentElement.scrollWidth<=innerWidth+2)})()")
            check(f'{id} {width}x{height} close and navigation visible', "(()=>{const c=document.querySelector('.sr-detail-close')?.getBoundingClientRect(),n=document.querySelector('.sr-section-nav')?.getBoundingClientRect();return !!c&&!!n&&c.top>=0&&c.right<=innerWidth&&n.bottom<=innerHeight&&n.top>=0})()")
            if width in [390, 1440]:
                shot(f'{id}-{width}.png')

    run('set', 'viewport', '1440', '900')
    open_section('about')
    js("document.documentElement.style.zoom='2'")
    check('200 percent zoom stays within viewport', "document.documentElement.scrollWidth<=innerWidth+2")
    js("document.documentElement.style.zoom=''")

    # Reduced Motion Check
    run('set', 'media', 'light', 'reduced-motion')
    for id in ['about', 'experience', 'education', 'projects', 'skills', 'contact']:
        open_section(id)
        check(f'{id} reduced motion mounted cleanly', "!!document.querySelector('.folder-root')")

    check('No uncaught browser errors', "true" if not run('errors').strip() else 'false')

    (QA / 'browser-results.json').write_text(json.dumps({
        'url': args.url,
        'checks': results,
        'passed': all(r['passed'] for r in results),
        'screenshots': 'qa/screenshots',
        'scope': 'Local Chromium; animated React Bits Folder & Magic Bento papers; verified 3D anatomy and motion demos.'
    }, indent=2), encoding='utf8')

    print(json.dumps({'passed': len(results), 'failed': 0, 'report': str(QA / 'browser-results.json')}))
except Exception as error:
    (QA / 'browser-results.json').write_text(json.dumps({'checks': results, 'passed': False, 'error': str(error)}, indent=2), encoding='utf8')
    print(str(error), file=sys.stderr)
    sys.exit(1)
finally:
    run('close')
