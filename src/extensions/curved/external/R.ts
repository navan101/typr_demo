export class R {
  public x: any;
  public y: any;
  public m: any;
  public Q: any;

  constructor(O?: any, i?: any, p?: any, V?: any) {
    if (!O)
      O = 0;
    if (!i)
      i = 0;
    if (!p)
      p = 0;
    if (!V)
      V = 0;
    this.x = O;
    this.y = i;
    this.m = p;
    this.Q = V
  }

  public clone() {
    return new R(this.x, this.y, this.m, this.Q)
  }

  public zk() {
    return this.m <= 0 || this.Q <= 0
  }
  ;
  public offset(O: any, i: any) {
    this.x += O;
    this.y += i
  }
  ;
  public FP(O: any) {
    this.offset(O.x, O.y)
  }
  ;

  public UJ(O: any) {
    if (this.zk())
      return O.clone();
    if (O.zk())
      return this.clone();
    var i = this.clone();
    i.ffl(O);
    return i
  }
  ;
  // R.OK = new Float32Array(2);
  public ffl(O: any) {
    if (O.zk())
      return;
    if (this.zk()) {
      this.QZ(O);
      return
    }
    this.uY(O.x, O.y);
    this.uY(O.x + O.m, O.y + O.Q)
  }
  ;
  public uY(O: any, i: any) {
    var p = Math.min(this.x, O)
      , V = Math.min(this.y, i);
    this.m = Math.max(this.x + this.m, O) - p;
    this.Q = Math.max(this.y + this.Q, i) - V;
    this.x = p;
    this.y = V
  }

  public QZ(O: any) {
    this.x = O.x;
    this.y = O.y;
    this.m = O.m;
    this.Q = O.Q
  }
}