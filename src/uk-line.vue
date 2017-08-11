<template lang="pug">
    svg.uk-line(:width="width" :height="height" :viewBox="box" :style="style")
        path(:d="path" :stroke="color" :stroke-width="normalizedBorderWidth")
</template>
<script>
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
            width() {
                return Math.abs(this.normalizedStartX - this.normalizedEndX) + this.normalizedBorderWidth;
            },
            height() {
                return Math.abs(this.normalizedStartY - this.normalizedEndY) + this.normalizedBorderWidth;
            },
            box() {
                return "0 0 " + this.width + " " + this.height;
            },
            style() {
                return {
                    top: Math.min(this.normalizedStartY, this.normalizedEndY) + "px",
                    left: Math.min(this.normalizedStartX, this.normalizedEndX) + "px"
                }
            },
            path() {
                let sx = this.normalizedStartX - parseInt(this.style.left) + this.normalizedBorderWidth / 2;
                let sy = this.normalizedStartY - parseInt(this.style.top) + this.normalizedBorderWidth / 2;
                let ex = this.normalizedEndX - parseInt(this.style.left) + this.normalizedBorderWidth / 2;
                let ey = this.normalizedEndY - parseInt(this.style.top) + this.normalizedBorderWidth / 2;
                return "M" + sx + " " + sy + " L" + ex + " " + ey;
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
