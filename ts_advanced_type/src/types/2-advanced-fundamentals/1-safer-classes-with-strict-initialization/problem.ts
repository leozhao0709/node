/*
  YOUR JOB:
  1. Make sure Allowed_Addresses shows error if not initialized. 
  Hint: Look at the compiler configurations.
  2. After you  get the error on line 8, try to address it properly.
*/

export class Server {
  //ts-expect-error
  Allowed_Addresses: string[];

  constructor() {}
}

const server = new Server();

server.Allowed_Addresses.filter((address) => address.charAt(4) === 's');
