import React, { Component } from "react";
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';
import QuestionsCont from './QuestionsCont/QuestionsCont';
import FireManager, { dbPaths } from "../../firebase/FireManager";
import connect from "react-redux/es/connect/connect";
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";

class QuestionPage extends Component {
    state = {
        allQuestions: [],
        filteredQuestions: [],
        mobileOpen: false,
    };

    getQuestions = () => {
        const promiseArray = [];
        this.props.user.skills_insensitive.forEach(skill => {
            promiseArray.push(
                FireManager.queryData({
                    collectionPath: "questions",
                    fieldPath: dbPaths.SKILLS,
                    operator: "array-contains",
                    value: skill
                }));
        });

        const p2 = FireManager.queryData({
            collectionPath: "questions",
            fieldPath: dbPaths.AGE,
            operator: "array-contains",
            value: this.props.user.age
        });

        const p3 = FireManager.queryData({
            collectionPath: "questions",
            fieldPath: dbPaths.GENDER,
            operator: "==",
            value: this.props.user.gender
        });

        const p4 = FireManager.queryData({
            collectionPath: "questions",
            fieldPath: dbPaths.GENDER,
            operator: "==",
            value: "all"
        });

        promiseArray.push(p2, p3, p4);

        return Promise.all(promiseArray).then(questionMatrix => {
            const allQuestions = [].concat(...questionMatrix);
            const otherUsersQuestions = allQuestions.filter(question => question.userId !== this.props.user.id);

            return otherUsersQuestions.reduce((newQuestions, question) => {
                let exists = !!newQuestions.find(q => q.id === question.id);
                if (!exists) {
                    newQuestions.push(question);
                }
                return newQuestions;
            }, []);
        })
    };

    componentDidMount() {
        const { user } = this.props;
        user.id && !user.isNewUser && this.getQuestions().then(formattedQuestions => {
            this.setState({
                allQuestions: formattedQuestions,
                filteredQuestions: formattedQuestions
            });
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.user.isNewUser) {
            this.getQuestions().then(formattedQuestions => {
                if (JSON.stringify(prevState.allQuestions) !== JSON.stringify(formattedQuestions)) {
                    this.setState({
                        allQuestions: formattedQuestions,
                        filteredQuestions: formattedQuestions
                    });
                }
            });
        }
    }

    questionFilter = (type) => {
        const { allQuestions } = this.state;
        let filteredQuestions = [];
        switch (type) {
            case "all":
                filteredQuestions = allQuestions;
                break;
            case "age":
                filteredQuestions = allQuestions.filter(question => question.age.includes(this.props.user.age));
                break;
            case "gender":
                filteredQuestions = allQuestions.filter(question => question.gender);
                break;
            //by skills
            default:
                filteredQuestions = allQuestions.filter((question) => {
                    if (question.skills.find((skill) => skill.toUpperCase() === type.toUpperCase())) {
                        return question;
                    }
                });
        }
        this.setState({
            ...this.state,
            filteredQuestions
        });
    };

    handleFilterClick = (e) => {
        const type = e.target.id;
        this.questionFilter(type);
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.root}>
                    <QuestionsFilter skills={this.props.user.skills}
                        filterClickHandler={this.handleFilterClick} />
                    <QuestionsCont filteredQuestions={this.state.filteredQuestions} />
                </div>
            </>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 330,
            flexShrink: 0,
        },
    },
    menuButton: {
        color: "#2196f3",
        height: 100,
        width: 100,
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        "&>span": {
            "&>svg": {
                width: "2em",
                height: "2em",
                fontSize: 20
            }
        },
        '&:hover': {
            backgroundColor: "#fff",
        }
    },
    toolbar: theme.mixins.toolbar,
    minHeight: '72px',
    drawerPaper: {
        width: 330,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    flex: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%)'
        }
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(QuestionPage));