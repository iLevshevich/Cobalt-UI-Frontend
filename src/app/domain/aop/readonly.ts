export function Readonly(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}
