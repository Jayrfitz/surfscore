import * as React from '../../node_modules/react';
import { ChatLog } from './ChatLog';
import { CmdBtn } from './CmdBtn';
import { BattleLog } from './BattleLog';
import { YoPokemon } from './YoPokemon';
import { ActnBtn } from './ActnBtn';
import { Navbar } from '../../node_modules/react-bootstrap';
import { NavItem } from '../../node_modules/react-bootstrap';
import { Nav } from '../../node_modules/react-bootstrap';
import { Modal } from '../../node_modules/react-bootstrap';
import { Carousel } from '../../node_modules/react-bootstrap';
import { FBLogin } from './FBLogin';
import { Button } from '../../node_modules/react-bootstrap';
import { Socket } from './Socket';


export class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'showModal': true,
            'showGameFullModal': false
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    };

    componentDidMount(){
      

    }
    
     close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    
    joinGame() {
        Socket.emit('joinGame');
        this.setState({ showModal: false });
    }
    
    
    render(){
        
        return (
            <div>
                <div id="navBar">
                <Navbar id="innerNavBar">
                    <Navbar.Header>
                        
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                         <Nav>
                            <NavItem eventKey={1} href="https://github.com/jayrfitz" target = "_blank">GitHub</NavItem>
                        </Nav>
                        
                        <Nav pullRight>
                            <NavItem eventKey={2} href="#">
                                <div id='status'></div>
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                <FBLogin/>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <div id="info">
                    <div id="pokeInfo">
                        <div id="gameAction"><ActnBtn/></div>
                        <div id="cmdButton"><CmdBtn/></div>
                    </div>
                    <div id="chat"><ChatLog/>
                    </div>
                </div>
                
                

                
            </div>
           
        );
    }
    
}