import "uikit/dist/css/uikit.css";
import $ from "jquery";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import Vue from "vue";
import UkLine from "../dist/build";

UIkit.use(Icons);

let dragging = false;
let jointLine = null;

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
    },
    mounted() {
        this.$tile = $(".uk-tile");
        this.tileOffset = this.$tile.offset();
    },
    methods: {
        dragstart(evt) {
            dragging = true;
            let startX = evt.clientX - this.tileOffset.left;
            let startY = evt.clientY - this.tileOffset.top;
            jointLine = new Vue({
                template: "<uk-line :x1.sync='x1' :y1.sync='y1' :x2.sync='x2' :y2.sync='y2' " +
                            ":stroke-width='strokeWidth' :stroke-color='strokeColor' " +
                            ":stroke-dashed='strokeDashed'>" +
                          "</uk-line>",
                data: {
                    x1: startX,
                    y1: startY,
                    x2: startX,
                    y2: startY,
                    strokeWidth: this.selectedWidth,
                    strokeColor: this.selectedColor,
                    strokeDashed: this.selectedDashed
                }
            }).$mount();
            this.$tile.append(jointLine.$el);
        },
        drag(evt) {
            if (dragging) {
                jointLine.x2 = evt.clientX - this.tileOffset.left;
                jointLine.y2 = evt.clientY - this.tileOffset.top;
            }
        },
        dragend(evt) {
            if (dragging) {
                dragging = false;
            }
        }
    }
});
