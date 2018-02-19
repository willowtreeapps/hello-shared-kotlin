package com.willowtreeapps.hellokotlin

interface Database{
    fun put(data: Map<String, Any>)

    fun observe(onChange: (Map<String, Any>) -> Unit)
}