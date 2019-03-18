interface PageConfig {
  type?: string
  modal: string
  filename: string
  nativeComponentPath?: string
  thirdComponentPath?: string
  opt?: object
  className?: string
  propList?: Array<object|string>
  children?: Array<ComponentConfig>
}

interface ComponentConfig {
  name: string
  className?: string
  useDefaultProp?: boolean
  propList?: Array<object|string>
  content?: string
  children?: Array<ComponentConfig>
}

export {
  PageConfig,
  ComponentConfig
}