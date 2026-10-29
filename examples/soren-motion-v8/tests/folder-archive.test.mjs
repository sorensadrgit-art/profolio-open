import assert from 'node:assert/strict';
import test from 'node:test';
import { sectionThemes } from '../src/resume/folder-archive/sectionTheme.ts';
import { paperManifest } from '../src/resume/folder-archive/paperManifest.ts';

test('paperManifest contains all 6 sections with required 4/4/4/5/4/4 papers', () => {
  const sections = ['about', 'experience', 'education', 'projects', 'skills', 'contact'];
  assert.deepEqual(Object.keys(paperManifest), sections);

  assert.equal(paperManifest.about.length, 4);
  assert.equal(paperManifest.experience.length, 4);
  assert.equal(paperManifest.education.length, 4);
  assert.equal(paperManifest.projects.length, 5);
  assert.equal(paperManifest.skills.length, 4);
  assert.equal(paperManifest.contact.length, 4);

  // Exact paper names
  assert.deepEqual(
    paperManifest.about.map(p => p.title),
    ['Background', 'Values', 'Focus', 'Current Direction']
  );
  assert.deepEqual(
    paperManifest.experience.map(p => p.title),
    ['Arcadia Hybrid Lab', 'Creative Development', 'U.S. Army', 'Clinical Education']
  );
  assert.deepEqual(
    paperManifest.education.map(p => p.title),
    ['DPT Program', 'Arcadia University', 'Academic Interests', 'Independent Learning']
  );
  assert.deepEqual(
    paperManifest.projects.map(p => p.title),
    ['KineLab PT', 'SOREN MCP V3', 'Steppr / Spline', 'Living Résumé', 'Biomechanical Lab']
  );
  assert.deepEqual(
    paperManifest.skills.map(p => p.title),
    ['Web Engineering', 'Motion Design', '3D & Creative Tech', 'Movement & AI']
  );
  assert.deepEqual(
    paperManifest.contact.map(p => p.title),
    ['GitHub', 'Spline Project', 'Email — Add Later', 'LinkedIn — Add Later']
  );
});

test('section themes match the required authentic palette and folder colors', () => {
  assert.equal(sectionThemes.about.folderColor.toLowerCase(), '#00f5a0');
  assert.equal(sectionThemes.experience.folderColor.toLowerCase(), '#ff9f43');
  assert.equal(sectionThemes.education.folderColor.toLowerCase(), '#00d2d3');
  assert.equal(sectionThemes.projects.folderColor.toLowerCase(), '#3867d6');
  assert.equal(sectionThemes.skills.folderColor.toLowerCase(), '#a55eea');
  assert.equal(sectionThemes.contact.folderColor.toLowerCase(), '#b9c4d0');
  assert.equal(sectionThemes.contact.glowColor.toLowerCase(), '#f5f6fa');
});

test('no fabricated metrics or default magic-bento placeholder text in manifest', () => {
  const json = JSON.stringify(paperManifest).toLowerCase();
  assert.ok(!json.includes('12.4k'));
  assert.ok(!json.includes('$48.2k'));
  assert.ok(!json.includes('sso'));
  assert.ok(!json.includes('enterprise-grade protection'));
  assert.ok(!json.includes('streamline workflows'));
});

test('military experience retains unverified dates limitation', () => {
  const army = paperManifest.experience.find(p => p.title === 'U.S. Army');
  assert.ok(army, 'U.S. Army paper must exist');
  const text = JSON.stringify(army);
  assert.ok(
    text.includes('service dates will be added') || text.includes('pending résumé review') || text.includes('unverified'),
    'Must retain explicit limitation on military dates'
  );
});

test('contact papers contain verified GitHub and Spline links and honest pending placeholders', () => {
  const gh = paperManifest.contact.find(p => p.title === 'GitHub');
  assert.equal(gh?.href, 'https://github.com/sorensadrgit-art');

  const spline = paperManifest.contact.find(p => p.title === 'Spline Project');
  assert.equal(spline?.href, 'https://app.spline.design/file/a087c1a8-3639-41cd-bdcd-3da0a3343377');

  const email = paperManifest.contact.find(p => p.title.includes('Email'));
  assert.ok(email?.isPending, 'Email must be marked pending');

  const linkedIn = paperManifest.contact.find(p => p.title.includes('LinkedIn'));
  assert.ok(linkedIn?.isPending, 'LinkedIn must be marked pending');
});

test('specialized interactive capabilities are assigned to their respective papers', () => {
  const educationAnatomy = paperManifest.education.find(p => p.hasInteractiveAnatomy);
  assert.ok(educationAnatomy, 'Education must have interactive anatomy paper');

  const kinelab = paperManifest.projects.find(p => p.title === 'KineLab PT');
  assert.ok(kinelab?.hasMotionDemo, 'KineLab must have motion demo');

  const mcp = paperManifest.projects.find(p => p.title === 'SOREN MCP V3');
  assert.ok(mcp?.hasSystemStudy, 'SOREN MCP must have system study');

  const steppr = paperManifest.projects.find(p => p.title === 'Steppr / Spline');
  assert.ok(steppr?.hasStepprStudy, 'Steppr must have steppr study');

  const livingResume = paperManifest.projects.find(p => p.title === 'Living Résumé');
  assert.ok(livingResume?.hasResumeStudy, 'Living Résumé must have film study');

  const biomech = paperManifest.projects.find(p => p.title === 'Biomechanical Lab');
  assert.ok(biomech?.hasBiomechLab, 'Biomechanical Lab must have 3D laboratory study');
});
