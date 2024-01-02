const STATUS = {
  PENDING: "Request is pending.",
  FAILED: "Request failed.",
  SUCCESS: "Request was successful",
} as const;

type PendingStatus = (typeof STATUS)["PENDING"];
type FailedStatus = (typeof STATUS)["FAILED"];
type SuccessStatus = (typeof STATUS)["SUCCESS"];
