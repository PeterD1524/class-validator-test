import { IsDefined } from "class-validator";

export class TestIsDefined {
  @IsDefined()
  value: unknown;
}
