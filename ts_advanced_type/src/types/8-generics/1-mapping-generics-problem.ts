export const submitData = (data: unknown) => {
  return {
    ...data,
    timestamp: new Date(),
  };
};

const data = [
  {
    id: 123,
    title: "This is a fake title!",
  },
];

const submittedUsers = data.map(submitData);
