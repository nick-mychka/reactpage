import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';

import Button from './common/Button';
import Warning from './common/Warning';
import ModalWindow from './common/ModalWindow';

class AuthModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login:'', password:'', confirmPassword : '', loginError : false, passwordError : false, confirmError : false
        };
        this.cancelClick = this.cancelClick.bind(this);
        this.validation = this.validation.bind(this);
        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeConfirmPass = this.handleChangeConfirmPass.bind(this);
    }

    cancelClick() {
        this.props.closeAuthModal();
    }

    validation() {
        if (!this.state.login) {
            this.setState({loginError: true});
            return false;
        }
        else if (!this.state.password) {
            this.setState({passwordError: true});
            return false;
        }
        else if (this.props.mode && !this.state.confirmPassword) {
            this.setState({confirmPassword: true});
            return false;
        }
        else if (this.state.confirmError || this.state.loginError) return false;
        return true;
    }

    handleClickBtn() {
        if(this.validation()) {
            this.props.auth(this.props.mode ? 'signUp' : 'signIn', this.state.login.trim(), this.state.password);
        }
    }

    handleChangeLogin(e){
        this.setState({loginError : !Validator.isEmail(e.target.value.trim()), login : e.target.value});
    }

    handleChangePass(e){
        this.setState({passwordError: false, password : e.target.value});
    }

    handleChangeConfirmPass(e){
        this.setState({confirmError : this.state.password !== e.target.value, confirmPassword : e.target.value});
    }

    render() {
        return (
            <ModalWindow>
                <div className="modal-body">
                    <input type="text"
                           className="form-control"
                           onChange={this.handleChangeLogin}
                           placeholder="Email"
                           name="login"
                           value={this.state.login}
                    />
                    {this.state.loginError && <Warning strongText="Warning!" text="Login should be valid email."/>}
                    <input type="password"
                           className="form-control"
                           onChange={this.handleChangePass}
                           placeholder="Password"
                           name="password"
                           value={this.state.password}
                    />
                    {this.state.passwordError && <Warning strongText="Warning!" text="Password can not be empty."/>}
                    { this.props.mode && <input type="password"
                           className="form-control"
                           onChange={this.handleChangeConfirmPass}
                           placeholder="Password confirmation"
                           name="confirmPassword"
                           value={this.state.confirmPassword}/>
                    }
                    {this.state.confirmError && <Warning strongText="Warning!" text="Confirmation is wrong."/>}
                    {this.props.error && <Warning strongText="Warning!" text={this.props.error}/>}
                </div>
                <div className="modal-footer">
                    <Button classSet="btn-primary" handleClick={this.handleClickBtn} text="Ok"/>
                    <Button classSet="btn-danger" handleClick={this.cancelClick} text="Cancel"/>
                </div>
            </ModalWindow>
        )
    }
}

AuthModal.propTypes = {
    mode: PropTypes.bool,
    error : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    auth : PropTypes.func,
    closeAuthModal : PropTypes.func
};

export default AuthModal;