export interface PasswordService {
  generate: <HashOptions extends boolean = false>(
    options?: Partial<{
      length: number;
      hash: HashOptions;
    }>,
  ) => Promise<
    HashOptions extends false
      ? string
      : {
          password: string;
          hashPassword: string;
        }
  >;
  hash: (password: string) => Promise<string>;

  validate: (password: string, hashedPassword: string) => Promise<boolean>;
}
