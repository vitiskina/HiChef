import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva(null, {
  variants: {
    type: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    variant: {
      default: 'text-black',
      muted: 'text-muted-foreground',
      danger: 'text-red-300',
      icon: 'h-9 w-9',
      small: 'text-sm font-medium',
      large: 'text-lg font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    type: 'p',
  },
});
export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, type, asChild = false, ...props }, ref) => {
    const Element = type ? (type as React.ElementType) : 'p';

    return (
      <Element
        className={cn(typographyVariants({ type, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
export { Typography, typographyVariants };
