<template>
    <div id="app">
	    <div id="cover"></div>
	    <Header></Header>
	    <Todo></Todo>
	    <Footer></Footer>
	</div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';
import Todo from './todo/todo.vue';

export default {
	components: {
		Header,
		Footer,
		Todo
	}
}
</script>

<style lang="less">
#app{
	position: absolute;
	left:0;
	right:0;
	top:0;
	bottom:0;
	#cover{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.3);
		z-index: -1;
	}
}
</style>