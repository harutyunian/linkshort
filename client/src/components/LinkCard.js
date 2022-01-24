const LinkCard = ({link}) =>{
        return(
            <>
                <h2>Link</h2>
                    <p>Your Link: <a rel='noopener noreferrer' target='_blank' href={link.to}>{link.to}</a></p>
                    <p>From: <a rel='noopener noreferrer' target='_blank' href={link.from}>{link.from}</a></p>
                    <p>Count click on link: <strong>{link.click}</strong></p>
                    <p>Create Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            </>
        )
}
export default LinkCard
