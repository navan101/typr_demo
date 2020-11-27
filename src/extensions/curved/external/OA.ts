import { l } from './l';
import NK from './NK';
import { R } from './R';
import { Typr, TyprU } from 'typr-ts';
import * as UnicodeBidirectional from 'unicode-bidirectional';

export class OA {
  public fYr: any;
  public ffx: any;
  public ca: any;
  public rect: any;
  public xC: any;

  public nY: any;
  public _x: any
  public rd: any;
  public kP: any;

  public Og: any;
  public kE: any
  public start: any
  public end: any;
  public NU: any;
  public lineHeight: any;
  public TB: any;
  public Ti: any;

  constructor(O: any, i?: any) {
    var p, V = NK.x$(O);
    if (V)
      p = new R(V[0], V[1], V[2], V[3]);
    this.fYr = 0;
    this.ffx = !1;
    this.ca = [];
    this.rect = new R;
    this.xC = [];
    var E = NK.$I(O)
    var u: any = {};
    for (var F = 0; F < E.length; F++) {
      var m: any = {
        zn: E.charAt(F),
        $X: NK.fsm(O, F),
        yd: 0,
        path: null,
        ym: null,
        rect: new R,
        rd: new R,
        kP: new l(0, 0),
        scale: new l(0, 0),
        NU: 0,
        lineHeight: 0,
        TB: 0,
        Ti: 0,
        TN: 0,
        BC: F
      }
        , y = O.ResourceDict.FontSet[m.$X.Font].Name
        , z = m.ym = i.Ne(y)
        , P = 0;
      if (u[y] == null) {
        u[y] = TyprU.stringToGlyphs(z, E)
      }
      var _ = u[y]
        , W = TyprU.codeToGlyph(z, m.zn.charCodeAt(0));
      if (m.zn == "\n")
        m.yd = -1;
      else if (_[F] == W && m.$X.FontCaps != 0)
        m.yd = TyprU.codeToGlyph(z, m.zn.toUpperCase().charCodeAt(0));
      else
        m.yd = _[F];
      if (m.yd == -1)
        m.path = {
          J: [],
          b: []
        };
      else {
        var G = TyprU.glyphToPath(z, m.yd);
        m.path = {
          J: G.cmds,
          b: G.crds
        }
      }
      m.scale.x = m.$X.HorizontalScale == null ? 1 : m.$X.HorizontalScale;
      m.scale.y = m.$X.VerticalScale == null ? 1 : m.$X.VerticalScale;
      var J = z["OS/2"]
        , v = z.hhea;
      if (m.$X.FontCaps == 1 && _[F] == W && m.zn != m.zn.toUpperCase()) {
        var j = J.sxHeight ? J.sxHeight / J.sTypoAscender : .76;
        m.scale.x *= j;
        m.scale.y *= j
      }
      var D = 1 / z.head.unitsPerEm * m.$X.FontSize;
      if (m.$X.FontBaseline == 1) {
        var j1 = O.ResourceDict.SuperscriptSize;
        m.scale.x *= j1;
        m.scale.y *= j1;
        m.kP.y -= O.ResourceDict.SuperscriptPosition * m.$X.FontSize
      }
      if (m.$X.FontBaseline == 2) {
        var j2 = O.ResourceDict.SubscriptSize;
        m.scale.x *= j2;
        m.scale.y *= j2;
        m.kP.y += O.ResourceDict.SubscriptPosition * m.$X.FontSize
      }
      if (m.$X.BaselineShift)
        m.kP.y -= m.$X.BaselineShift;
      m.rect.x = 0;
      m.rect.m = m.scale.x * (m.yd == -1 ? 0 : z.hmtx.aWidth[m.yd]) * D;
      m.rect.y = -v.ascender * D;
      m.rect.Q = -m.rect.y;
      if (z.glyf == null) {
        m.rd = m.rect.clone();
        m.rd.Q *= m.scale.y;
        m.rd.y -= m.rd.Q - m.rect.Q;
        m.rd.Q *= 1.3
      } else if (z.glyf[m.yd] != null) {
        var r = z.glyf[m.yd];
        m.rd.x = r.xMin * D;
        m.rd.m = (r.xMax - r.xMin) * D * m.scale.x;
        m.rd.y = -r.yMax * D * m.scale.y;
        m.rd.Q = (r.yMax - r.yMin) * D * m.scale.y
      }
      m.rd.y = -D * (J ? J.usWinAscent : z.head.yMax) * .9357;
      m.rd.Q = -m.rd.y - D * z.head.yMin;
      if (P == 0 && J && J.sxHeight && y.toLowerCase().indexOf("capitals") != -1)
        P = J.sxHeight;
      if (P == 0 && J && J.sCapHeight)
        P = J.sCapHeight;
      if (P == 0 && J && J.sTypoAscender)
        P = J.sTypoAscender;
      if (P == 0)
        P = v.ascender;
      m.NU = P * D;
      m.lineHeight = (v.ascender - v.descender) * D;
      m.TB = v.ascender * D;
      m.Ti = (-v.descender + v.lineGap) * D;
      if (m.$X.AutoLeading == !1)
        m.lineHeight = m.$X.Leading;
      this.xC.push(m)
    }
    for (var F = 0; F < O.EngineDict.ParagraphRun.RunLengthArray.length; F++) {
      // // @ts-ignore
      var N = this.zd(O, i, this.xC, F, p);
      this.ca.push(N)
    }
    var T = p == null ? 0 : this.ca[0]._x[0].NU;
    for (var F = 0; F < this.ca.length; F++) {
      var b = this.ca[F]._x;
      if (F > 0)
        T += b[0].lineHeight;
      this.ca[F].kP.y = T;
      this.fYr += b.length;
      if (p)
        for (var g = 0; g < b.length; g++) {
          b[g].qd = b[g].kP.y + T < p.y + p.Q;
          if (!b[g].qd)
            this.ffx = !0
        }
      var L = this.ca[F].rect.clone();
      L.FP(this.ca[F].kP);
      this.rect = this.rect.UJ(L);
      for (var g = 1; g < b.length; g++)
        T += b[g].lineHeight;
      T += NK.z_(O, F).SpaceAfter;
      if (F < this.ca.length - 1)
        T += NK.z_(O, F + 1).SpaceBefore
    }
  }

  public zg() {
    var O = Infinity
      , i = Infinity
      , p = -Infinity
      , V = -Infinity;
    for (var E = 0; E < this.ca.length; E++) {
      var u = this.ca[E];
      for (var F = 0; F < u._x.length; F++) {
        var m = u._x[F];
        if (!m.qd)
          break;
        for (var y = m.start; y < m.end; y++) {
          var z = u.nY[y];
          for (var _ = z.start; _ < z.end; _++) {
            var W = this.xC[_]
              , G = u.kP.x + m.kP.x + z.kP.x + W.kP.x
              , J = u.kP.y + m.kP.y + z.kP.y + W.kP.y;
            O = Math.min(O, G + W.rd.x);
            i = Math.min(i, J + W.rd.y);
            p = Math.max(p, G + W.rd.x + W.rd.m);
            V = Math.max(V, J + W.rd.y + W.rd.Q)
          }
        }
      }
    }
    return new R(O, i, p - O, V - i)
  }

  public SB(O: any, i: any, p: any, V: any, E: any, u?: any) {
    var F = [V]
      , m = 0;
    for (var y = V; y < E; y++) {
      if (p[y] == null)
        console.log(y, V, E, p);
      var z = p[y].zn
        , _ = z.charCodeAt(0);
      if (_ == 32) {
        F.push(m, y, 1, y + 1);
        m = 0
      } else if (_ == 3851) {
        F.push(m + 1, y + 1);
        m = 0
      } else if (19968 <= _ && _ <= 40959 || 12288 <= _ && _ <= 12543) {
        F.push(m, y);
        m = 1
      } else if (u != null && (u.indexOf(y - V) != -1 || y != V && p[y].TN != p[y - 1].TN)) {
        F.push(m, y);
        m = 1
      } else
        m++
    }
    F.push(m);
    var W = [];
    for (var y: any = 0; y < F.length; y += 2) {
      var G = F[y]
        , J = F[y + 1];
      if (J == 0)
        continue;
      // @ts-ignore
      let fwx = new this.fwx(O, i, p, G, J)
      W.push(fwx)
    }
    return W
  }

  public Si(O: any, i: any, p: any, V?: any) {
    var E = [[], []]
    var u: number = 0
      , F = 0;
    while (u < O.length) {
      var m = 0
      var y: number = u
        , z = i ? i.m - p.StartIndent - p.EndIndent - (u == 0 ? p.FirstLineIndent : 0) : Infinity;
      while (!0) {
        if (u == O.length)
          break;
        var _ = O[u]
          , W = m == 0;
        if (V)
          W = W || V.indexOf(F) == -1;
        else
          W = W || (_.Og || _.kE) || m + _.rect.m < z;
        if (W) {
          _.kP.x = m;
          m += _.rect.m;
          u++;
          F += _.end - _.start
        } else
          break
      }
      // @ts-ignore
      E[0].push(u - y);
      // @ts-ignore
      E[1].push(z)
    }
    return E
  }
  
  public zd(O: any, i: any, p: any, V: any, E: any) {
    this.nY = [];
    this._x = [];
    this.rect = new R;
    this.rd = new R;
    this.kP = new l(0, 0);
    var u = NK.z_(O, V)
      , F = O.EngineDict.ParagraphRun.RunLengthArray
      , m = F[V]
      , y = 0
      , j = 0
      , b = 0
      , g = 0
      , o = 0;
    for (var z = 0; z < V; z++)
      y += F[z];
    var _ = u._Direction ? u._Direction : 0
      , W = UnicodeBidirectional.resolve
      , G = UnicodeBidirectional.reorderPermutation
      , J = NK.$I(O).slice(y, y + m)
      , v = [];
    for (var z = 0; z < J.length; z++) {
      var D = J.charCodeAt(z);
      v.push(D);
      if (D > j)
        j = D
    }
    var r = [];
    for (var z = 0; z < J.length; z++)
      r.push(0);
    if (j > 1424)
      r = W(v, _);
    for (var z = 0; z < v.length; z++)
      p[y + z].TN = r[z] & 1;
    var P = this.SB(O, i, p, y, y + m)
      , N = this.Si(P, E, u)[0]
      , T = [];
    for (var L = 0; L < N.length; L++) {
      var a = g;
      for (var z = 0; z < N[L]; z++) {
        var x = P[b + z];
        // @ts-ignore
        g += x.end - x.start
      }
      T.push(g);
      var K = r.slice(a, g)
        , U = G(K)
        , Y = p.slice(y + a, y + g);
      if (U.length == Y.length)
        for (var z = 0; z < Y.length; z++)
          p[y + a + z] = Y[U[z]];
      b += N[L]
    }
    this.nY = this.SB(O, i, p, y, y + m, T);
    var $ = this.Si(this.nY, E, u, T)
      , N = $[0]
      , e = $[1];
    for (var L = 0; L < N.length; L++) {
      var d = {
        start: o,
        end: 0,
        rect: new R,
        rd: new R,
        kP: new l(0, 0),
        NU: 0,
        lineHeight: 0,
        TB: 0,
        Ti: 0,
        qd: !0
      };
      this._x.push(d);
      o += N[L];
      d.end = o;
      var Z = d.end == this.nY.length
        , I = e[L]
        , S = NK.Hz(u);
      if (E && S > 2 && (S == 6 || !Z))
        this.fwC(d, this.nY, p, I, _);
      for (var z = d.start; z < d.end; z++) {
        var H = this.nY[z].rect.clone();
        H.FP(this.nY[z].kP);
        d.rect = d.rect.UJ(H);
        var q = this.nY[z].rd.clone();
        q.FP(this.nY[z].kP);
        d.rd = d.rd.UJ(q);
        d.NU = Math.max(d.NU, this.nY[z].NU);
        d.lineHeight = Math.max(d.lineHeight, this.nY[z].lineHeight);
        d.TB = Math.max(d.TB, this.nY[z].TB);
        d.Ti = Math.max(d.Ti, this.nY[z].Ti)
      }
      if (E) {
        var w = this.lineWidth(d, this.nY, _);
        d.kP.x = 0;
        if (S == 1 || Z && S == 4)
          d.kP.x = w[1] + (I - w[0]);
        if (S == 2 || Z && S == 5)
          d.kP.x = w[1] + (I - w[0]) / 2;
        if (this._x.length == 1)
          d.kP.x += u.FirstLineIndent;
        d.kP.x += u.StartIndent
      } else {
        if (S == 0)
          d.kP.x = u.StartIndent + u.FirstLineIndent;
        if (S == 1)
          d.kP.x = -d.rect.m - u.EndIndent;
        if (S == 2)
          d.kP.x = -d.rect.m / 2
      }
      if (this._x.length == 1)
        d.kP.y = 0;
      else
        d.kP.y = this._x[this._x.length - 2].kP.y + Math.max(this._x[this._x.length - 2].Ti + d.TB, d.lineHeight)
    }
    for (var z = 0; z < this._x.length; z++) {
      var C = this._x[z].rect.clone();
      C.FP(this._x[z].kP);
      this.rect = this.rect.UJ(C);
      var Q = this._x[z].rd.clone();
      Q.FP(this._x[z].kP);
      this.rd = this.rd.UJ(Q)
    }
    return this;
  }

  public fwx(O: any, i: any, p: any, V: any, E: any) {
    this.Og = E == 1 && p[V].zn == " ";
    this.kE = E == 1 && p[V].zn == "\n";
    this.start = V;
    this.end = V + E;
    this.rect = new R;
    this.rd = new R;
    this.kP = new l(0, 0);
    this.NU = 0;
    this.lineHeight = 0;
    this.TB = 0;
    this.Ti = 0;
    var u = 0
      , F = 0;
    if (E == 0) {
      this.lineHeight = p[V].lineHeight;
      this.NU = p[V].NU;
      this.rect = new R(0, -p[V].lineHeight, 0, p[V].lineHeight)
    }
    for (var m = 0; m < E; m++) {
      var y = p[V + m]
        , z = [1611, 1612, 1614, 1615, 1618, 1623, 1624, 1761, 1613, 1616, 1622, 1617, 1552 - 1556, 1625, 1750 - 1756, 1759, 1760, 1762, 1764, 1767, 1768, 1771, 1772, 1763, 1770, 1773, 1648, 1619, 1620, 1621].indexOf(y.zn.charCodeAt(0)) != -1 && y.ym.kern == null && y.ym.GPOS == null
        , _ = 1 / y.ym.head.unitsPerEm * y.$X.FontSize
        , v = 0;
      if (!y.$X.AutoKerning)
        u += y.$X.Kerning * 2 * _ * y.scale.x;
      y.kP.x = u;
      if (y.ym.hmtx.aWidth[y.yd])
        u += (z ? 0 : y.ym.hmtx.aWidth[y.yd]) * y.scale.x * _;
      if (y.$X.AutoKerning && m < E - 1) {
        var W = p[V + m + 1].yd
          , G = 0;
        if (W != -1) {
          G = TyprU.getPairAdjustment(y.ym, y.yd, W);
          if (z)
            y.kP.x += y.scale.x * _ * y.ym.hmtx.aWidth[W] / 2
        }
        if (G == null)
          G = 0;
        u += y.scale.x * G * _
      }
      var J = y.rect.clone();
      J.FP(y.kP);
      if (y.$X.Tracking)
        v = y.$X.Tracking * .001 * y.$X.FontSize;
      u += v;
      if (E == 1 && y.zn == " ")
        J.m += 2 * v;
      this.rect = this.rect.UJ(J);
      var j = y.rd.clone();
      j.FP(y.kP);
      this.rd = this.rd.UJ(j);
      this.NU = Math.max(this.NU, y.NU);
      this.lineHeight = Math.max(this.lineHeight, y.lineHeight);
      this.TB = Math.max(this.TB, y.TB);
      this.Ti = Math.max(this.Ti, y.Ti)
    }
  }

  public lineWidth(O: any, i: any, p: any) {
    var V = 0
      , E = 0;
    for (var u = O.start; u < O.end; u++)
      V += i[u].rect.m;
    if (p == 0)
      for (var u: any = O.end - 1; u >= O.start; u--)
        if (i[u].Og || i[u].kE)
          V -= i[u].rect.m;
        else
          break;
    if (p == 1)
      for (var u = O.start; u < O.end; u++)
        if (i[u].Og || i[u].kE) {
          var F = i[u].rect.m;
          V -= F;
          E -= F
        } else
          break;
    return [V, E]
  }

  public fwC(O: any, i: any, p: any, V: any, E: any) {
    var u = 0
      , F = 0
      , m = 0
      , y = 0;
    for (var z = O.start; z < O.end; z++)
      if (i[z].Og)
        m++;
      else {
        u += i[z].rect.m;
        F++
      }
    if (E == 0)
      for (var z: any = O.end - 1; z >= O.start; z--)
        if (i[z].Og || i[z].kE) {
          if (i[z].Og) {
            m--
          }
        } else
          break;
    if (E == 1)
      for (var z = O.start; z < O.end; z++)
        if (i[z].Og || i[z].kE) {
          if (i[z].Og) {
            m--;
            y++
          }
        } else
          break;
    if (F <= 1 || m == 0)
      return;
    var _ = (V - u) / m
      , W = -y * _;
    for (var z = O.start; z < O.end; z++) {
      if (i[z].Og)
        p[i[z].start].rect.m = i[z].rect.m = _;
      i[z].kP.x = W;
      W += i[z].rect.m
    }
  }
}