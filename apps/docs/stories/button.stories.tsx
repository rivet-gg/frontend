import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@rivet-gg/components";
import React from "react";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Button primary>Button</Button>,
};
