var myNews = [
	{
		author: 'Саша Печкин',
		text: 'В четверг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре черненьких чумазеньких чертенка чертили черными чернилами чертеж.'
	},
	{
		author: 'Просто Вася',
		text: 'Бла бла',
		bigText: 'Пвек шмек теребек'
	},
	{
		author: 'Саша печкин',
		text: 'В четверг, четвертого числа',
		bigText: 'я повторяюсь раза два'
	}
];

var Article = React.createClass({
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},
	getInitialState: function() {
		return {
			visible: false
		};
	},
	readmoreClick: function(event) {
		event.preventDefault();
		this.setState({visible: true});
	},
	render: function() {
		var data = this.props.data;
		var state = this.state;

		return (
			<div className="article">
				<p className="news__author">{data.author}</p>
				<p className="news__text">{data.text}</p>
				<a href="#"
				   className={'news__readmore ' + (state.visible ? 'none' : '')}
				   onClick={this.readmoreClick}>
					Подробнее
				</a>
				<p className={'news__big-text ' + (!state.visible ? 'none' : '')}>{data.bigText}</p>
			</div>
		);
	}
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
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
				<strong className={'news__count ' + (data.length > 0 ? '' : 'none')}>
					Всего новостей {data.length}
				</strong>
			</div>
		);
	}
});

var TestInput = React.createClass({
	getInitialState: function() {
		return {
			value: ''
		};
	},
	onChange: function(event) {
		this.setState({
			value: event.target.value
		})
	},
	render: function() {
		var state = this.state;

		return (
			<input type="text"
			       className="test-input"
			       value={state.value}
			       onChange={this.onChange}
			       placeholder="Введите значение"/>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<h3>Новости</h3>
				<TestInput />
				<News data={myNews}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);