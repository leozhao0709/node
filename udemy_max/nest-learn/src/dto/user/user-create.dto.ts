import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Equals,
  MinLength,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsEqualWith(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

/**
 * UserCreateDto
 */
export class UserCreateDto {
  @ApiModelProperty()
  @IsEmail(
    {},
    {
      message: 'invalid email',
    },
  )
  readonly email: string;
  @ApiModelProperty()
  @MinLength(5, { message: 'password length need at lease 5' })
  readonly password: string;
  @ApiModelProperty()
  @IsEqualWith('password', { message: 'password need to match' })
  readonly confirmPassword: string;
}
