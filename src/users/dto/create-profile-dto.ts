import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  role: string;

  @IsInt()
  experience: number;

  @IsUrl()
  url_link?: string;

  @IsString()
  linkedin_id: string;

  @IsString()
  githib_id: string;

  @IsString()
  discord_id: string;

  @IsOptional()
  @IsUrl()
  profile_photo?: string;

} 