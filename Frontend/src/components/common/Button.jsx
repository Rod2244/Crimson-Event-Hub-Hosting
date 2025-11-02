const Button = ({ label, children, onClick, className="" }) => {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {label}
            {children}
        </button>
    );
}
export default Button;