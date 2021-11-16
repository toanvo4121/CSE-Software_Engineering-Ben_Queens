import asyncHandler from 'express-async-handler'
import Brand from '../models/brandModel.js'
import Product from '../models/productModel.js'


// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrand = asyncHandler(async(req, res) => {
    const brands = await Brand.find({})
    res.json(brands)
   
})


const getBrandByPathName = asyncHandler(async(req, res) => {
    const brand = await Brand.findOne({pathName: `${req.params.id}`})
    if (brand) {
        const productsID = brand.hasProducts
        res.json(productsID)
    }
    else {
        res.status(404)
        throw new Error('Brand not found!')
    }
})


export {
    getBrand, getBrandByPathName
}