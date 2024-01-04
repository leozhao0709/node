export type NonEmptyArray<T> = [T, ...T[]];

function submitTickets(subjects: NonEmptyArray<string>) {}

submitTickets(['Custom inq.']); // no error
submitTickets(['Custom inq.', 'any string']); // no error
submitTickets([]); // error
