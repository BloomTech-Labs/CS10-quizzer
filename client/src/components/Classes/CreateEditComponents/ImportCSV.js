import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { FilePicker } from 'react-file-picker'
import Papa from 'papaparse'

const parse = (file) => {
  Papa.parse(file, {
    header: true,
    complete: results => {
      console.log(results)
    }
  })
}

export class ImportCSV extends Component {
  render () {
    return (
      <FilePicker
        extensions={['csv']}
        onChange={FileObject => parse(FileObject)}
        onError={err => console.log(err)}
      >
        <Button>
          Import CSV
        </Button>
      </FilePicker>
    )
  }
}
