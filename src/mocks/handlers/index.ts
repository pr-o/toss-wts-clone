import { stockHandlers } from "./stocks";
import { orderHandlers } from "./orders";
import { newsHandlers } from "./news";
import { communityHandlers } from "./community";
import { marketStatusHandlers } from "./marketStatus";

export const handlers = [...stockHandlers, ...orderHandlers, ...newsHandlers, ...communityHandlers, ...marketStatusHandlers];
