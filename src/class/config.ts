interface PageConfig {
  type?: string
  modal: string
  filename: string
  opt?: object
  className?: string
  propList?: Array<any>|string
  children?: Array<ComponentConfig>
}

interface ComponentConfig {
  name: string
  propList?: Array<object>
  content?: string
  children?: Array<ComponentConfig>
}

export {
  PageConfig,
}