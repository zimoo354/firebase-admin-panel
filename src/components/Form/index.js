import React from 'react';
import Firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';
import * as config from '../../config';
import Base from '../Base';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Button from 'react-bulma-components/lib/components/button';
import {
    Field,
    Control,
    Label,
    Input,
    Checkbox,
    Select
  } from 'react-bulma-components/lib/components/form';
import InputMask from 'react-input-mask';
import PasswordField from '../PasswordField';
import Dropzone from 'react-dropzone';
import Icon from 'react-fontawesome';
import moment from 'moment';
import prof_placeholder from '../Base/common/profile.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { thisExpression } from '@babel/types';
import { toast } from 'react-toastify';
import { ChromePicker } from 'react-color';

class Form extends React.Component {
    state = {
        returnToCollection: false,
        isEditing: false,
        date: null,
        profile_pic: null,
        ...this.props.initialState,
    };

    dateToShow = new Date();
   

    isLoading = false;
    fbCollection = [];
    
    ref = Firebase.database().ref();

    fields = [];

    ref_profile_pic = React.createRef();

    componentWillMount() {
        let date, isEditing = this.props.idToEdit ? this.props.idToEdit : false;
        this.setState({isEditing: isEditing}, () => {
            if (isEditing) {
                this.ref.child(this.props.firebaseCollection).child(this.state.isEditing).on('value', snapshot => {
                    const state = snapshot.val();
                    this.setState(
                        {
                            isEditing: isEditing,
                            ...state,
                        }, () => {
                            date = new Date(this.state.date);
                            this.dateToShow = new Date(this.state.date)
                            this.setState({date: date.yyyymmdd()});
                        }
                    )
                });      
            } else {
                date = new Date();
                this.setState({date: date.yyyymmdd()});
            }
        });

        this.fields = this.props.fields;

        if (this.props.credential) {
            if (isEditing) {
                this.fields.unshift({
                    label: "",
                    key: 'profile',
                    type: 'file',
                    accept: 'image/jpeg',
                },{
                    label: "Email",
                    key: 'email',
                    type: 'email',
                    disabled: true,
                })
            } else {
                this.fields.unshift({
                    label: "",
                    key: 'profile',
                    type: 'file',
                    accept: 'image/jpeg',
                },{
                    label: "Email",
                    key: 'email',
                    type: 'email',
                },{
                    label: "Password",
                    key: 'password',
                    type: 'password',
                })                
            }
        }   

        if (this.props.shouldNotExist) {
            this.ref.child(this.props.firebaseCollection).on('value', snapshot => {
                const state = snapshot.val();
                this.fbCollection = state;
            });
        }
    }

    renderSelectOptions = opts => (
        Object.entries(opts).map(o => (
            <option key={o[0]} value={o[0]}>{o[1]}</option>
        ))
    )

    handleFocus = event => event.target.select();

    renderSingleField = field => {
        switch(field.type) {
            case 'select':
                return (
                    <Select
                        name={field.key}
                        onChange={this.onChange}
                        value={this.state[field.key]} 

                    >
                        <option value=''>Select...</option>
                        {
                            field.options &&
                            this.renderSelectOptions(field.options)
                        }
                    </Select>                                        
                );
            case 'checkbox':
                return (<Checkbox
                    {...field}
                    name={field.key}
                    onChange={this.onChange}
                    checked={this.state.active_flag}
                >
                    {field.label}
                </Checkbox>);
            /*
            case 'datepicker':
                return (
                    <InputMask
                        {...field}
                        className={`input ${field.className}`}
                        mask="9999-99-99"
                        name={field.key}
                        onChange={this.onChange}
                        onFocus={this.handleFocus}
                        value={this.state[field.key]} 
                    />                    
                )
            */
            case 'datepicker':
                return (
                    <DatePicker
                        {...field}
                        autoComplete="new-password"
                        className={`input ${field.className}`}
                        name={field.key}
                        onChange={this.onChangeDP}
                        selected={this.dateToShow} 
                    />                    
            )
            case 'phone':
                return (
                    <InputMask
                        {...field}
                        className={`input ${field.className}`}
                        mask="(999) 999-9999"
                        name={field.key}
                        onChange={this.onChange}
                        value={this.state[field.key]} 
                    />                    
                )
            case 'password':
                return (
                    <PasswordField
                        {...field}
                        name={field.key}
                        onChange={this.onChange}
                        value={this.state[field.key]} 
                    />
                )
            case 'file':
                return (
                    <div className='profile-pic-container'>
                    <Dropzone
                        {...field}
                        onDrop={this.onDrop}
                    >
                        {({getRootProps, getInputProps}) => (
                            <section className='dropzone-profile'>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img
                                    ref={this.ref_profile_pic}
                                    alt='Profile'
                                    src={(this.state.profile_pic) ? this.state.profile_pic : prof_placeholder}
                                />
                            </div>
                            </section>
                        )}
                    </Dropzone>
                    <Link
                        to='javascript:void(0)'
                        onClick={() => this.setState({profile_pic: ''})}
                        style={{color: 'red'}}
                    ><Icon name='trash' /></Link>
                    </div>
                ) 
            case 'color':
                return (
                    <ChromePicker
                        color={this.state[field.key]}
                        onChangeComplete={ color => this.onChangeColor(color, field.key) }
                    />
                )
            default:
                return (<Input 
                        {...field}
                        name={field.key}
                        onChange={this.onChange}
                        value={this.state[field.key]} 
                    />)
        }        
    }

    renderFields = fields => {
        return fields.map(field => {
        const isCheckbox = field.type === 'checkbox';
            return (
                <Field key={`field-${field.key}`}>
                    {   !isCheckbox &&
                        <Label>{field.label}</Label>
                    }
                    <Control>
                        {this.renderSingleField(field)}
                    </Control>
                </Field>        
            )
        });
    }

    onChange = evt => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
    };

    onChangeDP = d => {
        this.setState({
            date: d.yyyymmdd(),
        });
        this.dateToShow = d;
    };

    onChangeColor = (color, field) => {
        this.setState({ [field]: color.hex });
    }

    onDrop = acceptedFiles => {
        const reader = new FileReader();
        if (acceptedFiles[0]) {
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = () => this.setState({profile_pic: reader.result});
        }
    }

    createUser = (email, password) => {
        if (!this.validate()) return 0;

        let storeRef;
        config.AuthApp.auth().createUserWithEmailAndPassword(email, password)
        .then(newUser => {
            toast.success(`User created succesfully`);
            storeRef = this.ref.child(this.props.firebaseCollection).child(newUser.user.uid);
            this.saveFirebaseData(storeRef);
        })
        .catch(error => toast.error(error.message));
    }

    validate = () => {
        const keys = Object.entries(this.props.initialState).map(e => e[0]);
        let isValid = true;
        for (let i = 0; i < keys.length; i++) {
            if (!this.state[keys[i]]) {
                isValid = false;
                toast.warn('All fields are required');
                break;
            }
        }

        // To prevent duplicate alert
        if (!isValid) return isValid;

        const {
            shouldNotExist,
        } = this.props;

        if (shouldNotExist) {
            for (let j = 0; j < shouldNotExist.length; j++) {
                if (Object.entries(this.fbCollection).find(record => record[1][shouldNotExist[j]] === this.state[shouldNotExist[j]])) { // if exists
                    isValid = false;
                    toast.warn(`Field: ${shouldNotExist[j]} can't be duplicated`);
                    break;
                }
            }
        }

        return isValid;
    }
    
    save = () => {
        let storeRef;

        if (!this.validate()) return 0;

        if (this.state.isEditing) {
            storeRef = this.ref.child(this.props.firebaseCollection).child(this.state.isEditing);
        } else {
            if (this.props.credential) {
                return this.createUser(this.state.email, this.state.password)
            } else {
                storeRef = this.ref.child(this.props.firebaseCollection).push();
            }
        }

        this.saveFirebaseData(storeRef);
    }

    saveFirebaseData = ref => {
        let data = this.state;

        if (data.date) data.date = parseFloat(moment(data.date).format('x'));

        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (this.state.isEditing === currentUser.uuid) {
            currentUser.profile_pic = data.profile_pic;
            localStorage.setItem('user', JSON.stringify(currentUser));
        }

        delete data.isEditing;
        delete data.returnToCollection;
        delete data.password;

        if(this.props.route !== 'planning') delete data.date;
        if(!this.props.credential) delete data.profile_pic;
        
        ref.set(data);

        this.setState({returnToCollection: true});        
    }

    renderRedirect = () => (<Redirect to={`/${this.props.route}`} />)

    render() {
        return (
            <Base>
                {
                    this.state.returnToCollection &&
                    this.renderRedirect()
                }
                <Container className={'pad-und-md fb-form'}>
                    <Columns>
                        <Columns.Column size='half' offset='one-quarter'>
                            <Columns>
                                <Columns.Column size={12}>
                                {this.renderFields(this.fields)}
                            <Field>
                            <Control>

                            </Control>
                            </Field>                                 
                            </Columns.Column>
                            <Columns.Column size='half' className='hide-for-small-only'>
                                <Link className='linkbtn' to={`/${this.props.route}`}><Button>Cancel</Button></Link>
                            </Columns.Column>
                            <Columns.Column size='half'>
                                <Button className='gradient' onClick={this.save}>Save</Button>
                            </Columns.Column>    
                            <Columns.Column size='half' className='show-for-small-only'>
                                <Link className='linkbtn' to={`/${this.props.route}`}><Button>Cancel</Button></Link>
                            </Columns.Column>                            
                            </Columns>         
                        </Columns.Column>
                    </Columns>
                </Container>
            </Base>    
        )
    }
}

export default Form;