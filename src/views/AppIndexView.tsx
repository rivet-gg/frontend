import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { LargeText, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/auth";

export const AppIndexView = () => {
  const auth = useAuth();
  return (
    <Flex direction="col">
      <Flex direction="row" justify="between" my="4">
        <Flex direction="row" items="center" gap="4">
          <Avatar>
            <AvatarImage src="https://assets2.rivet.gg/avatars/avatar-4.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <LargeText>Testing</LargeText>
        </Flex>
        <Flex direction="row" gap="4">
          <Button>Analytics</Button>
          <Button>Settings</Button>
        </Flex>
      </Flex>
      <Grid columns="4" gap="4">
        <Text>hello</Text>
        <Text>hello</Text>
        <Text>hello</Text>
        <Text>hello</Text>
      </Grid>
      <Flex>{JSON.stringify(auth.profile, null, 2)}</Flex>
    </Flex>
  );
};
