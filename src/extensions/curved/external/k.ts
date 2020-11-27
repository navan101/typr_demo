export class k {
  public type: any;
  public target: any;
  public currentTarget: any;
  public bubbles: any;
  public s: any;
  public cn: any;

  constructor(O: any, i?: any) {
    if (!i)
      i = !1;
    this.type = O;
    this.target = null;
    this.currentTarget = null;
    this.bubbles = i;
    this.s = null;
    this.cn = !1
  }
}