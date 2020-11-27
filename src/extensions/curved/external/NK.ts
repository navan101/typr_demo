import n from './n';
import { ND } from './ND';
import { R } from './R';

class NK {
  public MV(O: any) {
    return JSON.parse(JSON.stringify(O))
  }

  public Ij(O: any, i: any) {
    for (var p in i)
      O[p] = i[p]
  }

  public Cw(O: any, i: any, p: any) {
    var V = this.fsg();
    if (p)
    this.dD(V, 0, 0, p);
    var E: any = {
      F: new ND(1, 0, 0, 1, Math.round(O), Math.round(i)),
      mp: V
    };
    E.eB = this.ky();
    E.ct = n.Lq_U();
    E.Wr = new R;
    return E
  }

  public Hz(O: any, i?: any) {
    if (!i)
      i = O.Justification;
    var p = O._Direction ? O._Direction : 0;
    if (p == 1) {
      if (i == 0 || i == 3)
        i++;
      else if (i == 1 || i == 4)
        i--
    }
    return i
  }

  public $L(O: any) {
    var i: any = {
      j: 0,
      a: 0,
      Z: 0
    };
    if (O.FillColor) {
      var p = O.FillColor
        , V = p.Values;
      if (p.Type == 1)
        i = {
          j: V[1] * 255,
          a: V[2] * 255,
          Z: V[3] * 255
        };
      else if (p.Type == 2) {
        var E = {
          classID: "CMYC",
          Cyn: {
            t: "doub",
            v: V[1] * 100
          },
          Mgnt: {
            t: "doub",
            v: V[2] * 100
          },
          Ylw: {
            t: "doub",
            v: V[3] * 100
          },
          Blck: {
            t: "doub",
            v: V[4] * 100
          }
        };
        i = n.n_$L(E)
      } else
        console.log("Unknown color type")
    }
    return i
  }


  public Jx(O: any, i: any) {
    var p;
    if (this.gW(O.mp) == 1) {
      var V = this.x$(O.mp);
      p = new R(0, 0, V[2] - V[0], V[3] - V[1])
    } else
      p = i.zg();
    return p
  }

  public $I(O: any) {
    return O.EngineDict.Editor.Text.replace(/\r/g, "\n").replace(/\u0003/g, "\n")
  }

  public SF(O: any, i: any) {
    O.EngineDict.Editor.Text = i.replace(/\n/g, "\r")
  }

  public gW(O: any) {
    return O.EngineDict.Rendered.Shapes.Children[0].ShapeType
  }

  public x$(O: any) {
    return O.EngineDict.Rendered.Shapes.Children[0].Cookie.Photoshop.BoxBounds
  }

  public fsm(O: any, i: any) {
    return this.kY(O, this.gl(O.EngineDict.StyleRun.RunLengthArray, i).jF)
  }

  public kY(O: any, i: any) {
    var p = O.ResourceDict.StyleSheetSet[0].StyleSheetData
    var V: any = {};
    for (var E in p)
      V[E] = p[E];
    var u = O.EngineDict.StyleRun.RunArray[i].StyleSheet.StyleSheetData;
    this.Ij(V, u);
    return V
  }

  public z_(O: any, i: any) {
    var p = O.ResourceDict.ParagraphSheetSet[0].Properties
      , V = this.MV(p)
      , E = O.EngineDict.ParagraphRun.RunArray[i].ParagraphSheet.Properties;
    this.Ij(V, E);
    return V
  }

  public xv(O: any, i: any, p: any) {
    if (p == "")
      return;
    var V = this.$I(O);
    this.SF(O, V.substring(0, i) + p + V.substring(i, V.length));
    var E = this.gl(O.EngineDict.StyleRun.RunLengthArray, i - 1);
    O.EngineDict.StyleRun.RunLengthArray[E.jF] += p.length;
    var u = O.EngineDict.ParagraphRun
      , F = u.RunLengthArray
      , m = this.gl(F, i)
      , y = p.split("\n");
    if (y.length == 1) {
      F[m.jF] += p.length;
      return
    }
    F.splice(m.jF + 1, 0, F[m.jF] - (i - m.fy));
    u.RunArray.splice(m.jF + 1, 0, this.MV(u.RunArray[m.jF]));
    F[m.jF] -= F[m.jF + 1];
    F[m.jF] += y[0].length + 1;
    for (var z = 1; z < y.length - 1; z++) {
      u.RunArray.splice(m.jF + z, 0, this.MV(u.RunArray[m.jF + z - 1]));
      u.RunLengthArray.splice(m.jF + z, 0, y[z].length + 1)
    }
    F[m.jF + y.length - 1] += y[y.length - 1].length
  }

  public zL(O: any, i: any, p: any) {
    var V = this.$I(O);
    this.SF(O, V.substring(0, i) + V.substring(p, V.length));
    this.kf(O.EngineDict.ParagraphRun, i, p, !0);
    this.kf(O.EngineDict.StyleRun, i, p, !1)
  }

  public kf(O: any, i: any, p: any, V: any) {
    var E = O.RunLengthArray
      , u = this.gl(E, i)
      , F = this.gl(E, p)
      , m = [];
    for (var y = 0; y < E.length; y++)
      for (var z = 0; z < E[y]; z++)
        m.push(y);
    m.splice(i, p - i);
    var _ = [];
    for (var y = 0; y < E.length; y++)
      _.push(0);
    for (var y = 0; y < m.length; y++)
      _[m[y]]++;
    for (var y = 0; y < E.length; y++) {
      if (_[y] == 0) {
        _.splice(y, 1);
        E.splice(y, 1);
        O.RunArray.splice(y, 1);
        y--
      } else if (_[y] < E[y])
        E[y] = _[y]
    }
    if (V && u.jF != F.jF && u.fy != i) {
      E[u.jF] += E[u.jF + 1];
      E.splice(u.jF + 1, 1);
      O.RunArray.splice(u.jF + 1, 1)
    }
  }

  public dD(O: any, i: any, p: any, V: any) {
    var E = O.EngineDict.Editor.Text.length;
    if (p == E - 2)
      p++;
    if (V.xC.Font != null)
      O.ResourceDict.FontSet = V.DY.slice(0);
    if (i <= p)
      this.kz(O.EngineDict.StyleRun, V.xC, i, p, !0);
    this.kz(O.EngineDict.ParagraphRun, V.ca, i, p, !1)
  }

  public kz(O: any, i: any, p: any, V: any, E: any) {
    var u = O.RunLengthArray;
    if (E) {
      var F = this.gl(u, p);
      if (F.fy != p) {
        var m = u[F.jF];
        u.splice(F.jF, 0, p - F.fy);
        u[F.jF + 1] = m - u[F.jF];
        O.RunArray.splice(F.jF + 1, 0, this.MV(O.RunArray[F.jF]))
      }
      var y = this.gl(u, V);
      if (y.fy + u[y.jF] - 1 != V) {
        var m = u[y.jF];
        u.splice(y.jF, 0, V - y.fy + 1);
        u[y.jF + 1] = m - u[y.jF];
        O.RunArray.splice(y.jF + 1, 0, this.MV(O.RunArray[y.jF]))
      }
    }
    var F = this.gl(u, p)
      , y = this.gl(u, V);
    if (E)
      for (var z = F.jF; z <= y.jF; z++)
        this.Ij(O.RunArray[z].StyleSheet.StyleSheetData, i);
    else
      for (var z = F.jF; z <= y.jF; z++)
        this.Ij(O.RunArray[z].ParagraphSheet.Properties, i)
  }


  public yN(O: any, i: any) {
    var p, V;
    p = ["FontSize", "Leading", "BaselineShift"];
    V = O.xC;
    for (var E = 0; E < p.length; E++)
      if (V[p[E]] != null)
        V[p[E]] *= i;
    p = ["StartIndent", "EndIndent", "FirstLineIndent", "SpaceBefore", "SpaceAfter"];
    V = O.ca;
    for (var E = 0; E < p.length; E++)
      if (V[p[E]] != null)
        V[p[E]] *= i
  }

  public ky() {
    return {
      classID: "TxLr",
      Txt: {
        t: "TEXT",
        v: "\0"
      },
      textGridding: {
        t: "enum",
        v: {
          textGridding: "None"
        }
      },
      Ornt: {
        t: "enum",
        v: {
          Ornt: "Hrzn"
        }
      },
      AntA: {
        t: "enum",
        v: {
          Annt: "antiAliasSharp"
        }
      },
      TextIndex: {
        t: "long",
        v: 0
      }
    }
  }

  public gl(O: any, i: any) {
    var p = 0
      , V = 0;
    while (p + O[V] <= i) {
      p += O[V];
      V++
    }
    return {
      jF: V,
      fy: p
    }
  }

  public fsg() {
    var O = this.MV(this.kO);
    return O
  }

  public kN: any = {
    Justification: 0,
    FirstLineIndent: 0,
    StartIndent: 0,
    EndIndent: 0,
    SpaceBefore: 0,
    SpaceAfter: 0,
    AutoHyphenate: !1,
    HyphenatedWordSize: 6,
    PreHyphen: 2,
    PostHyphen: 2,
    ConsecutiveHyphens: 8,
    Zone: 36,
    WordSpacing: [.8, 1, 1.33],
    LetterSpacing: [0, 0, 0],
    GlyphSpacing: [1, 1, 1],
    AutoLeading: 1.2,
    LeadingType: 0,
    Hanging: !1,
    Burasagari: !1,
    KinsokuOrder: 0,
    EveryLineComposer: !1,
    _Direction: 0
  }

  public fsb: any = {
    Font: 0,
    FontSize: 12,
    FauxBold: !1,
    FauxItalic: !1,
    AutoLeading: !0,
    Leading: 0,
    HorizontalScale: 1,
    VerticalScale: 1,
    Tracking: 0,
    AutoKerning: !0,
    Kerning: 0,
    BaselineShift: 0,
    FontCaps: 0,
    FontBaseline: 0,
    Underline: !1,
    Strikethrough: !1,
    Ligatures: !0,
    DLigatures: !1,
    BaselineDirection: 2,
    Tsume: 0,
    StyleRunAlignment: 2,
    Language: 0,
    NoBreak: !1,
    FillColor: {
      Type: 1,
      Values: [1, 0, 0, 0]
    },
    StrokeColor: {
      Type: 1,
      Values: [1, 0, 0, 0]
    },
    FillFlag: !0,
    StrokeFlag: !1,
    FillFirst: !0,
    YUnderline: 1,
    OutlineWidth: 1,
    CharacterDirection: 0,
    HindiNumbers: !1,
    Kashida: 1,
    DiacriticPos: 2
  }

  public kO: any = {
    EngineDict: {
      Editor: {
        Text: "\n"
      },
      ParagraphRun: {
        DefaultRunData: {
          ParagraphSheet: {
            DefaultStyleSheet: 0,
            Properties: {}
          },
          Adjustments: {
            Axis: [1, 0, 1],
            XY: [0, 0]
          }
        },
        RunArray: [{
          ParagraphSheet: {
            DefaultStyleSheet: 0,
            Properties: JSON.parse(JSON.stringify(this.kN))
          },
          Adjustments: {
            Axis: [1, 0, 1],
            XY: [0, 0]
          }
        }],
        RunLengthArray: [1],
        IsJoinable: 1
      },
      StyleRun: {
        DefaultRunData: {
          StyleSheet: {
            StyleSheetData: {}
          }
        },
        RunArray: [{
          StyleSheet: {
            StyleSheetData: {
              Font: 0,
              FontSize: 24,
              AutoKerning: !0,
              Kerning: 0
            }
          }
        }],
        RunLengthArray: [1],
        IsJoinable: 2
      },
      GridInfo: {
        GridIsOn: !1,
        ShowGrid: !1,
        GridSize: 18,
        GridLeading: 22,
        GridColor: {
          Type: 1,
          Values: [0, 0, 0, 1]
        },
        GridLeadingFillColor: {
          Type: 1,
          Values: [0, 0, 0, 1]
        },
        AlignLineHeightToGridFlags: !1
      },
      AntiAlias: 4,
      UseFractionalGlyphWidths: !0,
      Rendered: {
        Version: 1,
        Shapes: {
          WritingDirection: 0,
          Children: [{
            ShapeType: 0,
            Procession: 0,
            Lines: {
              WritingDirection: 0,
              Children: []
            },
            Cookie: {
              Photoshop: {
                ShapeType: 0,
                PointBase: [0, 0],
                Base: {
                  ShapeType: 0,
                  TransformPoint0: [1, 0],
                  TransformPoint1: [0, 1],
                  TransformPoint2: [0, 0]
                }
              }
            }
          }]
        }
      }
    },
    ResourceDict: {
      KinsokuSet: [{
        Name: "PhotoshopKinsokuHard",
        NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u30FC\u2015\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u309B\u309C?!)]},.:;\u2103\u2109\xA2\uFF05\u2030",
        NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010([{\uFFE5\uFF04\xA3\uFF20\xA7\u3012\uFF03",
        Keep: "\u2015\u2025",
        Hanging: "\u3001\u3002.,"
      }, {
        Name: "PhotoshopKinsokuSoft",
        NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005",
        NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010",
        Keep: "\u2015\u2025",
        Hanging: "\u3001\u3002.,"
      }],
      MojiKumiSet: [{
        InternalName: "Photoshop6MojiKumiSet1"
      }, {
        InternalName: "Photoshop6MojiKumiSet2"
      }, {
        InternalName: "Photoshop6MojiKumiSet3"
      }, {
        InternalName: "Photoshop6MojiKumiSet4"
      }],
      TheNormalStyleSheet: 0,
      TheNormalParagraphSheet: 0,
      ParagraphSheetSet: [{
        Name: "Normal RGB",
        DefaultStyleSheet: 0,
        Properties: JSON.parse(JSON.stringify(this.kN))
      }],
      StyleSheetSet: [{
        Name: "Normal RGB",
        StyleSheetData: JSON.parse(JSON.stringify(this.fsb))
      }],
      FontSet: [{
        Name: "DejaVuSans",
        Script: 0,
        FontType: 1,
        Synthetic: 0
      }, {
        Name: "AdobeInvisFont",
        Script: 0,
        FontType: 0,
        Synthetic: 0
      }, {
        Name: "MyriadHebrew-Regular",
        Script: 6,
        FontType: 0,
        Synthetic: 0
      }],
      SuperscriptSize: .583,
      SuperscriptPosition: .333,
      SubscriptSize: .583,
      SubscriptPosition: .333,
      SmallCapSize: .7
    }
  }
}

export default new NK();