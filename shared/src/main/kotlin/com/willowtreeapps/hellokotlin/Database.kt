package com.willowtreeapps.hellokotlin

interface Database {
    fun put(state: AppState)

    fun observe(onChange: (AppState) -> Unit)
}