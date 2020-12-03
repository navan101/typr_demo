export class Path {
  public x: any; //M
  public y: any; //Z

  public x1: any; //zh
  public y1: any; //zI

  public x2: any; //$A
  public y2: any; //OM

  constructor(x?: any, y?: any, x1?: any, y1?: any, x2?: any, y2?: any) {
    if (typeof x === "undefined") {
      x = 1;
      y = 0;
      x1 = 0;
      y1 = 1;
      x2 = 0;
      y2 = 0
    }
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  public setPath(p: Path) {
    this.x = p.x;
    this.y = p.y;
    this.x1 = p.x1;
    this.y1 = p.y1;
    this.x2 = p.x2;
    this.y2 = p.y2
  }

  public concat(p: Path) {
    this.setPath(new Path(this.x * p.x + this.y * p.x1, this.x * p.y + this.y * p.y1, this.x1 * p.x + this.y1 * p.x1, this.x1 * p.y + this.y1 * p.y1, this.x2 * p.x + this.y2 * p.x1 + p.x2, this.x2 * p.y + this.y2 * p.y1 + p.y2))
  }

  public translate(x: any, y: any) {
    this.x2 += x;
    this.y2 += y;
  }

  public rotate(O: any) {
    var i = new Path(Math.cos(O), -Math.sin(O), Math.sin(O), Math.cos(O), 0, 0);
    this.concat(i)
  }
  
  public scale(O: any, i: any) {
    var p = new Path(O, 0, 0, i, 0, 0);
    this.concat(p)
  } 

  public setPathXY() {
    var O = this.x * this.y1 - this.y * this.x1;
    this.setPath(new Path(this.y1 / O, -this.y / O, -this.x1 / O, this.x / O, (this.x1 * this.y2 - this.y1 * this.x2) / O, (this.y * this.x2 - this.x * this.y2) / O))
  }

  public clone() {
    return new Path(this.x, this.y, this.x1, this.y1, this.x2, this.y2)
  }
}