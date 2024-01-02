const STATUS = {
  PENDING: 'Request is pending.',
  FAILED: 'Request failed.',
  SUCCESS: 'Request was successful',
} as const;

type Status = typeof STATUS;

type StatusResult = Status[keyof Status];

export {};
