import { Equals, IsDefined } from "class-validator";

export class TestIsDefinedEach {
  @IsDefined({ each: true })
  value: unknown;
}

export class TestEqualsEach {
  @Equals(0, { each: true })
  value: unknown;
}
