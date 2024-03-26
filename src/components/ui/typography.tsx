import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

const H1 = ({
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
);

const H2 = ({
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
);

const H3 = ({
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
);

const H4 = ({
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
);

const Paragraph = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) => (
  <p
    className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
    {...props}
  />
);

const Quote = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLQuoteElement>>) => (
  <blockquote
    className={cn(className, "mt-6 border-l-2 pl-6 italic")}
    {...props}
  />
);

const Ul = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => (
  <ul className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")} {...props} />
);

const Ol = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLOListElement>>) => (
  <ol className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")} {...props} />
);

const Code = ({
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
);

const Lead = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <span className={cn(className, "text-xl text-muted-foreground")} {...props} />
);

const Large = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <span className={cn(className, "text-lg font-semibold")} {...props} />
);

const Small = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <span
    className={cn(className, "text-sm font-medium leading-none")}
    {...props}
  />
);

const Muted = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <span className={cn(className, "text-sm text-muted-foreground")} {...props} />
);

export {
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Paragraph as P,
  Quote,
  Ul,
  Ol,
  Code,
  Lead,
  Large,
  Small,
  Muted,
};
