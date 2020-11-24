<template>
	<view class="bg-white">
		<view class="container">
			<!-- 问卷标题 -->
			<view class="text-center surveyTitle">
				<text class="text-bold text-blue">	{{surveyInfo.title}}</text>
			</view>
			
			<view class="description">
				<text class="text-black">{{surveyInfo.description}}</text>
			</view>

			<view class="question-list">
				<view v-for="(item,index) in surveyInfo.questions" class="margin-top">
					<!-- 如果是单选的情况 -->
					<view v-if="item.type==0">
						<text class="text-bold text-black questiontitle">
							<text class="text-red"> * </text>{{(index+1) + "." +item.title}}(单选) <br>
						</text>
						<radio-group  style="width: 100%;" class="solid margin-top-sm"  @change="radioChange($event,index,item.id)">
							<view class="cu-form-group solid-bottom" v-for="(item1, index1) in item.items" :key="item1.name">
								<radio :class="item1.id === item.current?'checked':''" :checked="item1.id === item.current" :value="item1.id"></radio>
								<view class="title">{{item1.name}}</view>
							</view>
						</radio-group>
					</view>
					<!-- 如果是多选的情况 -->
					<view v-if="item.type==1">
						<text class="text-bold text-black questiontitle">
							<text class="text-red"> *  </text>{{(index+1) + "." +item.title}}(多选) <br>
						</text>
						<checkbox-group style="width: 100%;" class="solid margin-top-sm" @change="checkboxChange($event,index,item.id)">
							<view class="cu-form-group  solid-bottom" v-for="(item1, index1) in item.items" :key="item1.name">
								<checkbox :class="item1.checked?'checked':''" :checked="item1.checked?true:false" :value="item1.id"></checkbox>
								<view class="title">{{item1.name}}</view>
							</view>
						</checkbox-group>   
					</view>  
					<!-- 简单题 -->
					<view v-if="item.type==2">
						<text class="text-bold text-black questiontitle">
							<text class="text-red"> * </text>{{(index+1)+ "." + item.title}}(简答) <br>
						</text>
						<textarea style="width: 100%;"  
						 @input="textareaInput($event,index,item.id)" 
						placeholder="请在此输入内容" 
						class="solid margin-top-sm"></textarea>
					</view>					
				</view>				
			</view>			
			<!-- 提交按钮 -->
			<view class="padding flex flex-direction submit-btn">
				<button class="cu-btn bg-blue lg" @click="submit">提交</button>
			</view>
		</view>	
	</view>
</template>

<script>
	import surveyApi from '../../api/survey.js'
	export default {
		data(){
			return{
				// 问卷信息
				surveyInfo:{},
				// 保存答案
				answers:[]
			}
		},
		// 监听页面加载函数
		onLoad(options) {
			// 获取问卷Id
			let surveyId = options.surveyId;
			console.log(surveyId);  
			this.initSurveyInfo(surveyId);
		},
		methods:{
			// 初始化问卷信息
		  initSurveyInfo(surveyId){
				surveyApi.surveyDetail(surveyId,1).then(res => {
					if(res.code === 200){
						this.surveyInfo = res.data;
					}else{
						uni.showToast({
							icon: 'none',  
							title: '此问卷你已填写过'   
						});
					}
				});
			},
			//单选事件
			radioChange(event,index,questionId) {
				console.log(event.target.value);
				var items = this.surveyInfo.questions[index].items;
				 for (let i = 0; i < items.length; i++) {
					const item = items[i];
					if (item.name === event.target.value) {
						this.$set(this.surveyInfo.questions[index],'current',item.id)
						break;
					}
				}
				let answer = {};
				answer.questionId = questionId;
				answer.answer = event.target.value;
				this.answers[index] = answer;
				
			},
			// 监听复选框 
			checkboxChange(e,index,questionId) {
			    var items = this.surveyInfo.questions[index].items,values = e.detail.value;
				console.log(values)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.id)){
						this.$set(item,'checked',true)
					}else{   
						this.$set(item,'checked',false)
					}
				}  
				let answer = {};
				answer.questionId = questionId;
				answer.answer = values.join(",");
				this.answers[index] = answer;
		
			},
			// 监听文本框
			textareaInput(e,index,questionId) {
				console.log(e.detail.value)
				let answer = {};
				answer.questionId = questionId;
				answer.answer = e.detail.value;
				this.answers[index] = answer;
			},
			submit(){
				console.log(this.answers);
				let data = {};
				data.userId = 1;
				data.themeId = this.surveyInfo.id;
				data.answers = this.answers;
				console.log(data);
				surveyApi.fillIn(data).then(res => {
					if(res.code === 200){
						uni.showToast({
							icon: 'none',  
							title: '填写成功'   
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: '填写失败'   
						});
					}
				})  
			}
			
		}
	}
</script>

<style>
	
	.container{
		padding-top: 10upx;
		padding-left: 20upx;
		padding-right: 20upx;
	} 
	.surveyTitle{
		font-size: 45upx;
	}
	.description{
		margin-top: 20upx;
		border-bottom: 1px dashed lightgray;
		padding-bottom: 40upx;
		margin-bottom: 50upx;
	}
	.questiontitle{
		font-size: 32upx;
		margin-bottom: 20upx;
	}
	
	.submit-btn{
		margin-top: 40upx;
		margin-bottom: 80upx;
		padding: 20upx;
	}
	
	
</style>
  