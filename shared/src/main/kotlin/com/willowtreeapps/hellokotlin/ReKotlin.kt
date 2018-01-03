package com.willowtreeapps.hellokotlin

typealias Reducer<A, S> = (action: A, state: S) -> S

interface Dispatcher<A, R> {
    companion object {
        fun <A, S> forStore(store: Store<S>, reducer: Reducer<A, S>) = object : Dispatcher<A, A> {
            override fun dispatch(action: A): A = action.also {
                store.state = reducer(it, store.state)
            }
        }
    }

    fun dispatch(action: A): R

    fun chain(middleware: Middleware<A, R>): Dispatcher<A, R> {
        return object : Dispatcher<A, R> {
            override fun dispatch(action: A): R {
                return middleware.dispatch(action) { a ->
                    this@Dispatcher.dispatch(a)
                }
            }
        }
    }

    fun chain(middleware: Iterable<Middleware<A, R>>): Dispatcher<A, R> {
        return chain(middleware.iterator())
    }

    fun chain(vararg middleware: Middleware<A, R>): Dispatcher<A, R> {
        return chain(middleware.asList())
    }

    private fun chain(itr: Iterator<Middleware<A, R>>): Dispatcher<A, R> {
        return if (!itr.hasNext()) {
            this
        } else chain(itr.next()).chain(itr)
    }
}

interface Store<S> {
    var state: S
}

open class SimpleStore<S>(initialState: S) : Store<S> {

    private val listeners: MutableList<Listener<S>> = mutableListOf()

    override var state: S = initialState
        set(value) {
            if (field != value) {
                field = value
                for (listener in listeners) {
                    listener(field)
                }
            }
        }

    fun addListener(listener: Listener<S>) {
        listeners.add(listener)
        listener(state)
    }

    fun removeListener(listener: Listener<S>) {
        listeners.remove(listener)
    }

    interface Listener<in S> {
        operator fun invoke(state: S)
    }
}

interface Middleware<A, R> {
    fun dispatch(action: A, next: (action: A) -> R): R
}
