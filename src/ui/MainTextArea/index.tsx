import { forwardRef, type TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
};

const MainTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label className="text-sm text-slate-400">{label}</label>}

        <textarea
          ref={ref}
          className={`
            w-full min-h-[120px]
            bg-slate-900 border border-slate-700
            rounded-lg p-3
            text-white text-sm
            placeholder:text-slate-500
            resize-none
            outline-none
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            transition-colors
            ${className}
          `}
          {...props}
        />

        {helperText && (
          <span className="text-xs text-slate-500">{helperText}</span>
        )}
      </div>
    );
  },
);

MainTextarea.displayName = "MainTextarea";

export default MainTextarea;
