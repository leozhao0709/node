export async function getUser(): Promise<{
  id: number;
  name: string;
}> {
  return { id: 1, name: "John Doe" };
}

type User = Awaited<ReturnType<typeof getUser>>;
