# SOREN Living Résumé Portfolio (v8) — Biomechanical Cybernetic Lab Extension

This directory contains the editable source for Soren Sadr's Living Résumé Portfolio v8, incorporating the **Biomechanical Cybernetic Lab** real-time 3D and cinematic video extension.

---

## 1. Project 05: Biomechanical Cybernetic Lab

* **Domain Intersection:** Arcadia University Doctor of Physical Therapy candidate (2028) × Creative Technologist (motion systems, Three.js, real-time 3D).
* **3D Viewport:** Interactive Three.js / React Three Fiber canvas (`KinematicCanvas.tsx`) paired with custom GLSL arc telemetry shaders (`KinematicShader.ts`).
* **Hero Film Pipeline:** 15-second, 2560×1440 (1440p) @ 60 fps cinematic sequence authored via Remotion and HyperFrames (`motion-source/biomechanical-hero/`).
* **Design Systems:** Generated via local OpenDesign daemon (`127.0.0.1:58879`) using `modern-minimal` and `tech-utility` postures.

---

## 2. Architecture & File Structure

```
examples/soren-motion-v8/
├── public/assets/
│   ├── models/
│   │   ├── simready-franka-arm.opt.glb         # NVIDIA SimReady asset (<2.5 MB)
│   │   └── biomech-joint-assembly.opt.glb      # Adapted BodyParts3D anatomy
│   └── textures/
│       └── roughness-imperfections.png         # Synthesized via gpt-image-2
├── src/resume/
│   ├── SectionExplorer.tsx                     # 5-project catalog and navigation
│   └── projects/biomechanical-lab/
│       ├── BiomechanicalLabProject.tsx         # Accessible modal presentation
│       ├── KinematicCanvas.tsx                 # Real-time WebGL canvas with fallback
│       ├── KinematicShader.ts                  # GLSL telemetry ribbon shader
│       ├── telemetry-data.ts                   # 97-frame clinical kinematic model
│       └── tokens.css                          # Dark luxury design tokens
```

---

## 3. Verification Commands

Run unit tests:
```bash
node --test tests/*.test.mjs
```

Verify build & bundle isolation:
```bash
npm run build
```

---

## 4. Attribution & Disclaimers

* **BodyParts3D:** © Database Center for Life Science (DBCLS), licensed under CC BY 4.0.
* **NVIDIA SimReady Assets:** © NVIDIA Corporation, licensed under CC BY 4.0.
* **Clinical Disclaimer:** Kinematic curves are demonstration data authored for technical showcase. They do not represent medical diagnostics or certified physical therapy treatment data.
