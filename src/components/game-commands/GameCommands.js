import React, { Component } from 'react';
import './GameCommands.css'
import { Segment, Label, Icon } from 'semantic-ui-react';
export default class GameCommands extends Component {
    render() {
        return (
            <Segment>
                <h1>Commands</h1>
                <p><span>
                    <Label>
                        <Icon name='caret left'></Icon>
                    </Label>
                    <Label>
                        <Icon name='caret right'></Icon>
                    </Label>
                    or
                    <Label>
                        Q
                    </Label>
                    <Label>
                        D
                    </Label>
                    &nbsp;<b>Move</b>
                </span>
                </p>
                <p><span>
                    <Label>
                        <Icon name='caret up'></Icon>
                    </Label>
                    <Label>
                        <Icon name='caret down'></Icon>
                    </Label>
                    or
                    <Label>
                        Z
                    </Label>
                    <Label>
                        S
                    </Label>
                    &nbsp;<b>Rotate</b>
                </span>
                </p>
                <p><span>
                    <Label>
                        Space
                    </Label>
                    &nbsp;<b>Instant drop</b>
                </span>
                </p>
            </Segment>
        )
    }
}
