<template>
	<view>
		<view class="stepper">
			<button class="cu-btn sm bg-gray" @click="_calcValue('minus')" :disabled="inputValue <= min || disabled">
				<view class="icon-move"></view>
			</button>
			<input :disabled="disabled" v-model="inputValue" type="number" @blur="_onBlur"/>
			<button class="cu-btn sm bg-gray" @click="_calcValue('plus')" :disabled="inputValue >= max || disabled">
				<view class="icon-add"></view>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'stepper',
		data() {
			return {
				inputValue: 0
			};
		},
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			value(val) {
				this.inputValue = +val
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					this.$emit('change', newVal)
				}
			}
		},
		created() {
			this.inputValue = +this.value
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'minus') {
					value -= step
				} else if (type === 'plus') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				this.inputValue = value / scale
			},
			_getDecimalScale() {
				let scale = 1
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale
			},
			_onBlur(event) {
				let value = event.detail.value
				if (!value) {
					this.inputValue = 0
					return
				}
				value = +value
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
			}
		}
	}
</script>

<style>
	.stepper {
		display: flex;
		align-items: center;
	}

	.stepper input {
		text-align: center;
		width: auto;
		max-width: 100upx;
		padding-left: 10upx;
	}
</style>
