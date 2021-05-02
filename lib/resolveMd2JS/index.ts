import { compile } from "@vue/compiler-dom"
import { version } from "@vue/compiler-dom/package.json"

/**
 * 
 * @param str vue template string 
 * @returns vue render function export by EMS likes `export default function(...) {...}`
 */
export const explainHtml2VueRender = (str: string) => {
    let code = ''
  try {
    code = compile(str, { mode: 'module'}).code
  } catch(e) {
      // if(e.message.includes('missing')) {
      //     throw e
      // } else {
      //     throw new Error('cant resolve this resource: \n' + str + 'with ' + e.message);
      // }
      throw e;
  }
  if(code.includes('export default')) {
      return code
  }else{
      const renderIdx = code.indexOf('function render')
      // complied resource with 'function render' eg: you can find what will get after complier in @vue/compiler
      if(renderIdx === -1) {
        throw new Error(
            `[vue-markdown-resolver]: @vue/compiler compiled resource doesn't contain function render
             please check your @vue/compiler version: ${version}.`
        )
      }

      // slice likes 'export default' to judge if there is a default import
      if(code.slice(0, renderIdx - 1).endsWith('default')) {
        return code
      }

      // rebuild 'export function render(/***/)' => 'export default function render(/***/)'
      return code.slice(0, renderIdx) + ` default ` + code.slice(renderIdx)
  }
}




