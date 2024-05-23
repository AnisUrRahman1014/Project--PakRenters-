class BookingReport {
  constructor(vehicle, from, to, numberOfDays, rentPerDay) {
    this.vehicle = vehicle;
    this.fromDate = from;
    this.toDate = to;
    this.numberOfDays = numberOfDays;
    this.rentPerDay = rentPerDay;
    this.totalDays = this.calculateDays();
    this.totalBill = this.calculateBookingBill();
    this.commission = this.calculateCommission();
  }

  calculateDays() {
    // Implementation pending. Using dummy data for now
    return this.numberOfDays;
  }

  calculateBookingBill() {
    // Implementation pending. Using dummy data for now
    return this.totalDays * this.rentPerDay;
  }

  getSurcharge() {
    let surcharge = this.totalBill * (20 / 100);
    return surcharge;
  }

  calculateCommission() {
    // Implementation pending. Using dummy data for now

    return this.getSurcharge() * 5 / 100;
  }

  getTotalDays() {
    return this.totalDays;
  }

  getTotalBill() {
    return this.totalBill;
  }

  getCommission() {
    return this.commission;
  }
}

export default BookingReport;
