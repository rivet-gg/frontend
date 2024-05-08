import type { Meta, StoryObj } from "@storybook/react";

import { Button as ButtonCmp } from "@rivet-gg/components";
import { ExternalLink } from "lucide-react";
import React from "react";

const meta = {
  title: "Button",
  component: ButtonCmp,
  args: {
    variant: "default",
    size: "default",
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "link",
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "lg", "default", "icon"],
    },
    isLoading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ButtonCmp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  render: (props) => <ButtonCmp {...props}>Button</ButtonCmp>,
};

export const TextAndIcon: Story = {
  render: (props) => (
    <ButtonCmp {...props} endIcon={<ExternalLink />}>
      Link
    </ButtonCmp>
  ),
};

export const IconOnly: Story = {
  render: (props) => (
    <ButtonCmp {...props}>
      <ExternalLink />
    </ButtonCmp>
  ),
};

IconOnly.args = {
  size: "icon",
};
