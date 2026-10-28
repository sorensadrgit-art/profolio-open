"""Package the local production build without owner-specific workspace paths."""
from pathlib import Path
import hashlib
import zipfile

root = Path(__file__).resolve().parent
dist = root / "examples" / "soren-motion-v8" / "dist"
output = root / "artifacts"
if not (dist / "index.html").is_file():
    raise SystemExit("Build examples/soren-motion-v8 before packaging.")
output.mkdir(exist_ok=True)
archive = output / "SOREN-Section-Explorers-v8-Cybernetic.zip"
temporary = archive.with_suffix(".zip.tmp")
files = sorted(path for path in dist.rglob("*") if path.is_file())
with zipfile.ZipFile(temporary, "w", zipfile.ZIP_DEFLATED) as package:
    for path in files:
        package.write(path, path.relative_to(dist).as_posix())
with zipfile.ZipFile(temporary) as package:
    assert package.testzip() is None, "Archive integrity check failed."
    assert len(package.namelist()) == len(files), "Archive file count mismatch."
    for path in files:
        assert package.read(path.relative_to(dist).as_posix()) == path.read_bytes()
temporary.replace(archive)
checksum = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix(".sha256").write_text(f"{checksum}  {archive.name}\n", encoding="utf-8")
print(f"Packaged and verified {len(files)} files: {archive}")
