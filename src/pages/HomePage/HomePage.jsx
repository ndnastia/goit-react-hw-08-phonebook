import style from 'pages/HomePage/HomePage.module.css'

const HomePage = () => {
    return(
        <div className={style['banner']}>
            <h1>Hi! I'm your private phonebook.</h1>
            <p>To add contact please Login or Register</p>
        </div>
    )
}

export default HomePage;