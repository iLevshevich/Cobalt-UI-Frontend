import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

export function Required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  {
    existingRequiredParameters.push(parameterIndex);
  }
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}



