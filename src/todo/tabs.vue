<template>
    <div class="helper">
    	<span class="left">{{unFinishedTodoLength}} items left</span>
    	<span class="tabs">
    		<span
    			v-for="state in states"
    			:key="state"
    			:class="[state, filter === state ? 'actived' : '']"
    			@click="toggleFilter(state)"
    		>{{state}}</span>
    	</span>
    	<span class="clear" @click="clearAllCompleted">Clear Completed</span>
	</div>
</template>

<script>
export default {
	props: {
		filter: {
			type: String,
			required: true
		},
		todos: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			states: ['all', 'active', 'completed']
		}
	},
	computed: {
		unFinishedTodoLength() {
			return this.todos.filter(todo => !todo.completed).length;
		}
	},
	methods: {
		toggleFilter(state) {
			this.$emit('toggle', state);
		},
		clearAllCompleted() {
			this.$emit('clearCompleted');
		}
	}
}
</script>

<style lang="less">
.helper{
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 1px solid #eee;
	background-color: #fff;
	.tabs{
	    margin: 0 90px;
	    span{
	    	text-align: center;
	    	padding: 5px;
	    	margin: 0 5px;
	    	cursor: pointer;
	    	border: 1px solid #fff;
	    }
	    .actived{
	    	border-radius: 5px;
	    	border: 1px solid red;
	    }
	}
	.clear{
		cursor: pointer;
	}
}
</style>