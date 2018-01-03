//
//  ViewController.swift
//  Hello Shared Kotlin
//
//  Created by Evan Tatarka on 12/20/17.
//  Copyright © 2017 WillowTree. All rights reserved.
//

import UIKit
import KotlinHello

class ViewController: UIViewController, KotlinHelloSimpleStoreListener {
    @IBOutlet var todos: UITableView?
    @IBOutlet var add: UIButton?
    
    let appStore = KotlinHello.APP_STORE()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        appStore.addListener(listener: self)
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        appStore.removeListener(listener: self)
    }
    
    func invoke(state: Any?) {
        invokeStore(state: (state as? KotlinHelloAppState)!)
    }
    
    func invokeStore(state: KotlinHelloAppState) {
        todos?.dataSource = TodosDataSource(todos: state.todos as! Array<KotlinHelloTodo>)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

class TodosDataSource : NSObject, UITableViewDataSource {
    let todos: Array<KotlinHelloTodo>
    init(todos: Array<KotlinHelloTodo>) {
        self.todos = todos
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        let lablel = UILabel()
        lablel.text = todos[indexPath.row].text
        cell.addSubview(lablel)
        return cell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return todos.count
    }
}

