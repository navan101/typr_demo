import { Loca } from './loca';
import Tysh from './tysh';
import { Rect } from './rect';
import { Typr, TyprU } from 'typr-ts';
import * as UnicodeBidirectional from 'unicode-bidirectional';
import { Char } from './char';
import tysh from './tysh';

export class Curves {
  public _curves: any;
  public rect!: Rect;
  public listChar: any;

  public nY: any;
  public _x: any
  public rd: any;
  public loca: any;

  // public space: any;
  // public enter: any
  public start: any
  public end: any;
  // public NU: any;
  public lineHeight: any;
  // public TB: any;
  // public Ti: any;

  constructor(O: any, fonts: any) {
    this.init(O, fonts);
  }

  public init(data: any, fonts: any) {
    var box = Tysh.getBoxBounds(data);
    if (box)
      box = new Rect(box[0], box[1], box[2], box[3]);
    this._curves = [];
    this.rect = new Rect;
    this.listChar = [];
    var text = Tysh.getText(data)
    var glyphs: any = {};
    for (var i = 0; i < text.length; i++) {
      let _char: Char = {
        value: text.charAt(i),
        styles: Tysh.getStyleSheet(data, i),
        glyph: 0,
        path: null,
        font: null,
        rect: new Rect,
        rd: new Rect,
        loca: new Loca(0, 0),
        scale: new Loca(0, 0),
        // NU: 0,
        lineHeight: 0,
        // TB: 0,
        // Ti: 0,
        TN: 0,
      };
      let fontName = data.ResourceDict.FontSet[_char.styles.Font].Name
      let font = _char.font = fonts[fontName]
      let P = 0;
      if (glyphs[fontName] == null) {
        glyphs[fontName] = TyprU.stringToGlyphs(font, text)
      }
      var glyph = glyphs[fontName]
        , gl = TyprU.codeToGlyph(font, _char.value.charCodeAt(0));
      if (_char.value == "\n")
        _char.glyph = -1;
      else if (glyph[i] == gl && _char.styles.FontCaps != 0)
        _char.glyph = TyprU.codeToGlyph(font, _char.value.toUpperCase().charCodeAt(0));
      else
        _char.glyph = glyph[i];
      if (_char.glyph == -1)
        _char.path = {
          J: [],
          b: []
        };
      else {
        var G = TyprU.glyphToPath(font, _char.glyph);
        _char.path = {
          J: G.cmds,
          b: G.crds
        }
      }
      _char.scale.x = _char.styles.HorizontalScale == null ? 1 : _char.styles.HorizontalScale;
      _char.scale.y = _char.styles.VerticalScale == null ? 1 : _char.styles.VerticalScale;
      var J = font["OS/2"]
        , v = font.hhea;
      if (_char.styles.FontCaps == 1 && glyph[i] == gl && _char.value != _char.value.toUpperCase()) {
        var j = J.sxHeight ? J.sxHeight / J.sTypoAscender : .76;
        _char.scale.x *= j;
        _char.scale.y *= j
      }
      var scale = 1 / font.head.unitsPerEm * _char.styles.FontSize;
      if (_char.styles.FontBaseline == 1) {
        var j1 = data.ResourceDict.SuperscriptSize;
        _char.scale.x *= j1;
        _char.scale.y *= j1;
        _char.loca.y -= data.ResourceDict.SuperscriptPosition * _char.styles.FontSize
      }
      if (_char.styles.FontBaseline == 2) {
        var j2 = data.ResourceDict.SubscriptSize;
        _char.scale.x *= j2;
        _char.scale.y *= j2;
        _char.loca.y += data.ResourceDict.SubscriptPosition * _char.styles.FontSize
      }
      if (_char.styles.BaselineShift)
        _char.loca.y -= _char.styles.BaselineShift;
      _char.rect.x = 0;
      _char.rect.w = _char.scale.x * (_char.glyph == -1 ? 0 : font.hmtx.aWidth[_char.glyph]) * scale;
      _char.rect.y = -v.ascender * scale;
      _char.rect.h = -_char.rect.y;
      _char.rd = _char.rect.clone();
      _char.rd.h *= _char.scale.y;
      _char.rd.y -= _char.rd.h - _char.rect.h;
      _char.rd.h *= 1.3
      _char.rd.y = -scale * (J ? J.usWinAscent : font.head.yMax) * .9357;
      _char.rd.h = -_char.rd.y - scale * font.head.yMin;
      if (P == 0 && J && J.sxHeight && fontName.toLowerCase().indexOf("capitals") != -1)
        P = J.sxHeight;
      if (P == 0 && J && J.sCapHeight)
        P = J.sCapHeight;
      if (P == 0 && J && J.sTypoAscender)
        P = J.sTypoAscender;
      if (P == 0)
        P = v.ascender;
      // _char.NU = P * scale;
      _char.lineHeight = (v.ascender - v.descender) * scale;
      // _char.TB = v.ascender * scale;
      // _char.Ti = (-v.descender + v.lineGap) * scale;
      if (_char.styles.AutoLeading == !1)
        _char.lineHeight = _char.styles.Leading;
      this.listChar.push(_char)
    }
    for (var i = 0; i < data.EngineDict.ParagraphRun.RunLengthArray.length; i++) {
      var curves = this.mapCurves(data, this.listChar, i, box);
      this._curves.push(curves)
    }
  }

  public locationRect() {
    var O = Infinity
      , i = Infinity
      , p = -Infinity
      , V = -Infinity;
    for (var E = 0; E < this._curves.length; E++) {
      var u = this._curves[E];
      for (var F = 0; F < u._x.length; F++) {
        var m = u._x[F];
        if (!m.qd)
          break;
        for (var y = m.start; y < m.end; y++) {
          var z = u.nY[y];
          for (var _ = z.start; _ < z.end; _++) {
            var W = this.listChar[_]
              , G = u.loca.x + m.loca.x + z.loca.x + W.loca.x
              , J = u.loca.y + m.loca.y + z.loca.y + W.loca.y;
            O = Math.min(O, G + W.rd.x);
            i = Math.min(i, J + W.rd.y);
            p = Math.max(p, G + W.rd.x + W.rd.w);
            V = Math.max(V, J + W.rd.y + W.rd.h)
          }
        }
      }
    }
    return new Rect(O, i, p - O, V - i)
  }

  public getListCharSpaceAndEnter(listChar: any, length: any, runLengthArray: any, u?: any) {
    var _list = [length]
      , j = 0;
    for (let i = length; i < runLengthArray; i++) {
      if (listChar[i] == null)
        console.log(i, length, runLengthArray, listChar);
      var val = listChar[i].value
        , _code = val.charCodeAt(0);
      if (_code == 32) {
        _list.push(j, i, 1, i + 1);
        j = 0
      } else if (_code == 3851) {
        _list.push(j + 1, i + 1);
        j = 0
      } else if (19968 <= _code && _code <= 40959 || 12288 <= _code && _code <= 12543) {
        _list.push(j, i);
        j = 1
      } else if (u != null && (u.indexOf(i - length) != -1 || i != length && listChar[i].TN != listChar[i - 1].TN)) {
        _list.push(j, i);
        j = 1
      } else
        j++
    }
    _list.push(j);
    var listCharNotSpaceAndEnter = [];
    for (let i: any = 0; i < _list.length; i += 2) {
      if (_list[i + 1] == 0)
        continue;
      // @ts-ignore
      let charNotSpaceAndEnter = new this.getCharSpaceAndEnter(listChar, _list[i], _list[i + 1])
      listCharNotSpaceAndEnter.push(charNotSpaceAndEnter)
    }
    return listCharNotSpaceAndEnter
  }

  public Si(O: any, i: any, p: any, V?: any) {
    var E = [[], []]
    var u: number = 0
      , F = 0;
    while (u < O.length) {
      var m = 0
      var y: number = u
        , z = i ? i.w - p.StartIndent - p.EndIndent - (u == 0 ? p.FirstLineIndent : 0) : Infinity;
      while (!0) {
        if (u == O.length)
          break;
        var _ = O[u]
          , W = m == 0;
        if (V)
          W = W || V.indexOf(F) == -1;
        else
          W = W || (_.Og || _.kE) || m + _.rect.w < z;
        if (W) {
          _.loca.x = m;
          m += _.rect.w;
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

  public mapCurves(data: any, listChar: any, lengthArray: any, box: any) {
    this.nY = [];
    this._x = [];
    this.rect = new Rect;
    this.rd = new Rect;
    this.loca = new Loca(0, 0);
    var prop = Tysh.getProperties(data, lengthArray)
      , runLengthArray = data.EngineDict.ParagraphRun.RunLengthArray
      , length = 0
      , j = 0
      , b = 0
      , g = 0
      , o = 0;
    for (var i = 0; i < lengthArray; i++)
      length += runLengthArray[i];
    var _ = prop._Direction ? prop._Direction : 0
      , text = Tysh.getText(data).slice(length, length + runLengthArray[lengthArray])
      , v = [];
    var r = [];
    for (var i = 0; i < text.length; i++) {
      r.push(0);
      var D = text.charCodeAt(i);
      v.push(D);
      if (D > j)
        j = D
    }
    if (j > 1424)
      r = UnicodeBidirectional.resolve(v, _);
    for (var i = 0; i < v.length; i++)
      listChar[length + i].TN = r[i] & 1;
    var listCharSpaceAndEnter = this.getListCharSpaceAndEnter(listChar, length, length + runLengthArray[lengthArray])
      , N = this.Si(listCharSpaceAndEnter, box, prop)[0]
    let T: any = [];
    for (var L = 0; L < N.length; L++) {
      var a = g;
      for (var z = 0; z < N[L]; z++) {
        var x = listCharSpaceAndEnter[b + z];
        // @ts-ignore
        g += x.end - x.start
      }
      T.push(g);
      var K = r.slice(a, g)
        , U = UnicodeBidirectional.reorderPermutation(K)
        , Y = listChar.slice(length + a, length + g);
      if (U.length == Y.length)
        for (var z = 0; z < Y.length; z++)
          listChar[length + a + z] = Y[U[z]];
      b += N[L]
    }
    this.nY = this.getListCharSpaceAndEnter(listChar, length, length + runLengthArray[lengthArray]);
    var $ = this.Si(this.nY, box, prop)
      , N = $[0]
      , e = $[1];
    for (var i = 0; i < N.length; i++) {
      var d = {
        start: o,
        end: 0,
        rect: new Rect,
        rd: new Rect,
        loca: new Loca(0, 0),
        NU: 0,
        lineHeight: 0,
        TB: 0,
        Ti: 0,
        qd: !0
      };
      this._x.push(d);
      o += N[i];
      d.end = o;
      var Z = d.end == this.nY.length
        , I = e[L]
        , S = tysh.Hz(prop);
      if (box && S > 2 && (S == 6 || !Z))
        this.fwC(d, this.nY, listChar, I, _);
      for (var z = d.start; z < d.end; z++) {
        var H = this.nY[z].rect.clone();
        H.setOffset(this.nY[z].loca);
        d.rect = d.rect.getRect(H);
        var q = this.nY[z].rd.clone();
        q.setOffset(this.nY[z].loca);
        d.rd = d.rd.getRect(q);
        d.NU = Math.max(d.NU, this.nY[z].NU);
        d.lineHeight = Math.max(d.lineHeight, this.nY[z].lineHeight);
        d.TB = Math.max(d.TB, this.nY[z].TB);
        d.Ti = Math.max(d.Ti, this.nY[z].Ti)
      }
      if (box) {
        var w = this.lineWidth(d, this.nY, _);
        d.loca.x = 0;
        if (S == 1 || Z && S == 4)
          d.loca.x = w[1] + (I - w[0]);
        if (S == 2 || Z && S == 5)
          d.loca.x = w[1] + (I - w[0]) / 2;
        if (this._x.length == 1)
          d.loca.x += prop.FirstLineIndent;
        d.loca.x += prop.StartIndent
      } else {
        if (S == 0)
          d.loca.x = prop.StartIndent + prop.FirstLineIndent;
        if (S == 1)
          d.loca.x = -d.rect.w - prop.EndIndent;
        if (S == 2)
          d.loca.x = -d.rect.w / 2
      }
      if (this._x.length == 1)
        d.loca.y = 0;
      else
        d.loca.y = this._x[this._x.length - 2].loca.y + Math.max(this._x[this._x.length - 2].Ti + d.TB, d.lineHeight)
    }
    for (var z = 0; z < this._x.length; z++) {
      var C = this._x[z].rect.clone();
      C.setOffset(this._x[z].loca);
      this.rect = this.rect.getRect(C);
      var Q = this._x[z].rd.clone();
      Q.setOffset(this._x[z].loca);
      this.rd = this.rd.getRect(Q)
    }
    return this;
  }

  public getCharSpaceAndEnter(listChar: any, n: any, m: any) {
    // this.space = m == 1 && listChar[n].value == " ";
    // this.enter = m == 1 && listChar[n].value == "\n";
    this.start = n;
    this.end = n + m;
    this.rect = new Rect;
    this.rd = new Rect;
    this.loca = new Loca(0, 0);
    // this.NU = 0;
    this.lineHeight = 0;
    // this.TB = 0;
    // this.Ti = 0;
    var u = 0
    if (m == 0) {
      this.lineHeight = listChar[n].lineHeight;
      // this.NU = listChar[n].NU;
      this.rect = new Rect(0, -listChar[n].lineHeight, 0, listChar[n].lineHeight)
    }
    for (var i = 0; i < m; i++) {
      var y = listChar[n + i]
        , z = [1611, 1612, 1614, 1615, 1618, 1623, 1624, 1761, 1613, 1616, 1622, 1617, 1552 - 1556, 1625, 1750 - 1756, 1759, 1760, 1762, 1764, 1767, 1768, 1771, 1772, 1763, 1770, 1773, 1648, 1619, 1620, 1621].indexOf(y.value.charCodeAt(0)) != -1 && y.font.kern == null && y.font.GPOS == null
        , scale = 1 / y.font.head.unitsPerEm * y.styles.FontSize
        , v = 0;
      if (!y.styles.AutoKerning)
        u += y.styles.Kerning * 2 * scale * y.scale.x;
      y.loca.x = u;
      if (y.font.hmtx.aWidth[y.glyph])
        u += (z ? 0 : y.font.hmtx.aWidth[y.glyph]) * y.scale.x * scale;
      if (y.styles.AutoKerning && i < m - 1) {
        var W = listChar[n + i + 1].glyph
          , G = 0;
        if (W != -1) {
          G = TyprU.getPairAdjustment(y.font, y.glyph, W);
          if (z)
            y.loca.x += y.scale.x * scale * y.font.hmtx.aWidth[W] / 2
        }
        if (G == null)
          G = 0;
        u += y.scale.x * G * scale
      }
      var J = y.rect.clone();
      J.setOffset(y.loca);
      if (y.styles.Tracking)
        v = y.styles.Tracking * .001 * y.styles.FontSize;
      u += v;
      if (m == 1 && y.value == " ")
        J.w += 2 * v;
      this.rect = this.rect.getRect(J);
      var j = y.rd.clone();
      j.setOffset(y.loca);
      this.rd = this.rd.getRect(j);
      // this.NU = Math.max(this.NU, y.NU);
      this.lineHeight = Math.max(this.lineHeight, y.lineHeight);
      // this.TB = Math.max(this.TB, y.TB);
      // this.Ti = Math.max(this.Ti, y.Ti)
    }
  }

  public lineWidth(O: any, i: any, p: any) {
    var V = 0
      , E = 0;
    for (var u = O.start; u < O.end; u++)
      V += i[u].rect.w;
    if (p == 0)
      for (var u: any = O.end - 1; u >= O.start; u--)
        if (i[u].Og || i[u].kE)
          V -= i[u].rect.w;
        else
          break;
    if (p == 1)
      for (var u = O.start; u < O.end; u++)
        if (i[u].Og || i[u].kE) {
          var F = i[u].rect.w;
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
        u += i[z].rect.w;
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
        p[i[z].start].rect.w = i[z].rect.w = _;
      i[z].loca.x = W;
      W += i[z].rect.w
    }
  }
}