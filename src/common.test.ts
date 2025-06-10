import { IsIn, IsNotIn, validate, ValidationError } from "class-validator";
import { describe, expect, it } from "vitest";
import {
  TestEquals,
  TestIsDefined,
  TestIsEmpty,
  TestIsNotEmpty,
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
  it("value should not be 0n", async () => {
    const t = new TestEquals();
    t.value = 0n;
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

describe("IsEmpty", () => {
  it("value can be deleted", async () => {
    const t = new TestIsEmpty();
    delete t.value;
    expect(t).not.toHaveProperty("value");
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be undefined", async () => {
    const t = new TestIsEmpty();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be null", async () => {
    const t = new TestIsEmpty();
    t.value = null;
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty string", async () => {
    const t = new TestIsEmpty();
    t.value = "";
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value should not be empty array", async () => {
    const t = new TestIsEmpty();
    t.value = [];
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be empty object", async () => {
    const t = new TestIsEmpty();
    t.value = {};
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("IsNotEmpty", () => {
  it("value should not be deleted", async () => {
    const t = new TestIsNotEmpty();
    delete t.value;
    expect(t).not.toHaveProperty("value");
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be undefined", async () => {
    const t = new TestIsNotEmpty();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be null", async () => {
    const t = new TestIsNotEmpty();
    t.value = null;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value should not be empty string", async () => {
    const t = new TestIsNotEmpty();
    t.value = "";
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("value can be empty array", async () => {
    const t = new TestIsNotEmpty();
    t.value = [];
    expect(await validate(t)).toStrictEqual([]);
  });
  it("value can be empty object", async () => {
    const t = new TestIsNotEmpty();
    t.value = {};
    expect(await validate(t)).toStrictEqual([]);
  });
});

describe("IsIn", () => {
  it("0", async () => {
    class Test {
      @IsIn([0])
      value: unknown;
    }
    const t = new Test();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
    t.value = 0;
    expect(await validate(t)).toStrictEqual([]);
    t.value = -0;
    expect(await validate(t)).toStrictEqual([]);
    t.value = 1;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
    t.value = "0";
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
    t.value = 0n;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("{}", async () => {
    class Test {
      @IsIn([{}])
      value: unknown;
    }
    const t = new Test();
    t.value = {};
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("undefined", async () => {
    class Test {
      @IsIn([undefined])
      value: unknown;
    }
    const t = new Test();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([]);
    delete t.value;
    expect(t).not.toHaveProperty("value");
    expect(await validate(t)).toStrictEqual([]);
    t.value = null;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("sparse array", async () => {
    class Test {
      // eslint-disable-next-line no-sparse-arrays
      @IsIn([,])
      value: unknown;
    }
    const t = new Test();
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
  it("NaN", async () => {
    class Test {
      @IsIn([NaN])
      value: unknown;
    }
    const t = new Test();
    t.value = NaN;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("IsNotIn", () => {
  it("0", async () => {
    class Test {
      @IsNotIn([0])
      value: unknown;
    }
    const t = new Test();
    expect(t).toHaveProperty("value");
    expect(t.value).toBeUndefined();
    expect(await validate(t)).toStrictEqual([]);
    t.value = 0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
    t.value = -0;
    expect(await validate(t)).toStrictEqual([expect.any(ValidationError)]);
    t.value = 1;
    expect(await validate(t)).toStrictEqual([]);
    t.value = "0";
    expect(await validate(t)).toStrictEqual([]);
  });
  it("sparse array", async () => {
    class Test {
      // eslint-disable-next-line no-sparse-arrays
      @IsNotIn([,])
      value: unknown;
    }
    const t = new Test();
    expect(await validate(t)).toStrictEqual([]);
  });
  it("NaN", async () => {
    class Test {
      @IsNotIn([NaN])
      value: unknown;
    }
    const t = new Test();
    t.value = NaN;
    expect(await validate(t)).toStrictEqual([]);
  });
});
