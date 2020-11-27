/* eslint-disable max-classes-per-file */
import 'fabric';
import { fabric } from 'fabric';

declare module 'fabric/fabric-impl' {
	class CurvesText {}
}

declare global {
  namespace fabric {
    interface CorjlTextOptions extends ITextOptions {
      originalText?: string;
      uppercase?: boolean;
      meta?: any;
    }
  }
}