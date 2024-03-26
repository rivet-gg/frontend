import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

export const Typography = {
  h1: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
    <h1
      className={cn(
        className,
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      )}
      {...props}
    />
  ),
  h2: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
    <h2
      className={cn(
        className,
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      )}
      {...props}
    />
  ),
  h3: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
    <h3
      className={cn(
        className,
        "scroll-m-20 text-2xl font-semibold tracking-tight",
      )}
      {...props}
    />
  ),
  h4: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
    <h4
      className={cn(
        className,
        "scroll-m-20 text-xl font-semibold tracking-tight",
      )}
      {...props}
    />
  ),
  p: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
    <p
      className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
      {...props}
    />
  ),
  blockquote: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLQuoteElement>>) => (
    <blockquote
      className={cn(className, "mt-6 border-l-2 pl-6 italic")}
      {...props}
    />
  ),
  ul: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => (
    <ul
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  ),
  ol: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLOListElement>>) => (
    <ol
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  ),
  code: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
    <code
      className={cn(
        className,
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      )}
      {...props}
    />
  ),
  lead: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-xl text-muted-foreground")}
      {...props}
    />
  ),
  large: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span className={cn(className, "text-lg font-semibold")} {...props} />
  ),
  small: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-sm font-medium leading-none")}
      {...props}
    />
  ),
  muted: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-sm text-muted-foreground")}
      {...props}
    />
  ),
};
