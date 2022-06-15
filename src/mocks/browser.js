import { setupWorker } from "msw";

import auth from "./handlers/auth";
import data from "./handlers/data";

export const worker = setupWorker(...auth, ...data);
