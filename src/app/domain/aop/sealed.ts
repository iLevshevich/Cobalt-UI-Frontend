export function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
