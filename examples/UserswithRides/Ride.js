import dbm from './dbm';

export const RideSchema = function (ride) {
  ride.increments('id').primary();
  ride.integer('userId');
  ride.string('selectedRide', 255);
  ride.string('origin', 255);
  ride.string('destination', 255);
  ride.timestamps();
};

export const Ride = dbm.model('rides');
