import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[116px] w-full rounded-lg border border-border bg-offwhite-pure px-3.5 py-3 text-sm text-navy placeholder:text-slate-blue/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:border-navy disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
