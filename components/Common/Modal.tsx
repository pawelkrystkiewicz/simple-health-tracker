import React from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	withMobileDialog
} from '@material-ui/core';

const Modal = (props) => (
	<React.Fragment>
		<Dialog
			fullScreen={props.fullScreen}
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			{!!props.title && <DialogTitle id="responsive-dialog-title">{`${props.title.toUpperCase()}`}</DialogTitle>}
			<DialogContent>
				<DialogContentText>{props.component}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="primary" autoFocus>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	</React.Fragment>
);

Modal.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(Modal);
