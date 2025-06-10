import { validate, ValidationError } from "class-validator";
import { describe, expect, it } from "vitest";
import { TestEqualsEach, TestIsDefinedEach } from "./common-each.js";

describe("IsDefined each", () => {
  it("undefined", async () => {
    const t = new TestIsDefinedEach();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("0", async () => {
    const t = new TestIsDefinedEach();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[]", async () => {
    const t = new TestIsDefinedEach();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[undefined]", async () => {
    const t = new TestIsDefinedEach();
    t.value = [undefined];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[undefined]]", async () => {
    const t = new TestIsDefinedEach();
    t.value = [[undefined]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("{}", async () => {
    const t = new TestIsDefinedEach();
    t.value = {};
    expect(await validate(t)).toStrictEqual([]);
  });
  it("{ 0: undefined }", async () => {
    const t = new TestIsDefinedEach();
    t.value = { 0: undefined };
    expect(await validate(t)).toStrictEqual([]);
  });
  it("{ undefined: 0 }", async () => {
    const t = new TestIsDefinedEach();
    t.value = { undefined: 0 };
    expect(await validate(t)).toStrictEqual([]);
  });
  it("sparse array", async () => {
    const t = new TestIsDefinedEach();
    // eslint-disable-next-line no-sparse-arrays
    t.value = [,];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([undefined])", async () => {
    const t = new TestIsDefinedEach();
    t.value = new Set([undefined]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[undefined, 0]])", async () => {
    const t = new TestIsDefinedEach();
    t.value = new Map([[undefined, 0]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[0, undefined]])", async () => {
    const t = new TestIsDefinedEach();
    t.value = new Map([[0, undefined]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("Equals each", () => {
  it("undefined", async () => {
    const t = new TestEqualsEach();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("0", async () => {
    const t = new TestEqualsEach();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[]", async () => {
    const t = new TestEqualsEach();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[0]", async () => {
    const t = new TestEqualsEach();
    t.value = [0];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[undefined]", async () => {
    const t = new TestEqualsEach();
    t.value = [undefined];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[undefined]]", async () => {
    const t = new TestEqualsEach();
    t.value = [[undefined]];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{}", async () => {
    const t = new TestEqualsEach();
    t.value = {};
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{ 0: undefined }", async () => {
    const t = new TestEqualsEach();
    t.value = { 0: undefined };
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{ undefined: 0 }", async () => {
    const t = new TestEqualsEach();
    t.value = { undefined: 0 };
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("sparse array", async () => {
    const t = new TestEqualsEach();
    // eslint-disable-next-line no-sparse-arrays
    t.value = [,];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([0])", async () => {
    const t = new TestEqualsEach();
    t.value = new Set([0]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([undefined])", async () => {
    const t = new TestEqualsEach();
    t.value = new Set([undefined]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[undefined, 0]])", async () => {
    const t = new TestEqualsEach();
    t.value = new Map([[undefined, 0]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[0, undefined]])", async () => {
    const t = new TestEqualsEach();
    t.value = new Map([[0, undefined]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
});
