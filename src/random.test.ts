import { plainToInstance, Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  validate,
  ValidateNested,
  ValidationError,
} from "class-validator";
import "reflect-metadata";
import { describe, expect, it } from "vitest";

describe("https://github.com/typestack/class-validator/issues/193#issue-314975470", () => {
  class ClassB {
    @IsInt()
    public id: unknown;

    @IsString()
    @Length(1, 255)
    public name: unknown;
  }

  class ClassA {
    @ValidateNested()
    @Type(() => ClassB)
    public company: unknown;

    @IsOptional()
    @IsInt()
    public id?: number;
  }

  it("{ company: 5, id: 3 }", async () => {
    expect(
      await validate(plainToInstance(ClassA, { company: 5, id: 3 })),
    ).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("https://github.com/typestack/class-validator/issues/193#issuecomment-386877352", () => {
  class PostInputMessage {
    @IsString()
    message: unknown;
  }

  class PostInput {
    @ValidateNested()
    @Type(() => PostInputMessage)
    @IsArray()
    entries: unknown;
  }

  it('{ entries: ["Hello", "How are you"] }', async () => {
    expect(
      await validate(
        plainToInstance(PostInput, { entries: ["Hello", "How are you"] }),
      ),
    ).toStrictEqual([expect.any(ValidationError)]);
  });

  it('{ entries: [{ pinapples: "Hello" }, { pinapples: "How are you" }] }', async () => {
    expect(
      await validate(
        plainToInstance(PostInput, {
          entries: [{ pinapples: "Hello" }, { pinapples: "How are you" }],
        }),
      ),
    ).toStrictEqual([expect.any(ValidationError)]);
  });
});

describe("https://github.com/typestack/class-validator/issues/193#issuecomment-387317519", () => {
  class ClassB {
    @IsInt()
    public id: unknown;
  }

  class ClassA {
    @ValidateNested()
    public company: unknown;
  }

  it("[]", async () => {
    const a = new ClassA();
    a.company = [];
    expect(await validate(a)).toStrictEqual([]);
  });

  it("{}", async () => {
    const a = new ClassA();
    a.company = {};
    expect(await validate(a)).toStrictEqual([expect.any(ValidationError)]);
  });

  it('{ b: "c" }', async () => {
    const a = new ClassA();
    a.company = { b: "c" };
    expect(await validate(a)).toStrictEqual([expect.any(ValidationError)]);
  });

  it("[5]", async () => {
    const a = new ClassA();
    a.company = [5];
    expect(await validate(a)).toStrictEqual([expect.any(ValidationError)]);
  });

  it('["b"]', async () => {
    const a = new ClassA();
    a.company = ["b"];
    expect(await validate(a)).toStrictEqual([expect.any(ValidationError)]);
  });

  it("", async () => {
    const a = new ClassA();
    const b = new ClassB();
    b.id = 0;
    a.company = b;
    expect(await validate(a)).toStrictEqual([]);
  });
});
