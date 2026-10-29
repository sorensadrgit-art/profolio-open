import subprocess
import time
from pathlib import Path

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
qa_dir = Path(r"C:\Users\soren\.gemini\antigravity\scratch\profolio-open\examples\soren-motion-v8\qa\screenshots")
qa_dir.mkdir(parents=True, exist_ok=True)

viewports = [
    (390, 844, "mobile"),
    (768, 1024, "tablet"),
    (1440, 900, "desktop"),
    (1920, 1080, "widescreen")
]

sections = ["about", "experience", "education", "projects", "skills", "contact"]

for w, h, vp_name in viewports:
    for s in sections:
        url = f"http://127.0.0.1:3049/#{s}"
        out_file = qa_dir / f"{s}-{vp_name}-{w}x{h}.png"
        cmd = [
            chrome,
            "--headless=new",
            "--disable-gpu",
            f"--window-size={w},{h}",
            "--virtual-time-budget=3000",
            f"--screenshot={out_file}",
            url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        size = out_file.stat().st_size if out_file.exists() else 0
        print(f"Captured {out_file.name}: {size} bytes")

print("All responsive viewports captured.")
