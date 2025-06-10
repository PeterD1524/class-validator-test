import { IsDefined, IsOptional } from "class-validator";

export class TestIsDefined {
  @IsDefined()
  value: unknown;
}

export class TestIsOptional {
  @IsOptional()
  value: unknown;
}
