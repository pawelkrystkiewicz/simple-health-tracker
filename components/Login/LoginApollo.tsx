import React from 'react';
import withApollo from '../../lib/with-apollo-client';
import gql from 'graphql-tag';
import Router from 'next/router';
const mutator = gql`
	mutation login($data: LoginInput!) {
		login(data: $data) {
			email
		}
	}
`;
class login extends React.Component {
	state = {
		email: null,
		password: null,
		error: null
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		let { email, password } = this.state;

		// Check non null email && password
		if (typeof email === 'string' && typeof password === 'string') {
			// trim fields
			email = email.trim();
			password = password.trim();

			// Check for email && password length
			if (email.length > 0 && password.length > 0) {
				console.log(`login`);
				this.props.apolloClient
					.mutate({
						mutation:mutator,
						variables: {
							data: {
								email,
								password
							}
						}
					})
					.then((res) => {
						console.log(res)
						if(res)
						this.setState({ error: null });
						Router.push('/dashboard');
					})
					.catch(({ graphQLErrors: err }) => this.setState({ error: err }));
			} else {
				this.setState({ error: "Email & Password Field shouldn't be empty" });
			}
		} else {
			this.setState({ error: 'Email & Password Field Required!' });
		}
	};

	render() {
		return [
			<form onSubmit={this.onFormSubmit} key="form">
				<div>
					<span className="error">{this.state.error}</span>
					<label> Email Address </label>
					<input
						type="email"
						onInput={(e) => this.setState({ email: e.target.value })}
						placeholder="E-mail"
					/>
				</div>
				<div>
					<label> Password </label>
					<input
						type="password"
						onInput={(e) => this.setState({ password: e.target.value })}
						placeholder="Password"
					/>
				</div>
				<div>
					<button type="submit"> Log In </button>
				</div>
			</form>
		];
	}
}



export default withApollo(login);
