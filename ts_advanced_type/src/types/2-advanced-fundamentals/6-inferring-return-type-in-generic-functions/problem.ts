export async function getUser(): Promise<{
  id: number;
  name: string;
}> {
  return { id: 1, name: 'John Doe' };
}

/*
  YOUR JOB:
  1. Extract the type of the returned value from Promise.
*/

type User = Awaited<ReturnType<typeof getUser>>; //{id: number, name: string}
