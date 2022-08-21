import { merge } from "../../../src/util/merge";

describe("Merge Utils", () => {
  it("should set the value of second object in result property", () => {
    const obj1 = { foo: "bar" };
    const obj2 = { foo: "buzz" };
    const result = merge(obj1, obj2);

    expect(result.foo).toBe("buzz");
  });

  it("should merge two object properties", () => {
    const obj1 = { foo: "bar" };
    const obj2 = { fizz: "buzz" };
    const result = merge(obj1, obj2);

    expect(result.foo).toBe("bar");
    expect(result.fizz).toBe("buzz");
  });

  it("should set the value of first object in result property", () => {
    const obj1 = { foo: "bar" };
    const obj2 = { foo: undefined };
    const result = merge(obj1, obj2);

    expect(result.foo).toBe("bar");
  });
});
