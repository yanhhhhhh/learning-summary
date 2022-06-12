import './App.css';
import React from 'react';
// demo 01 函数组件
/* function App() {
  const click = (params) => {
    console.log('点击了', params);
  };
  return (
    <div className="App">
      <button onClick={() => click('传递参数')}>点击了</button>
    </div>
  );
} */

/* // demo class组件和setState
class App extends React.Component {
  state = {
    cont: 0,
    list: [1, 2, 3],
    person: {
      name: 'jack',
      age: 18,
    },
  };
  change = () => {
    this.setState({
      cont: this.state.cont + 1,
      list: [...this.state.list, 4, 5],
      person: { ...this.state.person, name: 'jae' },
    });
  };
  render() {
    return (
      <>
        <ul>
          {this.state.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{this.state.cont}</p>
         <p>{this.state.person}</p> 

<button onClick={this.change}>change</button>
      </>
    );
  }
}* /

/* 
import Counter from './components/counter';
function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  );
} */
// Context

/* import {themes,ThemeContext} from './pages/context/theme-context'
import ThemedButton from './pages/context/themed-button';
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        
        
      </>
    );
  }
}*/


/* import Parent from './hook/useState01/parent'
function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}*/

import AnimateDemo from './hook/useEffect01/animateDemo';
function App() {
  return (
    <div className="App">
      <AnimateDemo />
    </div>
  )
}
export default App;
