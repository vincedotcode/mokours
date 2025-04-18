import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </div>
  )
}
