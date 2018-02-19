package com.example.android

import android.util.Log
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.willowtreeapps.hellokotlin.AppState
import com.willowtreeapps.hellokotlin.Database

class AppDatabase : Database {
    private val ref = FirebaseDatabase.getInstance().reference

    override fun put(data: Map<String, Any>) {
        ref.setValue(data).addOnCompleteListener {
            if (!it.isSuccessful) {
                Log.e("AppDatabase", it.exception?.message, it.exception)
            }
        }
    }

    override fun observe(onChange: (Map<String, Any>) -> Unit) {
        ref.addValueEventListener(object: ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val state = snapshot.value as Map<String, Any>
                onChange(state)
            }

            override fun onCancelled(e: DatabaseError) {
                Log.e("AppDatabase", e.message, e.toException())
            }
        })
    }
}