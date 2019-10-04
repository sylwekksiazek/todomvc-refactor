/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/handlebars/index.d.ts" />
/// <reference path="../node_modules/@types/q/index.d.ts" />

import { createTodo, deleteTodo, getTodos, updateTodo, updateTodos } from './http';

declare const Router: any;

import * as util from './utils'
// import { getStorage } from './storageManager'
import { TodoDataModel } from './utils';
// import * as http from './http'

const StorageType = 'LS'; // "HTTP"

/*global jQuery, Handlebars, Router */
// jQuery(function ($) {
'use strict';

Handlebars.registerHelper('eq', function (a, b, options) {
	return a === b ? options.fn(this) : options.inverse(this);
});

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
// var storage = getStorage(StorageType);

var App = {
	todos: [],
	init: function () {
		getTodos().then((res) => {
			this.todos = res;
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();

			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');
		})
	},
	bindEvents: function () {
		$('#new-todo').on('keyup', this.create.bind(this));
		$('#toggle-all').on('change', this.toggleAll.bind(this));
		$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
		$('#todo-list')
			.on('change', '.toggle', this.toggle.bind(this))
			.on('dblclick', 'label', this.edit.bind(this))
			.on('keyup', '.edit', this.editKeyup.bind(this))
			.on('focusout', '.edit', this.update.bind(this))
			.on('click', '.destroy', this.destroy.bind(this));
	},
	render: function () {
		var todos = this.getFilteredTodos();
		console.log(this.todos)
		$('#todo-list').html(this.todoTemplate(todos));
		$('#main').toggle(todos.length > 0);
		$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
		this.renderFooter();
		$('#new-todo').focus();
	},
	renderFooter: function () {
		var todoCount = this.todos.length;
		var activeTodoCount = this.getActiveTodos().length;
		var template = this.footerTemplate({
			activeTodoCount: activeTodoCount,
			activeTodoWord: util.pluralize(activeTodoCount, 'item'),
			completedTodos: todoCount - activeTodoCount,
			filter: this.filter
		});

		$('#footer').toggle(todoCount > 0).html(template);
	},
	toggleAll: function (e) {
		var isChecked = $(e.target).prop('checked');

		this.todos.forEach(function (todo) {
			todo.completed = isChecked;
		});
		updateTodos(this.todos).then(() => {
			this.render();
		})
	},
	getActiveTodos: function () {
		return this.todos.filter(function (todo) {
			return !todo.completed;
		});
	},
	getCompletedTodos: function () {
		return this.todos.filter(function (todo) {
			return todo.completed;
		});
	},
	getFilteredTodos: function () {
		if (this.filter === 'active') {
			return this.getActiveTodos();
		}

		if (this.filter === 'completed') {
			return this.getCompletedTodos();
		}

		return this.todos;
	},
	destroyCompleted: function () {
		this.todos = this.getActiveTodos();
		this.filter = 'all';

		this.render();
	},
	// accepts an element from inside the `.item` div and
	// returns the corresponding index in the `todos` array
	indexFromEl: function (el) {
		var id = $(el).closest('li').data('id');
		var todos = this.todos;
		var i = todos.length;

		while (i--) {
			if (todos[i].id === id) {
				return i;
			}
		}
	},
	create: function (e) {
		var $input = $(e.target);
		var val = $input.val().trim();

		if (e.which !== ENTER_KEY || !val) {
			return;
		}
		const todoToBeCreated: TodoDataModel = {
			id: util.uuid(),
			title: val,
			completed: false
		}
		createTodo(todoToBeCreated).then(() => {
			this.todos.push(todoToBeCreated);
			$input.val('');
			this.render();
		})
	},
	toggle: function (e) {
		var i = this.indexFromEl(e.target);
		const id = this.todos[i].id;

		this.todos[i].completed = !this.todos[i].completed;
		updateTodo(this.todos[i]).then(() => {
			this.render()
		});
	},
	edit: function (e) {
		var $input = $(e.target).closest('li').addClass('editing').find('.edit');
		$input.val($input.val()).focus();
	},
	editKeyup: function (e) {
		if (e.which === ENTER_KEY) {
			e.target.blur();
		}

		if (e.which === ESCAPE_KEY) {
			$(e.target).data('abort', true).blur();
		}
	},
	update: function (e) {
		const el = e.target;
		const $el = $(el);
		const val = $el.val().trim();
		const idx = this.indexFromEl(el);

		if (!val) {
			this.destroy(e);
			return;
		}

		if ($el.data('abort')) {
			$el.data('abort', false);
		} else {
			this.todos[idx].title = val;
			updateTodo(this.todos[idx]).then(() => {
				this.render()
			})
		}

	},
	destroy: function (e) {
		const idx = this.indexFromEl(e.target);
		const $el:any = $(e.target);
		const id = this.todos[idx].id;

		$el.parent().parent()[0].style.display = 'none';

		deleteTodo(id)
			.then(
			() => {
				this.todos.splice(idx, 1)
				this.render();
			},
			() => {
				alert('Delete failed');
				$el.parent().parent()[0].style.display = 'block';
			});


	}
};

App.init();
// });
