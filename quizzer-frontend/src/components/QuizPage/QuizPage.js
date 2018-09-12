import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import './QuizPage.css'

class QuizPage extends Component {
  constructor () {
    super()
    this.state = {
      class: '',
      studentName: '',
      quizName: '',
      quizContent: null,
      question: [],
      options: [],
      page: null,
      grade: null
    }
  }
  componentDidMount () {
    this.setState({
      class: 'CS14',
      studentName: 'Sue Student',
      quizName: 'Graphs Quiz',
      quizContent: <div><p>Graphs are collections of related data. They’re like trees, except connections can be made from any node to any other node, even forming loops.</p><p>The nodes in a graph are called vertexes (or vertices or verts), and the connections between the verts are called edges.
      </p><p>And edge denotes a relationship or linkage between the two verts.</p></div>,
      question: ['A popular online map application provides navigational aids and the fastest path between two points.  This data is represented with vertexes where two or more roads intersect and edges representing the roads between intersections and the time it takes to traverse them.  What kind of graph is this?'],
      options: [{
        type: 'checkbox',
        name: 'graphs',
        choices: [
          {
            id: 'uda',
            label_text: 'Unweighted, Directed, Acyclic'
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
        correctAnswer: []
      }],
      page: 1
    })
  }

  displayChoices () {
    let choices = []
    const option = this.state.page - 1
    for (let i = 0; i < this.state.options[option].choices.length; i++) {
      choices.push(
        <FormGroup className={`question_${option}_options`} key={`option_${i}`}>
          <Input type={this.state.options[option].type} id={this.state.options[option].choices[i].id} name={this.state.options[option].name} value={this.state.options[option].choices[i].id} />
          <Label for={this.state.options[option].choices[i].id}>{this.state.options[option].choices[i].label_text}</Label>
        </FormGroup>
      )
    }
    return choices
  }

  render () {
    if (this.state.page === null) {
      return <div>Loading</div>
    }
    return (
      <div>
        <div className='quiz_header'>
          <h1>{this.state.class} - {this.state.studentName}</h1>
          <h1>{this.state.page} of {this.state.question.length}</h1>
        </div>
        <div className='quiz_body'>
          <h1>{this.state.quizName}</h1>
          <p>{this.state.quizContent}</p>
          <h1>Question:</h1>
          <p>{this.state.question[this.state.page - 1]}</p>
        </div>
        <Form className='quiz_form'>
          {this.displayChoices()}
          <Button color='info' className='quiz_submit_button'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default QuizPage
