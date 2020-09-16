import { signIn } from 'next-auth/client'

export default function AccessDenied() {
  return (
    <>
      <h1>Accès refusé</h1>
      <p>
        <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>Vous devez être connecté pour voir cette page</a>
      </p>
    </>
  )
}
