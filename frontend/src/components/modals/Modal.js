import styles from '../../styles/Modal.module.scss'

//  <Modal title={'Confirm Delete'} text={'Are you sure you want to delete module from semester?'} options={[{name:'Confirm',action:()=>console.log('confirm modal')},{name:'Cancel',action:()=>console.log('cancel modal'), highlight:true}]} toggle={() => console.log('close')} />


const Modal = ({title, options, text, toggle}) => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <strong>{title}</strong>
                <p>{text}</p>
                <div className={styles.optionContainer}>
                    {options.map((item, index) => <ModalOption key={index} text={item.name} action={() => {item.action();toggle()}} highlight={item.highlight}/>)}
                </div>
            </div>
        </div>
    )
}

const ModalOption = ({text, action, highlight}) => {
    return (
        <div className={`${styles.option} ${highlight ? styles.highlight : ''}`} onClick={action}>
            <p>{text}</p>
        </div>
    )
}

export default Modal
