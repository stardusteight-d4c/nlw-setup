import logoImage from '../../assets/logo.svg'
import { LoginButton } from './integrate/LoginButton'

interface Props {}

export const Login = (props: Props) => {
  return (
    <div className={style.wrapper}>
      <img src={logoImage} alt="Habits" className={style.logo} />
      <LoginButton />
    </div>
  )
}

const style = {
  wrapper: `flex flex-col items-center gap-y-24`,
  logo: `w-56`,
}
