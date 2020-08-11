<template>
    <div class="vfl-has-label">
        <label class="vfl-label" :class="classObject" :for="inputId">
            <span>{{ floatLabel }}</span>
        </label>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'floating-label',
    props: {
        on: {
            type: Boolean,
            default: true
        },
        fixed: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        dispatch: {
            type: Boolean,
            default: true
        },
        for: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            formEl: undefined,
            labelEl: undefined,
            isActive: false,
            isFocused: false
        }
    },
    mounted() {
        this.formEl = this.$el.querySelector('input, textarea, select')
        this.formEl.addEventListener('input', this.updateIsActive)
        this.formEl.addEventListener('focus', this.updateIsActive)
        this.formEl.addEventListener('input', this.updateIsFocused)
        this.formEl.addEventListener('blur', this.updateIsFocused)
        this.formEl.addEventListener('blur', this.updateIsFocused)
        this.formEl.addEventListener('blur', this.closeIsActive)
        this.formEl.addEventListener('focus', this.updateIsFocused)

        if (!this.for) {
            this.labelEl = this.$el.querySelector('label')
            this.labelEl.addEventListener('click', this.focusFormEl)
        }

        this.dispatchInput()
    },
    beforeDestroy() {
        this.formEl.removeEventListener('input', this.updateIsActive)
        this.formEl.removeEventListener('focus', this.updateIsActive)
        this.formEl.removeEventListener('input', this.updateIsFocused)
        this.formEl.removeEventListener('blur', this.updateIsFocused)
        this.formEl.removeEventListener('blur', this.updateIsActive)
        this.formEl.removeEventListener('blur', this.closeIsActive)
        this.formEl.removeEventListener('focus', this.updateIsFocused)
    },
    methods: {
        dispatchInput() {
            if (this.dispatch) {
                const event = document.createEvent('HTMLEvents')
                event.initEvent('input', true, false)
                this.formEl.dispatchEvent(event)
            }
        },
        focusFormEl() {
            this.formEl.focus()
        },
        updateIsActive(e) {
            this.isActive = e.target.value.length > 0
        },
        closeIsActive(e) {
            if (e.target.value.length < 1) {
                this.isActive = false
            }
        },
        updateIsFocused(e) {
            this.isFocused = e.target === document.activeElement
        }
    },
    computed: {
        inputId() {
            return this.for
        },
        classObject() {
            return {
                'vfl-label-on-input': this.on && (this.isActive || this.fixed),
                'vfl-label-on-focus': this.isFocused
            }
        },
        formElType() {
            return this.formEl ? this.formEl.tagName.toLowerCase() : ''
        },
        floatLabel() {
            if (this.label) return this.label

            switch (this.formElType) {
                case 'input':
                case 'textarea':
                    return this.formEl.placeholder
                case 'select':
                    return this.formEl.querySelector('option[disabled][selected]').innerHTML
                default:
                    return ''
            }
        }
    }
}
</script>
<style>
.vfl-has-label {
    position: relative;
}

.vfl-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0.1em;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 0.75em;
    color: #808080;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    opacity: 1;
    transition: all 0.1s ease-out;
    z-index: 99;
}

.vfl-label-on-input {
    top: -0.9em;
    pointer-events: all;
    opacity: 1;
    line-height: 24px;
    z-index: 10;
}

.vfl-label-on-input span {
    position: relative;
    z-index: 99999;
    background: #fff;
    left: 1em;
}

.vfl-label-on-focus {
    color: #0074d9;
}

.vfl-has-label input:focus,
.vfl-has-label textarea:focus,
.vfl-has-label select:focus {
    outline: 0;
}
</style>