//
//  ViewController.swift
//  Hello Shared Kotlin
//
//  Created by Evan Tatarka on 12/20/17.
//  Copyright © 2017 WillowTree. All rights reserved.
//

import UIKit
import KotlinHello

class ViewController: UIViewController {
    @IBOutlet weak var text: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        text.text = KotlinHelloHello().greet(name: "Kotlin (iOS)")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

