class Vehicle {
  constructor(
    id,
    make,
    variant,
    model,
    engine,
    seats,
    transmission,
    AC,
    absBrakes,
    cruise
  ) {
    this.vehicle = id;
    this.make = make;
    this.model = model;
    this.variant = variant;
    this.image = image;
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
