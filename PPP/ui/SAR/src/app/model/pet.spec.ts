import { Pet, PetType } from './pet';

describe('Pet', () => {
  it('should create an instance', () => {
    expect(new Pet()).toBeTruthy();
  });
});

describe('PetType', () => {
  it('should create an instance', () => {
    expect(new PetType()).toBeTruthy();
  });
});
