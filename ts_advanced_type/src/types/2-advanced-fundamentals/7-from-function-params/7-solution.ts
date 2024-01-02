const sendMessage = (
  recipient: string,
  messageData?: {
    messageType?: string;
    authors?: {
      [key: string]: string;
    };
    content?: string;
  }
) => {
  // Function logic...
};

type SendMessageParameters = Parameters<typeof sendMessage>;
type SendMessageParametersFirstArg = SendMessageParameters[1];
