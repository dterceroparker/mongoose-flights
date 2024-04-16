import { Flight } from '../models/flight.js'

function index(req, res) {
   // use flight model to search for all flights
  Flight.find({})
  .then(flights => {
    // render a view (flights/index) and pass flights and title 
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      flight: flight,
      title: 'Flight Detail'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  // remove empty properties on req.body
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  // use Flight model to create flight
  Flight.create(req.body)
  .then(flight => {
    // redirect somewhere
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function edit(req, res) {
  // find the flight by flight._id (req.params.flightId)
  Flight.findById(req.params.flightId)
  .then(flight => {
    // render a flights/edit view and pass the flight and title to it
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
 // remove empty properties on req.body
for (let key in req.body) {
  if (req.body[key] === '') delete req.body[key]
}
  // use Flight model to create flight
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    // redirect to show view
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  // find the ticket (by _id)
  Flight.findById(req.params.flightId)
  .then(flight => {
    // create the ticket (by pushing into tickets array)
    flight.tickets.push(req.body)
    // save the flight document
    flight.save()
    .then(() => {
      // redirect to the show view
      res.redirect(`/flights/${req.params.flightId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  // use the model to delete the flight
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    // redirect back to index view
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  index,
  create,
  show,
  edit,
  deleteFlight as delete, 
  update,
  createTicket,
}