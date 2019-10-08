const express = require('express')
const multer = require('multer')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const approvalController = require('./controllers/ApprovalController')
const rejectionController = require('./controllers/RejectionController')
const uploadConfig = require('./config/upload')


const routes = express.Router()
const upload = multer(uploadConfig)

routes.post(`/sessions`, SessionController.store)
routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)
routes.get('/dashboard', DashboardController.show)
routes.post('/spots/:spot_id/bookings', BookingController.store)
routes.post('/bookings/:booking_id/approval', approvalController.store)
routes.post('/bookings/:booking_id/rejection', rejectionController.store)

module.exports = routes