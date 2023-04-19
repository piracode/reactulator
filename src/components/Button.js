const Button = ({ value }) => {
  return <button>{value}</button>;
};

export default Button;

// function Button(props) {
//   const { button } = props;

// const someData = {
//     prop1: 1,
//     props2: 2,
//   };

//   const { prop1, props2 } = someData;

//   return (
//     <button
//       className={button.className}
//       onClick={() => props.onButtonClick(button)}
//     >
//       {button.text}
//     </button>
//   );
// }

// export default Button;
