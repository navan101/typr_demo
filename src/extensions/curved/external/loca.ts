export class Loca {
  public x: number;
  public y: number;

  constructor(x?: number, y?: number) {
    if (!x)
      x = 0;
    if (!y)
      y = 0;
    this.x = x;
    this.y = y
  }
}