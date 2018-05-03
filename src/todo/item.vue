<template>
	<div :class="['todo-item', todo.completed ? 'completed' : '']">
		<input type="checkbox" name="" class="toggle" v-model="todo.completed">
		<label>{{todo.content}}</label>
		<button class="destory" @click="deleteTodo">X</button>
	</div>
</template>

<script>
export default {
	props: {
		todo: {
			type: Object,
			required: true
		}
	},
	methods: {
		deleteTodo() {
			this.$emit('del', this.todo.id);
		}
	}
}
</script>

<style lang="less">
.todo-item{
	position: relative;
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	border-top: 1px solid #eee;
	background-color: #fff;
	.toggle{
		margin-left:20px;
		cursor:pointer;
	}
	label{
	    display: inline-block;
	    vertical-align: middle;
    	max-width: 500px;
    	overflow: hidden;
	}
	.destory{
		display: none;
		position: absolute;
		top: 10px;
		right: 20px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 0;
		color: #333;
		cursor:pointer;
		vertical-align: middle;
	}
	&:hover .destory{
		display: block;
	}
}
</style>