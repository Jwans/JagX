import { aiCommand } from "./ai";
import { removeCommand } from "./remove";
import { statusCommand } from "./status";
import { viewOnceCommand } from "./viewonce";
import { antiDeleteCommand } from "./antidelete";
import { antiViewOnceCommand } from "./antiviewonce";
import { pairCommand } from "./pair";
// ...import other commands as needed

export const commands = [
  aiCommand,
  removeCommand,
  statusCommand,
  viewOnceCommand,
  antiDeleteCommand,
  antiViewOnceCommand,
  pairCommand,
  // ...add more commands here
];