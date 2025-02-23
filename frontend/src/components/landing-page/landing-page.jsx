import Button from "../shared-components/button";

export default function LandingPage() {
    return(
        <>
        <div className="flex flex-col items-center h-screen bg-gray-100 bg-cover bg-center" 
            style={{ backgroundImage: 'url(../public/desk.avif)' }}> 
            <div className="text-center mt-16"> {/* Ensures text and button are centered */}
                <h1 className="text-4xl font-bold text-white mb-4" 
                    style={{ textShadow: "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black" }}>
                    Jobora
                </h1>
                <p className="text-lg text-white mb-8" 
                    style={{ textShadow: "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black" }}>
                    Welcome to our application. Get started by clicking the button below.
                </p>
                <Button text="Get Started" onClick={() => {console.log('Get Started clicked')}}/>
            </div>
        </div>
        </>
    )
}