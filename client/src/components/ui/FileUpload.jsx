import { useRef, useState } from "react";
import { CloudUpload, FileCheck2, Loader2, X } from "lucide-react";

/**
 * Beautiful drag & drop file uploader.
 * Props:
 *  - label        : text shown on the drop zone
 *  - accept       : input accept attr (e.g. "image/*" or ".pdf")
 *  - uploadFn     : async (file) => { url, publicId }
 *  - value        : current url (string)
 *  - onChange     : (url) => void
 *  - hint         : helper text
 *  - preview      : "image" | "file" — how to preview the uploaded value
 */
const FileUpload = ({
  label = "Drag & drop or click to upload",
  accept,
  uploadFn,
  value,
  onChange,
  hint,
  preview = "image",
  folder,
}) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const r = await uploadFn(file, folder);
      onChange(r.url);
    } catch (e) {
      setError(e.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const isImage = preview === "image" && value && /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(value);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition ${
          drag
            ? "border-portfolio-gold bg-portfolio-gold/10"
            : "border-portfolio-border bg-portfolio-bg/60 hover:border-portfolio-gold/60 hover:bg-portfolio-gold/5"
        }`}
      >
        {busy ? (
          <Loader2 size={26} className="animate-spin text-portfolio-gold" />
        ) : (
          <CloudUpload
            size={26}
            className="text-portfolio-subtext transition group-hover:text-portfolio-gold"
          />
        )}
        <span className="text-sm font-semibold text-portfolio-text">
          {busy ? "Uploading..." : label}
        </span>
        {hint && !value && (
          <span className="text-xs text-portfolio-muted">{hint}</span>
        )}
      </div>

      {value && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-portfolio-gold/30 bg-portfolio-gold/5 p-3">
          {isImage ? (
            <img
              src={value}
              alt="Upload preview"
              className="h-12 w-12 rounded-xl border border-portfolio-border object-cover"
            />
          ) : (
            <FileCheck2 className="text-portfolio-gold" size={22} />
          )}
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate text-xs font-semibold text-portfolio-gold-light underline-offset-2 hover:underline"
          >
            {value.startsWith("http") ? value : `Uploaded ✓ (open)`}
          </a>
          <button
            type="button"
            aria-label="Remove file"
            onClick={() => onChange("")}
            className="rounded-full border border-portfolio-border p-1.5 text-portfolio-subtext transition hover:border-red-400/60 hover:text-red-300"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
};

export default FileUpload;