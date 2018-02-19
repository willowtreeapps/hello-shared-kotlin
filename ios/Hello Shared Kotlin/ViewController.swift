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
    @IBOutlet var todos: UITableView!
    @IBOutlet var add: UIButton!
    
    @IBAction func add(_ sender: Any) {
        appStore.dispatch(action: KotlinHelloActionAdd(text: "new todo"))
    }
    
    var dataSource: TodosDataSource!
    var appStore: KotlinHelloAppStore!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        appStore = KotlinHelloAppStore(db: AppDatabase())
        dataSource = TodosDataSource(store: appStore)
        todos.dataSource = dataSource
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
        dataSource.set(state: state)
        todos.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

class TodosDataSource : NSObject, UITableViewDataSource {
    let store: KotlinHelloAppStore
    var state: KotlinHelloAppState
    
    init(store: KotlinHelloAppStore) {
        self.store = store
        self.state = store.state
    }
    
    func set(state: KotlinHelloAppState) {
        self.state = state
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "TodoTableViewCell"
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! TodoTableViewCell
        cell.bind(store: store, state: state,index: indexPath.row)
        return cell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return state.todos.count
    }
}


