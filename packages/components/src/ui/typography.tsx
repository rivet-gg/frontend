// This file is based on the typography components from https://ui.shadcn.com/docs/components/typography
// with some modifications to fit the project's design system.
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { PropsWithChildren } from "react";

type TypographyElementProps<T extends keyof JSX.IntrinsicElements> =
  PropsWithChildren<JSX.IntrinsicElements[T]> & {
    asChild?: boolean;
  };

const H1 = ({ className, asChild, ...props }: TypographyElementProps<"h1">) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp
      className={cn(
        className,
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      )}
      {...props}
    />
  );
};

const H2 = ({ className, asChild, ...props }: TypographyElementProps<"h2">) => {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp
      className={cn(
        className,
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      )}
      {...props}
    />
  );
};

const H3 = ({ className, asChild, ...props }: TypographyElementProps<"h3">) => {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp
      className={cn(
        className,
        "scroll-m-20 text-2xl font-semibold tracking-tight",
      )}
      {...props}
    />
  );
};

const H4 = ({ className, asChild, ...props }: TypographyElementProps<"h4">) => {
  const Comp = asChild ? Slot : "h4";
  return (
    <Comp
      className={cn(
        className,
        "scroll-m-20 text-xl font-semibold tracking-tight",
      )}
      {...props}
    />
  );
};

const Paragraph = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"p">) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      className={cn(className, "leading-7 [&:not(:first-child)]:mt-6")}
      {...props}
    />
  );
};

const Quote = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"blockquote">) => {
  const Comp = asChild ? Slot : "blockquote";
  return (
    <Comp className={cn(className, "mt-6 border-l-2 pl-6 italic")} {...props} />
  );
};

const Ul = ({ className, asChild, ...props }: TypographyElementProps<"ul">) => {
  const Comp = asChild ? Slot : "ul";
  return (
    <Comp
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  );
};

const Ol = ({ className, asChild, ...props }: TypographyElementProps<"ol">) => {
  const Comp = asChild ? Slot : "ol";
  return (
    <Comp
      className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
      {...props}
    />
  );
};

const Code = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"code">) => {
  const Comp = asChild ? Slot : "code";
  return (
    <Comp
      className={cn(
        className,
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      )}
      {...props}
    />
  );
};

const Lead = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"span">) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(className, "text-xl text-muted-foreground")}
      {...props}
    />
  );
};

const LargeText = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"span">) => {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(className, "text-lg font-semibold")} {...props} />;
};

const SmallText = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"span">) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(className, "text-sm font-medium leading-none")}
      {...props}
    />
  );
};

const MutedText = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"span">) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(className, "text-sm text-muted-foreground")}
      {...props}
    />
  );
};

const Strong = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"span">) => {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(className, "font-bold")} {...props} />;
};

const Link = ({
  className,
  asChild,
  ...props
}: TypographyElementProps<"a">) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className={cn(className, "font-medium underline underline-offset-4")}
      {...props}
    />
  );
};

export {
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Paragraph as Text,
  Quote,
  Ul,
  Ol,
  Code,
  Lead,
  LargeText,
  SmallText,
  MutedText,
  Strong,
  Link,
};
