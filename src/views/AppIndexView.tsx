import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { VStack } from "@/components/ui/stack";
import { Large } from "@/components/ui/typography";

export const AppIndexView = () => {
  return (
    <VStack>
      <Large>Testing</Large>
      <Grid columns={4}>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
      </Grid>
    </VStack>
  );
};
