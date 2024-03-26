import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

export const Typography = {
  H1: ({
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
  H2: ({
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
  H3: ({
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
  H4: ({
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
  P: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
    <p
      className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
      {...props}
    />
  ),
  Quote: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLQuoteElement>>) => (
    <blockquote
      className={cn(className, "mt-6 border-l-2 pl-6 italic")}
      {...props}
    />
  ),
  Ul: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => (
    <ul
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  ),
  Ol: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLOListElement>>) => (
    <ol
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  ),
  Code: ({
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
  Lead: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-xl text-muted-foreground")}
      {...props}
    />
  ),
  Large: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span className={cn(className, "text-lg font-semibold")} {...props} />
  ),
  Small: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-sm font-medium leading-none")}
      {...props}
    />
  ),
  Muted: ({
    className,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span
      className={cn(className, "text-sm text-muted-foreground")}
      {...props}
    />
  ),
};
