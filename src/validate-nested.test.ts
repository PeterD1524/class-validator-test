import { validate, ValidationError } from "class-validator";
import { describe, expect, it } from "vitest";
import {
  Nested,
  TestValidateNested,
  TestValidateNestedEach,
} from "./validate-nested.js";

describe("ValidateNested", () => {
  it("deleted", async () => {
    const t = new TestValidateNested();
    delete t.value;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("undefined", async () => {
    const t = new TestValidateNested();
    expect(await validate(t)).toStrictEqual([]);
  });
  it("null", async () => {
    const t = new TestValidateNested();
    t.value = null;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("0", async () => {
    const t = new TestValidateNested();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it('""', async () => {
    const t = new TestValidateNested();
    t.value = "";
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{}", async () => {
    const t = new TestValidateNested();
    t.value = {};
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        children: [expect.any(ValidationError)],
      },
    ]);
    expect(errors).toMatchObject([
      {
        children: [
          {
            constraints: {
              unknownValue:
                "an unknown value was passed to the validate function",
            },
          },
        ],
      },
    ]);
  });
  it("Object.create(null)", async () => {
    const t = new TestValidateNested();
    t.value = Object.create(null);
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        constraints: {
          nestedValidation:
            "nested property value must be either object or array",
        },
      },
    ]);
  });
  it("{ __proto__: null }", async () => {
    const t = new TestValidateNested();
    t.value = { __proto__: null };
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        constraints: {
          nestedValidation:
            "nested property value must be either object or array",
        },
      },
    ]);
  });
  it("[]", async () => {
    const t = new TestValidateNested();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[undefined]", async () => {
    const t = new TestValidateNested();
    t.value = [undefined];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[{}]", async () => {
    const t = new TestValidateNested();
    t.value = [{}];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[]]", async () => {
    const t = new TestValidateNested();
    t.value = [[]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[undefined]]", async () => {
    const t = new TestValidateNested();
    t.value = [[undefined]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[]]]", async () => {
    const t = new TestValidateNested();
    t.value = [[[]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[undefined]]]", async () => {
    const t = new TestValidateNested();
    t.value = [[[undefined]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([undefined])", async () => {
    const t = new TestValidateNested();
    t.value = new Set([undefined]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([0])", async () => {
    const t = new TestValidateNested();
    t.value = new Set([0]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[undefined, 0]])", async () => {
    const t = new TestValidateNested();
    t.value = new Map([[undefined, 0]]);
    await expect(async () => {
      await validate(t);
    }).rejects.toThrowError(
      new TypeError("Cannot read properties of undefined (reading 'toString')"),
    );
  });
  it("new Map([[0, 0]])", async () => {
    const t = new TestValidateNested();
    t.value = new Map([[0, 0]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[0, undefined]])", async () => {
    const t = new TestValidateNested();
    t.value = new Map([[0, undefined]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(undefined)", async () => {
    const t = new TestValidateNested();
    t.value = new Nested(undefined);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Nested(true)", async () => {
    const t = new TestValidateNested();
    t.value = new Nested(true);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(false)", async () => {
    const t = new TestValidateNested();
    t.value = new Nested(false);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(0)", async () => {
    const t = new TestValidateNested();
    t.value = new Nested(0);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[new Nested(undefined)]", async () => {
    const t = new TestValidateNested();
    t.value = [new Nested(undefined)];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[new Nested(true)]", async () => {
    const t = new TestValidateNested();
    t.value = [new Nested(true)];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[new Nested(undefined)]]", async () => {
    const t = new TestValidateNested();
    t.value = [[new Nested(undefined)]];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[new Nested(true)]]", async () => {
    const t = new TestValidateNested();
    t.value = [[new Nested(true)]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[new Nested(undefined)]]]", async () => {
    const t = new TestValidateNested();
    t.value = [[[new Nested(undefined)]]];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[[new Nested(true)]]]", async () => {
    const t = new TestValidateNested();
    t.value = [[[new Nested(true)]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[new Nested(undefined), undefined]])", async () => {
    const t = new TestValidateNested();
    t.value = new Map([[new Nested(undefined), undefined]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[new Nested(undefined), 0]])", async () => {
    const t = new TestValidateNested();
    t.value = new Map([[new Nested(undefined), 0]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Set([new Map([[0, new Nested(undefined)]])])", async () => {
    const t = new TestValidateNested();
    t.value = new Set([new Map([[0, new Nested(undefined)]])]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Set([new Map([[0, new Nested(true)]])])", async () => {
    const t = new TestValidateNested();
    t.value = new Set([new Map([[0, new Nested(true)]])]);
    expect(await validate(t)).toStrictEqual([]);
  });
});

describe("ValidateNested each", () => {
  it("deleted", async () => {
    const t = new TestValidateNestedEach();
    delete t.value;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("undefined", async () => {
    const t = new TestValidateNestedEach();
    expect(await validate(t)).toStrictEqual([]);
  });
  it("null", async () => {
    const t = new TestValidateNestedEach();
    t.value = null;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("0", async () => {
    const t = new TestValidateNestedEach();
    t.value = 0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it('""', async () => {
    const t = new TestValidateNestedEach();
    t.value = "";
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{}", async () => {
    const t = new TestValidateNestedEach();
    t.value = {};
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        children: [expect.any(ValidationError)],
      },
    ]);
    expect(errors).toMatchObject([
      {
        children: [
          {
            constraints: {
              unknownValue:
                "an unknown value was passed to the validate function",
            },
          },
        ],
      },
    ]);
  });
  it("Object.create(null)", async () => {
    const t = new TestValidateNestedEach();
    t.value = Object.create(null);
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        constraints: {
          nestedValidation:
            "each value in nested property value must be either object or array",
        },
      },
    ]);
  });
  it("{ __proto__: null }", async () => {
    const t = new TestValidateNestedEach();
    t.value = { __proto__: null };
    const errors = await validate(t);
    expect(errors).toStrictEqual([expect.any(ValidationError)]);
    expect(errors).toMatchObject([
      {
        constraints: {
          nestedValidation:
            "each value in nested property value must be either object or array",
        },
      },
    ]);
  });
  it("[]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[undefined]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [undefined];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[{}]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [{}];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[undefined]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[undefined]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[]]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[[]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[undefined]]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[[undefined]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([undefined])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Set([undefined]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Set([0])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Set([0]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[undefined, 0]])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Map([[undefined, 0]]);
    await expect(async () => {
      await validate(t);
    }).rejects.toThrowError(
      new TypeError("Cannot read properties of undefined (reading 'toString')"),
    );
  });
  it("new Map([[0, 0]])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Map([[0, 0]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Map([[0, undefined]])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Map([[0, undefined]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(undefined)", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Nested(undefined);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Nested(true)", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Nested(true);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(false)", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Nested(false);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Nested(0)", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Nested(0);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[new Nested(undefined)]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [new Nested(undefined)];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[new Nested(true)]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [new Nested(true)];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[new Nested(undefined)]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[new Nested(undefined)]];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[new Nested(true)]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[new Nested(true)]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("[[[new Nested(undefined)]]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[[new Nested(undefined)]]];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("[[[new Nested(true)]]]", async () => {
    const t = new TestValidateNestedEach();
    t.value = [[[new Nested(true)]]];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[new Nested(undefined), undefined]])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Map([[new Nested(undefined), undefined]]);
    expect(await validate(t)).toStrictEqual([]);
  });
  it("new Map([[new Nested(undefined), 0]])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Map([[new Nested(undefined), 0]]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Set([new Map([[0, new Nested(undefined)]])])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Set([new Map([[0, new Nested(undefined)]])]);
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("new Set([new Map([[0, new Nested(true)]])])", async () => {
    const t = new TestValidateNestedEach();
    t.value = new Set([new Map([[0, new Nested(true)]])]);
    expect(await validate(t)).toStrictEqual([]);
  });
});
