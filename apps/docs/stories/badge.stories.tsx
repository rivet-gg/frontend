import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@rivet-gg/components";
import React from "react";

const meta = {
  title: "Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const badge: Story = {
  render: (props) => <Badge {...props}>Badge</Badge>,
};