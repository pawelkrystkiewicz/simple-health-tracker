//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Drawer, IconButton, AppBar, Toolbar, List, Badge, Typography, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './Menu';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	toolbar: {
		paddingRight: 24
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	menuButtonHidden: {
		display: 'none'
	},
	title: {
		flexGrow: 1
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: '100vh',
		overflow: 'auto'
	},
	chartContainer: {
		marginLeft: -22
	},
	tableContainer: {
		height: 320
	},
	h5: {
		marginBottom: theme.spacing.unit * 2
	}
});

class Authenticated extends React.Component {
	static pageTransitionDelayEnter = true;

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			open: false
		};
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		this.timeoutId = setTimeout(() => {
			this.props.pageTransitionReadyToEnter();
			this.setState({ loaded: true });
		}, 1000);
	}

	componentWillUnmount() {
		if (this.timeoutId) clearTimeout(this.timeoutId);
	}

	updateWeight = (weight) => {
		this.setState({ weight });
	};

	render() {
		if (!this.state.loaded) return null;
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="absolute"
					className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
				>
					<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							{this.props.title}
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
					}}
					open={this.state.open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>{mainListItems}</List>
				</Drawer>

				<main className={classes.content}>
					<div className={classes.appBarSpacer} />

					<Typography variant="overline" gutterBottom component="span">
						{`HOME / USER / ${this.props.breadcrumb}`}
					</Typography>
					{this.props.children}
				</main>
			</div>
		);
	}
}

Authenticated.propTypes = {
	pageTransitionReadyToEnter: PropTypes.func,
	classes: PropTypes.object.isRequired
};

Authenticated.defaultProps = {
	pageTransitionReadyToEnter: () => {}
};

export default withStyles(styles)(Authenticated);
