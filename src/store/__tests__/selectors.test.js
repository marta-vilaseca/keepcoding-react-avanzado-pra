import { getAdvertByID } from "../selectors";

// selector test
describe("getAdvertByID", () => {
  const advertId = "cf33d836-b317-462f-a68e-1f3e2e4ba4e2";
  const adverts = [{ id: advertId }];
  const state = { adverts: { data: adverts } };

  test("should return an advert by advertId", () => {
    expect(getAdvertByID(advertId)(state)).toBe(adverts[0]);
  });

  test("should not return any advert", () => {
    expect(getAdvertByID("2")(state)).toBeUndefined();
  });
});
