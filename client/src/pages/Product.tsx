import _ from 'lodash'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa6'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { ProductProps } from '../../type'
import { productPayment } from '../assets'
import AddToCardBtn from '../ui/AddToCardBtn'
import CategoryFilters from '../ui/CategoryFilters'
import Container from '../ui/Container'
import FormattedPrice from '../ui/FormattedPrice'
import PriceTag from '../ui/PriceTag'
import ProductCard from '../ui/ProductCard'
import Loading from '../ui/Loading'
import ProductFeatures from '../ui/ProductFeatures'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const Product = () => {
  const [productData, setProductData] = useState<ProductProps | null>(null)
  const [allProducts, setAllProducts] = useState<ProductProps[]>([])
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        if (id) {
          const productRef = doc(db, 'Products', id)
          const productSnap = await getDoc(productRef)
          if (productSnap.exists()) {
            const product = productSnap.data() as ProductProps
            setProductData(product)
            setImgUrl(product?.images[0])
          } else {
            console.log('No such product!')
          }
        } else {
          const productsCol = collection(db, 'Products')
          const productSnapshot = await getDocs(productsCol)
          const productsList = productSnapshot?.docs.map(doc => ({
            ...doc.data()
          })) as ProductProps[]
          setAllProducts(productsList)
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [id])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>

          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className='flex items-start'>
                <div>
                  {productData?.images?.map((item) => (
                    <img
                      key={item}
                      src={item}
                      alt='img'
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${imgUrl === item &&
                        'border border-gray-500 rounded-sm opacity-100'
                        }`}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>
                <div>
                  <img src={imgUrl} alt='product-image' />
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-3xl font-bold'>{productData?.name}</h2>
                <div className='flex items-center justify-between'>
                  <PriceTag
                    regularPrice={productData?.regularPrice}
                    discountedPrice={productData?.discountedPrice}
                    className='text-xl'
                  />
                  <div className='flex items-center gap-1'>
                    <div className='text-base text-lightText flex items-center'>
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                    </div>
                    <p className='text-base font-semibold'>{`(${productData?.quantity} available)`}</p>
                  </div>
                </div>
                <p className='flex items-center'>
                  <FaRegEye className='mr-1' />{' '}
                  <span className='font-semibold mr-1'>
                    {productData?.quantity}
                  </span>
                  {'  '}
                  people are viewing this right now
                </p>
                <p>
                  You are saving{' '}
                  <span className='text-base font-semibold text-green-500'>
                    <FormattedPrice
                      amount={
                        productData?.regularPrice! -
                        productData?.discountedPrice!
                      }
                    />
                  </span>{' '}
                  upon purchase
                </p>
                <div>
                  <p>
                    Brand:{' '}
                    <span className='font-medium'>{productData?.brand}</span>
                  </p>
                  <p>
                    Category:{' '}
                    <span className='font-medium'>{productData?.category}</span>
                  </p>
                </div>
                <p>
                  Description:{' '}
                  <span className='font-medium'>{productData?.description}</span>
                </p>

                <AddToCardBtn
                  className='bg-black/80 py-3 text-base text-gray-200 hover:scale-100 hover:text-white duration-200'
                  title='Buy now'
                  product={productData}
                />

                <div className='bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2'>
                  <img
                    src={productPayment}
                    alt='payment'
                    className='w-auto object-cover'
                  />
                  <p className='font-semibold'>
                    Guaranteed safe & secure checkout
                  </p>
                </div>
              </div>
              <ProductFeatures />
            </div>
          ) : (
            <div className='flex items-start gap-10'>
              <CategoryFilters id={id} />
              <div>
                <p className='text-4xl font-semibold mb-5 text-center'>
                  Products Collection
                </p>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                  {loading ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    allProducts?.map((item: ProductProps) => (
                      <ProductCard item={item} key={item?._id} />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  )
}

export default Product
