import styles from '../../styles/Modal.module.scss'

//  <Popup title={'Confirm Delete'} text={'Are you sure you want to delete module from semester?'} options={[{name:'Confirm',action:()=>console.log('confirm modal')},{name:'Cancel',action:()=>console.log('cancel modal'), highlight:true}]} toggle={() => console.log('close')} />

const Popup = ({title, options, text, toggle}) => {
    return(
        <Modal>
            <strong>{title}</strong>
            <p>{text}</p>
            <div className={styles.optionContainer}>
                {options.map((item, index) => <ModalOption key={index} text={item.name} action={() => {item.action();toggle()}} highlight={item.highlight}/>)}
            </div>
        </Modal>
    )
}

const Modal = ({children, close}) => {
    //close button?
    return (
        <div className={styles.background} onClick={close}>
            <div className={styles.container}>
                {children}
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

export {Modal, Popup}
