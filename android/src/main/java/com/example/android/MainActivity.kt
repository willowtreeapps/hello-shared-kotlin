package com.example.android

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.willowtreeapps.hellokotlin.Hello

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val text = findViewById<TextView>(R.id.text)
        text.text = Hello().greet("Kotlin (Android)")
    }
}
