import Button from '../shared-components/button';

export default function Login() {
    return (
        <div className="flex h-screen">
            {/* Left half - Login Form */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50">
                <div className="border-2 border-gray-300 rounded-lg p-8 shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <div className="w-80">
                        <div className="mb-2">
                            <label className="block text-left w-full">Username: </label>
                            <input type="text" placeholder="Username" className="w-full border border-black px-2 py-1 rounded-md" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-left w-full">Password: </label>
                            <input type="password" placeholder="Password" className="w-full border border-black px-2 py-1 rounded-md" />
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button text="Login" onClick={() => {console.log('Login clicked')}} className="flex-1"/>
                            <Button text="Register" onClick={() => {console.log('Register clicked')}} className="flex-1"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right half - Image */}
            <div className="w-1/2">
                <img 
                    src="/public/laptop.avif" 
                    alt="Login" 
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    )
} 