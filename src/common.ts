import { Equals, IsDefined, IsOptional, NotEquals } from "class-validator";

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
