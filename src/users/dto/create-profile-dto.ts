import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsInt()
  @IsOptional()
  experience: number;

  @IsUrl()
  @IsOptional()
  url_link?: string;

  @IsString()
  @IsOptional()
  linkedin_id: string;

  @IsString()
  @IsOptional()
  githib_id: string;

  @IsString()
  @IsOptional()
  discord_id: string;

  @IsOptional()
  @IsUrl()
  profile_photo?: string;

} 