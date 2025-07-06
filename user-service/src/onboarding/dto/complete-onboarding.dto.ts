import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';

export class OnboardinCompleteDto {
  @IsString()
  @IsOptional()
  storeName: string;

  @IsString()
  @IsOptional()
  slogan: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsNotEmpty()
  profileType: string;

  @IsArray()
  @IsOptional()
  productTypes: string[];

  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['individual', 'corporate'])
  accountType: string;

  @IsString()
  @IsOptional()
  iban: string;

  @IsString()
  @IsOptional()
  bankName: string;

  @IsString()
  @IsOptional()
  taxId: string;

  @IsString()
  @IsOptional()
  invoiceTitle: string;

  @IsString()
  @IsOptional()
  bio: string;
}
