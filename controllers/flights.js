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
  // for (let number in req.body) {
  //   if (req.body[number] === '') delete req.body[number]
  // }
  // use Flight model to create movie
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


export {
  newFlight as new,
  index,
  create,
  show,
}