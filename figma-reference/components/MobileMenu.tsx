import React from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#FAFAF8]">
      <button className="absolute top-6 right-6 text-[#1a1a1a]" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {["Articles", "Contact"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="font-serif text-2xl font-medium text-[#1a1a1a] transition-colors hover:text-[#12271d]"
          onClick={onClose}
        >
          {item}
        </a>
      ))}
    </div>
  );
};
