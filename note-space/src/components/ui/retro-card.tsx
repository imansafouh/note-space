import { useState } from "react";
import { cn } from "@/lib/utils";

interface RetroCardProps extends React.ComponentProps<"div"> {
  createdAt: Date;
  content: string;
}

export function RetroCard({ className, createdAt, content }: RetroCardProps) {
  const [expanded, setExpanded] = useState(false);
  const maxPreviewLength = 120;

  const isOverflowing = content.length > maxPreviewLength;
  const previewText =
    isOverflowing && !expanded
      ? content.slice(0, maxPreviewLength) + "..."
      : content;

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="w-[350px] h-[260px] flex flex-col border-4 border-black bg-background p-6 shadow-[8px_8px_0_0_#000] transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-b hover:from-gray-200 hover:to-white">
        <time
          dateTime={createdAt.toISOString()}
          className="self-start border-2 border-black bg-primary px-3 py-1 text-xs font-bold text-white transition-transform hover:scale-105 mb-2"
        >
          {createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <p className="text-md border-l-4 border-primary pl-4 text-gray-800 transition-colors hover:text-gray-600 flex-1 overflow-hidden">
          {previewText}
        </p>
        {isOverflowing && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-500 mt-2 underline self-start hover:text-blue-700"
          >
            {expanded ? "Show less" : "See more"}
          </button>
        )}
      </div>
    </div>
  );
}
