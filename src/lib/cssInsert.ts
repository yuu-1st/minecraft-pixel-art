import React from 'react'

const styleSheet = (() => {
  const style = document.createElement('style')
  document.head.appendChild(style)
  return style.sheet as CSSStyleSheet
})()

/**
 * Get cssRule from selector.
 * @param selectorText selector
 * @returns cssRule
 */
export function getCSS (selectorText: string): CSSStyleRule | undefined {
  const cssRule = [...styleSheet.cssRules].find(cssRule => {
    if (cssRule instanceof CSSStyleRule) {
      return cssRule.selectorText === selectorText
    }
    return false
  })
  if (cssRule instanceof CSSStyleRule) {
    return cssRule
  }
  return undefined
}

/**
 * Get React.CSSProperties from CSSStyleRule.
 * @param cssRule cssRule
 * @returns React.CSSProperties
 */
export function getCSSProperties (cssRule: CSSStyleRule): React.CSSProperties {
  const cssText = cssRule.style.cssText
  const cssProperties = cssText
    .split(';')
    .flatMap(cssProperty => {
      const [key, value] = cssProperty.split(':').map(str => str.trim())
      if (key === '') {
        return []
      }
      return [[key, value]]
    })
    /* eslint-disable @typescript-eslint/indent */
    .reduce<Record<string, string>>((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
  /* eslint-enable @typescript-eslint/indent */
  return cssProperties
}

/**
 * Delete the cssRule.
 * @param selectorText Selector.
 */
export function deleteCSS (selectorText: string): void {
  const cssRuleIndex = [...styleSheet.cssRules].findIndex(cssRule => {
    if (cssRule instanceof CSSStyleRule) {
      return cssRule.selectorText === selectorText
    }
    return false
  })
  if (cssRuleIndex !== -1) {
    styleSheet.deleteRule(cssRuleIndex)
  }
}

/**
 * Add cssRule.
 * @param selectorText selector
 * @param cssText css text
 * @returns added cssRule
 */
export function insertCSS (
  selectorText: string,
  cssText: React.CSSProperties
): void {
  deleteCSS(selectorText)
  const cssRule = `${selectorText} {${Object.entries(cssText)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
      if (typeof value === 'number') {
        return `${cssKey}: ${value};`
      }
      if (typeof value === 'string') {
        return `${cssKey}: ${value};`
      }
      throw new Error(`insertCSS does not support ${typeof value} type.`)
    })
    .join('')}}`
  console.log(cssRule)
  styleSheet.insertRule(cssRule)
}
