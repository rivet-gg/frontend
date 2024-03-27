import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { HStack, VStack } from "@/components/ui/stack";
import { LargeText, Text } from "@/components/ui/typography";

export const AppIndexView = () => {
  return (
    <VStack>
      <HStack justify="between" my="4">
        <HStack align="center" gap="4">
          <Avatar>
            <AvatarImage src="https://assets2.rivet.gg/avatars/avatar-4.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <LargeText>Testing</LargeText>
        </HStack>
        <HStack gap="4">
          <Button>Analytics</Button>
          <Button>Settings</Button>
        </HStack>
      </HStack>
      <Grid columns="4" gap="4">
        <Text>hello</Text>
        <Text>hello</Text>
        <Text>hello</Text>
        <Text>hello</Text>
      </Grid>
    </VStack>
  );
};
