export const Handlers = {
  defaultErrorHandler: (errorText: string): void => {
    // eslint-disable-next-line no-console
    console.log("errorText");
    // eslint-disable-next-line no-console
    console.log(errorText);
  },
  defaultErrorAPIHandler: (errorText: string, status: string): void => {
    // eslint-disable-next-line no-console
    console.log("errorText");
    // eslint-disable-next-line no-console
    console.log(errorText);
    // eslint-disable-next-line no-console
    console.log("status");
    // eslint-disable-next-line no-console
    console.log(status);
  },
};
