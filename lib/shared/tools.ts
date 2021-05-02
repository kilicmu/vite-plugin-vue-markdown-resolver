
export const extend = Object.assign

export const isString = (v: any): v is String => {
    return Object.prototype.toString.call(v).slice(8, 14) === 'String'
}

/**
 * 
 * @param str 生成标准代码块模板
 * @returns 
 */
export const genTmpl = (str: string) => `
    <pre class="hljs">
        <code>
            ${str}
        </code>
    </pre>
`


type Judger = <T = any>(v: any) => v is T
type TransferFn =  <T>(v) => T
/**
 * #### 将混合类型数组类型归一
 * @param arr 混合类型的数组 如 (string | number)[]
 * @param judger 判断此纪单元是否是其中一种类型的函数
 * @param transferFn 将不符合条件类型转换的函数
 * @returns 单一类型数组
 */
export const unifiedDatas = <T, F>(arr: (T | F)[], judger: Judger, transferFn:TransferFn) => {
    return arr.reduce<T[]>(
        (collection, next) => [
            ...collection, judger(next) ? 
            transferFn(next) : next
        ], []
    )
}
