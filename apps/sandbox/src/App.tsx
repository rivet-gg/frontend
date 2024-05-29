import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex,
  H1,
} from "@rivet-gg/components";

function App() {
  return (
    <div className="container">
      <Flex direction="col" gap="4" items="start">
        <H1>Sandbox</H1>
        <Card>
          <CardHeader>
            <CardTitle>Hello there!</CardTitle>
            <CardDescription>This is Rivet Sandbox.</CardDescription>
          </CardHeader>
        </Card>
      </Flex>
    </div>
  );
}

export default App;
