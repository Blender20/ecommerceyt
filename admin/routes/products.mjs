import { Router } from 'express'
import { products } from '../constants/index.mjs'

const router = Router()

router.get('/products', (req, res) => {
  res.send(products)
})

router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  const product = products.find((item) => item._id === productId)
  console.log("🚀 ~ router.get ~ product:", product)

  if (!productId) {
    return res.status(404).json({ message: 'Single product was not found' })
  }
  res.send(product)
})

export default router
