import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"

export const bootstrab= (app)=>{
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subcategoryRouter)
    app.use('/api/brand',brandRouter)

}