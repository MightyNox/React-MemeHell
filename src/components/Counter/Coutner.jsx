import React, { Component } from 'react'

class Coutner extends Component {
  state = {
    elements:[{
      id: 0,
      count : 0,
      tag : 'x'
    },{
      id: 1,
      count : 0,
      tag : 'y'
    },{
      id: 2,
      count : 0,
      tag : 'z'
    }]
  }

  handleDecrement = (id)=>{
    const elements = this.state.elements
    if(elements[id].count > 0){
      elements[id].count--
      this.setState({elements : elements})
    }
  }

  handleIncrement = (id) => {
    const elements = this.state.elements
    elements[id].count++
    this.setState({elements : elements})
  }

  renderTags(){
    if(this.state.elements.length === 0){
      return <p>There are no elements!</p>
    }else{
      return (
        <ul className='list-unstyled'>
          {this.state.elements.map(element => 
            <li key={element.id}>
            {element.tag}
            <span className={this.getBadgeClasses(element)}>{this.formatCount(element)}</span>
            <button onClick={() => {this.handleIncrement(element.id)}} className='btn m-2 btn-secondary btn-sm'>Increment</button>
            <button onClick={() => {this.handleDecrement(element.id)}} className='btn m-2 btn-secondary btn-sm'>Decrement</button>
            </li>
          )}
        </ul>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTags()}
      </React.Fragment>
    )
  }

  getBadgeClasses(element) {
    let classes = 'badge m-2 badge-';
    classes += (element.count === 0) ? 'warning' : 'primary';
    return classes;
  }

  formatCount(element){
    const count = element.count
    return count === 0 ? 'Zero' : count
  }
}

export default Coutner
