const Reservations = () => {

    const logout = () => {
        localStorage.removeItem('authToken');
        console.log('Usuário deslogado');
    };

    return (
        <><h2>teste</h2>
        
        <form onSubmit={logout}>
            <button type="submit">Logout</button>
        </form></>

    );

};

export default Reservations;
