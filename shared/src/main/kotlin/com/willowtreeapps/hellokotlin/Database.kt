package com.willowtreeapps.hellokotlin

interface Database{
    fun put(todos: AppState)

    fun observe(onChange: (AppState) -> Unit)
}