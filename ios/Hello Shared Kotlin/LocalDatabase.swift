import Foundation
import KotlinHello

class LocalDatabase : NSObject, KotlinHelloDatabase {
    // TODO write to local storage
    
    func put(state: KotlinHelloAppState) {
    }
    
    func observe(onChange: @escaping (KotlinHelloAppState) -> KotlinHelloStdlibUnit) {
    }
}
