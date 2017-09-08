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
    stroke-width (optional): Number, [default: 1]
    stroke-color (optional): String, ["default" or "success" or "warning" or "danger" or HEX value]
    stroke-dashed (optional): Boolean [default: false]
}
-->
<div id="app">
    <uk-line x1="10" y1="10" x2="100" y2="100"></uk-line>
    <uk-line x1="100" y1="100" x2="200" y2="100"
            stroke-width="2" stroke-color="default" stroke-dashed="true">
    </uk-line>
    <uk-line :x1.sync="x1" :y1.sync="y1" :x2.sync="x2" :y2.sync="y2"></uk-line>
</div>
```

```
import Vue from "vue";
import UkLine from "uk-line";

Vue.component("uk-line", UkLine);
new Vue({
    el: "#app",
    data: {
        x1: 200,
        y1: 100,
        x2: 300,
        y2: 10
    }
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
