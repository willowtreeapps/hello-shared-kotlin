import Foundation
import KotlinHello
import Firebase

class AppDatabase : NSObject, KotlinHelloDatabase {
    let ref = Database.database().reference()
    
    func put(todos: KotlinHelloAppState) {
        ref.setValue(todos)
    }
    
    func observe(onChange: @escaping (KotlinHelloAppState) -> KotlinHelloStdlibUnit) {
        ref.observe(DataEventType.value, with: { (snapshot) in
            guard let val = snapshot.value as? [String: AnyObject]? else {
                return
            }
//            onChange(val)
        })
    }
}
