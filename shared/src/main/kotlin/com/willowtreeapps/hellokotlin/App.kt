package com.willowtreeapps.hellokotlin

val APP_STORE = AppStore()
var ID = 0

class AppStore: SimpleStore<AppState>(AppState(listOf(Todo(text = "Sample Todo")))) {
    fun dispatch(action: Action) = Dispatcher.forStore(this, ::reduce).dispatch(action)
}

data class AppState(val todos: List<Todo>)

data class Todo(val id: Int = ID++, val text: String, val done: Boolean = false)

sealed class Action {
    data class Add(val text: String): Action()
    data class Remove(val index: Int): Action()
    data class Check(val index: Int): Action()
}

fun reduce(action: Action, state: AppState) = when (action) {
    is Action.Add -> add(action, state)
    is Action.Remove -> remove(action, state)
    is Action.Check -> check(action, state)
}

fun add(action: Action.Add, state: AppState)
        = state.copy(todos = state.todos + Todo(text = action.text))

fun remove(action: Action.Remove, state: AppState)
        = state.copy(todos = state.todos.removeAt(action.index))

fun check(action: Action.Check, state: AppState)
        = state.copy(todos = state.todos.replace(action.index) { it.copy(done = !it.done) })

private fun <T> Collection<T>.replace(index: Int, f: (T) -> T): List<T> = toMutableList().apply {
    val value = this[index]
    this[index] = f(value)
}

private fun <T> Collection<T>.removeAt(index: Int): List<T> = toMutableList().apply {
    this.removeAt(index)
}
