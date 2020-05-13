/**
 * @param {string} host - URI 无需带上访问协议，必须以斜杠结尾，如 //workplus.io/
 */
declare function init(host: string): void

declare module '@w6s/cordova-import'

export { init }