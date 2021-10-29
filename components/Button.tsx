interface IButton {
  variant: 'primary' | 'border'
  children: any
  onClick?: any
  className?: string
}

const Button = ({ variant, children, onClick, className = '' }: IButton) => {
  let _className = 'py-2 px-4 h-10 bold rounded-full m-1 transform active:scale-95 text-sm font-bold';
  const style: any = {};

  if (variant === 'border') _className += " border border-gray-400 hover:border-opacity-50 transition-all"
  if (variant === 'primary') style.background = '#00eeb9';
  
  return (
    <button
      onClick={onClick}
      className={_className + ' ' + className}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
