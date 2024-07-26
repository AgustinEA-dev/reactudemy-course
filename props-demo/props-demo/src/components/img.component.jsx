const ImgComponent = (props) => {
  const { src, size, border } = props;
  return <img className="img" src={src} width={size} border={border} />;
};

export default ImgComponent;
