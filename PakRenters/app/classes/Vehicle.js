class Vehicle {
  constructor(
    id,
    make,
    model,
    year,
    engine,
    seats,
    transmission,
    traction,
    absBrakes,
    cruise,
    location,
    rent,
    comments,
    rating,
    image
  ) {
    this.postId = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.location = location;
    this.rent = rent;
    this.comments = comments;
    this.rating = rating;
    this.image = image;
    this.engine = engine;
    this.cruise = cruise;
    this.seats = seats;
    this.transmission = transmission;
    this.traction = traction;
    this.absBrakes = absBrakes;
  }

  toString() {
    return `${this.make}`.concat(" " + `${this.model}`);
  }
}

export default Vehicle;
