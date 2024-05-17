class Vehicle {
  constructor(
    id,
    make,
    model,
    year,
    engine,
    seats,
    transmission,
    AC,
    absBrakes,
    cruise
  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.engine = engine;
    this.cruise = cruise;
    this.seats = seats;
    this.transmission = transmission;
    this.AC = AC;
    this.absBrakes = absBrakes;
  }

  setImages(images) {
    this.images = images;
  }

  toString() {
    return `${this.make}`.concat(" " + `${this.model}`);
  }
}

export default Vehicle;
