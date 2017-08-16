# uk-line
It is a joint line component for vue.

![uk-line.gif](uk-line.gif)

## Installation

```
$ npm install --save uk-line
```

## Usage

```
<!--
options: {
    // x1, y1 The start point of joint line
    x1: Number, [default: 0]
    y1: Number, [default: 0]
    // x2, y2 The end point of joint line
    x2: Number, [default: 0]
    y2: Number, [default: 0]
    stroke-width: Number, [default: 1]
    stroke-color: String, ["default" or "success" or "warning" or "danger" or HEX value]
    stroke-dashed: Boolean
}
-->
<div id="app">
    <uk-line x1="10" y1="10" x2="100" y2="100"
            stroke-width="2" stroke-color="default" stroke-dashed="true">
    </uk-line>
</div>
```

```
import Vue from "vue";
import UkLine from "uk-line";

Vue.component("uk-line", UkLine);
new Vue({
    el: "#app"
});
```

## Local test

1. Clone repository.

    ```
    $ git clone git@github.com:vue-kit/uk-line.git
    ```

2. Install dependencies.

    ```
    $ npm install
    ```

3. Run test page with hot reload at localhost:8080.

    ```
    $ npm test
    ```
