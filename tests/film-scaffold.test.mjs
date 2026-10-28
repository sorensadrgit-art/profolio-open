import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Task 1: OpenDesign & HyperFrames Scaffolding', () => {
  it('scaffolds valid HyperFrames configuration', () => {
    const configPath = path.resolve('motion-source/biomechanical-hero/hyperframes.json');
    assert.strictEqual(fs.existsSync(configPath), true, 'hyperframes.json must exist');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    assert.strictEqual(config.fps, 60, 'fps must be 60');
    assert.strictEqual(config.width, 2560, 'width must be 2560');
    assert.strictEqual(config.height, 1440, 'height must be 1440');
  });

  it('declares required dark luxury design tokens in tokens.css', () => {
    const cssPath = path.resolve('examples/soren-motion-v8/src/resume/projects/biomechanical-lab/tokens.css');
    assert.strictEqual(fs.existsSync(cssPath), true, 'tokens.css must exist');
    const css = fs.readFileSync(cssPath, 'utf8');
    assert.match(css, /--bg:\s*oklch\(/, 'tokens.css must declare --bg in oklch');
    assert.match(css, /--accent:\s*oklch\(/, 'tokens.css must declare --accent in oklch');
    assert.match(css, /--telemetry-amber:/, 'tokens.css must declare --telemetry-amber');
  });
});
