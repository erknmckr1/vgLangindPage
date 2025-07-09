import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  iban: string;

  @IsString()
  @IsOptional()
  taxId?: string;

  @IsString()
  @IsOptional()
  invoiceTitle?: string;
}

export class UpdateBillingDto {
  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  iban?: string;

  @IsString()
  @IsOptional()
  taxId?: string;

  @IsString()
  @IsOptional()
  invoiceTitle?: string;
}
