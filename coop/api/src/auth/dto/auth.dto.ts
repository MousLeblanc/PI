import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
} from 'class-validator';

export enum AgeBandDto {
  AGE_0_4 = 'AGE_0_4',
  AGE_5_17 = 'AGE_5_17',
  AGE_18_64 = 'AGE_18_64',
  AGE_65_PLUS = 'AGE_65_PLUS',
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  householdSize!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(AgeBandDto, { each: true })
  ageBands!: AgeBandDto[];

  @IsString()
  @Matches(/^\d{4}$/, { message: 'Code postal belge à 4 chiffres' })
  postalCode!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  streetName!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  houseNumber!: string;

  @IsBoolean()
  optInPublicNumber!: boolean;

  @IsOptional()
  @IsString()
  turnstileToken?: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  turnstileToken?: string;
}
