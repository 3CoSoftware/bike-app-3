import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

class LoginModal extends Component {
    state = {
        modal: false, 
        username: '',
        password: '',
        msg: null 
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated} = this.props 
        if(error !== prevProps.error) {
            if(error.id === "LOGIN_FAIL") {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { username, password } = this.state 

        const rider = {
            username, 
            password 
        }

        this.props.login(rider)

    }

    render() {
        return (
            <div>
                <Button
                  color="dark"
                  style={{ marginBottom: '2rem', marginTop: '2rem' }}
                  onClick={this.toggle}
                >

                    Login
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                  type="text"
                                  name="username"
                                  id="username"
                                  placeholder="Username"
                                  onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                  onChange={this.onChange}
                                />

                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Login!
                                </Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error 
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal) 