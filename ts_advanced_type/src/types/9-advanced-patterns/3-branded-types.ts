import { Brand } from "./utils/brand";

type Username = Brand<string, "Username">;
type Role = Brand<string, "Role">;

const username = "coldelicks" as Username;
const role = "admin" as Role;

let testUsername: Username;
testUsername = role;
