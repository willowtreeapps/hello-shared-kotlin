package com.example.android

import com.willowtreeapps.hellokotlin.AppState
import com.willowtreeapps.hellokotlin.Database

class LocalDatabase : Database {
    //TODO: actually save to disk

    override fun put(state: AppState) {
    }

    override fun observe(onChange: (AppState) -> Unit) {
    }
}
