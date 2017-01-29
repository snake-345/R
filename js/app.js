window.ee = new EventEmitter();

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
					<div key={data.length - index}>
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

var Add = React.createClass({
	getInitialState: function() {
		return {
			agreeNotChecked: true,
			authorIsEmpty: true,
			contentIsEmpty: true
		}
	},
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	},
	onFieldChange: function(fieldName, event) {
		var next = {};

		if (event.target.value.trim().length > 0) {
			next[fieldName] = false;
			this.setState(next);
		} else {
			next[fieldName] = true;
			this.setState(next);
		}
	},
	onCheckRuleClick: function(event) {
		this.setState({agreeNotChecked: !event.target.checked});
	},
	onClickHandler: function(event) {
		var author = ReactDOM.findDOMNode(this.refs.author).value;
		var content = ReactDOM.findDOMNode(this.refs.content).value;
		var item = [{
			author: author,
			text: content,
			bigText: '...'
		}];

		event.preventDefault();
		window.ee.emit('News.add', item);
		ReactDOM.findDOMNode(this.refs.content).value = '';
		this.setState({contentIsEmpty: true});
	},
	render: function() {
		return (
			<form className="add">
				<input type="text"
				       onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
				       className="add__author"
				       placeholder="Автор"
				       ref="author"/>
				<textarea
				       onChange={this.onFieldChange.bind(this, 'contentIsEmpty')}
				       className="add__content"
				       placeholder="Конент новости"
				       ref="content"></textarea>
				<input type="checkbox"
				       className="add_agree"
				       defaultChecked=""
				       onChange={this.onCheckRuleClick}
				       id="agree"
				       ref="isAgree"/>
				<label htmlFor="agree">Я согласен с правилами</label>
				<button
				       disabled={this.state.authorIsEmpty || this.state.contentIsEmpty || this.state.agreeNotChecked}
				       className="add__btn"
				       ref="btn"
				       onClick={this.onClickHandler}>
					Добавить новость
				</button>
			</form>
		);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			news: myNews
		}
	},
	componentDidMount: function() {
		var self = this;

		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);

			self.setState({news: nextNews});
		});
	},
	componentWillUnmount: function() {
		window.ee.removeListener('News.add');
	},
	render: function() {
		return (
			<div className="app">
				<Add />
				<h3>Новости</h3>
				<News data={this.state.news}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);