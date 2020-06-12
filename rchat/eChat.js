// transcribed from
// http://erights.org/elang/echat/index.html
// https://github.com/kpreid/e-on-java/blob/master/src/esrc/scripts/eChat.e-swt
// Copyright 2002 Combex, Inc. under the terms of the MIT X license
// found at http://www.opensource.org/licenses/mit-license.html ................


const harden = x => Object.freeze(x)  // TODO: use @agoric/harden to deep-freeze
// TODO: move to E module
const E = harden({
    call(target, method, args) {
        return target[method].apply(target, args)
    }
})
// set up tracing; sbut out all the printing for deployment
// TODO: rest of eChat.e-swt
function traceline(txt) {
    console.log(txt);
}
//??? def stackTrace := <import:com.skyhunter.e.util.stackTraceFunc>

// set up user SWT user interface imports
// def swing := <import:com.sun.java.swing.*>
// https://docs.oracle.com/javase/7/docs/api/javax/swing/package-summary.html
// def awt := <import:java.awt.*>
// ??? def SWT := <swt:makeSWT>
/// def <widget> := <swt:widgets.*>

traceline("made imports")


// Next, we put the introducer on the air so our connection
// operations can come to life, and create a couple of utility
// routines that convert URIs to and from live references.

console.log("TODO: introducer.onTheAir()");

// TODO: import this from an RChain registry, capTP module?
const introducer = harden({
    sturdyFromURI(uri) {
        return harden({
            getRcvr() {
                console.log("TODO: introducer.sturdyFromURI(uri).getRcvr() - use RChain registry, capTP?")
                return "@@@TODO"
            },
        })
    },
    sturdyToURI(sr) {
        return `@@TODO: uri of $sr`
    },
});
const identityMgr = harden({
    makeKnown(obj) {
        return ["@@sturdyref", null, null]
    }
})

/** return the object represented by the URI
 * @return any
 */
function getObjectFromURI(uri)  {
    return introducer.sturdyFromURI(uri).getRcvr()
}

/**
 *
 * @param {*} obj
 * @return string
 */
function makeURIFromObject(obj) {
    // This implementation assumes a non-persistent single incarnation
    def [sr, _, _] = identityMgr.makeKnown(obj)
    return introducer.sturdyToURI(sr)
}

traceline("made basic introducers")

/** return the friend file
 * @return :near
 */
function findFriendFile(chatWin) {
    const dialog = widget.makeFileDialog(chatWin, SWT.getOPEN())
    dialog.setText("Pick the File containing a Chat Reference for a Friend")
    const optPath = dialog.open()
    if (optPath == null) {
        return null
    } else {
        const result = file[optPath] //@@TODO
        traceline("friend reference path: " + result)
        return result
    }
}

/** return a file to be saved
 * @return :near
 */
function requestSaveFile(chatWin) {
    const dialog = widget.makeFileDialog(chatWin, SWT.getSAVE())
    dialog.setText("Save Chat Reference File with Your Name")
    const optPath = dialog.open()
    if (optPath == null) {
        return null
    } else {
        const result = file[optPath]
        traceline("address path: " + result)
        return result
    }
}

/**
 *  method that writes out the URI for your echat system's communication
 *  interface
 * @return void
 */
function offerMyAddress(file, uri) {
    file.setText(uri)
}


traceline("about to make makeChatUI")

/**
 * The first of the two big classes in Echat is the chatUI class,
 * which constructs the chat window, its buttons, and the listener
 * objects.
 * <p>
 * Though there is a lot of code here, little of it is new;
 * it is mostly just calls from E to the elements of the swt
 * classes needed to construct a window. The flow of control
 * is essentially identical to the flow one would build in Java to
 * achieve the same purpose. In some situations it could make sense
 * to use a Java GUI builder to create the window code in Java
 * itself, and then hook it up to E with <tt>unsafe:</tt>. But
 * since we wanted the chat window to be intelligently resizable, it
 * was beyond the abilities of current Java GUI builders to provide
 * it, and it turned out to be easier to construct such resizable
 * windows in a directly-executable scripting language like E than
 * in Java.
 * <p>
 * One element of makeChatUI that is worth examining is the
 * definition of myWindowListener. In Java, WindowListener is an
 * interface that defines several methods to respond to different
 * (XXX This is not true for the current unintegrated version)
 * events. We are only interested in one event, the windowClosing
 * event, so our windowListener simply uses a
 * <pre>match [verb, args] {}</pre>
 * statement to intercept and ignore all the messages other than
 * windowClosing. A Java programmer would achieve a similar, though
 * still larger and more complex effect, by creating a subclass of
 * the WindowAdapter class and overriding the one method that
 * interested him.
 * <p>
 * The other interesting feature of myWindowListener is that,
 * after telling the chatController to leave (i.e., to terminate the
 * conversation), it tells the interpreter to continue at top. This
 * undoes the blockAtTop initiated as the last line of the
 * program that keeps the interpreter from rushing off to the end of
 * the program and terminating everything before things have hardly
 * started.
 * <p>
 * The one important feature of the chatUIMaker for the other
 * components of the program is the chatUI object constructed at the
 * end of the chatUIMaker. This object gives outside objects
 * (notably the chatController object) access to the widgets which
 * it must manipulate (for example by enabling and disabling the
 * buttons, and putting new messages into the chatTextArea). The
 * chatUIMaker must receive a chatController so that the Listeners
 * can send appropriate messages to the chatController when the user
 * interacts with the window; this requirement for the chatUI to
 * have a reference to the chatController imposes interesting design
 * considerations on the chatControllerMaker, as described in the
 * preface to the chatControllerMaker following the chatUIMaker
 * source:
 *
 * @return :near
 */
function makeChatUI(chatController, { getElementById }) {
    const chatWin = getElementById("eChat")
    //@@ chatWin.setBounds(30, 30, 600, 300)

    const winDisposeListener = harden({
        widgetDisposed(event) {
            chatController.leave()
            //@@ interp.continueAtTop()
        }
    })
    //@@ chatWin.addDisposeListener(winDisposeListener)

    // all button presses are referred to the the chatController
    function attachAction(button, verb) {
        const listener = harden({
            widgetSelected(event) { E.call(chatController, verb, [])}
        })
        button.setAttribute('type', 'button')
        button.addEventListener('click', function(event) {
            listener.widgetSelected(event)
            event.preventDefault()
        })
    }

    // Set Name Field
    const setNameField = getElementById("setNameField")
    // setNameField.setText("Type Name and Set")

    // set name button
    const setNameButton = getElementById("setNameButton")
    attachAction(setNameButton, "setMyName")

    // Offer Chat button
    const offerChatButton = getElementById("offerChatButton")
    attachAction(offerChatButton, "offerSelf")
    offerChatButton.disabled = true

    // Find Friend Button
    const findFriendButton = getElementById("findFriendButton")
    attachAction(findFriendButton, "findFriend")
    findFriendButton.disabled = true

    // chat text area pane
    const chatTextArea = getElementById("chatTextArea")
    chatTextArea.setAttribute('readonly', true);
    chatTextArea.value = "read conversation here"

    // message pane
    const nextMessageBox = getElementById("nextMessageBox")
    nextMessageBox.value = "type message here"

    // Send Message button
    const sendMessageButton = getElementById("sendMessageButton")
    attachAction(sendMessageButton, "send")
    sendMessageButton.disabled = true

    //@@ chatWin.open()
    // traceline("chatwin opened")

    const chatUI = harden({
        getChatWin: () => chatWin,
        getNameButton: () => setNameButton,
        getNameField: () => setNameField,
        getOfferChatButton: () => offerChatButton,
        getFindFriendButton: () => findFriendButton,
        getChatTextArea: () => chatTextArea,
        getNextMessageBox: () => nextMessageBox,
        getSendMessageButton: () => sendMessageButton,
        setButtonsForEstablishedConnection() {
            sendMessageButton.disabled = false
            offerChatButton.disabled = true
            findFriendButton.disabled = true
        }
    })
    return chatUI
}
traceline("made makeChatUI")

/**
 * The chatController contains all the interesting concurrency
 * behavior.
 * <p>
 * It is also the only object in Secureit-Echat that is
 * exposed to another person's software. As such, it is the only
 * object that gives other people any erights inside your computer,
 * and thus the only object that must be inspected in this system
 * for security issues. We discuss the security issues of the
 * Secureit-Echat program later. For now, let's look at the
 * interesting architectural features. First, note that there are 2
 * definitions of chatController, one enclosed at the end of the
 * definition of the other. Why?
 * <p>
 * As you recall from the chatUI discussion, to compose a chatUI
 * object, you first need a chatController. However, to compose a
 * chatController, you first need a chatUI object (note that the
 * first thing done in the chatController is the definition of a
 * chatUI). This is a classic case of 2 objects needing references
 *  each other essentially as soon as they come to life, a problem
 * that has plagued programmers ever since the invention of the
 * object. Here we use the E technique of immediately using a
 * variable's name inside the scope of the code block that defines
 * the object: the chatController being defined is passed to the
 * chatUIMaker as the first step in the chatController's definition.
 * And since the second definition of chatController is the last
 * step in the definition of the first chatController, at the end of
 * the definition, the first chatController effectively becomes the
 * second chatController, and everything works out cleanly.
 * <p>
 * Interesting methods in the chatController include
 * <ul>
 *     <li><tt>offerSelf</tt>, which creates the file containing
 *         the chatController's URI.
 *     <li><tt>findFriend</tt>, which creates a live reference
 *         to a friend based on a URI found in a file, and sets up
 *         the connection,
 *     <li><tt>send</tt> and <tt>receive</tt>, which simply
 *         pass messages across and are indeed as simple as their
 *         job suggests--receive is just one line long, while send
 *         is long enough to both send the message to the friend and
 *         to post the message locally on the sender's chat window.
 *         All the effort to encrypt and decrypt these messages are
 *         performed invisibly by E for the programmer
 * </ul>
 * @returns near
 */
function makeChatController({ getElementById }) {
    let myName
    let myFriend = null
    let myFriendName = null
    let myAddressFile = null
    /**
     *
     * @param {string} senderName
     * @param {string} message
     * @returns void
     */
    function showMessage(senderName, message) {
        chatUI.getChatTextArea().append(`$senderName says:    $message$\n$\n`)
    }
    const chatController = {
        // transmitting functions
        /**
         * @returns undefined
         */
        async send() {
            const nextMessage = chatUI.getNextMessageBox().getText()
            chatUI.getNextMessageBox().setText("")
            traceline("next message" + nextMessage)
            myFriend = await receive(nextMessage)
            showMessage(myName, nextMessage)
        },
        /**
         * @returns undefined
         */
        setMyName() {
            chatUI.getNameButton().disabled = true
            chatUI.getOfferChatButton().disabled = false
            chatUI.getFindFriendButton().disabled = false
            chatUI.getNameField().setAttribute('readonly', true)
            myName = chatUI.getNameField().value
        },
        /**
         * @returns undefined
         */
        offerSelf() {
            myAddressFile = requestSaveFile(chatUI.getChatWin())
            if (myAddressFile != null) {
                offerMyAddress(myAddressFile,
                               makeURIFromObject(chatController))
            }
        },
        /**
         * @returns undefined
         */
        leave() {
            if (myAddressFile != null) {
                myAddressFile.delete(null)
            }
        },
        /**
         * @returns undefined
         */
        receive(message) {
            showMessage(myFriendName, message)
        },
        /**
         * @returns string
         */
        receiveFriend(friend, name) {
            traceline("receiveFriend:" + friend + name)
            myFriend = friend
            myFriendName = name
            chatUI.setButtonsForEstablishedConnection()
            chatUI.getChatTextArea().setText(myFriendName + " has arrived\n\n")
            myFriend.catch(_ => {
                chatController.disconnect("disconnected")
            })
            traceline("received")
            return myName
        },
        /**
         * @returns undefined
         */
        async findFriend() {
            const file = findFriendFile(chatUI.getChatWin())
            if (file !== null) {
                const friendURI = file.getText()
                const friend = getObjectFromURI(friendURI)
                const nameVow = E(friend).receiveFriend(chatController,
                                                       myName)
                (nameVow).then(name => {
                    chatController.receiveFriend(friend, name)
                    chatUI.setButtonsForEstablishedConnection()
                }).catch(prob => {
                    traceline("findFriend prob: " + prob + stackTrace(prob))
                    chatController.disconnect("friend is unreachable")
                })
            }
        },
        /**
         * @returns undefined
         */
        disconnect(desc){
            if (myFriendName === null) {
                myFriendName = "the friend"
            }
            chatUI.getChatTextArea().append(`$myFriendName $desc$\n`)
            myFriend = null
            myFriendName = null
        }
    }
    const chatUI = makeChatUI(chatController, { getElementById })
    traceline("initialized chatController");
    return chatController
}
