export const fakeFetch = async () => {
  return {
    id: "test_id",
  };
};

const getFakeData = async () => {
  const data = await fakeFetch();
  return {
    result: {
      data,
    },
  };
};

type InferDataFromResult<T> = unknown;

type test = InferDataFromResult<typeof getFakeData>;
/*
   {
      data: {
        id: string;
    }
*/
