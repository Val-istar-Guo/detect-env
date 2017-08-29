# HISTORY

## 版本号说明

|          第一位          |              第二位             |            第三位           |
|:-----------------------:|:------------------------------:|:--------------------------:|
|  巨大的功能变化或者结构调整 | 功能的添加、删除或者修改以及接口的调整 |      BUG修复和功能升级      |

### 标示说明

[+] 添加/ADD  [-] 删除/DELETE  [#] 修复/REPARE  [^] 升级/UPGRADE

### 版本迭代说明

* v 2.0.3
  * [#] fixbug: describe ambiguity
* v 2.0.2
  * [#] use babel-es2015 to transform all es6 grammar bacause UglifyJs don't support es6！
* v 2.0.1
  * [#] use arrow functions transform, because UglifyJs don't support arrow function
* v 2.0.0
  * [+] create an `env`(detector) use your own config
  * [+] support alias
  * [+] support shortcut
  * [+] By default, the environment will be judged as `local` when process.env.NODE\_ENV = (null|undefined|''|'local')
* v 1.0.2
  * [+] Add shields.io tag to README.md
  * [+] Add HISTORY.md
  * [#] FIXBUG: throw error when set policy.default by null, undefined, 0 and ''
  * [#] replace `prepublishOnly` with `prepublish` to prevent `dist/` floder unable published.
* v 1.0.1

