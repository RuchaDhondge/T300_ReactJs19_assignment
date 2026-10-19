function FocusableInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

export default FocusableInput;
