import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "@rivet-gg/components";
import React from "react";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {
  render: (props) => <Button {...props}>Button</Button>,
};
