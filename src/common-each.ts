import { IsDefined } from "class-validator";

export class TestIsDefinedEach {
  @IsDefined({ each: true })
  value: unknown;
}
