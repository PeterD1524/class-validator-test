import { IsBoolean, ValidateNested } from "class-validator";

export class Nested {
  constructor(value: unknown) {
    this.value = value;
  }

  @IsBoolean()
  value: unknown;
}

export class TestValidateNested {
  @ValidateNested()
  value: unknown;
}

export class TestValidateNestedEach {
  @ValidateNested({ each: true })
  value: unknown;
}
