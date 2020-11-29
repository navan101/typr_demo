import 'fabric';
import { fabric } from 'fabric';
import curved from './curved';
import { Point } from './curved/external/point';
import { Aq } from './curved/external/aq';
import { TyprU, Typr } from 'typr-ts';
import API from './curved/external/api';
import { OA } from './curved/external/OA';
import n from './curved/external/n';
import NK from './curved/external/NK';
import Opentype from 'opentype.js';

declare global {
  namespace fabric {
    interface CurvedTextOptions extends CorjlTextOptions {
      curvedType?: string;
      radius?: number;
      range?: number;
      spacing?: number;
      reverse?: boolean;
      uppercase?: boolean;
      meta?: any;
    }
  }
}

class CorjlCurvedText extends fabric.IText {
  type = 'curved-text';

  curvedType!: string;

  radius!: number;

  range!: number;

  spacing!: number;

  reverse = false;

  letters!: fabric.Group;

  uppercase?: boolean;

  meta: any;

  originalText?: string;

  _isRendering = 0;

  constructor(text: string, options?: fabric.CurvedTextOptions) {
    super(text, options);
  }

  complexity(): number {
    return super.complexity();
  }

  // @ts-ignore
  initialize(text: string, options?: any) {
    const _options = options || {};
    if (!_options.originalText) {
      this.originalText = text;
      _options.originalText = text;
    }
    // this.letters = new fabric.Group([], {
    //   selectable: false,
    //   padding: 0,
    // });
    // @ts-ignore
    super.initialize(text, options);
    console.log(text)
    if (this.canvas) this.canvas.requestRenderAll();
  }

  setText(text: string) {
    let _text = text;
    if (this.uppercase) {
      _text = text.toLocaleUpperCase();
    }
    this.set('text', _text);
  }
  setSpacing(ctx: CanvasRenderingContext2D) {
    // this.spacing = 0;
    // const circum = Math.floor(2 * Math.PI * this.radius);
    // ctx.font = this.fontSize + 'px ' + this.fontFamily;
    // // @ts-ignore
    // const char = this.text.length;
    // // @ts-ignore
    // const textWidth = Math.ceil(ctx.measureText(this.text).width + char);
    // const diff = Math.ceil(circum - textWidth);
    // this.spacing = Math.ceil(diff / char);
  }

  isReloadText() {
    return true;
  }

  drawTest(path: any, ctx: any) {
		ctx.beginPath();
		for (var i = 0; i < path.length; i += 1) {
			var cmd = path[i];
			if (cmd.type === 'M') {
				ctx.moveTo(cmd.x, cmd.y);
			} else if (cmd.type === 'L') {
				ctx.lineTo(cmd.x, cmd.y);
			} else if (cmd.type === 'C') {
				ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
			} else if (cmd.type === 'Q') {
				ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
			} else if (cmd.type === 'Z') {
				ctx.closePath();
			}
		}

		if (this.fill) {
			ctx.fillStyle = this.fill;
			ctx.fill();
		}

		if (this.stroke) {
			ctx.strokeStyle = this.stroke;
			ctx.lineWidth = this.strokeWidth;
			ctx.stroke();
		}
	}

  pathToContext(path: any, ctx: any) {
		var c = 0, cmds = path["cmds"], crds = path["crds"];
		for (var j = 0; j < cmds.length; j++) {
			var cmd = cmds[j];
			if (cmd == "M") {
				ctx.moveTo(crds[c], crds[c + 1]);
				c += 2;
			}
			else if (cmd == "L") {
				ctx.lineTo(crds[c], crds[c + 1]);
				c += 2;
			}
			else if (cmd == "C") {
				ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]);
				c += 6;
			}
			else if (cmd == "Q") {
				ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]);
				c += 4;
			}
			else if (cmd.charAt(0) == "#") {
				ctx.beginPath();
				ctx.fillStyle = cmd;
			}
			else if (cmd == "Z") {
				ctx.closePath();
			}
			else if (cmd == "X") {
				ctx.fill();
			}
		}
	}

  // async _render(ctx: CanvasRenderingContext2D) {
  //   super._render(ctx);
  //   ctx.save();
  //   await curved.start();
  //   // @ts-ignore
  //   const Y = curved.initCurved();
  //   let e = new Point();
  //   let aq = new Aq();
  //   curved.initTySh(e, aq);
  //   let obj = {
  //     warpStyle: 'warpArc',
  //     warpValue: 50,
  //   }
  //   curved.onChangeTySh(obj);

  //   let RH = {
  //     selectionStart: 0,
  //     value: ''
  //   }
  //   // @ts-ignore
  //   for(let i = 0; i < this.originalText?.length; i++) {
  //     RH.selectionStart++;
  //     // @ts-ignore
  //     RH.value += this.originalText[i];
  //     // const path = curved.startCurved(RH, Y);
  //     // @ts-ignore
  //     const { p, u } = curved.startCurved(RH, Y);
  //     const F = document.getElementById("canvas");
  //     // @ts-ignore
  //     F.width = this.canvas?.width;
  //     // @ts-ignore
  //     F.height = this.canvas?.height;
  //     // @ts-ignore
  //     const ctx = this.canvas?.getContext('2d');
  //     // console.log(path)
  //     // @ts-ignore
  //     this.pathToContext({
  //       crds: p.b,
  //       cmds: p.J
  //     }, ctx)
  //   }
  // }

  async _renderChar(method: any, ctx: CanvasRenderingContext2D, lineIndex: any, charIndex: any, _char: any, left: any, top: any) {
    await curved.start();
    // @ts-ignore
    const Y = curved.initCurved();
    let e = new Point();
    let aq = new Aq();
    // let vm = this;
    curved.initTySh(e, aq);
    let obj = {
      warpStyle: 'warpArc',
      warpValue: 50,
    }
    curved.onChangeTySh(obj);

    // curved.drawWord(ctx, Y, this.fontSize, left, top);

    // const font = await Opentype.load('fonts/Roboto-Black.ttf');
    // // @ts-ignore
    // let path = font.getPath(_char, left, top, this.fontSize).commands;
    // // this.drawTest(path.commands, ctx);
    // debugger
    // const aV = new OA(curved.TySh.mp, Y);
    // if (!n.Lq_ZE(curved.TySh.ct)) {
    //   let V = curved.p_Tj(path);
    //   path = curved.p_uX(path);
    //   path =  curved.p_up(path, Math.min(V.m, V.Q) / 8);
    //   let E = NK.Jx(curved.TySh, aV)
    //   let u = n.Lq_Is(curved.TySh.ct, E);
    //   // n.apply(u, path.crds, E)
    // }
    // this.drawTest(path, ctx);

    // let data1 = await curved.load("data1.json", ((data: any) =>{
    //   return data;
    // }), 'json');

    // // let data1 = curved.drawWord(ctx);

    // debugger
    // const aV = new OA(curved.TySh.mp, Y);
    // if (!n.Lq_ZE(curved.TySh.ct)) {
    //   let V = curved.p_Tj(data1);
    //   let path = curved.p_uX(data1);
    //   path =  curved.p_up(data1, Math.min(V.m, V.Q) / 8);
    //   this.drawTest(path, ctx);
    //   // console.log(path)
    //   // let E = NK.Jx(curved.TySh, aV)
    //   // let u = n.Lq_Is(curved.TySh.ct, E);
    //   // n.apply(u, p.b, E)
    // }
    // var F = i.F;
    // n.p_F(p.b, F, p.b);

    // let V = curved.p_Tj(data1);
    // curved.p_uX(data1);
    // curved.p_up(data1, Math.min(V.m, V.Q) / 8)
    // this.drawTest(data1, ctx);

    // let data = await curved.load("data1.json", ((data: any) =>{
    //   return data;
    // }), 'json');

    // console.log(data)
    // this.drawTest(data, ctx);

    // let data = await curved.load("data.json", ((data: any) =>{
    //   return data;
    // }), 'json');

    // // let scale = (size * this.getDPR()) / Curved.font.head.unitsPerEm;
    
    // ctx.translate(-202, -187);
    // // ctx.fillStyle = "#000000";
    // // ctx.scale(1, 1);
    // this.pathToContext(data, ctx);
    // ctx.scale(0.6, 0.6);

    // let data2 = await curved.load("data2.json", ((data: any) =>{
    //   return data;
    // }), 'json');

    // // let scale = (size * this.getDPR()) / Curved.font.head.unitsPerEm;
    // // @ts-ignore
    // ctx.translate(-(207 + this.fontSize), -(193 - (this.fontSize/4)));
    // this.pathToContext(data2, ctx);
    
    let RH = {
      selectionStart: 0,
      value: ''
    }
    let path: any;
    let rect: any;
    // @ts-ignore
    for(let i = 0; i < _char.length; i++) {
      RH.selectionStart++;
      RH.value += _char[i];
      // @ts-ignore
      const { p, u } = curved.startCurved(RH, Y);
      path = p;
      rect = u;
    }
    if(path) {
      this.width = rect.m;
      this.height = rect.Q;
      // @ts-ignore
      ctx.translate(-(rect.x + rect.m/2), -(rect.y + rect.Q/2));
      this.pathToContext({
        crds: path.b,
        cmds: path.J
      }, ctx)
      
    }
    if (this.canvas) this.canvas.renderAll();
  }

  toObject(propertiesToInclude?: string[]): any {
    return super.toObject([
      'uppercase', 'meta',
      'originalText', 'radius', 'range',
      'spacing', 'reverse', 'curvedType'
    ].concat(propertiesToInclude || []));
  }
}


declare global {
  namespace fabric {
    class CJCurvedText extends CorjlCurvedText { }
  }
}

fabric.CJCurvedText = CorjlCurvedText;
fabric.CJCurvedText.fromObject = (object: any, callback: any): any => {
  return <any>fabric.Object._fromObject('CJCurvedText', object, callback, 'text');
};
