import React, { Component, Fragment } from 'react';
import { deleteUser, editUser } from './../../../api/auth';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            email: null,
            lastUpdated: null,
            modal: false,
            redirect: null,
            status: null,
            editing: false,
            error: '',
        };
    }

    saveDetails = async () => {
        let token = localStorage.getItem('token');
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;

        // validation to prevent empty email string
        if (email == '') {
            email = this.state.email;
        }

        await editUser(
            (res) => {
                this.setState({ status: res.status });

                if (res.status == 400) {
                    this.setState({ error: res['error'].data['username'] });
                } else if (res.status == 200) {
                    this.props.updateAuth(true, username, email);
                    this.setState({
                        editing: false,
                    });
                }
            },
            token,
            username,
            email
        );
    };

    updateDetails = () => {
        if (this.state.username !== this.props.username) {
            this.setState({
                username: this.props.username,
            });
        } else if (this.state.email !== this.props.email) {
            this.setState({
                email: this.props.email,
            });
        }
    };

    toggleUpdate = () => {
        if (this.state.editing) {
            this.setState({ editing: false });
        } else {
            this.setState({ editing: true });
        }
    };

    showModal = () => {
        this.setState({ modal: true });

        if (document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'block';
        }
    };

    hideModal = () => {
        this.setState({ modal: false });

        if (document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    };

    deleteUser = async () => {
        let token = localStorage.getItem('token');

        await deleteUser(
            (res) =>
                this.setState({
                    status: res.status,
                }),
            token
        );

        if (this.state.status === 204) {
            this.cleanUpDet();
        }
    };

    cleanUpDet = () => {
        this.props.updateAuth(false, null, null);
        this.setState({ redirect: '/login' });
    };

    componentDidMount() {
        this.updateDetails();
    }

    componentDidUpdate() {
        this.updateDetails();
    }

    render() {
        let profileDetails;

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        const modal = (
            <Fragment>
                <div className='modal' tabIndex='-1' role='dialog' id='modal'>
                    <div
                        className='modal-dialog modal-dialog-centered'
                        role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Delete Account</h5>
                                <button
                                    type='button'
                                    className='close'
                                    onClick={this.hideModal}
                                    data-dismiss='modal'
                                    aria-label='Close'>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <p>
                                    Are you sure you want to delete your
                                    account?
                                </p>
                            </div>
                            <div className='modal-footer'>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={this.deleteUser}>
                                    Yes
                                </button>
                                <button
                                    type='button'
                                    onClick={this.hideModal}
                                    className='btn btn-secondary'
                                    data-dismiss='modal'>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

        if (this.state.editing) {
            profileDetails = (
                <Fragment>
                    <form>
                        <div class='form-group'>
                            <label for='username'>Username</label>
                            <input
                                type='text'
                                class='form-control'
                                id='username'
                                placeholder={this.state.username}
                            />
                        </div>
                        <div class='form-group'>
                            <label for='email'>Email</label>
                            <input
                                type='email'
                                class='form-control'
                                id='email'
                                placeholder={this.state.email}
                            />
                        </div>
                        <small id='error' class='form-text text-danger mb-2'>
                            {this.state.error}
                        </small>
                    </form>
                    <button
                        className='btn btn-info mr-2'
                        onClick={this.saveDetails}>
                        Save
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={this.toggleUpdate}>
                        Cancel
                    </button>
                </Fragment>
            );
        } else {
            profileDetails = (
                <Fragment>
                    <table className='table table-borderless table-responsive'>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{this.state.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className='btn btn-info mr-2'
                        onClick={this.toggleUpdate}>
                        Update
                    </button>
                    <button className='btn btn-danger' onClick={this.showModal}>
                        Delete
                    </button>
                </Fragment>
            );
        }
        return (
            <Fragment>
                {modal}
                <div className='card exchange col-sm-9 offset-sm-1 mt-5 p-0'>
                    <h5 className='card-header'>Profile Details</h5>
                    <div className='card-body'>
                        {this.props.isAuth ? (
                            profileDetails
                        ) : (
                            <p className='m-3'>Login to view profile details</p>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Profile;
