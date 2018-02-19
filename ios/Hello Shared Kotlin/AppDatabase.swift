import Foundation
import KotlinHello
import Firebase

class AppDatabase : NSObject, KotlinHelloDatabase {

    let ref = Database.database().reference()
 
    func put(data: [String : Any]) {
        ref.setValue(data)
    }
    
    func observe(onChange: @escaping ([String : Any]) -> KotlinHelloStdlibUnit) {
        ref.observe(DataEventType.value, with: {(snapshot) in
            guard let value = (snapshot.value as? [String: AnyObject]) else {
                return
            }
            onChange(value)
        })
    }
}
