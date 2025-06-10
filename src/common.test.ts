import { validate, ValidationError } from "class-validator";
import { describe, expect, it } from "vitest";
import {
  TestEquals,
  TestIsDefined,
  TestIsOptional,
  TestNotEquals,
} from "./common.js";

describe("IsDefined", () => {
  it("value should not be deleted", async () => {
    const t = new TestIsDefined();
    // Fields without initializers are initialized to undefined.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#description
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier
    delete t.value;
    expect(t).not.toHaveProperty("value");
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be undefined", async () => {
    const t = new TestIsDefined();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be null", async () => {
    const t = new TestIsDefined();
    t.value = null;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value can be false", async () => {
    const t = new TestIsDefined();
    t.value = false;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be NaN", async () => {
    const t = new TestIsDefined();
    t.value = NaN;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be 0", async () => {
    const t = new TestIsDefined();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be -0", async () => {
    const t = new TestIsDefined();
    t.value = -0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be 0n", async () => {
    const t = new TestIsDefined();
    t.value = 0n;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty string", async () => {
    const t = new TestIsDefined();
    t.value = "";
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be true", async () => {
    const t = new TestIsDefined();
    t.value = true;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty array", async () => {
    const t = new TestIsDefined();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty object", async () => {
    const t = new TestIsDefined();
    t.value = {};
    expect(await validate(t)).toStrictEqual([]);
  });
});

describe("IsOptional", () => {
  it("value can be deleted", async () => {
    const t = new TestIsOptional();
    delete t.value;
    expect(t).not.toHaveProperty("value");
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be undefined", async () => {
    const t = new TestIsOptional();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be null", async () => {
    const t = new TestIsOptional();
    t.value = null;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be false", async () => {
    const t = new TestIsOptional();
    t.value = false;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be NaN", async () => {
    const t = new TestIsOptional();
    t.value = NaN;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be 0", async () => {
    const t = new TestIsOptional();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be -0", async () => {
    const t = new TestIsOptional();
    t.value = -0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be 0n", async () => {
    const t = new TestIsOptional();
    t.value = 0n;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty string", async () => {
    const t = new TestIsOptional();
    t.value = "";
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be true", async () => {
    const t = new TestIsOptional();
    t.value = true;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty array", async () => {
    const t = new TestIsOptional();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty object", async () => {
    const t = new TestIsOptional();
    t.value = {};
    expect(await validate(t)).toStrictEqual([]);
  });
});

describe("Equals", () => {
  it("value can be 0", async () => {
    const t = new TestEquals();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be -0", async () => {
    const t = new TestEquals();
    t.value = -0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value should not be 1", async () => {
    const t = new TestEquals();
    t.value = 1;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it('value should not be "0"', async () => {
    const t = new TestEquals();
    t.value = "0";
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("NotEquals", () => {
  it("value should not be 0", async () => {
    const t = new TestNotEquals();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be -0", async () => {
    const t = new TestNotEquals();
    t.value = -0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value can be 1", async () => {
    const t = new TestNotEquals();
    t.value = 1;
    expect(await validate(t)).toStrictEqual([]);
  });
  it('value can be "0"', async () => {
    const t = new TestNotEquals();
    t.value = "0";
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be 0n", async () => {
    const t = new TestNotEquals();
    t.value = 0n;
    expect(await validate(t)).toStrictEqual([]);
  });
});
