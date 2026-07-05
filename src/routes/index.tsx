import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const variableA = process.env.MY_VARIABLE_A || "Not Found";
    const mySecret = process.env.MY_SECRET || "Not Found";
    console.log("Server-side variable A:", variableA);
    console.log("Server-side my secret:", mySecret);
    return {
      variableA,
      mySecret
    };
  },
  component: Home,
});

function Home() {
  // 2. Consume the data safely inside your React component
  const { variableA, mySecret } = Route.useLoaderData();

  // Client-side print (appears in your browser developer console)
  console.log("Client-side received variable A:", variableA);
  console.log("Client-side received my secret:", mySecret);
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      {/* 3. Output it to the screen */}
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="font-semibold">
          My Variable A: <span className="text-blue-600">{variableA}</span>
          My Secret: <span className="text-blue-600">{mySecret}</span>
        </p>
      </div>
    </div>
  );
}
