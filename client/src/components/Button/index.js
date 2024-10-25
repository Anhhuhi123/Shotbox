import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
function Button({ to, href, first, second, third, four, five, children, className, icon, onClick, onBlur, type }) {
    let Comp = 'button';
    const props = {
        onClick,
        onBlur,
        type,
    }
    if (to) {
        props.to = to;
        Comp = Link;
    }
    if (href) {
        props.href = href;
        Comp = 'a';
    }


    const classes = cx('wrapper', {
        [className]: className,
        first,
        second,
        third,
        four,
        five,
        icon,
    });
    return (
        <Comp className={classes} {...props}>
            {icon && <span>{icon}</span>}
            <span>{children}</span>
        </Comp>
    )
}

export default Button;