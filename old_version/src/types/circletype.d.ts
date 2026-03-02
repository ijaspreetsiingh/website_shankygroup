declare module "circletype" {
  export default class CircleType {
    constructor(element: HTMLElement);
    radius(value: number): this;
    dir(value: number): this;
    forceHeight(value: boolean): this;
    forceWidth(value: boolean): this;
  }
}
