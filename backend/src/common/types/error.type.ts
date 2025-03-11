export type TypeORMError = {
  driverError: {
    code: string;
  };
} & Error;
