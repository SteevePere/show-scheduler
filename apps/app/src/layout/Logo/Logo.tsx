interface ILogoProps {
  width?: string;
  padding?: number;
}

const Logo = (props: ILogoProps) => {
  const { width = '100%', padding = 20 } = props;

  return (
    <img
      src={process.env.PUBLIC_URL + '/logo512.png'}
      alt='Logo'
      style={{
        width,
        padding,
        objectFit: 'cover',
      }}
    />
  );
};

export default Logo;