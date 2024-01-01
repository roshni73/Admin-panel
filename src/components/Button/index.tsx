
interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} title ={title}>
      {title}
    </button>
  );
};

export default Button;
