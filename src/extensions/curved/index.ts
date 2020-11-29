import { Typr, TyprU } from 'typr-ts';
import { fn } from './external/fn';
import h from './external/h';
import n from './external/n';
import NK from './external/NK';
import { OA } from './external/OA';
import { OP } from './external/OP';
import { R } from './external/R';

class Curved {
  public TySh: any = null;
  public SS: any = -1;
  public mb: any = -1;
  public Aq: any = null;
  private static font: any = null;

  public async start() {
    await this.load("fonts/DejaVuSans.otf", this.fontLoaded);
  }

  public load(path: any, resp: any, responseType: any = 'arraybuffer') {
    return new Promise(function (resolve) {
			let request = new XMLHttpRequest();
			request.open("GET", path, true);
			request.responseType = responseType;
			request.onload = function (e: any) {
				resolve(resp(e.target.response));
			};
			request.send();
		});
  };

  public fontLoaded(resp: any) {
    Curved.font = Typr.parse(resp);
  };

  private  getDPR() {
    return window["devicePixelRatio"] || 1;
  }

  public glyphCnt = () => {
    return Curved.font.maxp.numGlyphs;
  };

  public drawWord(ctx: any, Y: any, size: any, x: any, y: any,){
    // let ctx = canvas.getContext();
    let scale = (size * this.getDPR()) / Curved.font.head.unitsPerEm;
    let gls = TyprU.stringToGlyphs(
      Curved.font,
      'navan'
    );
    let path = TyprU.glyphsToPath(Curved.font, gls, "#333333");

    ctx.translate(x,y);
    
    ctx.fillStyle = "#000000";
    ctx.scale(scale, -scale);
    // ctx.scale(scale, -scale);
    // @ts-ignore
    // ctx.fillRect(0, -Math.round(Curved.font.hhea.ascender * scale), canvas.width, 1);
    // @ts-ignore
    // ctx.fillRect(0, -Math.round(Curved.font.hhea.descender * scale), canvas.width, 1);
    // console.log(scale)
    // ctx.scale(scale, -scale);
    // let p = path;
    if (!n.Lq_ZE(this.TySh.ct)) {
      let V = this.p_Tj1(path.crds);
      path = this.p_uX1(path);
      path = this.p_up1(path, Math.min(V.m, V.Q) / 8);
      const O = new OA(this.TySh.mp, Y);
      let E = NK.Jx(this.TySh, O)
      let u = n.Lq_Is(this.TySh.ct, E);
      n.apply(u, path.crds, E)
    }
    //  let F = this.TySh.F;
    //  this.p_F(path.crds, F, path.crds)
    TyprU.pathToContext(path, ctx); // setting color and calling fill() already in path
    // return  path;
  };

  public initCurved() {
    const data: any = new fn;
    data.fT['DejaVuSans'] = Curved.font;
    return data;
  }

  public initTySh(E: any, Aq: any) {
    this.SS = this.mb = 0;
    this.Aq = Aq;
    this.TySh = NK.Cw(E.x, E.y, Aq);
  }

  public onChangeTySh(obj: any) {
    if (!obj)
      return;
    if (obj.warpStyle)
      this.TySh.ct.warpStyle.v.warpStyle = obj.warpStyle;
    if (obj.warpValue)
      this.TySh.ct.warpValue.v = obj.warpValue;
    this.TySh.mp.EngineDict.Rendered.Shapes = {
      WritingDirection: 0,
      Children: [
        {
          ShapeType: 0,
          Procession: 0,
          Lines: {
            WritingDirection: 0,
            Children: []
          },
          Cookie: {
            Photoshop: {
              ShapeType: 0,
              PointBase: [
                0,
                0
              ],
              Base: {
                ShapeType: 0,
                TransformPoint0: [
                  1,
                  0
                ],
                TransformPoint1: [
                  0,
                  1
                ],
                TransformPoint2: [
                  0,
                  0
                ]
              }
            }
          }
        }
      ]
    }
  }

  public ts(O: any, IW: any, p: any) {
    if (p == null)
      p = !1;
    let V = this.TySh;
    // if (!OP.Zc(V, i.IW))
    //     return !1;
    const aV = new OA(V.mp, IW);
    // if (!p) {
    //     var E = NK.$I(V.mp);
    //     this.RH.value = E.slice(0, E.length - 1)
    // }
    // const path = OP.Hf(aV, V)
    // return path
    return this.$b(aV, V)
    // , F = u.rect;
    // if (n.Lq.ZE(V.ct))
    //     V.Wr = new R;
    // else {
    //     if (NK.gW(V.mp) == 1) {
    //         var m = NK.x$(V.mp)
    //           , y = u.Wr.y;
    //         V.Wr = new R(0,y,m[2] - m[0],m[3] - m[1] - y)
    //     } else {
    //         V.Wr = u.Wr
    //     }
    // }
    // var z = this.hF.rect;
    // this.hF.rect = u.rect;
    // this.hF.buffer = u.re;
    // this.hF.u();
    // O.QG();
    // O.u(O.root.fn(u.rect.UJ(z), O, O._.indexOf(this.hF)));
    // return !0
  }


  private $b(O: any, i: any) {
    let p = OP.Hf(O, i);
    let u = n.p_iG(p.b);
    return {
      p,
      u
    }
    // return path;
    // let p = O.zg(), y;
    // if (p.x == Infinity || p.zk())
    //   return {
    //     re: n.U(0),
    //     rect: new R,
    //     Wr: new R
    //   };
    // let V = O.zg()
    //   , path = OP.Hf(O, i)
    //   , u = n.p_iG(path.b);
    // if (u.zk())
    //   return {
    //     re: n.U(0),
    //     rect: new R,
    //     Wr: new R
    //   };

    // console.log(u)

    // var F = f.L("canvas", "");
    // F.width = u.m;
    // F.height = u.Q;
    // var m = F.getContext("2d");
    // m.translate(-u.x, -u.y);
    // OP.fju(E, m);
    // if (O.xC.length != 0) {
    //     var z = m.getImageData(0, 0, u.m, u.Q);
    //     y = new Uint8Array(z.data.buffer)
    // } else
    //     y = n.U(u.d() * 4);
    // return {
    //     re: y,
    //     rect: u,
    //     Wr: V
    // }
    // const F = document.getElementById("canvas");
    // @ts-ignore
    // F.width = 800;
    // @ts-ignore
    // F.height = canvas.height;
    // let ctx = canvas.getContext("2d");
    // console.log(ctx)
    // TyprU.pathToContext({
    //   crds: path.b,
    //   cmds: path.J
    // }, ctx)
  }

  public startCurved(RH: any, CX: any) {
    if (this.TySh == null)
      return;
    let i = RH.selectionStart
      , p = this.TySh
      , V = NK.$I(p.mp)
      , E = RH.value + "\n"
      , u = Math.min(this.SS, this.mb)
      , F = Math.max(this.SS, this.mb);
    this.SS = Math.min(i, u);
    if (E.length - i < V.length - this.mb)
      this.mb = V.length - E.length + i;
    if (V != E) {
      while (this.SS > 0 && V.charAt(this.SS - 1) != E.charAt(this.SS - 1))
        this.SS--
    }
    let m = V.substring(0, this.SS)
      , y = V.substring(this.mb, V.length)
      , z = E.substring(this.SS, E.length - y.length);
    NK.zL(p.mp, this.SS, this.mb);
    NK.xv(p.mp, this.SS, z);
    NK.dD(p.mp, this.SS, this.SS + z.length - 1, this.SG(this.Aq, p));
    this.SS = this.mb = m.length + z.length;
    // var _ = this.BB;
    return this.ts(undefined, CX, !0);
    // this.tW(_, !0)
  }

  private SG = function (Aq: any, i: any) {
    let p = JSON.parse(JSON.stringify(Aq));
    NK.yN(p, 1 / h._f(i.F));
    return p
  }

  public p_Tj1(crds: any, i?: any, p?: any) {
    if (!i)
      i = 0;
    if (!p)
      p = crds.length;
    var V = 99999999999
      , E = -V
      , u = 99999999999
      , F = -u;
    for (var m = i; m < p; m += 2) {
      var y = crds[m]
        , z = crds[m + 1];
      V = Math.min(V, y);
      u = Math.min(u, z);
      E = Math.max(E, y);
      F = Math.max(F, z)
    }
    return new R(V, u, E - V, F - u)
  }

  public p_Tj(path: any, i?: any, p?: any) {
    if (!i)
      i = 0;
    if (!p)
      p = path.length;
    var V = 99999999999
      , E = -V
      , u = 99999999999
      , F = -u;
    for (var m = i; m < p; m ++) {
      if(path[m].type === "Z") {
        break;
      }
      var y = path[m].x
        , z = path[m].y;
      V = Math.min(V, y);
      u = Math.min(u, z);
      E = Math.max(E, y);
      F = Math.max(F, z)
    }
    return new R(V, u, E - V, F - u)
  }

  public p_up1(path: any, i: any) {
    var p = path.crds
      , V = []
      , E = []
      , u = 0
      , F = 0
      , m = 0
      , y = 0
      , z = 0
      , _ = 0
      , W = 0
      , G = 0
      , J = 0;
    for (var v = 0; v < path.cmds.length; v++) {
      var j = path.cmds[v];
      if (j == "M") {
        F = p[u];
        m = p[u + 1];
        u += 2;
        E.push(j);
        V.push(F, m)
      } else if (j == "C") {
        y = p[u];
        z = p[u + 1];
        _ = p[u + 2];
        W = p[u + 3];
        G = p[u + 4];
        J = p[u + 5];
        u += 6;
        this.p_Ln1(F, m, y, z, _, W, G, J, i, E, V, 0);
        F = G;
        m = J
      } else
        E.push(j)
    }
    return {
      cmds: E,
      crds: V
    }
  }
  public p_Ln1(O: any, i: any, p: any, V: any, E: any, u: any, F: any, m: any, y: any, z: any, _: any, W: any) {
    var G = Math.sqrt((F - O) * (F - O) + (m - i) * (m - i))
      , J = Math.sqrt((F - E) * (F - E) + (m - u) * (m - u)) + Math.sqrt((E - p) * (E - p) + (u - V) * (u - V)) + Math.sqrt((p - O) * (p - O) + (V - i) * (V - i))
      , v = (G + J) / 2;
    if (v <= y) {
      z.push("C");
      _.push(p, V, E, u, F, m)
    } else {
      var j = 0
        , D = 0
        , r = 0
        , P = 0
        , N = 0
        , T = 0
        , b = 0
        , g = 0
        , L = 0
        , a = 0
        , x = 0
        , K = 0
        , U = 0;
      D = (O + p) / 2;
      r = (i + V) / 2;
      P = (p + E) / 2;
      N = (V + u) / 2;
      T = (E + F) / 2;
      b = (u + m) / 2;
      g = (D + P) / 2;
      L = (r + N) / 2;
      a = (P + T) / 2;
      x = (N + b) / 2;
      K = (g + a) / 2;
      U = (L + x) / 2;
      this.p_Ln1(O, i, D, r, g, L, K, U, y, z, _, W + 1);
      this.p_Ln1(K, U, a, x, T, b, F, m, y, z, _, W + 1)
    }
  }

  public p_uX1(path: any) {
    var i = path.crds
      , p = []
      , V = []
      , E = 0
      , u = 0
      , F = 0
      , m = 0
      , y = 0
      , z = 0
      , _ = 0
      , W = 0
      , G = 0;
    for (var J = 0; J < path.cmds.length; J++) {
      var v = path.cmds[J];
      if (v == "M") {
        u = i[E];
        F = i[E + 1];
        E += 2;
        V.push(v);
        p.push(u, F)
      } else if (v == "C") {
        m = i[E];
        y = i[E + 1];
        z = i[E + 2];
        _ = i[E + 3];
        W = i[E + 4];
        G = i[E + 5];
        E += 6;
        V.push(v);
        p.push(m, y, z, _, W, G);
        u = W;
        F = G
      } else if (v == "Q") {
        m = i[E];
        y = i[E + 1];
        z = i[E + 2];
        _ = i[E + 3];
        E += 4;
        var j = m - u
          , D = y - F
          , r = z - m
          , P = _ - y;
        V.push("C");
        p.push(u + 2 / 3 * j, F + 2 / 3 * D, m + 1 / 3 * r, y + 1 / 3 * P, z, _);
        u = z;
        F = _
      } else if (v == "L") {
        m = i[E];
        y = i[E + 1];
        E += 2;
        var N = m - u
          , T = y - F;
        V.push("C");
        p.push(u, F, m, y, m, y);
        u = m;
        F = y
      } else
        V.push(v)
    }
    return {
      cmds: V,
      crds: p
    }
  }

  public p_uX(path: any) {
    //crds: path.b,
    // cmds: path.J
    var i = path
      , p = []
      , V = []
      , E = 0
      , u = 0
      , F = 0
      , m = 0
      , y = 0
      , z = 0
      , _ = 0
      , W = 0
      , G = 0;
    for (var J = 0; J < path.length; J++) {
      var v = path[J];
      if (v.type == "M") {
        u = v.x
        F = v.y
        // u = i[E];
        // F = i[E + 1];
        // E += 2;
        p.push(v);
        // p.push(u, F)
      } else if (v.type == "C") {
        m = v.x1;
        y = v.y1;
        z = v.x2;
        _ = v.y2;
        W = v.x;
        G = v.y;
        // m = i[E];
        // y = i[E + 1];
        // z = i[E + 2];
        // _ = i[E + 3];
        // W = i[E + 4];
        // G = i[E + 5];
        // E += 6;
        p.push(v);
        // p.push(m, y, z, _, W, G);
        u = W;
        F = G
      } else if (v.type == "Q") {
        v.type = "C"
        m = v.x1;
        y = v.y1;
        z = v.x;
        _ = v.y;
        var j = m - u
          , D = y - F
          , r = z - m
          , P = _ - y;
        v.x1 = u + 2 / 3 * j;
        v.y1 = F + 2 / 3 * D;
        v.x2 = m + 1 / 3 * r,
        v.y2 = y + 1 / 3 * P,
        v.x = z;
        v.y = _;
        p.push(v);
        // m = i[E];
        // y = i[E + 1];
        // z = i[E + 2];
        // _ = i[E + 3];
        // E += 4;
        // var j = m - u
        //   , D = y - F
        //   , r = z - m
        //   , P = _ - y;
        // V.push("C");
        // p.push(u + 2 / 3 * j, F + 2 / 3 * D, m + 1 / 3 * r, y + 1 / 3 * P, z, _);
        u = z;
        F = _
      } else if (v.type == "L") {
        v.type = "C";
        m = v.x;
        y = v.y;
        v.x1 = u;
        v.y1 = F;
        v.x2 = m;
        v.y2 = y;
        v.x = m;
        v.y = y;
        p.push(v)
        // m = i[E];
        // y = i[E + 1];
        // E += 2;
        // var N = m - u
        //   , T = y - F;
        // V.push("C");
        // p.push(u, F, m, y, m, y);
        u = m;
        F = y
      } else
        p.push(v)
    }
    return p
  }

  public p_up(path: any, i: any) {
    //crds: path.b,
    // cmds: path.J
    var p = path
      , V = []
      , E = []
      , u = 0
      , F = 0
      , m = 0
      , y = 0
      , z = 0
      , _ = 0
      , W = 0
      , G = 0
      , J = 0;
    for (var v = 0; v < path.length; v++) {
      var j = path[v];
      if (j.type == "M") {
        F = j.x;
        m = j.y;
        V.push(j)
        // F = p[u];
        // m = p[u + 1];
        // u += 2;
        // E.push(j);
        // V.push(F, m)
      } else if (j.type == "C") {
        y = j.x1;
        z = j.y1;
        _ = j.x2;
        W = j.y2;
        G = j.x;
        J = j.y
        this.p_Ln(F, m, y, z, _, W, G, J, i, j, V, 0);
        F = G;
        m = J
        // y = p[u];
        // z = p[u + 1];
        // _ = p[u + 2];
        // W = p[u + 3];
        // G = p[u + 4];
        // J = p[u + 5];
        // u += 6;
        // this.p_Ln(F, m, y, z, _, W, G, J, i, E, V, 0);
        // F = G;
        // m = J
      } 
      else
        V.push(j)
    }
    return V
      // cmds: E,
      // crds: V

  }
  public p_Ln(O: any, i: any, p: any, V: any, E: any, u: any, F: any, m: any, y: any, z: any, _: any, W: any) {
    var G = Math.sqrt((F - O) * (F - O) + (m - i) * (m - i))
      , J = Math.sqrt((F - E) * (F - E) + (m - u) * (m - u)) + Math.sqrt((E - p) * (E - p) + (u - V) * (u - V)) + Math.sqrt((p - O) * (p - O) + (V - i) * (V - i))
      , v = (G + J) / 2;
    if (v <= y) {
      // z.push("C");
      z.x1 = p;
      z.y1 = V;
      z.x2 = E;
      z.y2 = u,
      z.x = F;
      z.y = m;
      // _.push(p, V, E, u, F, m)
      _.push(z)
    } else {
      var j = 0
        , D = 0
        , r = 0
        , P = 0
        , N = 0
        , T = 0
        , b = 0
        , g = 0
        , L = 0
        , a = 0
        , x = 0
        , K = 0
        , U = 0;
      D = (O + p) / 2;
      r = (i + V) / 2;
      P = (p + E) / 2;
      N = (V + u) / 2;
      T = (E + F) / 2;
      b = (u + m) / 2;
      g = (D + P) / 2;
      L = (r + N) / 2;
      a = (P + T) / 2;
      x = (N + b) / 2;
      K = (g + a) / 2;
      U = (L + x) / 2;
      this.p_Ln(O, i, D, r, g, L, K, U, y, z, _, W + 1);
      this.p_Ln(K, U, a, x, T, b, F, m, y, z, _, W + 1)
    }
  }

  public p_F(O: any, i: any, p: any) {
    for (var V = 0; V < O.length; V += 2) {
      var E = O[V]
        , u = O[V + 1];
      p[V] = E * i.M + u * i.zh + i.$A;
      p[V + 1] = E * i.Z + u * i.zI + i.OM
    }
  }
  ;
}

export default new Curved();