/* import Chalk from 'chalk'

declare const chalk: any;

export default chalk */
import Chalk from 'chalk'
declare module 'chalk' {
  interface Chalk {
    [color: string]: Function;
  }
}
