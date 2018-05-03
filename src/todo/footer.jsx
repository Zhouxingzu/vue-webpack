import '../assets/styles/footer.less'

export  default {
	data() {
		return {
			author: 'Zhouxingzu'
		}
	},
	render() {
		return (
			<div id="footer">
				<span>Written by {this.author}</span>
			</div>
		)
	}
}