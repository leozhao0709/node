export class Server {
  Allowed_Addresses: string[];

  constructor(allow_address: boolean, addresses: string[]) {
    if (allow_address) {
      this.Allowed_Addresses = addresses;
    } else {
      this.Allowed_Addresses = [];
    }
  }
}

const server = new Server(false, ['https://localhost', 'https://localhost']);

server.Allowed_Addresses.filter((address) => address.charAt(4) === 's');
