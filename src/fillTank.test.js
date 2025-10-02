'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill full tank', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(100);
    expect(customer.money).toBe(0);
  });

  it('should fill until money ends', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should fill until amount limit', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(500);
  });

  it('should round fuel down', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 9.99, 200);

    expect(customer.vehicle.fuelRemains).toBe(100.0);
    expect(customer.money).toBeCloseTo(1, 2);
  });

  it('should round price to cents', () => {
    const customer = {
      money: 999.99,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(99.9);
    expect(customer.money).toBeCloseTo(0.99, 2);
  });

  it('should skip when less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 99,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(99);
    expect(customer.money).toBe(1000);
  });

  it('should update fuel and money', () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(0);
  });

  it('should handle exact money match', () => {
    const customer = {
      money: 1247,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(100);
    expect(customer.money).toBe(247);
  });

  it('should handle exact space match', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 200);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(200);
  });
});
