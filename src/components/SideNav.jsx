import CryptoNews from "./CryptoNews"

const SideNav = () => {
    return (
        // note that the given code has the classname all lower case but the css
        // for it has uppercase N!!! will not style as sidebar unless this is changed
        <div className="sideNav">
            <h1>Crypto News</h1>
            <CryptoNews/>
        </div>
    )
}
export default SideNav
