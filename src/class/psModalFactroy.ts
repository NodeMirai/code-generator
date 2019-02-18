const modal: any = {
  'HEHE': {
    type: 'page',
    name: 'Page',
    filename: 'HEHE.jsx',
    opt: {},
    children: [
      {
        name: '$div',
        opt: {},
      }
    ],
  },
}

class PsModalFactory {
  generate(name: string) {
    return modal[name]
  }
}

export default PsModalFactory