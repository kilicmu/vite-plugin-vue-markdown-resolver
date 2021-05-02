import { MdSupportsContainer, VALIDATE_REGS } from "./static"
import { genTmpl } from "./tools"
import MarkdownIt from "markdown-it"
import hljs from "highlight.js"
import MarkdownItDesflist from "markdown-it-deflist"
import MarkdownItAbbr from "markdown-it-abbr"
import MarkdownItMark from "markdown-it-mark"
import MarkdownItEmoji from "markdown-it-emoji"
import MarkdownItContainer from "markdown-it-container"
import MarkdownItMultimdTable from "markdown-it-multimd-table"
import MarkdownItTaskLists from "markdown-it-task-lists"


const md: MarkdownIt = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    // @ts-ignore
    highlight: function(str:string, lang:string) {
        // judge class name by lang. eg: language-js 
        if(lang && hljs.getLanguage(lang)) {
            try {
                const {value: parsedCode} = hljs.highlight(str, lang)
                return genTmpl(parsedCode)
            }catch(_){};
        } else {
            return genTmpl(md.utils.escapeHtml(str))
        }
        // hljs.highlightAll()
    },

})

const batchUseContainerRules = (md: MarkdownIt, supportRules: Record<string, RegExp>) => {
    const keys = [...Object.keys(supportRules), 'normal']
    for(let key of keys) {
      const validateReg = supportRules?.[key] ?? VALIDATE_REGS.NORMAL_TAG_VALIDATE
      // use container rule
      md.use(MarkdownItContainer, key, {
        validate: (params) => params.trim().match(validateReg),
        render: function (tokens, idx) {
            var m = tokens[idx].info.trim().match(validateReg);
            if (tokens[idx].nesting === 1) {
              return `<blockquote class='${key}'><p>${md.utils.escapeHtml(m?.[1] ?? '')}</p>\n`;
            } else {
              return '</blockquote>\n';
            }
        }
      })
    }
}

md
// use deflist
.use(MarkdownItDesflist)
// use abbr
.use(MarkdownItAbbr)
// use mark => ==markd== => <mark>marked</mark>
.use(MarkdownItMark)
.use(MarkdownItEmoji)
.use(MarkdownItMultimdTable)
.use(MarkdownItTaskLists, {
    enable: true,
    label: true,
    labelAfter: true
})

batchUseContainerRules(md, MdSupportsContainer)


export default md
