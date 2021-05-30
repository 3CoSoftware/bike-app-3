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
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false, 
        username: '',
        password: '',
        units: 'imperial',
        lang: 'en',
        msg: null 
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated} = this.props 
        if(error !== prevProps.error) {
            if(error.id === "REGISTER_FAIL") {
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

        const { username, password, units, lang } = this.state 

        console.log(username, password, units, lang)

        const newUser = {
            username,
            password,
            units,
            lang
        }

        this.props.register(newUser)

    }

    render() {
        return (
            <div>
                <Button
                  color="dark"
                  style={{ marginBottom: '2rem', marginTop: '2rem' }}
                  onClick={this.toggle}
                >

                    Register
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
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

                                <Label>Units</Label>
                                <Input
                                  type="select"
                                  name="units"
                                  id="units"
                                  onChange={this.onChange}
                                >
                                  <option>imperial</option>
                                  <option>metric</option>
                                </Input>


                                <Label>Language</Label>
                                <Input
                                  type="select"
                                  name="lang"
                                  id="lang"
                                  onChange={this.onChange}
                                >
                                  <option>en</option>
                                </Input>

                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Register!
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal) 