# ng-button

## API
通过设置 Button 的属性来产生带有antd-style的按钮，在需要设置的按钮上设置`as-button`属性，不赋值。

| 属性          | 说明                                             | 类型    | 默认值 |
| :------------ |:----------------------------------------------------       | :-----  | :---|
| type          | 设置按钮类型，可选值为 `primary` `dashed` `danger` 或者不设 | string  | -|
| htmlType      | 设置 button 原生的 type 值，可选值请参考 HTML 标准      | string  | `button`|
| icon          | 设置按钮的图标类型      |  string | -|
| shape         | 设置按钮形状，可选值为 circle 或者不设 | string | - |
| size          | 设置按钮大小，可选值为 small large 或者不设 | string | - |
| loading       | 设置按钮载入状态 | boolean \| { delay: number } |`false`|
| onClick       | `click` 事件的handler                 | function| -|
| ghost         | 幽灵属性，使按钮背景透明 | boolean | `false`|

