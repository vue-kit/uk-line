import "uikit/dist/css/uikit.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import Vue from "vue";
import UkLine from "../dist/build";

UIkit.use(Icons);

Vue.component("uk-line", UkLine);
new Vue({
    el: "#app",
    data: {
        selectedWidth: 1,
        selectedColor: "default",
        selectedDashed: false,
        options: [
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 }
        ],
        endPoints: [
            { x: 10, y: 10 },
            { x: 190, y: 10 },
            { x: 370, y: 10 },
            { x: 370, y: 140 },
            { x: 370, y: 270 },
            { x: 190, y: 270 },
            { x: 10, y: 270 },
            { x: 10, y: 140 }
        ]
    }
});
