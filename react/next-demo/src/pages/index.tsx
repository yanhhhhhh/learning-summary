import { Text } from "@/components/polymorephic/text";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Text as="h1">h1</Text>

      <Text as="h2">h2</Text>
      <Text as="label" htmlFor="someId" size="lg">
        label
      </Text>
      <Text>p 便签</Text>
      <Text as="button">button</Text>
    </main>
  );
}
