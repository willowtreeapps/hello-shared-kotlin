package com.example.android

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.util.DiffUtil
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.helper.ItemTouchHelper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.CheckBox
import android.widget.TextView
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
        ItemTouchHelper(adapter.itemTouchCallback).attachToRecyclerView(list)
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
                // Add empty one at end to add new entries
                val newList = value + Todo(id = -1)
                val result = DiffUtil.calculateDiff(object : DiffUtil.Callback() {
                    override fun getOldListSize(): Int = field.size
                    override fun getNewListSize(): Int = newList.size

                    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
                        val oldId = field[oldItemPosition].id
                        val newId = newList[newItemPosition].id
                        return oldId == newId
                    }

                    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
                        val oldItem = field[oldItemPosition]
                        val newItem = newList[newItemPosition]
                        return oldItem == newItem
                    }

                })
                field = newList
                result.dispatchUpdatesTo(this)
            }

        val itemTouchCallback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {

            override fun getSwipeDirs(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder): Int {
                val holder = viewHolder as Holder
                if (holder.todo.id == -1) return 0
                return super.getSwipeDirs(recyclerView, viewHolder)
            }

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                appStore.dispatch(Action.Remove(viewHolder.adapterPosition))
            }

            override fun onMove(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, target: RecyclerView.ViewHolder?): Boolean {
                return true
            }
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.todo_item, parent, false)
            return Holder(view)
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            holder.bind(items[position])
        }

        override fun getItemCount(): Int = items.size

        private class Holder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            lateinit var todo: Todo
            val done = itemView.findViewById<CheckBox>(R.id.done)
            val add = itemView.findViewById<View>(R.id.add)
            val text = itemView.findViewById<TextView>(R.id.text)

            init {
                done.setOnClickListener {
                    appStore.dispatch(Action.Check(adapterPosition))
                }
                text.setOnFocusChangeListener { v, hasFocus ->
                    if (!hasFocus) {
                        addNew()
                    }
                }
                text.setOnEditorActionListener { v, actionId, event ->
                    if (actionId == EditorInfo.IME_ACTION_DONE) {
                        addNew()
                    }
                    true
                }
            }

            private fun addNew() {
                if (todo.text.isEmpty() && text.text.isNotEmpty()) {
                    appStore.dispatch(Action.Add(text.text.toString()))
                    text.text = null
                }
            }

            fun bind(todo: Todo) {
                this.todo = todo
                if (todo.text.isEmpty()) {
                    add.visibility = View.VISIBLE
                    done.visibility = View.INVISIBLE
                } else {
                    add.visibility = View.INVISIBLE
                    done.visibility = View.VISIBLE
                }
                done.isChecked = todo.done
                text.text = todo.text
            }
        }
    }
}
