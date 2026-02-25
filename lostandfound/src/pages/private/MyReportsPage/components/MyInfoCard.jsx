function MyInfoCard({image, number, name}) {
    return(
        <div>
            <div>
                <div>
                    <img src={image} alt="" />
                </div>
                <div>
                    <h3>{number}</h3>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );
}
export default MyInfoCard;