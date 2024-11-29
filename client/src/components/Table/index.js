import classNames from "classnames/bind";
import styles from './Table.module.scss';
const cx = classNames.bind(styles);
function Table({ currentItems, columns, actions }) {
    const renderRows = () => {
        return currentItems.map((item, index) => {
            return (
                <tr key={index}>
                    {columns && columns.map((col, colIndex) => (
                        <td key={colIndex}>
                            {col.render ? col.render(item[col.key]) : item[col.key]}
                        </td>
                    ))}
                    {actions && actions.map((action, actionIndex) => (
                        <td key={actionIndex}>
                            <button
                                className={cx('btn')}
                                onClick={() => action.handler(item)}
                            >
                                {action.title}
                            </button>
                        </td>
                    ))}
                </tr>
            );
        });
    };
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                        {columns && columns.map((col, index) => {
                            return <th key={index} style={{ width: col.width }}>{col.title}</th>
                        })}
                        {actions && actions.map((action, index) => {
                            return <th key={index} style={{ width: action.width }}>{action.title}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentItems && renderRows()}
                </tbody>
            </table>
        </div>
    );
}
export default Table;
