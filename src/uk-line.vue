<template lang="pug">
    svg(:width="width" :height="height" :viewBox="box")
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
            }
        },
        data() {
            return {
                startX: this.x1,
                startY: this.y1,
                endX: this.x2,
                endY: this.y2
            }
        },
        computed: {
            width() {
                return Math.abs(parseInt(this.startX) - parseInt(this.endX));
            },
            height() {
                return Math.abs(parseInt(this.startY) - parseInt(this.endY));
            },
            box() {
                return "0 0 " + this.width + " " + this.height;
            }
        }
    }
</script>
