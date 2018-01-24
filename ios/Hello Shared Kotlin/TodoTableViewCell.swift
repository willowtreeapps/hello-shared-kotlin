//
//  TodoTableViewCell.swift
//  Hello Shared Kotlin
//
//  Created by Evan Tatarka on 1/17/18.
//  Copyright © 2018 WillowTree. All rights reserved.
//

import UIKit
import KotlinHello

class TodoTableViewCell : UITableViewCell {
    //MARK: Properties
    @IBOutlet var todoText: UILabel!
    @IBOutlet var done: UISwitch!
    var store: KotlinHelloAppStore!
    var index: Int = -1
    
    func bind(store: KotlinHelloAppStore, state: KotlinHelloAppState, index: Int) {
        self.store = store
        self.index = index
        let todo = state.todos[index] as! KotlinHelloTodo
        todoText.text = todo.text
        done.isOn = todo.done
    }
    
    @IBAction func doneChanged(_ sender: Any) {
        store.dispatch(action: KotlinHelloActionCheck(index: Int32(index)))
    }
}
