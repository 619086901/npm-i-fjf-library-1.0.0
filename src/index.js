import $ from 'dom7'
import { h } from 'snabbdom'
import { cloneDeep } from 'lodash-es'
class MyWavyLineMenu {
  constructor() {
    this.title = '波浪线' // 自定义菜单标题
    // this.iconSvg = '<svg>...</svg>' // 可选
    this.tag = 'button'
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor) {
    console.log(editor)

    return false
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor) {
    return false
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor) {
    return false
  }
  // 点击菜单时触发的函数
  exec(editor, value) {
    editor.getSelectionText()
    if (this.isDisabled(editor)) return
    // if (editor.getHtml())
    // const getSelectionText = editor.getSelectionText()
    // const text = {
    //   type: 'attachment',
    //   text: getSelectionText,
    // children: [{ text }],
    // }
    // insertText 在选区插入文本
    // editor.dangerouslyInsertHtml(`<h1>标题</h1><p>文本 <b>加粗</b></p>`)
    // editor.insertNode(text) // value 即 this.value(editor) 的返回值

    const getFragment = editor.getFragment()
    const text = editor.getSelectionText()
    const getHtml = editor.getHtml()
    console.log(getHtml.match('data-editor-wavyline'))
    if (getFragment[0].children[0]) {
      editor.insertNode({
        text,
        wavyline: !getFragment[0].children[0].wavyline
      })
    }
  }
}

class MyDottedMenu {
  constructor() {
    this.title = '加点' // 自定义菜单标题
    // this.iconSvg = '<svg>...</svg>' // 可选
    this.tag = 'button'
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor) {
    return false
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor) {
    return false
  }
  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor) {
    return false
  }
  // 点击菜单时触发的函数
  exec(editor, value) {
    editor.getSelectionText()
    if (this.isDisabled(editor)) return
    // if (editor.getHtml())
    // const getSelectionText = editor.getSelectionText()
    // const text = {
    //   type: 'attachment',
    //   text: getSelectionText,
    // children: [{ text }],
    // }
    // insertText 在选区插入文本
    // editor.dangerouslyInsertHtml(`<h1>标题</h1><p>文本 <b>加粗</b></p>`)
    // editor.insertNode(text) // value 即 this.value(editor) 的返回值

    const getFragment = editor.getFragment()
    const text = editor.getSelectionText()
    if (text.length > 0) {
      getFragment[0].children.forEach((item) => {
        for (let i = 0; i < item.text.length; i++) {
          editor.insertNode({
            text: item.text[i],
            dotted: !item.dotted
          })
        }
      })
    }
  }
}

/**
 * 渲染“波浪线”元素到编辑器
 * @param elem 波浪线元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */
// function renderAttachment(elem, children, editor): VNode {
//   const { text } = elem
//   // 波浪线元素 vnode
//   const attachVnode = h(
//     // HTML tag
//     'span',
//     // HTML 属性、样式、事件
//     {
//       props: {}, // HTML 属性，驼峰式写法
//       style: {
//         textDecoration: 'wavy underline #757575',
//       }, // style ，驼峰式写法
//     },
//     [children]
//   )

//   return attachVnode
// }
/**
 * 生成“波浪线”元素的 HTML
 * @param elem 波浪线元素，即上文的 myResume
 * @param childrenHtml 子节点的 HTML 代码，void 元素可忽略
 * @returns “波浪线”元素的 HTML 字符串
 */
// function attachmentToHtml(elem, childrenHtml) {
//   const { text } = elem
//   const html = `<span
//                 data-w-e-type="attachment"
//                 data-w-e-is-void
//                 data-w-e-is-inline
//               >${text}</span>`
//   return html
// }
/**
 * 解析 HTML 字符串，生成“波浪线”元素
 * @param domElem HTML 对应的 DOM Element
 * @param children 子节点
 * @param editor editor 实例
 * @returns “波浪线”元素，如上文的 myResume
 */
// function parseAttachmentHtml(
//   domElem,
//   children,
//   editor
// ) {
//   const myResume = {
//     type: 'attachment',
//     children: [{ text: '' }], // void node 必须有 children ，其中有一个空字符串，重要！
//     // text: editor.getSelectionText(),
//     text: editor.getSelectionText(),
//   }
//   return myResume
// }

const withStyleToHtml = (textNode, textHtml) => {
  const { bold, italic, underline, code, through, sub, sup, wavyline, dotted } =
    textNode
  let styledHtml = textHtml
  if (wavyline) {
    styledHtml = `<span data-editor-wavyline="1">${textHtml}</span>`
  }
  if (dotted) {
    let html = ''
    for (let i = 0; i < textHtml.length; i++) {
      html += `<span data-editor-dotted="1">${textHtml[i]}</span>`
    }
    styledHtml = html
  }
  if (bold) styledHtml = `<strong>${styledHtml}</strong>`
  if (code) styledHtml = `<code>${styledHtml}</code>`
  if (italic) styledHtml = `<em>${styledHtml}</em>`
  if (underline) styledHtml = `<u>${styledHtml}</u>`
  if (through) styledHtml = `<s>${styledHtml}</s>`
  if (sub) styledHtml = `<sub>${styledHtml}</sub>`
  if (sup) styledHtml = `<sup>${styledHtml}</sup>`

  return styledHtml
}
function isMatch($text, selector) {
  if ($text.length === 0) return false
  if ($text[0].matches(selector)) return true
  // if ($text.find(selector).length > 0) return true
  return false
}
const withParseStyleHtml = (textElem, node) => {
  const $text = $(textElem)
  const tagName = textElem.tagName.toLowerCase()
  // if (!Text.isText(node)) return node
  const textNode = node
  // 波浪线
  if (
    tagName === 'span' &&
    textElem.getAttribute('data-editor-wavyline') == '1'
  ) {
    textNode.wavyline = true
  }
  if (
    tagName === 'span' &&
    textElem.getAttribute('data-editor-dotted') == '1'
  ) {
    textNode.dotted = true
  }
  if (isMatch($text, 'dotted')) {
    textNode.dotted = true
  }
  // bold
  if (isMatch($text, 'b,strong')) {
    textNode.bold = true
  }
  // italic
  if (isMatch($text, 'i,em')) {
    textNode.italic = true
  }
  // underline
  if (isMatch($text, 'u')) {
    textNode.underline = true
  }
  // through
  if (isMatch($text, 's,strike')) {
    textNode.through = true
  }
  // sub
  if (isMatch($text, 'sub')) {
    textNode.sub = true
  }
  // sup
  if (isMatch($text, 'sup')) {
    textNode.sup = true
  }
  // code
  if (isMatch($text, 'code')) {
    textNode.code = true
  }
  return node
}
const withStyle = (node, vnode) => {
  let styleVnode = vnode
  // 波浪线
  if (node.wavyline) {
    styleVnode = h(
      'span',
      {
        style: {
          display: 'inline-block',
          textDecoration: 'wavy underline #757575'
        }
      },
      [vnode]
    )
  }
  // 加点的字
  if (node.dotted) {
    const childList = []
    for (let i = 0; i < node.text.length; i++) {
      const copy = cloneDeep(vnode)
      copy.text = node.text[i]
      const child = h(
        'span',
        {
          id: 'dotted'
        },
        [copy]
      )

      child.text = node.text[i]
      childList.push(child)
    }
    styleVnode = childList
  }

  return styleVnode
}
const module = {
  // renderElems: [
  //   {
  //     type: 'attachment',
  //     renderElem: renderAttachment,
  //   },
  // ],
  // elemsToHtml: [
  //   {
  //     type: 'attachment',
  //     elemToHtml: attachmentToHtml,
  //   },
  // ],
  // parseHtmlConf: [
  //   {
  //     selector: 'span[data-w-e-type="attachment"]', // CSS 选择器，匹配特定的 HTML 标签
  //     parseElemHtml: parseAttachmentHtml,
  //   },
  // ],

  menus: [
    {
      key: 'wavyLine',
      factory() {
        return new MyWavyLineMenu()
      }
    },
    {
      key: 'dotted',
      factory() {
        return new MyDottedMenu()
      }
    }
  ],
  renderStyle: withStyle,
  styleToHtml: withStyleToHtml,
  parseStyleHtml: withParseStyleHtml
}
export { module }
