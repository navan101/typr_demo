import f from './f';
import { k } from './k';

export class fn {
  public fT: any = {};
  public jd: any = {};
  public IA: any = {};

  public Ne(O: any): any {
    if (this.fT[O])
      return this.fT[O];
    if (this.jd[O])
      return null;
    var i = null
      , p = this.Rt();
    // @ts-ignore
    if (p[O] != null)
    // @ts-ignore
      i = p[O][5];
    if (i == null) {
      var V;
      if (this.KB[O])
        V = this.KB[O];
      else {
        var E = "SourceHanSansSC-Regular SourceHanSansSC-Regular SourceHanSansSC-Regular SourceHanSansSC-Regular DejaVuSerif DejaVuSerif-Bold DejaVuSerif-Italic DejaVuSerif-BoldItalic".split(" ")
          , u = O.toLowerCase()
          , F = 0;
        if (u.indexOf("sans") != -1)
          F = 0;
        else if (u.indexOf("serif") != -1)
          F = 4;
        var m = u.indexOf("bold") != -1
          , y = u.indexOf("italic") != -1 || u.indexOf("oblique") != -1 || u.endsWith("-it");
        if (m && y)
          F += 3;
        else if (y)
          F += 2;
        else if (m)
          F += 1;
        V = E[F]
      }
      // if (this.IA[V] == null)
      //   alert(Nx.get([22, 6, 0]) + " " + O + " " + Nx.get([22, 6, 1]) + ". " + Nx.get([22, 6, 2]) + " " + V + ".");
      this.IA[V] = !0;
      return this.Ne(V)
    }
    this.jd[O] = "a";
    var z: any = new k(f.E.g, !0);
    z.data = {
      e: f.i.Cr,
      ti: {
        url: "" + i
      }
    };
    // this.B(z)
  }
  ;

  public KB: any = {
    ArialMT: "LiberationSans",
    "Arial-BoldMT": "LiberationSans-Bold",
    "Arial-ItalicMT": "LiberationSans-Italic",
    "Arial-BoldItalicMT": "LiberationSans-BoldItalic",
    TimesNewRomanPSMT: "LiberationSerif",
    "TimesNewRomanPS-BoldMT": "LiberationSerif-Bold",
    "TimesNewRomanPS-ItalicMT": "LiberationSerif-Italic",
    "TimesNewRomanPS-BoldItalicMT": "LiberationSerif-BoldItalic",
    CourierNewPSMT: "LiberationMono",
    "CourierNewPS-BoldMT": "LiberationMono-Bold",
    "CourierNewPS-ItalicMT": "LiberationMono-Italic",
    "CourierNewPS-BoldItalicMT": "LiberationMono-BoldItalic",
    TrebuchetMS: "SourceSansPro-Regular",
    "TrebuchetMS-Bold": "SourceSansPro-Semibold",
    "TrebuchetMS-Italic": "SourceSansPro-It",
    "TrebuchetMS-BoldItalic": "SourceSansPro-SemiboldIt",
    "Times-Roman": "LiberationSerif",
    Calibri: "SourceSansPro-Regular",
    "Calibri-Italic": "SourceSansPro-It",
    "Calibri-Bold": "SourceSansPro-Bold",
    CalibriBold: "SourceSansPro-Bold",
    "Times-Italic": "LiberationSerif-Italic",
    "Times-Bold": "LiberationSerif-Bold",
    "Helvetica-Bold": "LiberationSans-Bold",
    "HelveticaNeue-Thin": "Roboto-Thin",
    "HelveticaNeue-Light": "Roboto-Light",
    HelveticaNeue: "Roboto-Regular",
    "HelveticaNeue-Roman": "Roboto-Regular",
    "HelveticaNeue-Medium": "Roboto-Medium",
    "HelveticaNeue-Bold": "Roboto-Bold",
    "HelveticaNeue-BoldItalic": "Roboto-BoldItalic",
    "HelveticaNeue-Black": "Roboto-Black",
    "HelveticaNeue-Heavy": "Roboto-Black",
    "SFProText-Light": "Roboto-Light",
    "SFProText-Regular": "Roboto-Regular",
    "SFProText-Roman": "Roboto-Regular",
    "SFProText-Medium": "Roboto-Medium",
    "SFProText-Semibold": "Roboto-Medium",
    "SFProText-Bold": "Roboto-Bold",
    "SFProText-BoldItalic": "SFProText-BoldItalic",
    "SFProText-Black": "Roboto-Black",
    "SFProText-Heavy": "Roboto-Black",
    "SFProDisplay-Light": "Roboto-Light",
    "SFProDisplay-Regular": "Roboto-Regular",
    "SFProDisplay-Roman": "Roboto-Regular",
    "SFProDisplay-Medium": "Roboto-Medium",
    "SFProDisplay-Semibold": "Roboto-Medium",
    "SFProDisplay-Bold": "Roboto-Bold",
    "SFProDisplay-BoldItalic": "SFProDisplay-BoldItalic",
    "SFProDisplay-Black": "Roboto-Black",
    "SFProDisplay-Heavy": "Roboto-Black",
    "SFUIText-Light": "Roboto-Light",
    "SFUIText-Regular": "Roboto-Regular",
    "SFUIText-Roman": "Roboto-Regular",
    "SFUIText-Medium": "Roboto-Medium",
    "SFUIText-Semibold": "Roboto-Medium",
    "SFUIText-Bold": "Roboto-Bold",
    "SFUIText-BoldItalic": "SFUIText-BoldItalic",
    "SFUIText-Black": "Roboto-Black",
    "SFUIText-Heavy": "Roboto-Black",
    Verdana: "DeajVuSans",
    "Verdana-Bold": "SourceHanSansSC-Regular",
    "Verdana-Italic": "SourceHanSansSC-Regular",
    "Verdana-BoldItalic": "SourceHanSansSC-Regular",
    "MyriadPro-Regular": "PTSans-Regular",
    "MyriadPro-Bold": "PTSans-Bold",
    "MyriadPro-LightIt": "PTSans-Italic",
    "MyriadPro-Semibold": "PTSans-Bold",
    "MyriadPro-BlackCond": "PTSans-NarrowBold",
    Cambria: "Oranienbaum-Regular",
    Georgia: "CharisSIL",
    "Georgia-Bold": "CharisSIL-Bold",
    "Georgia-Italic": "CharisSIL-Italic",
    "Georgia-BoldItalic": "CharisSIL-BoldItalic",
    "AGaramondPro-Regular": "EBGaramond08-Regular",
    "AGaramondPro-Bold": "EBGaramond08-Bold",
    "AGaramondPro-Italic": "EBGaramond08-Italic",
    Garamond: "EBGaramond08-Regular",
    FontAwesome: "FontAwesome5FreeSolid",
    "ProximaNova-Regular": "Metropolis-Regular",
    "ProximaNova-Semibold": "Metropolis-SemiBold",
    "ProximaNova-Light": "Metropolis-Light",
    BellMT: "GalatiaSIL",
    PalatinoLinotype: "TeXGyrePagella-Regular",
    "PalatinoLinotype-Bold": "TeXGyrePagella-Bold",
    "PalatinoLinotype-Italic": "TeXGyrePagella-Italic",
    "PalatinoLinotype-BoldItalic": "TeXGyrePagella-BoldItalic",
    "": ""
  }

  public Rt() {
    // if (FNTS.map == null) {
    //   var O = FNTS.list;
    //   for (var i = 0; i < O.length; i++)
    //     this.KG(O[i], i)
    // }
    // return FNTS.map
  }
  ;
  public KG(O: any, i: any) {
    var p = O[0]
      , V = O[1];
    O.BC = i;
    // if (FNTS.map == null)
    //   FNTS.map = {};
    // FNTS.map[O[2]] = O;
    // if (FNTS.mapFS == null)
    //   FNTS.mapFS = {};
    // FNTS.mapFS[p + "---" + V] = O;
    // if (FNTS.mapSub == null)
    //   FNTS.mapSub = {};
    // var E = FNTS.mapSub[p];
    // if (E == null)
    //   E = FNTS.mapSub[p] = [];
    // if (E.indexOf(V) == -1)
    //   E.push(V)
  }

}