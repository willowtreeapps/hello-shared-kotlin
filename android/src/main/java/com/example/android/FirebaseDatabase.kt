package com.example.android

import android.util.Log
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.willowtreeapps.hellokotlin.AppState
import com.willowtreeapps.hellokotlin.Database

class FirebaseDatabase : Database {
    private val ref = FirebaseDatabase.getInstance().reference

    override fun put(state: AppState) {
        ref.setValue(state).addOnCompleteListener {
            if (!it.isSuccessful) {
                Log.e("FirebaseDatabase", it.exception?.message, it.exception)
            }
        }
    }

    override fun observe(onChange: (AppState) -> Unit) {
        ref.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val state = snapshot.getValue(AppState::class.java) ?: return
                onChange(state)
            }

            override fun onCancelled(e: DatabaseError) {
                Log.e("FirebaseDatabase", e.message, e.toException())
            }
        })
    }
}