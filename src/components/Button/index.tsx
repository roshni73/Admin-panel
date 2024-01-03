interface ButtonProps {
  label: string;
  onClick?: () => void;
  navigate?: (path: string) => void;
  user?: { id: number };
  icon?: JSX.Element;
}

const Button = ({ label, onClick, navigate, user, icon }: ButtonProps) => {
  const handleClick = navigate && user ? () => navigate(`/Posts/${user.id}`) : onClick;

  return (
    <button className="button-pagination" onClick={handleClick}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;