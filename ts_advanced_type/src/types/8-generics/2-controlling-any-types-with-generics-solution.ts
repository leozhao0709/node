export const getUser = async <TUser>(id: number) => {
  const user: TUser = await fetch(`"/users"/${id}`).then((response) =>
    response.json()
  );
  return user;
};

/*
  Your job:
  Make the getUser functino accept generic type arguments so the data infers 
  the proper type that is
*/

const myFunc = async () => {
  const data = await getUser<{ id: number; username: string }>(23);
};
