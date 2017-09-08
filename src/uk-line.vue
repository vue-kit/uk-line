<template lang="pug">
    svg.uk-line(:width="width" :height="height" :viewBox="box" :style="style" v-if="show"
        @mousedown.stop.prevent="activate")
        path(:d="path" :stroke="color" :stroke-width="borderWidth"
            :stroke-dasharray="dash" stroke-linecap="round")
        path(:d="arrowPath" :stroke="color" :fill="color" :stroke-width="borderWidth"
            stroke-linecap="round" stroke-linejoin="round")
        circle(name="start" :cx="computedPath.startX" :cy="computedPath.startY" :r="radius"
            :stroke="color" :stroke-width="borderWidth" fill="none" v-if="handleShow")
        circle(name="middle" :cx="computedPath.middleX" :cy="computedPath.middleY" :r="radius"
            :stroke="color" :stroke-width="borderWidth" fill="none" v-if="handleShow")
        circle(name="end" :cx="computedPath.endX" :cy="computedPath.endY" :r="radius"
            :stroke="color" :stroke-width="borderWidth" fill="none" v-if="handleShow")
</template>
<script>
    const ARROW_ANGLE = Math.PI / 9;
    export default {
        name: "uk-line",
        props: {
            x1: {
                type: [String, Number],
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            y1: {
                type: [String, Number],
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            x2: {
                type: [String, Number],
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            y2: {
                type: [String, Number],
                default: 0,
                validator(val) {
                    return !isNaN(val);
                }
            },
            strokeWidth: {
                type: [String, Number],
                default: 1,
                validator(val) {
                    return !isNaN(val) && parseFloat(val) > 0;
                }
            },
            strokeColor: {
                type: String,
                default: "default",
                validator(val) {
                    return val === "default" || val === "success" || val === "warning" ||
                            val === "danger" || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val)
                }
            },
            strokeDashed: {
                type: [String, Boolean],
                default: false,
                validator(val) {
                    return typeof val === "boolean" || val === "true" || val === "false";
                }
            }
        },
        data() {
            return {
                handleShow: false,
                handleName: null,
                destroyed: false
            }
        },
        computed: {
            startX() {
                return parseInt(this.x1);
            },
            startY() {
                return parseInt(this.y1);
            },
            endX() {
                return parseInt(this.x2);
            },
            endY() {
                return parseInt(this.y2);
            },
            borderWidth() {
                return parseFloat(this.strokeWidth);
            },
            radius() {
                return this.borderWidth + 3;
            },
            dashed() {
                return typeof this.strokeDashed === "string" ?
                        this.strokeDashed === "true" : this.strokeDashed;
            },
            show() {
                return !this.destroyed && (this.startX != this.endX || this.startY != this.endY);
            },
            includedAngle() {
                let diffY = this.endY - this.startY;
                let diffX = this.endX - this.startX;
                if (diffX > 0) {
                    return Math.atan(diffY / diffX);
                } else if (diffX == 0) {
                    return diffY > 0 ? Math.PI / 2 : Math.PI / 2 * -1;
                } else {
                    return Math.PI + Math.atan(diffY / diffX);
                }
            },
            arrowLength() {
                let diffX = this.endX - this.startX;
                let diffY = this.endY - this.startY;
                let lineLength = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
                return Math.min(lineLength * .2, 20);
            },
            arrow() {
                let arrowSX = this.endX - (this.arrowLength * Math.cos(this.includedAngle + ARROW_ANGLE));
                let arrowSY = this.endY - (this.arrowLength * Math.sin(this.includedAngle + ARROW_ANGLE));
                let arrowEX = this.endX - (this.arrowLength * Math.cos(this.includedAngle - ARROW_ANGLE));
                let arrowEY = this.endY - (this.arrowLength * Math.sin(this.includedAngle - ARROW_ANGLE));
                let arrowMX = this.endX - (this.arrowLength / 2 * Math.cos(this.includedAngle));
                let arrowMY = this.endY - (this.arrowLength / 2 * Math.sin(this.includedAngle));
                return {
                    startX: arrowSX,
                    startY: arrowSY,
                    endX: arrowEX,
                    endY: arrowEY,
                    middleX: arrowMX,
                    middleY: arrowMY
                }
            },
            min() {
                return {
                    x: Math.min(this.startX, this.endX, this.arrow.startX, this.arrow.endX),
                    y: Math.min(this.startY, this.endY, this.arrow.startY, this.arrow.endY)
                }
            },
            max() {
                return {
                    x: Math.max(this.startX, this.endX, this.arrow.startX, this.arrow.endX),
                    y: Math.max(this.startY, this.endY, this.arrow.startY, this.arrow.endY)
                }
            },
            padding() {
                return this.radius * 2 + this.borderWidth;
            },
            width() {
                return this.max.x - this.min.x + this.padding;
            },
            height() {
                return this.max.y - this.min.y + this.padding;
            },
            box() {
                return "0 0 " + this.width + " " + this.height;
            },
            style() {
                return {
                    top: this.min.y + "px",
                    left: this.min.x + "px"
                }
            },
            computedPath() {
                return {
                    startX: this.startX - parseInt(this.style.left) + this.padding / 2,
                    startY: this.startY - parseInt(this.style.top) + this.padding / 2,
                    middleX: (this.startX + this.endX) / 2 - parseInt(this.style.left) + this.padding / 2,
                    middleY: (this.startY + this.endY) / 2 - parseInt(this.style.top) + this.padding / 2,
                    endX: this.endX - parseInt(this.style.left) + this.padding / 2,
                    endY: this.endY - parseInt(this.style.top) + this.padding / 2
                }
            },
            computedArrow() {
                return {
                    startX: this.arrow.startX - parseInt(this.style.left) + this.padding / 2,
                    startY: this.arrow.startY - parseInt(this.style.top) + this.padding / 2,
                    endX: this.arrow.endX - parseInt(this.style.left) + this.padding / 2,
                    endY: this.arrow.endY - parseInt(this.style.top) + this.padding / 2,
                    middleX: this.arrow.middleX - parseInt(this.style.left) + this.padding / 2,
                    middleY: this.arrow.middleY - parseInt(this.style.top) + this.padding / 2
                }
            },
            path() {
                return "M" + this.computedPath.startX + " " + this.computedPath.startY +
                        " L" + this.computedPath.endX + " " + this.computedPath.endY;
            },
            arrowPath() {
                return "M" + this.computedArrow.startX + " " + this.computedArrow.startY +
                        " L" + this.computedPath.endX + " " + this.computedPath.endY +
                        " L" + this.computedArrow.endX + " " + this.computedArrow.endY +
                        " L" + this.computedArrow.middleX + " " + this.computedArrow.middleY + " Z";
            },
            color() {
                let c = this.strokeColor;
                if (c == "default") {
                    c = "#1e87f0";
                } else if (c == "success") {
                    c = "#32d296";
                } else if (c == "warning") {
                    c = "#faa05a";
                } else if (c == "danger") {
                    c = "#f0506e";
                }
                return c;
            },
            dash() {
                if (this.dashed) {
                    return "4% 3%";
                } else {
                    return false;
                }
            }
        },
        methods: {
            activate(evt) {
                if (!this.handleShow) {
                    this.handleShow = true;
                    document.documentElement.addEventListener("mousedown", this.deactivate, true);
                } else {
                    if (evt.target.tagName === "circle") {
                        this.handleName = evt.target.getAttribute("name");
                        document.documentElement.style.cursor = "move";
                        document.documentElement.addEventListener("mousemove", this.drag, true);
                        document.documentElement.addEventListener("mouseup", this.dragend, true);
                    }
                }
            },
            deactivate(evt) {
                if (evt.target.parentNode != this.$el) {
                    this.handleShow = false;
                    document.documentElement.removeEventListener("mousedown", this.deactivate, true);
                }
            },
            drag(evt) {
                switch (this.handleName) {
                    case "start":
                        this.$emit("update:x1", this.startX + evt.movementX);
                        this.$emit("update:y1", this.startY + evt.movementY);
                        break;
                    case "middle":
                        this.$emit("update:x1", this.startX + evt.movementX);
                        this.$emit("update:y1", this.startY + evt.movementY);
                        this.$emit("update:x2", this.endX + evt.movementX);
                        this.$emit("update:y2", this.endY + evt.movementY);
                        break;
                    case "end":
                        this.$emit("update:x2", this.endX + evt.movementX);
                        this.$emit("update:y2", this.endY + evt.movementY);
                        break;
                }
            },
            dragend(evt) {
                document.documentElement.removeEventListener("mousemove", this.drag, true);
                document.documentElement.removeEventListener("mouseup", this.dragend, true);
                document.documentElement.style.cursor = "auto";
                this.handleName = null;
            }
        }
    }
</script>
<style lang="less" scoped>
    .uk-line {
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
        path {
            pointer-events: painted;
        }
        circle {
            pointer-events: all;
            cursor: move;
        }
    }
</style>
