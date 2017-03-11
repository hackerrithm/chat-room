import React,{Component} from 'react';

export default class ChatRoom extends Component {

    constructor(props, context){
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.state = {
            message: '',
            messages: []
        };
    }

    componentDidMount() {
        console.log('component did mount')
        firebase.database().ref('messages/').on('value', (snapshot) => {
            const currentMessages = snapshot.val()

            if (currentMessages != null) {
                this.setState({
                    messages: currentMessages
                })
            }
        })
    }

    updateMessage(event) {
        console.log('it works: ' + event.target.value)
        this.setState({
            message: event.target.value

        })
    }

    submitMessage(event) {
        console.log('it submits: ' + this.state.message)
        const nextMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        /*
        var list = Object.assign([], this.state.messages)
        list.push(nextMessage)
        this.setState({
            messages: list

        })
        */

        firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
    }


    render() {

        const currentMessages = this.state.messages.map((message, i) => {
            return(
                <li key={message.id}>{message.text}</li>
            )
        })
        return (
            <div className="class-name">
                ChatRoom
                <ol>
                    <li>{currentMessages}</li>
                </ol>
                <input onChange={this.updateMessage} type="text" name="message" placeholder="Message" />
                <button onClick={this.submitMessage} >Submit Message</button>
            </div>
        );
    }
}