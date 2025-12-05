import { serve } from "bun";
import index from './index.html'
import { Product_Routes } from "./routes/product-routes";
import { Stock_Routes } from "./routes/stock-routes";

const server = serve({
     port: 4000,
  routes: {
    "/*": index,
    ...Product_Routes,
    ...Stock_Routes
  
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});
console.log(`Server running at ${server.url}`);
//  user    User  @relation(fields: [userId], references: [userId] , onDelete: Cascade, onUpdate: Cascade)
