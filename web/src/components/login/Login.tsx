import logoImage from '../../assets/logo.svg'
import LoginButton from './integrate/LoginButton'

interface Props {}

export const Login = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-24">
      <img src={logoImage} alt="Habits" className="w-56" />
      <LoginButton />
    </div>
  )
}
