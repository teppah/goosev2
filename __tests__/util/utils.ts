import { range } from "../../util/utils";

describe("range", () => {
  it("gives the correct range", () => {
    // GIVEN
    const expected = [3, 4, 5, 6, 7];
    const start = 3;
    const end = 8;

    // WHEN
    const result = range(start, end);

    // THEN
    expect(result).toEqual(expected);
  });
});
