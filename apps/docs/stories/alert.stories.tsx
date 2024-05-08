import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert as AlertCmp,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
} from "@rivet-gg/components";
import React from "react";

import { CreditCard } from "lucide-react";

const meta = {
  title: "Alert",
  component: AlertCmp,
  args: {},
  argTypes: {},
} satisfies Meta<typeof AlertCmp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alert: Story = {
  render: (props) => (
    <AlertCmp {...props}>
      <CreditCard className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        <Flex direction="col" items="start" gap="4">
          You must add a payment method before you can add servers to your
          project.
          <Button>Add payment method</Button>
        </Flex>
      </AlertDescription>
    </AlertCmp>
  ),
};
