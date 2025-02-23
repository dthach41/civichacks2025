import Button from '../shared-components/button';

export default function Login() {
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <div className="w-64">
                <div className="mb-2">
                    <label className="block text-left w-full">Username: </label>
                    <input type="text" placeholder="Username" className="w-full" />
                </div>
                <div className="mb-2">
                    <label className="block text-left w-full">Password: </label>
                    <input type="password" placeholder="Password" className="w-full" />
                </div>
                <Button text="Login" onClick={() => {console.log('Get Started clicked')}}/>
            </div>
        </div>
        </>
    )
} 