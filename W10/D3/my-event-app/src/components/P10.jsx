// Accessibility for custom Clickable elements
// to make non-button element behave like a accessible button

export function Accessibility(){
    const handleClick = () => {
        alert('custom button clicked');
    };
    return(
        <section>
            <h2>Accessibility</h2>
            <div role="button"
            tabIndex={0}
            onClick={handleClick}
            style={{padding:'20px' , backgroundColor:'blue'}}>
                Custom Accessible Button
            </div>
            <button onClick={handleClick}>Real Button</button>
        </section>
    )
}