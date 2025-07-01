import { IsString, IsIP, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsIP()
  ipAddress: string;

  @IsString()
  userAgent: string;

  @IsString()
  @IsOptional()
  sessionId?: string;
}
