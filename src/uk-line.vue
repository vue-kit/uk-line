<template lang="pug">
    svg.uk-line(:width="width" :height="height" :viewBox="box" :style="style")
        path(:d="path" :stroke="color" :stroke-width="normalizedBorderWidth" stroke-linecap="round")
        path(:d="arrowPath" :stroke="color" :fill="color" :stroke-width="normalizedBorderWidth"
            stroke-linecap="round" stroke-linejoin="round")
</template>
<script>
    const ARROW_ANGLE = Math.PI / 9;
    const ARROW_LENGTH = 20;
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
            }
        },
        data() {
            return {
                startX: this.x1,
                startY: this.y1,
                endX: this.x2,
                endY: this.y2,
                borderWidth: this.strokeWidth,
                borderColor: this.strokeColor
            }
        },
        computed: {
            normalizedStartX() {
                return parseInt(this.startX);
            },
            normalizedStartY() {
                return parseInt(this.startY);
            },
            normalizedEndX() {
                return parseInt(this.endX);
            },
            normalizedEndY() {
                return parseInt(this.endY);
            },
            normalizedBorderWidth() {
                return parseFloat(this.borderWidth);
            },
            includedAngle() {
                let diffY = this.normalizedEndY - this.normalizedStartY;
                let diffX = this.normalizedEndX - this.normalizedStartX;
                if (diffX > 0) {
                    return Math.atan(diffY / diffX);
                } else if (diffX == 0) {
                    return diffY > 0 ? Math.PI / 2 : Math.PI / 2 * -1;
                } else {
                    return Math.PI + Math.atan(diffY / diffX);
                }
            },
            arrow() {
                let arrowSX = this.normalizedEndX - (ARROW_LENGTH * Math.cos(this.includedAngle + ARROW_ANGLE));
                let arrowSY = this.normalizedEndY - (ARROW_LENGTH * Math.sin(this.includedAngle + ARROW_ANGLE));
                let arrowEX = this.normalizedEndX - (ARROW_LENGTH * Math.cos(this.includedAngle - ARROW_ANGLE));
                let arrowEY = this.normalizedEndY - (ARROW_LENGTH * Math.sin(this.includedAngle - ARROW_ANGLE));
                let arrowMX = this.normalizedEndX - (ARROW_LENGTH / 2 * Math.cos(this.includedAngle));
                let arrowMY = this.normalizedEndY - (ARROW_LENGTH / 2 * Math.sin(this.includedAngle));
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
                    x: Math.min(this.normalizedStartX, this.normalizedEndX,
                                this.arrow.startX, this.arrow.endX),
                    y: Math.min(this.normalizedStartY, this.normalizedEndY,
                                this.arrow.startY, this.arrow.endY)
                }
            },
            max() {
                return {
                    x: Math.max(this.normalizedStartX, this.normalizedEndX,
                                this.arrow.startX, this.arrow.endX),
                    y: Math.max(this.normalizedStartY, this.normalizedEndY,
                                this.arrow.startY, this.arrow.endY)
                }
            },
            width() {
                return this.max.x - this.min.x + this.normalizedBorderWidth;
            },
            height() {
                return this.max.y - this.min.y + this.normalizedBorderWidth;
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
                    startX: this.normalizedStartX - parseInt(this.style.left) + this.normalizedBorderWidth / 2,
                    startY: this.normalizedStartY - parseInt(this.style.top) + this.normalizedBorderWidth / 2,
                    endX: this.normalizedEndX - parseInt(this.style.left) + this.normalizedBorderWidth / 2,
                    endY: this.normalizedEndY - parseInt(this.style.top) + this.normalizedBorderWidth / 2
                }
            },
            computedArrow() {
                return {
                    startX: this.arrow.startX - parseInt(this.style.left) + this.normalizedBorderWidth / 2,
                    startY: this.arrow.startY - parseInt(this.style.top) + this.normalizedBorderWidth / 2,
                    endX: this.arrow.endX - parseInt(this.style.left) + this.normalizedBorderWidth / 2,
                    endY: this.arrow.endY - parseInt(this.style.top) + this.normalizedBorderWidth / 2,
                    middleX: this.arrow.middleX - parseInt(this.style.left) + this.normalizedBorderWidth / 2,
                    middleY: this.arrow.middleY - parseInt(this.style.top) + this.normalizedBorderWidth / 2
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
                let c = this.borderColor;
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
            }
        }
    }
</script>
<style lang="less" scoped>
    .uk-line {
        position: absolute;
        box-sizing: border-box;
    }
</style>
