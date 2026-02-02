import React from 'react';

type InfoTipProps = {
  text: string;
};

const InfoTip: React.FC<InfoTipProps> = ({ text }) => {
  return (
    <span className="relative inline-flex items-center group">
      <span
        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-300 text-[10px] font-black text-slate-500 bg-white"
        title={text}
      >
        i
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 top-6 w-56 rounded-md bg-slate-900 text-white text-[11px] leading-snug px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-lg z-50">
        {text}
      </span>
    </span>
  );
};

export default InfoTip;
