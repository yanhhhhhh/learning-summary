//demo01
// ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('example'));

// demo02 列表
// var arr =['a','b','c']
// ReactDOM.render(<div>{arr.map((item)=><h1>Hello, {item}!</h1>)}</div>,document.getElementById('example'))

// var element = <div>{arr.map((item)=><h1 key={item}>Hello, {item}!</h1>)}</div>
// ReactDOM.render(element,document.getElementById('example'))


// demo03

 /*function tick() {
   const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('example'));
} */

// setInterval(tick, 1000);

// demo 04
/* function Welcome(props) {
  return <h1>hello,{props.name}</h1>
}
const Element = (
  <div>
    <Welcome name="Jae"/>
    <Welcome name="mike"/>

  </div>
) 
ReactDOM.render(Element, document.getElementById('example')); */

// demo 05
/* function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('example')
); */

// demo 06 if条件控制

function Sign(props){
  return (
    <h1>Please Sign</h1>
  )
}
function Welcome(props){
  return (
    <h1>Please Welcome</h1>
  )
}
function App(props){
  const isLog = props.isLog
  if(isLog){
    return <Welcome/>
  }else{
    return <Sign/>
  }
}
ReactDOM.render(<App isLog={false}/>,document.getElementById('example'))