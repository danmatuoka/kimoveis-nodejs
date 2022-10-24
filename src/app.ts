import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRoutes from "./routes/user.routes"
import sessionRoutes from "./routes/session.routes"
import categoryRoutes from "./routes/category.routes"
import propertyRoutes from "./routes/property.routes"
import scheduleRoutes from "./routes/schedule.routes"
import handleErrorMiddleware from "./middlewares/handleError.middleware"


const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', sessionRoutes)
app.use('/categories', categoryRoutes)
app.use('/properties', propertyRoutes)
app.use('/schedules', scheduleRoutes)

app.use(handleErrorMiddleware)

export default app