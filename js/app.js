var myNews = [
	{
		author: 'Саша Печкин',
		text: 'В четверг, четвертого числа'
	},
	{
		author: 'Просто Вася',
		text: 'Бла бла'
	},
	{
		author: 'Саша печкин',
		text: 'В четверг, четвертого числа'
	}
];

var Article = React.createClass({
	render: function() {
		var data = this.props.data;

		return (
			<div className="article">
				<p className="news__author">{data.author}</p>
				<p className="news__text">{data.text}</p>
			</div>
		);
	}
});

var News = React.createClass({
	render: function() {
		var data = this.props.data;
		var newsTemplate;

		if (data.length) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div key={index}>
						<Article data={item}/>
					</div>
				);
			});
		} else {
			newsTemplate = <p>К сожалению новостей нет</p>;
		}

		return (
			<div className="news">
				{newsTemplate}
				<strong className={'news__count ' + (data.length > 0 ? '' : 'none')}>Всего новостей {data.length}</strong>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<h3>Новости</h3>
				<News data={myNews}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);