import Chalk from 'chalk'

declare module 'chalk' {
  interface Chalk {
    [color: string]: Function;
  }
}
