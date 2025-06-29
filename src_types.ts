export interface Command {
  name: string;
  description: string;
  execute: (args: { msg: any; client: any }) => Promise<void>;
}