import { range, getPageStartNumber } from "../../util/utils";

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

    // WHEN
    const result2 = range(2, 2);

    // THEN
    expect(result2).toEqual([]);

    // WHEN
    const result3 = range(3, 4);

    // THEN
    expect(result3).toEqual([3]);
  });
});

describe("getPageStartNumber", () => {
  it("gives the correct page start", () => {
    // GIVEN
    const expectedStart = 7;
    const nPages = [1, 3, 2, 3, 1];
    const pageStartIndex = 3;

    // WHEN
    const result = getPageStartNumber(nPages, pageStartIndex);

    // THEN
    expect(result).toBe(expectedStart);
  });
});
