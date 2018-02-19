package com.willowtreeapps.hellokotlin

class AppStore(db: Database) : SimpleStore<AppState>(AppState()) {
    private val dispatcher = Dispatcher.forStore(this, ::reduce)
            .chain(DbMiddleware(db, this))

    fun dispatch(action: Action) = dispatcher.dispatch(action)
}

class DbMiddleware(val db: Database, val store: AppStore) : Middleware<Action, Action> {
    init {
        db.observe { state ->
            store.state = AppState.fromMap(state)
        }
    }

    override fun dispatch(action: Action, next: (action: Action) -> Action): Action {
        val result = next(action)
        db.put(store.state.toMap())
        return result
    }
}

data class AppState(val todos: List<Todo> = emptyList()) {
    fun toMap(): Map<String, Any> = mapOf("todos" to todos.map { it.toMap() })

    companion object {
        fun fromMap(map: Map<String, Any>) = AppState((map["todos"] as List<Map<String, Any>?>)
                .filterNotNull().map { Todo.fromMap(it) })
    }
}

data class Todo(val id: Int = -1, val text: String = "", val done: Boolean = false) {
    fun toMap(): Map<String, Any> = mapOf("id" to id, "text" to text, "done" to done)

    companion object {
        fun fromMap(map: Map<String, Any>) = Todo((map["id"] as Long).toInt(), map["text"] as String, map["done"] as Boolean)
    }
}

sealed class Action {
    data class Add(val text: String) : Action()
    data class Remove(val index: Int) : Action()
    data class Move(val oldIndex: Int, val newIndex: Int) : Action()
    data class Check(val index: Int) : Action()
    data class Edit(val index: Int, val text: String) : Action()
}

fun reduce(action: Action, state: AppState) = when (action) {
    is Action.Add -> add(action, state)
    is Action.Remove -> remove(action, state)
    is Action.Check -> check(action, state)
    is Action.Move -> move(action, state)
    is Action.Edit -> edit(action, state)
}

fun add(action: Action.Add, state: AppState) = state.copy(todos = state.todos + Todo(id = newId(state.todos), text = action.text))

private fun newId(todos: List<Todo>): Int = (todos.map(Todo::id).max() ?: -1) + 1

fun remove(action: Action.Remove, state: AppState) = state.copy(todos = state.todos.removeAt(action.index))

fun move(action: Action.Move, state: AppState) = state.copy(todos = state.todos.move(action.oldIndex, action.newIndex))

fun check(action: Action.Check, state: AppState) = state.copy(todos = state.todos.replace(action.index) { it.copy(done = !it.done) })

fun edit(action: Action.Edit, state: AppState) = state.copy(todos = state.todos.replace(action.index) { it.copy(text = action.text) })

private fun <T> Collection<T>.move(oldIndex: Int, newIndex: Int): List<T> = toMutableList().apply {
    val value = removeAt(oldIndex)
    add(newIndex, value)
}

private fun <T> Collection<T>.replace(index: Int, f: (T) -> T): List<T> = toMutableList().apply {
    val value = this[index]
    this[index] = f(value)
}

private fun <T> Collection<T>.removeAt(index: Int): List<T> = toMutableList().apply {
    this.removeAt(index)
}
