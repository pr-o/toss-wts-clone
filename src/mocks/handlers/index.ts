import { stockHandlers } from "./stocks";
import { orderHandlers } from "./orders";
import { newsHandlers } from "./news";

export const handlers = [...stockHandlers, ...orderHandlers, ...newsHandlers];
