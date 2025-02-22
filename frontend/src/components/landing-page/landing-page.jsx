import Button from "../shared-components/button";

export default function LandingPage() {
    return(
        <>
        <div>
            <h1 className="text-black">App Name</h1>
        </div>
        <div> {/* middle section */}
            <div> {/* button */}
                <Button text="Login" onClick={() => {console.log('test')}}/>
            </div>
        </div>
        </>
    )
}