export type NonEmptyArray<T> = unknown;

function submitTickets(subjects: NonEmptyArray<string>) {}

submitTickets(['Custom inq.']); // no error
submitTickets(['Custom inq.', 'any string']); // no error
submitTickets([]); // error
