package com.example.android

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.util.DiffUtil
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import com.willowtreeapps.hellokotlin.*

val appStore = AppStore(AppDatabase())

class MainActivity : AppCompatActivity(), SimpleStore.Listener<AppState> {

    private lateinit var adapter: Adapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val list = findViewById<RecyclerView>(R.id.list)
        adapter = Adapter()
        list.adapter = adapter

        findViewById<View>(R.id.add).setOnClickListener {
            appStore.dispatch(Action.Add("New Todo"))
        }
    }

    override fun onStart() {
        super.onStart()
        appStore.addListener(this)
    }

    override fun onStop() {
        appStore.removeListener(this)
        super.onStop()
    }

    override fun invoke(state: AppState) {
        adapter.items = state.todos
    }

    private class Adapter : RecyclerView.Adapter<Adapter.Holder>() {
        var items: List<Todo> = emptyList()
            set(value) {
                val result = DiffUtil.calculateDiff(object : DiffUtil.Callback() {
                    override fun getOldListSize(): Int = field.size
                    override fun getNewListSize(): Int = value.size

                    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean
                            = field[oldItemPosition].id == value[newItemPosition].id

                    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean
                            = field[oldItemPosition] == value[newItemPosition]

                })
                field = value
                result.dispatchUpdatesTo(this)
            }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.todo_item, parent, false)
            return Holder(view)
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            items[position].apply {
                holder.checkbox.text = text
                holder.checkbox.isChecked = done
            }
        }

        override fun getItemCount(): Int = items.size

        private class Holder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val checkbox = itemView.findViewById<CheckBox>(R.id.text)
            init {
                checkbox.setOnClickListener {
                     appStore.dispatch(Action.Check(adapterPosition))
                }
            }
        }
    }
}
