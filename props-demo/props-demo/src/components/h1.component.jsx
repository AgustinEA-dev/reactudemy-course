const H1Component = (props) => {
  const { fontSize, color, decoration } = props;
  return (
    <>
      <h1
        style={{ fontSize: fontSize, color: color, textDecoration: decoration }}
      >
        Hola soy un título
      </h1>
    </>
  );
};

export default H1Component;
