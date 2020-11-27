export class ND {
  public M: any;
  public Z: any;
  public zh: any;
  public zI: any;
  public $A: any;
  public OM: any;

  constructor(O?: any, i?: any, p?: any, V?: any, E?: any, u?: any) {
    if (typeof O === "undefined") {
      O = 1;
      i = 0;
      p = 0;
      V = 1;
      E = 0;
      u = 0
    }
    this.M = O;
    this.Z = i;
    this.zh = p;
    this.zI = V;
    this.$A = E;
    this.OM = u;
  }

  public QZ(O: any) {
    this.M = O.M;
    this.Z = O.Z;
    this.zh = O.zh;
    this.zI = O.zI;
    this.$A = O.$A;
    this.OM = O.OM
  }

  public concat(O: any) {
    this.QZ(new ND(this.M * O.M + this.Z * O.zh, this.M * O.Z + this.Z * O.zI, this.zh * O.M + this.zI * O.zh, this.zh * O.Z + this.zI * O.zI, this.$A * O.M + this.OM * O.zh + O.$A, this.$A * O.Z + this.OM * O.zI + O.OM))
  }

  public translate(O: any, i: any) {
    this.$A += O;
    this.OM += i;
  }

  public rotate(O: any) {
    var i = new ND(Math.cos(O), -Math.sin(O), Math.sin(O), Math.cos(O), 0, 0);
    this.concat(i)
  }
  
  public scale(O: any, i: any) {
    var p = new ND(O, 0, 0, i, 0, 0);
    this.concat(p)
  } 

  public hA() {
    var O = this.M * this.zI - this.Z * this.zh;
    this.QZ(new ND(this.zI / O, -this.Z / O, -this.zh / O, this.M / O, (this.zh * this.OM - this.zI * this.$A) / O, (this.Z * this.$A - this.M * this.OM) / O))
  }

  public clone() {
    return new ND(this.M, this.Z, this.zh, this.zI, this.$A, this.OM)
  }
}