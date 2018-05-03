<template>
	<section class="real-app">
		<input 
			type="text" 
			name=""
			class="add-input"
			autofocus="autofocus"
			placeholder="接下去要做什么？" 
			@keyup.enter="addTodo"
		>
		<Item 
			:todo="todo"
			v-for="todo in filteredTodos"
			:key="todo.id"
			@del="deleteTodo"
		/>
		<Tabs 
			:filter="filter" 
			:todos="todos"
			@toggle="toggleFilter"
			@clearCompleted="clearCompleted"
		/>
	</section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';
let id = 0;
export default {
	components: {
		Item,
		Tabs
	},
	data() {
		return {
			todos: [],
			filter: 'all'
		}
	},
	computed: {
		filteredTodos() {
			if(this.filter === 'all'){
				return this.todos;
			}
			const completed = this.filter === 'completed';
			return this.todos.filter(todo => completed === todo.completed);
		}
	},
	methods: {
		addTodo(e) {
			this.todos.unshift({
				id: id++,
				content: e.target.value.trim(),
				completed: false
			});
			e.target.value = '';
		},
		deleteTodo(id) {
			this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
		},
		toggleFilter(state) {
			this.filter = state;
		},
		clearCompleted() {
			this.todos = this.todos.filter(todo => !todo.completed);
		}
	}
}
</script>

<style lang="less">
	.real-app{
		width: 600px;
		margin: 0 auto;
		box-shadow: 0 0 5px #666;
	}
	.add-input{
		position: relative;
		border: 0;
		margin: 0;
		width: 600px;
		height: 50px;
		text-indent: 20px;
		font-size: 20px;
	}
</style>