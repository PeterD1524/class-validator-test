import {
  Equals,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  NotEquals,
} from "class-validator";

export class TestIsDefined {
  @IsDefined()
  value: unknown;
}

export class TestIsOptional {
  @IsOptional()
  value: unknown;
}

export class TestEquals {
  @Equals(0)
  value: unknown;
}

export class TestNotEquals {
  @NotEquals(0)
  value: unknown;
}

export class TestIsEmpty {
  @IsEmpty()
  value: unknown;
}

export class TestIsNotEmpty {
  @IsNotEmpty()
  value: unknown;
}
