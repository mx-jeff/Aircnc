const Booking = require('../models/Booking')

module.exports = {
    async store(request, response){
        const { booking_id } = request.params
        const booking = await Booking.findById(booking_id).populate('spot')

        booking.approved = true

        await booking.save()

        const bookingOwnerSocket = request.connectedUsers[booking.user]

        if(bookingOwnerSocket){
            request.socketIo.to(bookingOwnerSocket).emit('booking_response', booking)
        }

        return response.json(booking)
    }
}