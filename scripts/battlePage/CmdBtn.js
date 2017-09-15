import * as React from '../../node_modules/react';
import * as ReactBootstrap from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';
import { Button } from '../../node_modules/react-bootstrap';
import { InputGroup } from '../../node_modules/react-bootstrap';
import { FormControl } from '../../node_modules/react-bootstrap';
import { FormGroup } from '../../node_modules/react-bootstrap';
import { ButtonToolbar } from '../../node_modules/react-bootstrap';
import { ButtonGroup } from '../../node_modules/react-bootstrap';
import { Modal } from '../../node_modules/react-bootstrap';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             'showModal': false,
             'name' : 'name',
             'move1' : 'move1',
             
             'user' : 3,
             'CM' : 0
        };
        this.onClick1 = this.onClick1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmMove = this.confirmMove.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('A move was clicked.');

    }
 
    onClick1(){
        Socket.emit('CM', {'CM' : 0});
        this.setState({'CM' : 0});
        console.log(this.state.CM);
        console.log('Button 1 clicked.');
    }
    confirmMove() {
        console.log('Confirm move button clicked.');
        Socket.emit('confirmMove');
    }
    
    joinGame() {
        Socket.emit('joinGame');
        this.setState({ showModal: false });
    }
    
     close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount(){
        
        Socket.emit('updateInfo');
        // Allows moves to be dynamically updated.
        Socket.on('updatePokemon', (data) =>{
            this.setState({
                'name'  : data['name'],
                'move1' : data['move1']
            });
        });
        
        Socket.on('connection', (data) => {
            this.setState({
                'user' : data['user']
            });
            this.forceUpdate();
        });
        {/*
        Socket.on('gameFull', (data) => {
          this.setState({ 'showModal': true}).bind(this);
        });
        */}
    }
    
    


    render() {
        var name = this.state.name;
        var m1 = this.state.move1;
        var CM = this.state.CM;
        var b1 = 'primary';
        
       
     
        
        let moveArea = null;
        var user = this.state.user;
        if (user == 1 || user == 2){
            moveArea = 
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <div id='nameLog'>
                    {name}
                    </div>
                    <InputGroup>
                        <ButtonToolbar>
                            <Button id='move1' bsStyle={b1} onClick={this.onClick1}>{m1}</Button>
                            <Button id='confirm' bsStyle='default' onClick={this.confirmMove}>Confirm Move</Button>
                        </ButtonToolbar>
                    </InputGroup>
                </FormGroup>
            </form>;
        } else if (user == 3){
                // Just add in html elements like the above. Don't forget a semi colon.
                
                moveArea =
                <div>
                <div id='nameLog'>
                    You are spectating
                </div>
                <div id='nameLog2'>
                    <Button  bsSize="large" onClick={this.joinGame}>Join Game</Button>
                </div>
                </div>;
        };
      
        
        return (
            <div>
                {moveArea}
                {/*
                <Modal show={this.state.showModal} bsSize="small" onHide={this.close} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Game Full</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Sorry. The game is currently full. Try again later!
                    </Modal.Body>
                    
                    <Modal.Footer>
                      <Button bsStyle = 'primary' onClick={this.close}>Ok</Button>
                    </Modal.Footer>
                </Modal>
                */}
            </div>
        );
    }
}
