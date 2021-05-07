import MarkdownIt from "markdown-it"
import { explainHtml2VueRender } from "./resolveHtml2JS"
import md from "./shared/configedMd"
import './md.css'

type PluginWithOptions = {
  plugin: MarkdownIt.PluginWithOptions<any>, 
  options?: Record<string, any>
}

type PluginWithParams = {
  plugin: MarkdownIt.PluginWithParams, 
  params?: any[]
}

type AcceptPluginType = 
  | MarkdownIt.PluginSimple 
  | PluginWithOptions
  | PluginWithParams

export interface MdResolverOptions {
    plugins: AcceptPluginType[];
    build?: boolean;
}

const attachMdPlugins = (md: MarkdownIt, plugins: AcceptPluginType[]) => {
  for(const plugin of plugins) {
    if(typeof plugin === 'object') {
      // with options
      if((plugin as PluginWithOptions).options) {
        const {options} = (plugin as PluginWithOptions)
        md.use(plugin.plugin, options)
      // with params
      } else {
        const {params} = (plugin as PluginWithParams)
        if(params){
          md.use(plugin.plugin, ...params)
        }else {
          md.use(plugin.plugin)
        }
        
      }
    }else{
      // only plugin
      md.use(plugin)
    }
  }
}

const resolveMd2VRender = (str: string) => {
  let htmlStr = ''
  try {
      htmlStr = md.render(str)
  } catch(e) {
      return new Error("[vue-markdown-resolver]: transform markdown fail, check your markdown source accord with target rules:" + e.message)
  }
  return explainHtml2VueRender(htmlStr)
}


const resolveOptions = (options: MdResolverOptions) => {
  if(options?.plugins?.length ?? 0 !== 0) {
    attachMdPlugins(md, options.plugins)
  }
}



const endWithDotMd = (path: string) => !!/\.(md)$/.test(path)
export default function VitePluginVueMarkdownResolver(options: MdResolverOptions) {
    resolveOptions(options)
    return {
        name: 'vite-plugin-vue-markdown-resolver',
        // @ts-ignore
        transform(source:string, id: string) {
            if(endWithDotMd(id)) {
                return {
                    code: resolveMd2VRender(source),
                    map: null
                }
            }
        }
    }
}