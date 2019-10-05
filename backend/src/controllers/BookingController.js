const Booking = require('../models/Booking')

module.exports = {
    async store(request, response){
        const { user_id } = request.headers
        const { spot_id } = request.params
        const { date } = request.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })

        await booking.populate('spot').populate('user').execPopulate()

        const ownerSocket = request.connectedUser[booking.spot.user]

        if(ownerSocket){
            request.socketIo.to(ownerSocket).emit('booking', booking)
        }

        return response.json(booking)
    }
}