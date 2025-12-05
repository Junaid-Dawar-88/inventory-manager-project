import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Stock {
  id?:         number;
  productId:   number;
  movementType: string;
  reason:       string;
  quantity:     number;
  notes:        string;
}

export const Stock_Routes = {

  '/api/Stock': {
    async GET(req: Request) {
      try {
        const stockData = await prisma.stock.findMany({
          include: {
            product: true
          }
        });
        return Response.json(stockData);
      } catch (error) {
        console.log('GET method error on stock routes', error);
        return Response.json('Server side error on stock routes');
      }
    },

    async POST(req: Request) {
      try {
        const body = await req.json() as Stock;

        const product = await prisma.products.findUnique({
          where: { id: Number(body.productId) }
        });

        if (!product) {
          return new Response(
            JSON.stringify({ error: "Product ID does not exist" }),
          );
        }

        let newQuantity = product.quantity;

        if (body.movementType === 'IN') {
          newQuantity += body.quantity;
        } else if (body.movementType === 'OUT') {
          newQuantity -= body.quantity;
          if (newQuantity < 0) newQuantity = 0; 
        }

        await prisma.products.update({
          where: { id: Number(body.productId) },
          data: { quantity: newQuantity }
        });

        const stockData = await prisma.stock.create({
          data: {
            productId: Number(body.productId),
            movementType: body.movementType,
            reason: body.reason,
            quantity: Number(body.quantity),
            notes: body.notes
          }
        });

        return new Response(JSON.stringify(stockData));
      } catch (error) {
        console.log('POST method error on stock routes', error);
        return Response.json('POST method error on stock routes');
      }
    }
  },

  '/api/Stock/:id': {

    async PUT(req: Request) {
      try {
        const id = req.url.split("/").pop();
        const body = await req.json() as Stock;

        const stockData = await prisma.stock.update({
          where: { id: Number(id) },
          data: {
            productId: Number(body.productId),
            movementType: body.movementType,
            reason: body.reason,
            quantity: Number(body.quantity),
            notes: body.notes
          }
        });

        return Response.json(stockData);
      } catch (error) {
        console.log('PUT method error on stock routes', error);
      }
    },

    async DELETE(req: Request) {
  try {
    const id = req.url.split("/").pop();

    // 1. Get the existing stock entry
    const stockEntry = await prisma.stock.findUnique({
      where: { id: Number(id) }
    });

    if (!stockEntry) {
      return new Response(JSON.stringify({ error: "Stock entry not found" }));
    }

    // 2. Get the product
    const product = await prisma.products.findUnique({
      where: { id: stockEntry.productId }
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }));
    }
    let newQuantity = product.quantity;

    if (stockEntry.movementType === "IN") {
      newQuantity -= stockEntry.quantity;
    } else if (stockEntry.movementType === "OUT") {
      newQuantity -= stockEntry.quantity;
    }

    await prisma.products.update({
      where: { id: stockEntry.productId },
      data: { quantity: newQuantity }
    });

    const deletedStock = await prisma.stock.delete({
      where: { id: Number(id) }
    });

    return Response.json(deletedStock);

  } catch (error) {
    console.log('DELETE method error on stock routes', error);
  }
}

  }
};
