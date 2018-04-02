import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createPost } from '../actions';

class PostsNew extends Component {
  // Note about error-rendering:
  // 3 meta states: pristine (rendered, no input), touched (user selected field, completed, changed focus away), invalid (??)
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`; //conditional styling
    return (
      <div className={className}>
        <label>{field.labelToDisplay}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props; // Comes from reduxForm at end of this file

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          component={this.renderField}
          labelToDisplay="Title for Post"
          />
        <Field
          name="categories"
          component={this.renderField}
          labelToDisplay="Categories"
          />
        <Field
          name="Post Content"
          component={this.renderField}
          labelToDisplay="Content"
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values)  // {title: 'asdf', categories: 'pants', content: 'i love them'}
  const errors = {};
  // Validate inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a longer title, please!";
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  return errors; // if empty, form is fine; else failed validation
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
