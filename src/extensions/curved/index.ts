import { Typr, TyprU } from 'typr-ts';
import warp from './external/warp';
import Tysh from './external/tysh';
import { Curves } from './external/curves';
import { PathCurves } from './external/path-curves';
import { Rect } from './external/rect';
import { Txt } from './external/txt';
import { Path } from './external/path';

class Curved {
  public tySh: any = null;
  public SS: any = -1;
  public mb: any = -1;
  public txt: Txt = new Txt;

  public load(path: any, responseType: any = 'arraybuffer') {
    return new Promise(function (resolve) {
			let request = new XMLHttpRequest();
			request.open("GET", path, true);
			request.responseType = responseType;
			request.onload = function (e: any) {
				resolve(Typr.parse(e.target.response));
			};
			request.send();
		});
  };

  public initTySh(x: number, y: number, txt: Txt) {
    this.SS = this.mb = 0;
    this.txt = txt;
    this.tySh = Tysh.initTySh(x, y, txt);
  }

  public onChangeTySh(obj: any) {
    if (!obj)
      return;
    if (obj.warpStyle)
      this.tySh.ct.warpStyle.v.warpStyle = obj.warpStyle;
    if (obj.warpValue)
      this.tySh.ct.warpValue.v = obj.warpValue;
    this.tySh.data.EngineDict.Rendered.Shapes = {
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

  public startCurved(fonts: any) {
    const curves = new Curves(this.tySh.data, fonts);
    return this.curvedText(curves, this.tySh)
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


  private curvedText(curves: Curves, tySh: any) {
    let path = PathCurves.getPathCurves(curves, tySh);
    let rect = warp.getRect(warp.getRectOfCrds(path.b));
    return {
      path,
      rect
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

  public rederChar(input: any) {
    if (this.tySh == null)
      return;
    let i = input.selectionStart
      , p = this.tySh
      , V = Tysh.getText(p.data)
      , E = input.value + "\n"
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
      Tysh.mapDataRunLengthArray(p.data, this.SS, this.mb);
      Tysh.mapDataRunLengthArrayInput(p.data, this.SS, z);
      Tysh.mapData(p.data, this.SS, this.SS + z.length - 1, this.mapTxt(this.txt, p));
    this.SS = this.mb = m.length + z.length;
  }

  public mapTxt = function (txt: Txt, i: any) {
    let p = JSON.parse(JSON.stringify(txt));
    Tysh.mapTxtPoint(p, 1 / Tysh.point(i.F));
    return p
  }
}

export default new Curved();