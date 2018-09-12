import React, { Component } from 'react';
import './QuizPage.css'

class QuizPage extends Component {
    constructor() {
        super();
        this.state = {
            class: '',
            student_name: '',
            quiz_name: '',
            quiz_content: null,
            question: [],
            question_choices: [],
            page: null,
            grade_counter: null
        }
    }

    componentDidMount() {

        this.setState({
            class: 'CS14',
            student_name: 'Sue Student',
            quiz_name: 'Grpahs Quiz',
            quiz_content: <div><p>Graphs are collections of related data. They’re like trees, except connections can be made from any node to any other node, even forming loops.</p><p>The nodes in a graph are called vertexes (or vertices or verts), and the connections between the verts are called edges.
            </p><p>And edge denotes a relationship or linkage between the two verts.</p></div>,
            question: ['A popular online map application provides navigational aids and the fastest path between two points.  This data is represented with vertexes where two or more roads intersect and edges representing the roads between intersections and the time it takes to traverse them.  What kind of graph is this?'],
            question_choices: [{
                type: 'checkbox',
                name: 'graphs',
                choices: [
                    {
                        id: 'uda',
                        label_text: 'Unweighted, Directed, Acyclic',
                    },
                    {
                        id: 'dwa',
                        label_text: 'Directed, Weighted, Acyclic'
                    },
                    {
                        id: 'dwc',
                        label_text: 'Directed, Weighted, Cyclic'
                    },
                    {
                        id: 'duc',
                        label_text: 'Directed, Unweighted, Cyclic'
                    }
                ],
                correct_answer: []
            },
            ],
            page: 1
        });
    }

    display_question_choices = () => {

        let choices = [];

        const page = this.state.page - 1;

        for (let i = 0; i < this.state.question_choices[page].choices.length; i++) {
            choices.push(
                <div className={`question_${page}_choices`} key={`choice_${i}`}>
                    <input type={this.state.question_choices[page].type} id={this.state.question_choices[page].choices[i].id} name={this.state.question_choices[page].name} value={this.state.question_choices[page].choices[i].id} />
                    <label for={this.state.question_choices[page].choices[i].id}>{this.state.question_choices[page].choices[i].label_text}</label>
                </div>
            )
        }

        return choices;
    }

    render() {

        if (this.state.page === null) {
            return <div>Loading</div>
        }

        return (
            <div>
                <div className='quiz_header'>
                    <h1>{this.state.class} - {this.state.student_name}</h1>
                    <h1>{this.state.page} of {this.state.question.length}</h1>
                </div>
                <div className='quiz_body'>
                    <h1 className='quiz_name'>{this.state.quiz_name}</h1>
                    <p className='quiz_content'>{this.state.quiz_content}</p>
                    <h1 className='quiz_question'>Question:</h1>
                    <p className='quiz_question_content'>{this.state.question[this.state.page - 1]}</p>
                    <fieldset>
                        {this.display_question_choices()}
                    </fieldset>
                    <input type='submit' />
                </div>
            </div>
        )
    }
}

export default QuizPage 