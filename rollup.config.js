export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/ng2RightClickMenu.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.ng2RightClickMenu',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common'
  }
}
