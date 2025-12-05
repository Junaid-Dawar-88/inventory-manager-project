import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface Product {
  id?:        number
  name:       string
  sku :       string
  supplier:    string
  description: string
  price :      number
  quantity:    number
}

export const Product_Routes = {

    '/api/Products': {
        async GET(req: Request){
            try{
                const productData = await prisma.products.findMany({
                    include:{
                        stock: true
                    }
                })
                return Response.json(productData)
            } catch (error) {
                console.log('get method error')
                return Response.json('server side error on product routes ')
            }
        },
        async POST(req: Request){
            try{

                const body = await req.json() as Product
                const productData = await prisma.products.create({
                    data: {
                        name: body.name,
                        sku: body.sku,
                        supplier: body.supplier,
                        description: body.description,
                        price: Number(body.price),
                        quantity: Number(body.quantity)
                    }
                })
                return  Response.json(productData)
            } catch(error) {
                console.log('post method error on product')
                return Response.json('post method error on product routes')
            }
        }
    },
    '/api/Products/:id': {
        async PUT(req: Request){
            try{
                const id = (req.url.split("/").pop())
                const body = await req.json() as Product
                const productData = await prisma.products.update({
                    where: {id: Number(id)},
                    data: {
                        name : body.name,
                        sku: body.sku,
                        supplier: body.supplier,
                        description: body.description,
                        price: Number(body.price),
                        quantity: Number(body.quantity) 
                    }
                })
                return Response.json(productData)
            } catch (error) {
                console.log('put method error on product routes')
            }
        },
        async DELETE(req: Request) {
             try{
                const id = (req.url.split("/").pop())
                const productData = await prisma.products.delete({
                    where: {id: Number(id)}
                })
                return Response.json(productData)
             }
         catch (error) {
           console.log('delete method error on product table')
        }
        }
    }

}