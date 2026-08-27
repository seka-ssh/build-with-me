import { useState } from "react";
import { Megaphone, X } from "lucide-react";
import { useSite } from "../context/SiteContext";

/**
 * Announcement banner shown to every visitor at the top of the site.
 * Content + active toggle are controlled from Admin → Settings.
 */
const AnnouncementBanner = () => {
  const { settings } = useSite();
  const [closed, setClosed] = useState(false);
  const text = (settings.announcementText || "").trim();
  if (!settings.announcementActive || !text || closed) return null;

  return (
    <div className="relative z-50 bg-portfolio-gold px-10 py-2.5 text-center text-sm font-bold text-portfolio-bg">
      <Megaphone size={15} className="mr-2 inline -mt-0.5" />
      <span>{text}</span>
      {settings.announcementLink && (
        <a
          href={settings.announcementLink}
          target="_blank"
          rel="noreferrer"
          className="ml-2 underline underline-offset-2 hover:opacity-80"
        >
          Learn more
        </a>
      )}
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setClosed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-black/10"
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default AnnouncementBanner;