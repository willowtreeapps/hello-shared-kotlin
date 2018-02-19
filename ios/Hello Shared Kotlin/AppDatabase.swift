import Foundation
import KotlinHello
import Firebase

class AppDatabase : NSObject, KotlinHelloDatabase {
    
    let ref = Database.database().reference()
    
    func put(state: KotlinHelloAppState) {
        ref.setValue(toDictionary(state: state))
    }
    
    func observe(onChange: @escaping (KotlinHelloAppState) -> KotlinHelloStdlibUnit) {
        ref.observe(DataEventType.value, with: {(snapshot) in
            guard let value = (snapshot.value as? [String: Any]) else {
                return
            }
            onChange(stateFromDictionary(dictionary:value))
        })
    }
}

private func toDictionary(state: KotlinHelloAppState) -> [String: Any] {
    return ["todos": state.todos.map({ todo in toDictionary(todo: todo)})]
}

private func toDictionary(todo: KotlinHelloTodo) -> [String: Any] {
    return ["id":todo.id, "text":todo.text, "done":todo.done]
}

private func stateFromDictionary(dictionary: [String: Any]) -> KotlinHelloAppState {
    return KotlinHelloAppState(todos: (dictionary["todos"] as! [[String: Any]]).map({ todo in
        todoFromDictionary(dictionary: todo)
    }))
}

private func todoFromDictionary(dictionary: [String: Any]) -> KotlinHelloTodo {
    return KotlinHelloTodo(id:(dictionary["id"] as! NSNumber).int32Value, text: dictionary["text"] as! String, done: dictionary["done"] as! Bool)
}
