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
    
    @IBOutlet weak var addIcon: UIImageView!
    @IBOutlet weak var checkButton: UIButton!
    @IBOutlet weak var todoTextField: UITextField!

    var store: KotlinHelloAppStore!
    var index: Int = -1
    
    override func awakeFromNib() {
        super.awakeFromNib()
        todoTextField.delegate = self
    }
    
    func bind(store: KotlinHelloAppStore, state: KotlinHelloAppState, index: Int) {
        self.store = store
        self.index = index
        
        if index < state.todos.count {
            let todo = state.todos[index]
            todoTextField.text = todo.text
            checkButton.isSelected = todo.done
            checkButton.isHidden = false
            addIcon.isHidden = true
        } else {
            todoTextField.text = ""
            checkButton.isSelected = false
            checkButton.isHidden = true
            addIcon.isHidden = false
        }
    }
    
    @IBAction func checkTapped(_ sender: Any) {
        checkButton.isSelected = !checkButton.isSelected
        store.dispatch(action: KotlinHelloActionCheck(index: Int32(index)))
    }
}

extension TodoTableViewCell: UITextFieldDelegate {
    
    func updateTodoItem(text: String?) {
        if index >= store.state.todos.count {
            if let text = text {
                store.dispatch(action: KotlinHelloActionAdd(text: text))
            }
        }
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        updateTodoItem(text: textField.text)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        updateTodoItem(text: textField.text)
        return true
    }
}
